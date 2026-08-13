'use strict';

// Contrato: GET /api/community/feed → verifyToken, sin restricción de rol.
// Respuesta: { docs: Array, total: number } — mismo shape que el resto de
// listados paginados del proyecto (CourseRepository.findAll, etc.).
//
// Scope por rol (mismo criterio implícito que validateTeacherScope /
// getStudentAchievements / getStudentCertificates — sin modelo Cohort):
//   STUDENT → usuarios con su mismo assignedTeacherId (su cohorte).
//   TEACHER → alumnos con assignedTeacherId === su propio id (su roster).
//   ADMIN   → todos los alumnos.
//
// Contenido: combina UserAchievement + Certificate + CommunityPost,
// normalizados a { id, type, eventDate, author, context }, orden
// cronológico descendente por eventDate real (unlockedAt / issueDate /
// createdAt). "author" (no "student"): un POST puede estar firmado por
// un teacher, no solo por un student.

const request = require('supertest');
const app     = require('../src/app');

const Achievement     = require('../src/models/achievement.model');
const UserAchievement = require('../src/models/userAchievement.model');
const Certificate     = require('../src/models/certificate.model');
const Course          = require('../src/models/course.model');

const { connectDatabase, disconnectDatabase }        = require('./setup/db');
const { createStudent, createTeacher, createAdmin }  = require('./setup/user.factory');
const { getToken, authHeader }                       = require('./setup/auth');

// ── Estado compartido ─────────────────────────────────────────────────────────

let adminToken;
let teacherAToken;
let studentA1Token;
let noTeacherStudent1Token;

let teacherAId;
let studentA1Id;
let studentA2Id;
let studentB1Id;
let noTeacherStudent1Id;
let noTeacherStudent2Id;

// ── Ciclo de vida ─────────────────────────────────────────────────────────────

beforeAll(async () => {
  await connectDatabase();

  const { user: admin,    password: adminPass }    = await createAdmin();
  const { user: teacherA, password: teacherAPass } = await createTeacher({ email: 'teacherA.community@test.com' });
  const { user: teacherB }                         = await createTeacher({ email: 'teacherB.community@test.com' });

  adminToken    = await getToken(admin.email, adminPass);
  teacherAToken = await getToken(teacherA.email, teacherAPass);
  teacherAId    = teacherA._id.toString();

  const { user: studentA1, password: studentA1Pass } = await createStudent({
    email:             'studentA1.community@test.com',
    assignedTeacherId: teacherA._id,
  });
  const { user: studentA2 } = await createStudent({
    email:             'studentA2.community@test.com',
    assignedTeacherId: teacherA._id,
  });
  const { user: studentB1 } = await createStudent({
    email:             'studentB1.community@test.com',
    assignedTeacherId: teacherB._id,
  });

  studentA1Token = await getToken(studentA1.email, studentA1Pass);
  studentA1Id    = studentA1._id.toString();
  studentA2Id    = studentA2._id.toString();
  studentB1Id    = studentB1._id.toString();

  // Dos students SIN profesor asignado (assignedTeacherId null) — deben
  // quedar aislados entre sí, no compartir scope solo por tener null en común.
  const { user: noTeacherStudent1, password: noTeacherStudent1Pass } = await createStudent({
    email:             'noteacher1.community@test.com',
    assignedTeacherId: null,
  });
  const { user: noTeacherStudent2 } = await createStudent({
    email:             'noteacher2.community@test.com',
    assignedTeacherId: null,
  });

  noTeacherStudent1Token = await getToken(noTeacherStudent1.email, noTeacherStudent1Pass);
  noTeacherStudent1Id    = noTeacherStudent1._id.toString();
  noTeacherStudent2Id    = noTeacherStudent2._id.toString();

  const achievement = await Achievement.create({
    name:        'First Lesson Completed',
    slug:        'first_lesson_completed_community_test',
    description: 'Completaste tu primera lección.',
    icon:        '🎉',
    category:    'LESSON',
    points:      10,
  });

  const course = await Course.create({
    title:       'Curso de prueba — Community feed',
    description: 'Descripción mínima válida para el test de Community.',
    level:       'A1',
    status:      'draft',
  });

  // Fechas explícitas y muy separadas para verificar orden cronológico sin
  // ambigüedad. Orden esperado desc: achievement(B1) > certificate(A2) > achievement(A1).
  await UserAchievement.create({
    user:        studentA1._id,
    achievement: achievement._id,
    unlockedAt:  new Date('2024-01-10T00:00:00Z'),
  });

  await Certificate.create({
    student:           studentA2._id,
    course:            course._id,
    issueDate:         new Date('2024-03-15T00:00:00Z'),
    certificateNumber: 'CERT-COMMUNITY-TEST-A2',
    finalScore:        92,
  });

  await UserAchievement.create({
    user:        studentB1._id,
    achievement: achievement._id,
    unlockedAt:  new Date('2024-06-01T00:00:00Z'),
  });

  await UserAchievement.create({
    user:        noTeacherStudent1._id,
    achievement: achievement._id,
    unlockedAt:  new Date('2024-02-01T00:00:00Z'),
  });
  await UserAchievement.create({
    user:        noTeacherStudent2._id,
    achievement: achievement._id,
    unlockedAt:  new Date('2024-02-02T00:00:00Z'),
  });
});

afterAll(async () => {
  await disconnectDatabase();
});

// ── GET /api/community/feed ───────────────────────────────────────────────────

describe('GET /api/community/feed', () => {
  test('sin token → 401 TOKEN_MISSING', async () => {
    const res = await request(app).get('/api/community/feed');

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('TOKEN_MISSING');
  });

  test('STUDENT → 200, solo ve su propio ámbito (su cohorte, no la de otro teacher)', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(studentA1Token));

    expect(res.status).toBe(200);
    expect(res.body.total).toBe(2);

    const studentIds = res.body.docs.map((d) => d.author._id);
    expect(studentIds.sort()).toEqual([studentA1Id, studentA2Id].sort());
    expect(studentIds).not.toContain(studentB1Id);
  });

  test('STUDENT → cada item incluye author.email y author.role reales (email para getStudentPhoto/getTeacherPhoto en frontend, role para el badge Alumno/Profesor)', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(studentA1Token));

    expect(res.status).toBe(200);
    expect(res.body.docs.length).toBeGreaterThan(0);
    res.body.docs.forEach((d) => {
      expect(typeof d.author.email).toBe('string');
      expect(d.author.email.length).toBeGreaterThan(0);
      expect(['admin', 'teacher', 'student']).toContain(d.author.role);
    });

    const own = res.body.docs.find((d) => d.author._id === studentA1Id);
    expect(own.author.email).toBe('studenta1.community@test.com');
  });

  test('STUDENT sin assignedTeacherId → 200, su scope es únicamente él mismo (no comparte con otro student también sin profesor)', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(noTeacherStudent1Token));

    expect(res.status).toBe(200);
    expect(res.body.total).toBe(1);

    const studentIds = res.body.docs.map((d) => d.author._id);
    expect(studentIds).not.toContain(noTeacherStudent2Id);
  });

  test('TEACHER → 200, solo ve su propio roster (studentA1 + studentA2, no studentB1)', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(teacherAToken));

    expect(res.status).toBe(200);
    expect(res.body.total).toBe(2);

    const studentIds = res.body.docs.map((d) => d.author._id);
    expect(studentIds).not.toContain(studentB1Id);
  });

  test('ADMIN → 200, ve a todos los alumnos (todas las cohortes/eventos, incl. sin profesor)', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(adminToken));

    expect(res.status).toBe(200);
    expect(res.body.total).toBe(5);

    const studentIds = res.body.docs.map((d) => d.author._id);
    expect(studentIds.sort()).toEqual(
      [studentA1Id, studentA2Id, studentB1Id, noTeacherStudent1Id, noTeacherStudent2Id].sort(),
    );
  });

  test('ADMIN → el feed mezcla ACHIEVEMENT y CERTIFICATE', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(adminToken));

    const types = res.body.docs.map((d) => d.type);
    expect(types).toContain('ACHIEVEMENT');
    expect(types).toContain('CERTIFICATE');
  });

  test('ADMIN → orden cronológico descendente por fecha real del evento', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(adminToken));

    const dates = res.body.docs.map((d) => new Date(d.eventDate).getTime());
    const sorted = [...dates].sort((a, b) => b - a);
    expect(dates).toEqual(sorted);

    // El más reciente (studentB1, 2024-06-01) debe ser el primero.
    expect(res.body.docs[0].author._id).toBe(studentB1Id);
    expect(res.body.docs[0].eventDate).toBe(new Date('2024-06-01T00:00:00Z').toISOString());
  });
});

// ── POST /api/community/posts ─────────────────────────────────────────────────
// Contrato: verifyToken + requireRole(STUDENT, TEACHER) — admin → 403.
// El body solo aporta `content`; type y scopeTeacherId los decide el Service.

describe('POST /api/community/posts', () => {
  test('sin token → 401 TOKEN_MISSING', async () => {
    const res = await request(app)
      .post('/api/community/posts')
      .send({ content: 'Hola comunidad' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('TOKEN_MISSING');
  });

  test('STUDENT → 201, crea el post con type POST', async () => {
    const res = await request(app)
      .post('/api/community/posts')
      .set(authHeader(studentA1Token))
      .send({ content: 'Mi primer post de prueba' });

    expect(res.status).toBe(201);
    expect(res.body.post.content).toBe('Mi primer post de prueba');
    expect(res.body.post.type).toBe('POST');
  });

  test('TEACHER → 201, crea el post con type POST', async () => {
    const res = await request(app)
      .post('/api/community/posts')
      .set(authHeader(teacherAToken))
      .send({ content: 'Bienvenidos a la cohorte' });

    expect(res.status).toBe(201);
    expect(res.body.post.type).toBe('POST');
  });

  test('ADMIN → 403 INSUFFICIENT_ROLE', async () => {
    const res = await request(app)
      .post('/api/community/posts')
      .set(authHeader(adminToken))
      .send({ content: 'Intento de admin' });

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('INSUFFICIENT_ROLE');
  });

  test('content vacío → 400 VALIDATION_ERROR', async () => {
    const res = await request(app)
      .post('/api/community/posts')
      .set(authHeader(studentA1Token))
      .send({ content: '' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('VALIDATION_ERROR');
  });

  test('content > 2000 caracteres → 400 VALIDATION_ERROR', async () => {
    const res = await request(app)
      .post('/api/community/posts')
      .set(authHeader(studentA1Token))
      .send({ content: 'a'.repeat(2001) });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('VALIDATION_ERROR');
  });

  test('STUDENT con assignedTeacherId → scopeTeacherId resuelto = assignedTeacherId', async () => {
    const res = await request(app)
      .post('/api/community/posts')
      .set(authHeader(studentA1Token))
      .send({ content: 'Scope test — student con profesor' });

    expect(res.status).toBe(201);
    expect(res.body.post.scopeTeacherId).toBe(teacherAId);
  });

  test('STUDENT sin assignedTeacherId → scopeTeacherId resuelto = su propio id', async () => {
    const res = await request(app)
      .post('/api/community/posts')
      .set(authHeader(noTeacherStudent1Token))
      .send({ content: 'Scope test — student sin profesor' });

    expect(res.status).toBe(201);
    expect(res.body.post.scopeTeacherId).toBe(noTeacherStudent1Id);
  });

  test('TEACHER → scopeTeacherId resuelto = su propio id', async () => {
    const res = await request(app)
      .post('/api/community/posts')
      .set(authHeader(teacherAToken))
      .send({ content: 'Scope test — teacher' });

    expect(res.status).toBe(201);
    expect(res.body.post.scopeTeacherId).toBe(teacherAId);
  });

  test('enviar type=ANNOUNCEMENT en el body NO permite crearlo — se fuerza POST', async () => {
    const res = await request(app)
      .post('/api/community/posts')
      .set(authHeader(studentA1Token))
      .send({ content: 'Intento de announcement manipulando el body', type: 'ANNOUNCEMENT' });

    expect(res.status).toBe(201);
    expect(res.body.post.type).toBe('POST');
  });
});

// ── Integración de POST en GET /api/community/feed ────────────────────────────
// Cohortes propias (teacherC/studentC1 y teacherD/studentD1), aisladas de los
// posts creados en el describe anterior, para poder afirmar presencia/ausencia
// exacta sin depender de cuántos posts se acumularon antes en este fichero.

describe('POST integrado en GET /api/community/feed', () => {
  // Tokens generados directamente con authService.generateToken (sin pasar
  // por POST /auth/login) — este fichero ya agota el loginLimiter real
  // (5 intentos/15min, compartido por IP) con los logins de los describe
  // anteriores; generar el JWT directamente es funcionalmente equivalente
  // para estos tests (solo verifican community.routes, no el propio login)
  // y no consume el limiter de otro módulo.
  const authService = require('../src/modules/auth/auth.service');

  let teacherCToken;
  let teacherCId;
  let studentC1Token;
  let teacherDToken;
  let studentD1Token;

  let visiblePostId;
  let deletedPostId;

  beforeAll(async () => {
    const { user: teacherC } = await createTeacher({ email: 'teacherC.community@test.com' });
    const { user: teacherD } = await createTeacher({ email: 'teacherD.community@test.com' });
    teacherCToken = authService.generateToken(teacherC._id, teacherC.role);
    teacherDToken = authService.generateToken(teacherD._id, teacherD.role);
    teacherCId    = teacherC._id.toString();

    const { user: studentC1 } = await createStudent({
      email:             'studentC1.community@test.com',
      assignedTeacherId: teacherC._id,
    });
    studentC1Token = authService.generateToken(studentC1._id, studentC1.role);
    const studentC1Id = studentC1._id.toString();

    const { user: studentD1 } = await createStudent({
      email:             'studentD1.community@test.com',
      assignedTeacherId: teacherD._id,
    });
    studentD1Token = authService.generateToken(studentD1._id, studentD1.role);

    const createRes = await request(app)
      .post('/api/community/posts')
      .set(authHeader(studentC1Token))
      .send({ content: 'Post visible de la cohorte C' });
    visiblePostId = createRes.body.post._id;

    // Sin endpoint DELETE todavía: se marca isDeleted directamente contra el
    // modelo para comprobar que el feed ya lo excluye desde ahora.
    const CommunityPost = require('../src/models/communityPost.model');
    const toDelete = await CommunityPost.create({
      author:         studentC1Id,
      type:           'POST',
      content:        'Post que debería estar oculto',
      scopeTeacherId: teacherCId,
      isDeleted:      true,
    });
    deletedPostId = toDelete._id.toString();
  });

  test('el POST creado aparece en el feed de su propio scope (student)', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(studentC1Token));

    const ids = res.body.docs.map((d) => d.id);
    expect(ids).toContain(visiblePostId);
  });

  test('el POST creado aparece en el feed del teacher dueño de esa cohorte', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(teacherCToken));

    const ids = res.body.docs.map((d) => d.id);
    expect(ids).toContain(visiblePostId);
  });

  test('el feed mezcla POST junto a ACHIEVEMENT y CERTIFICATE ya existentes', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(adminToken));

    const types = new Set(res.body.docs.map((d) => d.type));
    expect(types.has('POST')).toBe(true);
    expect(types.has('ACHIEVEMENT')).toBe(true);
    expect(types.has('CERTIFICATE')).toBe(true);
  });

  test('orden cronológico descendente se mantiene con POST incluido', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(adminToken));

    const dates = res.body.docs.map((d) => new Date(d.eventDate).getTime());
    const sorted = [...dates].sort((a, b) => b - a);
    expect(dates).toEqual(sorted);
  });

  test('STUDENT no ve POST de otra cohorte', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(studentD1Token));

    const ids = res.body.docs.map((d) => d.id);
    expect(ids).not.toContain(visiblePostId);
  });

  test('TEACHER no ve POST de otra cohorte', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(teacherDToken));

    const ids = res.body.docs.map((d) => d.id);
    expect(ids).not.toContain(visiblePostId);
  });

  test('ADMIN sí ve el POST de cualquier cohorte', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(adminToken));

    const ids = res.body.docs.map((d) => d.id);
    expect(ids).toContain(visiblePostId);
  });

  test('isDeleted:true nunca aparece en el feed', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(adminToken));

    const ids = res.body.docs.map((d) => d.id);
    expect(ids).not.toContain(deletedPostId);
  });
});

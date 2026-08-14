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

// ── Comentarios: GET/POST /api/community/posts/:postId/comments ───────────────
// Contrato: verifyToken, cualquier rol autenticado. El acceso al post lo
// resuelve el Service con el mismo scope que el feed (student/teacher solo
// su propia cohorte; admin sin restricción). Post inexistente/borrado → 404,
// post de otra cohorte → 403. Cohortes propias (teacherE/studentE1 y
// teacherF/studentF1), aisladas de los describe anteriores.

describe('Comentarios de CommunityPost', () => {
  const authService = require('../src/modules/auth/auth.service');
  const CommunityPost = require('../src/models/communityPost.model');

  let teacherEToken;
  let teacherEId;
  let studentE1Token;
  let studentE1Id;
  let teacherFToken;
  let studentF1Token;
  let adminTokenComments;

  let postId;
  let deletedPostId;

  beforeAll(async () => {
    const { user: admin, password: adminPass } = await createAdmin({ email: 'admin.comments@test.com' });
    adminTokenComments = await getToken(admin.email, adminPass);

    const { user: teacherE } = await createTeacher({ email: 'teacherE.community@test.com' });
    const { user: teacherF } = await createTeacher({ email: 'teacherF.community@test.com' });
    teacherEToken = authService.generateToken(teacherE._id, teacherE.role);
    teacherFToken = authService.generateToken(teacherF._id, teacherF.role);
    teacherEId    = teacherE._id.toString();

    const { user: studentE1 } = await createStudent({
      email:             'studentE1.community@test.com',
      assignedTeacherId: teacherE._id,
    });
    studentE1Token = authService.generateToken(studentE1._id, studentE1.role);
    studentE1Id    = studentE1._id.toString();

    const { user: studentF1 } = await createStudent({
      email:             'studentF1.community@test.com',
      assignedTeacherId: teacherF._id,
    });
    studentF1Token = authService.generateToken(studentF1._id, studentF1.role);

    const createRes = await request(app)
      .post('/api/community/posts')
      .set(authHeader(studentE1Token))
      .send({ content: 'Post de la cohorte E para comentarios' });
    postId = createRes.body.post._id;

    const toDelete = await CommunityPost.create({
      author:         studentE1Id,
      type:           'POST',
      content:        'Post borrado — no debe aceptar comentarios',
      scopeTeacherId: teacherEId,
      isDeleted:      true,
    });
    deletedPostId = toDelete._id.toString();
  });

  describe('POST /api/community/posts/:postId/comments', () => {
    test('sin token → 401 TOKEN_MISSING', async () => {
      const res = await request(app)
        .post(`/api/community/posts/${postId}/comments`)
        .send({ content: 'Comentario sin token' });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('TOKEN_MISSING');
    });

    test('STUDENT de la cohorte → 201, crea el comentario', async () => {
      const res = await request(app)
        .post(`/api/community/posts/${postId}/comments`)
        .set(authHeader(studentE1Token))
        .send({ content: 'Comentario de student' });

      expect(res.status).toBe(201);
      expect(res.body.comment.content).toBe('Comentario de student');
      expect(res.body.comment.author._id).toBe(studentE1Id);
    });

    test('TEACHER de la cohorte → 201, crea el comentario', async () => {
      const res = await request(app)
        .post(`/api/community/posts/${postId}/comments`)
        .set(authHeader(teacherEToken))
        .send({ content: 'Comentario de teacher' });

      expect(res.status).toBe(201);
      expect(res.body.comment.content).toBe('Comentario de teacher');
    });

    test('ADMIN → 201, crea el comentario sobre cualquier post', async () => {
      const res = await request(app)
        .post(`/api/community/posts/${postId}/comments`)
        .set(authHeader(adminTokenComments))
        .send({ content: 'Comentario de admin' });

      expect(res.status).toBe(201);
      expect(res.body.comment.content).toBe('Comentario de admin');
    });

    test('STUDENT de otra cohorte → 403 POST_FORBIDDEN', async () => {
      const res = await request(app)
        .post(`/api/community/posts/${postId}/comments`)
        .set(authHeader(studentF1Token))
        .send({ content: 'Intento de comentar fuera de mi cohorte' });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('POST_FORBIDDEN');
    });

    test('TEACHER de otra cohorte → 403 POST_FORBIDDEN', async () => {
      const res = await request(app)
        .post(`/api/community/posts/${postId}/comments`)
        .set(authHeader(teacherFToken))
        .send({ content: 'Intento de comentar fuera de mi cohorte' });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('POST_FORBIDDEN');
    });

    test('post inexistente → 404 POST_NOT_FOUND', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app)
        .post(`/api/community/posts/${fakeId}/comments`)
        .set(authHeader(studentE1Token))
        .send({ content: 'Comentario sobre post inexistente' });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('POST_NOT_FOUND');
    });

    test('post soft-deleted → 404 POST_NOT_FOUND', async () => {
      const res = await request(app)
        .post(`/api/community/posts/${deletedPostId}/comments`)
        .set(authHeader(studentE1Token))
        .send({ content: 'Comentario sobre post borrado' });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('POST_NOT_FOUND');
    });

    test('content vacío → 400 VALIDATION_ERROR', async () => {
      const res = await request(app)
        .post(`/api/community/posts/${postId}/comments`)
        .set(authHeader(studentE1Token))
        .send({ content: '' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });

    test('content > 2000 caracteres → 400 VALIDATION_ERROR', async () => {
      const res = await request(app)
        .post(`/api/community/posts/${postId}/comments`)
        .set(authHeader(studentE1Token))
        .send({ content: 'a'.repeat(2001) });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });

    test('postId con formato inválido → 400 VALIDATION_ERROR', async () => {
      const res = await request(app)
        .post('/api/community/posts/no-es-un-id/comments')
        .set(authHeader(studentE1Token))
        .send({ content: 'Comentario con postId inválido' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });

    test('cada comentario válido creado incrementa commentCount del post', async () => {
      const before = await CommunityPost.findById(postId);

      const res = await request(app)
        .post(`/api/community/posts/${postId}/comments`)
        .set(authHeader(studentE1Token))
        .send({ content: 'Comentario que debe incrementar el contador' });

      expect(res.status).toBe(201);

      const after = await CommunityPost.findById(postId);
      expect(after.commentCount).toBe(before.commentCount + 1);
    });
  });

  describe('GET /api/community/posts/:postId/comments', () => {
    test('sin token → 401 TOKEN_MISSING', async () => {
      const res = await request(app).get(`/api/community/posts/${postId}/comments`);

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('TOKEN_MISSING');
    });

    test('STUDENT de la cohorte → 200, devuelve los comentarios visibles en orden cronológico', async () => {
      const res = await request(app)
        .get(`/api/community/posts/${postId}/comments`)
        .set(authHeader(studentE1Token));

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.comments)).toBe(true);
      expect(res.body.comments.length).toBeGreaterThanOrEqual(4);

      const dates = res.body.comments.map((c) => new Date(c.createdAt).getTime());
      const sorted = [...dates].sort((a, b) => a - b);
      expect(dates).toEqual(sorted);

      res.body.comments.forEach((c) => {
        expect(typeof c.content).toBe('string');
        expect(typeof c.author.email).toBe('string');
        expect(['admin', 'teacher', 'student']).toContain(c.author.role);
      });
    });

    test('un comentario marcado isDeleted:true no aparece en la lista', async () => {
      const CommunityComment = require('../src/models/communityComment.model');
      const hiddenComment = await CommunityComment.create({
        post:      postId,
        author:    studentE1Id,
        content:   'Comentario que debería estar oculto',
        isDeleted: true,
      });

      const res = await request(app)
        .get(`/api/community/posts/${postId}/comments`)
        .set(authHeader(studentE1Token));

      expect(res.status).toBe(200);
      const ids = res.body.comments.map((c) => c._id);
      expect(ids).not.toContain(hiddenComment._id.toString());
    });

    test('STUDENT de otra cohorte → 403 POST_FORBIDDEN', async () => {
      const res = await request(app)
        .get(`/api/community/posts/${postId}/comments`)
        .set(authHeader(studentF1Token));

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('POST_FORBIDDEN');
    });

    test('TEACHER de otra cohorte → 403 POST_FORBIDDEN', async () => {
      const res = await request(app)
        .get(`/api/community/posts/${postId}/comments`)
        .set(authHeader(teacherFToken));

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('POST_FORBIDDEN');
    });

    test('ADMIN → 200, ve los comentarios de cualquier post', async () => {
      const res = await request(app)
        .get(`/api/community/posts/${postId}/comments`)
        .set(authHeader(adminTokenComments));

      expect(res.status).toBe(200);
      expect(res.body.comments.length).toBeGreaterThan(0);
    });

    test('post inexistente → 404 POST_NOT_FOUND', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app)
        .get(`/api/community/posts/${fakeId}/comments`)
        .set(authHeader(studentE1Token));

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('POST_NOT_FOUND');
    });
  });
});

// ── Eliminación (soft delete) y moderación: DELETE posts/comments ─────────────
// Contrato: verifyToken, cualquier rol autenticado — el permiso real lo
// decide el Service (autor siempre, ADMIN siempre, TEACHER solo su propia
// cohorte; STUDENT nunca sobre contenido ajeno). Soft delete: isDeleted =
// true, sin borrado físico, 204 sin body. Cohortes propias (teacherG con
// studentG1/studentG2, y teacherH/studentH1 fuera de esa cohorte).

describe('DELETE — eliminación y moderación de Community', () => {
  const authService      = require('../src/modules/auth/auth.service');
  const CommunityPost    = require('../src/models/communityPost.model');
  const CommunityComment = require('../src/models/communityComment.model');

  let teacherGToken;
  let studentG1Token;
  let studentG2Token;
  let teacherHToken;
  let adminTokenDelete;

  beforeAll(async () => {
    // Token generado directamente (sin pasar por POST /auth/login): este
    // fichero ya agota el loginLimiter real (5 intentos/15min por IP) con
    // los logins de los describe anteriores — mismo criterio que el resto
    // de describe de este fichero que crean tokens tras el primero.
    const { user: admin } = await createAdmin({ email: 'admin.delete@test.com' });
    adminTokenDelete = authService.generateToken(admin._id, admin.role);

    const { user: teacherG } = await createTeacher({ email: 'teacherG.community@test.com' });
    const { user: teacherH } = await createTeacher({ email: 'teacherH.community@test.com' });
    teacherGToken = authService.generateToken(teacherG._id, teacherG.role);
    teacherHToken = authService.generateToken(teacherH._id, teacherH.role);

    const { user: studentG1 } = await createStudent({
      email:             'studentG1.community@test.com',
      assignedTeacherId: teacherG._id,
    });
    const { user: studentG2 } = await createStudent({
      email:             'studentG2.community@test.com',
      assignedTeacherId: teacherG._id,
    });
    studentG1Token = authService.generateToken(studentG1._id, studentG1.role);
    studentG2Token = authService.generateToken(studentG2._id, studentG2.role);

    await createStudent({
      email:             'studentH1.community@test.com',
      assignedTeacherId: teacherH._id,
    });
  });

  // Post fresco autoría de studentG1 — cada test que borra necesita su
  // propio recurso para no interferir con el resto.
  const createPostAsG1 = async (content = 'Post de prueba para borrado') => {
    const res = await request(app)
      .post('/api/community/posts')
      .set(authHeader(studentG1Token))
      .send({ content });
    return res.body.post._id;
  };

  const createCommentAsG1 = async (postId, content = 'Comentario de prueba para borrado') => {
    const res = await request(app)
      .post(`/api/community/posts/${postId}/comments`)
      .set(authHeader(studentG1Token))
      .send({ content });
    return res.body.comment._id;
  };

  describe('DELETE /api/community/posts/:postId', () => {
    test('sin token → 401 TOKEN_MISSING', async () => {
      const postId = await createPostAsG1();
      const res    = await request(app).delete(`/api/community/posts/${postId}`);

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('TOKEN_MISSING');
    });

    test('autor STUDENT elimina su propio post → 204, isDeleted=true', async () => {
      const postId = await createPostAsG1();
      const res = await request(app)
        .delete(`/api/community/posts/${postId}`)
        .set(authHeader(studentG1Token));

      expect(res.status).toBe(204);
      const post = await CommunityPost.findById(postId);
      expect(post.isDeleted).toBe(true);
    });

    test('STUDENT no puede eliminar un post ajeno → 403 POST_DELETE_FORBIDDEN', async () => {
      const postId = await createPostAsG1();
      const res = await request(app)
        .delete(`/api/community/posts/${postId}`)
        .set(authHeader(studentG2Token));

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('POST_DELETE_FORBIDDEN');

      const post = await CommunityPost.findById(postId);
      expect(post.isDeleted).toBe(false);
    });

    test('TEACHER elimina post de alumno de su cohorte → 204', async () => {
      const postId = await createPostAsG1();
      const res = await request(app)
        .delete(`/api/community/posts/${postId}`)
        .set(authHeader(teacherGToken));

      expect(res.status).toBe(204);
      const post = await CommunityPost.findById(postId);
      expect(post.isDeleted).toBe(true);
    });

    test('TEACHER no puede eliminar post de otra cohorte → 403 POST_DELETE_FORBIDDEN', async () => {
      const postId = await createPostAsG1();
      const res = await request(app)
        .delete(`/api/community/posts/${postId}`)
        .set(authHeader(teacherHToken));

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('POST_DELETE_FORBIDDEN');
    });

    test('ADMIN elimina cualquier post → 204', async () => {
      const postId = await createPostAsG1();
      const res = await request(app)
        .delete(`/api/community/posts/${postId}`)
        .set(authHeader(adminTokenDelete));

      expect(res.status).toBe(204);
      const post = await CommunityPost.findById(postId);
      expect(post.isDeleted).toBe(true);
    });

    test('post eliminado desaparece del feed', async () => {
      const postId = await createPostAsG1('Post que debe desaparecer del feed');
      await request(app)
        .delete(`/api/community/posts/${postId}`)
        .set(authHeader(studentG1Token));

      const res = await request(app)
        .get('/api/community/feed')
        .set(authHeader(studentG1Token));

      const ids = res.body.docs.map((d) => d.id);
      expect(ids).not.toContain(postId);
    });

    test('segundo DELETE sobre el mismo post → 404 POST_NOT_FOUND, sin efectos adicionales', async () => {
      const postId = await createPostAsG1();

      const first = await request(app)
        .delete(`/api/community/posts/${postId}`)
        .set(authHeader(studentG1Token));
      expect(first.status).toBe(204);

      const second = await request(app)
        .delete(`/api/community/posts/${postId}`)
        .set(authHeader(studentG1Token));
      expect(second.status).toBe(404);
      expect(second.body.error).toBe('POST_NOT_FOUND');

      const post = await CommunityPost.findById(postId);
      expect(post.isDeleted).toBe(true);
    });

    test('postId con formato inválido → 400 VALIDATION_ERROR', async () => {
      const res = await request(app)
        .delete('/api/community/posts/no-es-un-id')
        .set(authHeader(studentG1Token));

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });

    test('post inexistente → 404 POST_NOT_FOUND', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app)
        .delete(`/api/community/posts/${fakeId}`)
        .set(authHeader(studentG1Token));

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('POST_NOT_FOUND');
    });
  });

  describe('DELETE /api/community/posts/:postId/comments/:commentId', () => {
    test('sin token → 401 TOKEN_MISSING', async () => {
      const postId    = await createPostAsG1();
      const commentId = await createCommentAsG1(postId);

      const res = await request(app).delete(`/api/community/posts/${postId}/comments/${commentId}`);

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('TOKEN_MISSING');
    });

    test('autor elimina su propio comentario → 204, commentCount decrementa', async () => {
      const postId    = await createPostAsG1();
      const commentId = await createCommentAsG1(postId);

      const before = await CommunityPost.findById(postId);
      expect(before.commentCount).toBe(1);

      const res = await request(app)
        .delete(`/api/community/posts/${postId}/comments/${commentId}`)
        .set(authHeader(studentG1Token));
      expect(res.status).toBe(204);

      const comment = await CommunityComment.findById(commentId);
      expect(comment.isDeleted).toBe(true);

      const after = await CommunityPost.findById(postId);
      expect(after.commentCount).toBe(0);
    });

    test('STUDENT no puede eliminar un comentario ajeno → 403 COMMENT_DELETE_FORBIDDEN', async () => {
      const postId    = await createPostAsG1();
      const commentId = await createCommentAsG1(postId);

      const res = await request(app)
        .delete(`/api/community/posts/${postId}/comments/${commentId}`)
        .set(authHeader(studentG2Token));

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('COMMENT_DELETE_FORBIDDEN');
    });

    test('TEACHER modera comentario de su cohorte → 204', async () => {
      const postId    = await createPostAsG1();
      const commentId = await createCommentAsG1(postId);

      const res = await request(app)
        .delete(`/api/community/posts/${postId}/comments/${commentId}`)
        .set(authHeader(teacherGToken));

      expect(res.status).toBe(204);
      const comment = await CommunityComment.findById(commentId);
      expect(comment.isDeleted).toBe(true);
    });

    test('TEACHER no puede moderar comentario de otra cohorte → 403 COMMENT_DELETE_FORBIDDEN', async () => {
      const postId    = await createPostAsG1();
      const commentId = await createCommentAsG1(postId);

      const res = await request(app)
        .delete(`/api/community/posts/${postId}/comments/${commentId}`)
        .set(authHeader(teacherHToken));

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('COMMENT_DELETE_FORBIDDEN');
    });

    test('ADMIN modera cualquier comentario → 204', async () => {
      const postId    = await createPostAsG1();
      const commentId = await createCommentAsG1(postId);

      const res = await request(app)
        .delete(`/api/community/posts/${postId}/comments/${commentId}`)
        .set(authHeader(adminTokenDelete));

      expect(res.status).toBe(204);
    });

    test('comentario eliminado desaparece del GET', async () => {
      const postId    = await createPostAsG1();
      const commentId = await createCommentAsG1(postId, 'Comentario que debe desaparecer');

      await request(app)
        .delete(`/api/community/posts/${postId}/comments/${commentId}`)
        .set(authHeader(studentG1Token));

      const res = await request(app)
        .get(`/api/community/posts/${postId}/comments`)
        .set(authHeader(studentG1Token));

      const ids = res.body.comments.map((c) => c._id);
      expect(ids).not.toContain(commentId);
    });

    test('segundo DELETE sobre el mismo comentario → 404 COMMENT_NOT_FOUND, sin volver a decrementar commentCount', async () => {
      const postId    = await createPostAsG1();
      const commentId = await createCommentAsG1(postId);

      const first = await request(app)
        .delete(`/api/community/posts/${postId}/comments/${commentId}`)
        .set(authHeader(studentG1Token));
      expect(first.status).toBe(204);

      const afterFirst = await CommunityPost.findById(postId);
      expect(afterFirst.commentCount).toBe(0);

      const second = await request(app)
        .delete(`/api/community/posts/${postId}/comments/${commentId}`)
        .set(authHeader(studentG1Token));
      expect(second.status).toBe(404);
      expect(second.body.error).toBe('COMMENT_NOT_FOUND');

      const afterSecond = await CommunityPost.findById(postId);
      expect(afterSecond.commentCount).toBe(0);
    });

    test('commentCount nunca queda negativo tras reintentar borrar un comentario ya borrado', async () => {
      const postId    = await createPostAsG1();
      const commentId = await createCommentAsG1(postId);

      await request(app)
        .delete(`/api/community/posts/${postId}/comments/${commentId}`)
        .set(authHeader(studentG1Token));
      await request(app)
        .delete(`/api/community/posts/${postId}/comments/${commentId}`)
        .set(authHeader(studentG1Token));

      const post = await CommunityPost.findById(postId);
      expect(post.commentCount).toBe(0);
    });

    test('commentId con formato inválido → 400 VALIDATION_ERROR', async () => {
      const postId = await createPostAsG1();
      const res = await request(app)
        .delete(`/api/community/posts/${postId}/comments/no-es-un-id`)
        .set(authHeader(studentG1Token));

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });

    test('comentario inexistente → 404 COMMENT_NOT_FOUND', async () => {
      const postId = await createPostAsG1();
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app)
        .delete(`/api/community/posts/${postId}/comments/${fakeId}`)
        .set(authHeader(studentG1Token));

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('COMMENT_NOT_FOUND');
    });
  });
});

// ── ANNOUNCEMENT: POST /api/community/announcements ────────────────────────────
// Contrato: verifyToken + requireRole(TEACHER, ADMIN) — student → 403.
// type siempre ANNOUNCEMENT; scopeTeacherId: TEACHER → su propia cohorte,
// ADMIN → null (global). Visibilidad y DELETE reutilizan la lógica de scope
// y moderación ya existente para CommunityPost — sin sistema paralelo.
// Cohortes propias (teacherK/studentK1 y teacherL/studentL1) para aislar
// estos tests del resto del fichero.

describe('ANNOUNCEMENT de Community', () => {
  const authService   = require('../src/modules/auth/auth.service');
  const CommunityPost = require('../src/models/communityPost.model');

  let teacherKToken;
  let teacherKId;
  let studentK1Token;
  let studentK1Id;
  let teacherLToken;
  let teacherLId;
  let studentL1Token;
  let adminTokenAnnouncement;

  beforeAll(async () => {
    // Tokens generados directamente (sin pasar por POST /auth/login): este
    // fichero ya agota el loginLimiter real (5 intentos/15min por IP).
    const { user: admin } = await createAdmin({ email: 'admin.announcement@test.com' });
    adminTokenAnnouncement = authService.generateToken(admin._id, admin.role);

    const { user: teacherK } = await createTeacher({ email: 'teacherK.community@test.com' });
    const { user: teacherL } = await createTeacher({ email: 'teacherL.community@test.com' });
    teacherKToken = authService.generateToken(teacherK._id, teacherK.role);
    teacherLToken = authService.generateToken(teacherL._id, teacherL.role);
    teacherKId    = teacherK._id.toString();
    teacherLId    = teacherL._id.toString();

    const { user: studentK1 } = await createStudent({
      email:             'studentK1.community@test.com',
      assignedTeacherId: teacherK._id,
    });
    studentK1Token = authService.generateToken(studentK1._id, studentK1.role);
    studentK1Id    = studentK1._id.toString();

    const { user: studentL1 } = await createStudent({
      email:             'studentL1.community@test.com',
      assignedTeacherId: teacherL._id,
    });
    studentL1Token = authService.generateToken(studentL1._id, studentL1.role);
  });

  describe('POST /api/community/announcements', () => {
    test('sin token → 401 TOKEN_MISSING', async () => {
      const res = await request(app)
        .post('/api/community/announcements')
        .send({ content: 'Announcement sin token' });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('TOKEN_MISSING');
    });

    test('TEACHER crea announcement de su cohorte → 201, type ANNOUNCEMENT, scopeTeacherId = su propio id', async () => {
      const res = await request(app)
        .post('/api/community/announcements')
        .set(authHeader(teacherKToken))
        .send({ content: 'Aviso para mi cohorte' });

      expect(res.status).toBe(201);
      expect(res.body.post.type).toBe('ANNOUNCEMENT');
      expect(res.body.post.content).toBe('Aviso para mi cohorte');
      expect(res.body.post.scopeTeacherId).toBe(teacherKId);
    });

    test('ADMIN crea announcement global → 201, type ANNOUNCEMENT, scopeTeacherId = null', async () => {
      const res = await request(app)
        .post('/api/community/announcements')
        .set(authHeader(adminTokenAnnouncement))
        .send({ content: 'Aviso global de la academia' });

      expect(res.status).toBe(201);
      expect(res.body.post.type).toBe('ANNOUNCEMENT');
      expect(res.body.post.scopeTeacherId).toBeNull();
    });

    test('STUDENT → 403 INSUFFICIENT_ROLE', async () => {
      const res = await request(app)
        .post('/api/community/announcements')
        .set(authHeader(studentK1Token))
        .send({ content: 'Intento de announcement de student' });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('INSUFFICIENT_ROLE');
    });

    test('enviar type=POST en el body no cambia nada — se fuerza ANNOUNCEMENT', async () => {
      const res = await request(app)
        .post('/api/community/announcements')
        .set(authHeader(teacherKToken))
        .send({ content: 'Intento de manipular el type', type: 'POST' });

      expect(res.status).toBe(201);
      expect(res.body.post.type).toBe('ANNOUNCEMENT');
    });

    test('enviar scopeTeacherId en el body no lo sobreescribe — TEACHER sigue resolviendo su propia cohorte', async () => {
      const res = await request(app)
        .post('/api/community/announcements')
        .set(authHeader(teacherKToken))
        .send({ content: 'Intento de manipular scopeTeacherId', scopeTeacherId: teacherLId });

      expect(res.status).toBe(201);
      expect(res.body.post.scopeTeacherId).toBe(teacherKId);
    });

    test('content vacío → 400 VALIDATION_ERROR', async () => {
      const res = await request(app)
        .post('/api/community/announcements')
        .set(authHeader(teacherKToken))
        .send({ content: '' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });

    test('content > 2000 caracteres → 400 VALIDATION_ERROR', async () => {
      const res = await request(app)
        .post('/api/community/announcements')
        .set(authHeader(teacherKToken))
        .send({ content: 'a'.repeat(2001) });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });
  });

  describe('Visibilidad de ANNOUNCEMENT en GET /api/community/feed', () => {
    let cohortAnnouncementId;
    let globalAnnouncementId;

    beforeAll(async () => {
      const cohortRes = await request(app)
        .post('/api/community/announcements')
        .set(authHeader(teacherKToken))
        .send({ content: 'Aviso de cohorte K — visibilidad' });
      cohortAnnouncementId = cohortRes.body.post._id;

      const globalRes = await request(app)
        .post('/api/community/announcements')
        .set(authHeader(adminTokenAnnouncement))
        .send({ content: 'Aviso global — visibilidad' });
      globalAnnouncementId = globalRes.body.post._id;
    });

    test('student de la cohorte K ve el announcement de teacherK', async () => {
      const res = await request(app)
        .get('/api/community/feed')
        .set(authHeader(studentK1Token));

      const ids = res.body.docs.map((d) => d.id);
      expect(ids).toContain(cohortAnnouncementId);
    });

    test('student de otra cohorte (L) no ve el announcement de teacherK', async () => {
      const res = await request(app)
        .get('/api/community/feed')
        .set(authHeader(studentL1Token));

      const ids = res.body.docs.map((d) => d.id);
      expect(ids).not.toContain(cohortAnnouncementId);
    });

    test('teacherK (propietario) ve su propio announcement', async () => {
      const res = await request(app)
        .get('/api/community/feed')
        .set(authHeader(teacherKToken));

      const ids = res.body.docs.map((d) => d.id);
      expect(ids).toContain(cohortAnnouncementId);
    });

    test('otro teacher (L) no ve el announcement de teacherK', async () => {
      const res = await request(app)
        .get('/api/community/feed')
        .set(authHeader(teacherLToken));

      const ids = res.body.docs.map((d) => d.id);
      expect(ids).not.toContain(cohortAnnouncementId);
    });

    test('ADMIN ve el announcement de teacherK', async () => {
      const res = await request(app)
        .get('/api/community/feed')
        .set(authHeader(adminTokenAnnouncement));

      const ids = res.body.docs.map((d) => d.id);
      expect(ids).toContain(cohortAnnouncementId);
    });

    test('el announcement global de ADMIN lo ven STUDENT, TEACHER y ADMIN de cualquier cohorte', async () => {
      const tokens = [studentK1Token, studentL1Token, teacherKToken, teacherLToken, adminTokenAnnouncement];

      for (const token of tokens) {
        const res = await request(app)
          .get('/api/community/feed')
          .set(authHeader(token));

        const ids = res.body.docs.map((d) => d.id);
        expect(ids).toContain(globalAnnouncementId);
      }
    });

    test('el feed devuelve type ANNOUNCEMENT para estos items (no POST)', async () => {
      const res = await request(app)
        .get('/api/community/feed')
        .set(authHeader(adminTokenAnnouncement));

      const cohortItem = res.body.docs.find((d) => d.id === cohortAnnouncementId);
      const globalItem = res.body.docs.find((d) => d.id === globalAnnouncementId);

      expect(cohortItem.type).toBe('ANNOUNCEMENT');
      expect(globalItem.type).toBe('ANNOUNCEMENT');
      expect(cohortItem.author._id).toBe(teacherKId);
      expect(typeof cohortItem.context.content).toBe('string');
    });

    test('orden cronológico descendente se mantiene con ANNOUNCEMENT mezclado con otros tipos', async () => {
      const res = await request(app)
        .get('/api/community/feed')
        .set(authHeader(adminTokenAnnouncement));

      const dates = res.body.docs.map((d) => new Date(d.eventDate).getTime());
      const sorted = [...dates].sort((a, b) => b - a);
      expect(dates).toEqual(sorted);
    });
  });

  describe('DELETE de ANNOUNCEMENT — reutiliza moderación existente', () => {
    test('TEACHER elimina su propio announcement de cohorte → 204', async () => {
      const createRes = await request(app)
        .post('/api/community/announcements')
        .set(authHeader(teacherKToken))
        .send({ content: 'Announcement de cohorte a borrar por su autor' });
      const postId = createRes.body.post._id;

      const res = await request(app)
        .delete(`/api/community/posts/${postId}`)
        .set(authHeader(teacherKToken));

      expect(res.status).toBe(204);
      const post = await CommunityPost.findById(postId);
      expect(post.isDeleted).toBe(true);
    });

    test('otro TEACHER no puede eliminar el announcement de teacherK → 403 POST_DELETE_FORBIDDEN', async () => {
      const createRes = await request(app)
        .post('/api/community/announcements')
        .set(authHeader(teacherKToken))
        .send({ content: 'Announcement de cohorte que teacherL no puede borrar' });
      const postId = createRes.body.post._id;

      const res = await request(app)
        .delete(`/api/community/posts/${postId}`)
        .set(authHeader(teacherLToken));

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('POST_DELETE_FORBIDDEN');
    });

    test('ADMIN puede eliminar cualquier announcement (de cohorte o global)', async () => {
      const cohortRes = await request(app)
        .post('/api/community/announcements')
        .set(authHeader(teacherKToken))
        .send({ content: 'Announcement de cohorte que ADMIN puede borrar' });

      const globalRes = await request(app)
        .post('/api/community/announcements')
        .set(authHeader(adminTokenAnnouncement))
        .send({ content: 'Announcement global que ADMIN puede borrar' });

      const cohortDelete = await request(app)
        .delete(`/api/community/posts/${cohortRes.body.post._id}`)
        .set(authHeader(adminTokenAnnouncement));
      const globalDelete = await request(app)
        .delete(`/api/community/posts/${globalRes.body.post._id}`)
        .set(authHeader(adminTokenAnnouncement));

      expect(cohortDelete.status).toBe(204);
      expect(globalDelete.status).toBe(204);
    });

    test('announcement eliminado desaparece del feed', async () => {
      const createRes = await request(app)
        .post('/api/community/announcements')
        .set(authHeader(teacherKToken))
        .send({ content: 'Announcement que debe desaparecer del feed' });
      const postId = createRes.body.post._id;

      await request(app)
        .delete(`/api/community/posts/${postId}`)
        .set(authHeader(teacherKToken));

      const res = await request(app)
        .get('/api/community/feed')
        .set(authHeader(teacherKToken));

      const ids = res.body.docs.map((d) => d.id);
      expect(ids).not.toContain(postId);
    });
  });
});

'use strict';

// Diferencia respecto al contrato esperado:
// No existe GET /api/dashboard.
// El contrato define rutas separadas por rol:
//   GET /api/dashboard/student                     → verifyToken + requireRole(STUDENT)
//   GET /api/dashboard/teacher                     → verifyToken + requireRole(TEACHER)
//   GET /api/dashboard/teacher/students/:studentId → verifyToken + requireRole(TEACHER) + scope de cohorte
//   GET /api/dashboard/admin                       → verifyToken + requireRole(ADMIN)
//   GET /api/dashboard/admin/students/:studentId   → verifyToken + requireRole(ADMIN), sin restricción de scope
//
// Se testea /student como ruta representativa para los casos "autenticado" y "sin token".
// Las rutas .../students/:studentId comparten el mismo Service
// (getStudentAcademicDetail) — se testean ambas para demostrar que el scope
// se resuelve correctamente según el rol del actor en cada una.

const request = require('supertest');
const app     = require('../src/app');

const { connectDatabase, disconnectDatabase }                    = require('./setup/db');
const { createStudent, createTeacher, createAdmin }              = require('./setup/user.factory');
const { getToken, authHeader }                                   = require('./setup/auth');

// ── Estado compartido ─────────────────────────────────────────────────────────

let studentToken;

let adminToken;
let teacherToken;
let otherTeacherToken;
let studentToken2; // alumno propio del teacher, actor STUDENT probando su propia ficha vía la ruta de admin/teacher (debe fallar: ruta no es studentOnly)
let ownStudentId;
let otherCohortStudentId;

// ── Ciclo de vida ─────────────────────────────────────────────────────────────

beforeAll(async () => {
  await connectDatabase();

  const { user: student, password: studentPass } = await createStudent();
  studentToken = await getToken(student.email, studentPass);

  const { user: admin,       password: adminPass }       = await createAdmin();
  const { user: teacher,     password: teacherPass }     = await createTeacher();
  const { user: otherTeacher, password: otherTeacherPass } = await createTeacher({
    email: 'other.teacher.dash@test.com',
  });

  adminToken        = await getToken(admin.email, adminPass);
  teacherToken       = await getToken(teacher.email, teacherPass);
  otherTeacherToken  = await getToken(otherTeacher.email, otherTeacherPass);

  const { user: ownStudent, password: ownStudentPass } = await createStudent({
    email:             'own.student.dash@test.com',
    assignedTeacherId: teacher._id,
  });
  ownStudentId  = ownStudent._id.toString();
  studentToken2 = await getToken(ownStudent.email, ownStudentPass);

  const { user: otherCohortStudent } = await createStudent({
    email:             'other.cohort.student.dash@test.com',
    assignedTeacherId: otherTeacher._id,
  });
  otherCohortStudentId = otherCohortStudent._id.toString();
});

afterAll(async () => {
  await disconnectDatabase();
});

// ── GET /api/dashboard/student ────────────────────────────────────────────────

describe('GET /api/dashboard/student', () => {
  test('STUDENT autenticado → 200 con datos del dashboard', async () => {
    const res = await request(app)
      .get('/api/dashboard/student')
      .set(authHeader(studentToken));

    expect(res.status).toBe(200);
  });

  test('sin token → 401 TOKEN_MISSING', async () => {
    const res = await request(app)
      .get('/api/dashboard/student');

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('TOKEN_MISSING');
  });
});

// ── GET /api/dashboard/teacher/students/:studentId ──────────────────────────
// Detalle académico unificado (getStudentAcademicDetail), scope: cohorte.

describe('GET /api/dashboard/teacher/students/:studentId', () => {
  test('TEACHER → 200 consultando un alumno de su propia cohorte', async () => {
    const res = await request(app)
      .get(`/api/dashboard/teacher/students/${ownStudentId}`)
      .set(authHeader(teacherToken));

    expect(res.status).toBe(200);
    expect(res.body.profile).toBeDefined();
    expect(res.body.summary).toBeDefined();
  });

  test('TEACHER → 403 consultando un alumno de OTRO teacher', async () => {
    const res = await request(app)
      .get(`/api/dashboard/teacher/students/${otherCohortStudentId}`)
      .set(authHeader(teacherToken));

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('STUDENT_NOT_IN_COHORT');
  });

  test('ADMIN → 403 INSUFFICIENT_ROLE (ruta exclusiva de teacher)', async () => {
    const res = await request(app)
      .get(`/api/dashboard/teacher/students/${ownStudentId}`)
      .set(authHeader(adminToken));

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('INSUFFICIENT_ROLE');
  });

  test('STUDENT → 403 INSUFFICIENT_ROLE', async () => {
    const res = await request(app)
      .get(`/api/dashboard/teacher/students/${ownStudentId}`)
      .set(authHeader(studentToken2));

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('INSUFFICIENT_ROLE');
  });

  test('sin token → 401 TOKEN_MISSING', async () => {
    const res = await request(app)
      .get(`/api/dashboard/teacher/students/${ownStudentId}`);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('TOKEN_MISSING');
  });
});

// ── GET /api/dashboard/admin/students/:studentId ────────────────────────────
// Mismo Service que la ruta de teacher — aquí sin restricción de scope.

describe('GET /api/dashboard/admin/students/:studentId', () => {
  test('ADMIN → 200 consultando cualquier alumno', async () => {
    const res = await request(app)
      .get(`/api/dashboard/admin/students/${otherCohortStudentId}`)
      .set(authHeader(adminToken));

    expect(res.status).toBe(200);
    expect(res.body.profile).toBeDefined();
    expect(res.body.summary).toBeDefined();
  });

  test('ADMIN → 200 consultando un alumno asignado a cualquier teacher', async () => {
    const res = await request(app)
      .get(`/api/dashboard/admin/students/${ownStudentId}`)
      .set(authHeader(adminToken));

    expect(res.status).toBe(200);
  });

  test('TEACHER → 403 INSUFFICIENT_ROLE (ruta exclusiva de admin)', async () => {
    const res = await request(app)
      .get(`/api/dashboard/admin/students/${ownStudentId}`)
      .set(authHeader(teacherToken));

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('INSUFFICIENT_ROLE');
  });

  test('STUDENT → 403 INSUFFICIENT_ROLE', async () => {
    const res = await request(app)
      .get(`/api/dashboard/admin/students/${ownStudentId}`)
      .set(authHeader(studentToken2));

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('INSUFFICIENT_ROLE');
  });

  test('ADMIN → 404 STUDENT_NOT_FOUND si el id no es un student', async () => {
    const res = await request(app)
      .get(`/api/dashboard/admin/students/${(await createTeacher({ email: 'not-a-student@test.com' })).user._id}`)
      .set(authHeader(adminToken));

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('STUDENT_NOT_FOUND');
  });

  test('sin token → 401 TOKEN_MISSING', async () => {
    const res = await request(app)
      .get(`/api/dashboard/admin/students/${ownStudentId}`);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('TOKEN_MISSING');
  });
});

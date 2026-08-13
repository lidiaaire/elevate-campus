'use strict';

// Contrato real: GET /api/achievements/me → verifyToken, sin restricción de rol.
// Respuesta: { achievements: Array }
//
// GET /api/achievements/students/:studentId → verifyToken + requireRole(ADMIN, TEACHER).
// Admin sin restricción; teacher solo alumnos de su cohorte (validateTeacherScope).
// Ambas rutas comparten el mismo Service (getStudentAchievements) — /me es el
// caso "acceso a uno mismo" de ese mismo método, no una implementación aparte.

const request = require('supertest');
const app     = require('../src/app');

const { connectDatabase, disconnectDatabase }        = require('./setup/db');
const { createStudent, createTeacher, createAdmin }  = require('./setup/user.factory');
const { getToken, authHeader }                       = require('./setup/auth');

// ── Estado compartido ─────────────────────────────────────────────────────────

let studentToken;

let adminToken;
let teacherToken;
let ownStudentId;
let otherCohortStudentId;

// ── Ciclo de vida ─────────────────────────────────────────────────────────────

beforeAll(async () => {
  await connectDatabase();

  const { user: student, password: studentPass } = await createStudent();
  studentToken = await getToken(student.email, studentPass);

  const { user: admin,       password: adminPass }       = await createAdmin();
  const { user: teacher,     password: teacherPass }     = await createTeacher();
  const { user: otherTeacher } = await createTeacher({ email: 'other.teacher.ach@test.com' });

  adminToken   = await getToken(admin.email, adminPass);
  teacherToken = await getToken(teacher.email, teacherPass);

  const { user: ownStudent } = await createStudent({
    email:             'own.student.ach@test.com',
    assignedTeacherId: teacher._id,
  });
  ownStudentId = ownStudent._id.toString();

  const { user: otherCohortStudent } = await createStudent({
    email:             'other.cohort.student.ach@test.com',
    assignedTeacherId: otherTeacher._id,
  });
  otherCohortStudentId = otherCohortStudent._id.toString();
});

afterAll(async () => {
  await disconnectDatabase();
});

// ── GET /api/achievements/me ──────────────────────────────────────────────────

describe('GET /api/achievements/me', () => {
  test('usuario autenticado → 200 con array de logros', async () => {
    const res = await request(app)
      .get('/api/achievements/me')
      .set(authHeader(studentToken));

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.achievements)).toBe(true);
  });

  test('TEACHER autenticado → 200 con array de logros propio (sigue funcionando tras el refactor)', async () => {
    const res = await request(app)
      .get('/api/achievements/me')
      .set(authHeader(teacherToken));

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.achievements)).toBe(true);
  });

  test('sin token → 401 TOKEN_MISSING', async () => {
    const res = await request(app)
      .get('/api/achievements/me');

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('TOKEN_MISSING');
  });
});

// ── GET /api/achievements/students/:studentId ─────────────────────────────────

describe('GET /api/achievements/students/:studentId', () => {
  test('ADMIN → 200 consultando cualquier alumno', async () => {
    const res = await request(app)
      .get(`/api/achievements/students/${otherCohortStudentId}`)
      .set(authHeader(adminToken));

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.achievements)).toBe(true);
  });

  test('TEACHER → 200 consultando un alumno de su propia cohorte', async () => {
    const res = await request(app)
      .get(`/api/achievements/students/${ownStudentId}`)
      .set(authHeader(teacherToken));

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.achievements)).toBe(true);
  });

  test('TEACHER → 403 consultando un alumno de OTRO teacher', async () => {
    const res = await request(app)
      .get(`/api/achievements/students/${otherCohortStudentId}`)
      .set(authHeader(teacherToken));

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('STUDENT_NOT_IN_COHORT');
  });

  test('STUDENT → 403 INSUFFICIENT_ROLE', async () => {
    const res = await request(app)
      .get(`/api/achievements/students/${ownStudentId}`)
      .set(authHeader(studentToken));

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('INSUFFICIENT_ROLE');
  });

  test('sin token → 401 TOKEN_MISSING', async () => {
    const res = await request(app)
      .get(`/api/achievements/students/${ownStudentId}`);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('TOKEN_MISSING');
  });
});

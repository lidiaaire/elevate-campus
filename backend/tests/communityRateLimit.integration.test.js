'use strict';

// Contrato: communityWriteLimiter (rateLimiter.js) protege ÚNICAMENTE las
// tres rutas de creación de Community —
//   POST /api/community/posts
//   POST /api/community/posts/:postId/comments
//   POST /api/community/announcements
// — con UNA sola instancia compartida (100 requests/15min por IP, tras
// verifyToken). GET y DELETE no llevan limiter.
//
// Fichero de tests AISLADO (proceso/registro de módulos propio de Jest,
// distinto del de community.integration.test.js) a propósito: ese otro
// fichero ya hace muchas peticiones de escritura legítimas dentro del
// límite de producción (max: 100), y exhortar aquí ese mismo límite
// compartido contaminaría su cupo si compartieran proceso. Al vivir en un
// fichero distinto, este limiter de producción arranca con su propio
// contador en memoria, sin interferencia entre ambos.

const express = require('express');
const request = require('supertest');
const app     = require('../src/app');

const { connectDatabase, disconnectDatabase } = require('./setup/db');
const { createStudent, createTeacher }        = require('./setup/user.factory');
const { authHeader }                          = require('./setup/auth');
const authService = require('../src/modules/auth/auth.service');
const { createCommunityWriteLimiter } = require('../src/middlewares/rateLimiter');

// Tokens generados directamente (sin pasar por POST /auth/login) — evita
// depender del loginLimiter real, igual que el resto de describe de
// community.integration.test.js que crean tokens tras el primer login.
let studentToken;
let teacherToken;

beforeAll(async () => {
  await connectDatabase();

  const { user: student } = await createStudent({ email: 'ratelimit.student@test.com' });
  const { user: teacher } = await createTeacher({ email: 'ratelimit.teacher@test.com' });

  studentToken = authService.generateToken(student._id, student.role);
  teacherToken = authService.generateToken(teacher._id, teacher.role);
});

afterAll(async () => {
  await disconnectDatabase();
});

describe('communityWriteLimiter — conectado a las rutas de creación', () => {
  test('POST /api/community/posts lleva el limiter montado (cabecera RateLimit-Limit)', async () => {
    const res = await request(app)
      .post('/api/community/posts')
      .set(authHeader(studentToken))
      .send({ content: 'Post para comprobar el limiter' });

    expect(res.status).toBe(201);
    expect(res.headers['ratelimit-limit']).toBe('100');
  });

  test('POST /api/community/posts/:postId/comments lleva el limiter montado', async () => {
    const postRes = await request(app)
      .post('/api/community/posts')
      .set(authHeader(studentToken))
      .send({ content: 'Post padre para comentar (limiter)' });
    const postId = postRes.body.post._id;

    const res = await request(app)
      .post(`/api/community/posts/${postId}/comments`)
      .set(authHeader(studentToken))
      .send({ content: 'Comentario para comprobar el limiter' });

    expect(res.status).toBe(201);
    expect(res.headers['ratelimit-limit']).toBe('100');
  });

  test('POST /api/community/announcements lleva el limiter montado', async () => {
    const res = await request(app)
      .post('/api/community/announcements')
      .set(authHeader(teacherToken))
      .send({ content: 'Announcement para comprobar el limiter' });

    expect(res.status).toBe(201);
    expect(res.headers['ratelimit-limit']).toBe('100');
  });

  test('GET /api/community/feed NO lleva el limiter', async () => {
    const res = await request(app)
      .get('/api/community/feed')
      .set(authHeader(studentToken));

    expect(res.status).toBe(200);
    expect(res.headers['ratelimit-limit']).toBeUndefined();
  });

  test('GET /api/community/posts/:postId/comments NO lleva el limiter', async () => {
    const postRes = await request(app)
      .post('/api/community/posts')
      .set(authHeader(studentToken))
      .send({ content: 'Post padre para GET comments (limiter)' });
    const postId = postRes.body.post._id;

    const res = await request(app)
      .get(`/api/community/posts/${postId}/comments`)
      .set(authHeader(studentToken));

    expect(res.status).toBe(200);
    expect(res.headers['ratelimit-limit']).toBeUndefined();
  });

  test('DELETE /api/community/posts/:postId NO lleva el limiter', async () => {
    const postRes = await request(app)
      .post('/api/community/posts')
      .set(authHeader(studentToken))
      .send({ content: 'Post para borrar (limiter)' });
    const postId = postRes.body.post._id;

    const res = await request(app)
      .delete(`/api/community/posts/${postId}`)
      .set(authHeader(studentToken));

    expect(res.status).toBe(204);
    expect(res.headers['ratelimit-limit']).toBeUndefined();
  });
});

// La instancia de producción (communityWriteLimiter) usa max: 100 — probar
// el 429 exhortándola de verdad exigiría cientos de requests reales, algo
// que el propio encargo pide evitar. En su lugar se prueba la MISMA
// configuración (createCommunityWriteLimiter: mismo handler, mismo mensaje,
// misma ventana) con un `max` bajo, montada en una app Express mínima
// aislada — verifica el comportamiento real del middleware sin volumen
// artificial ni tocar el estado del limiter de producción.
describe('communityWriteLimiter — 429 al superar el límite', () => {
  const buildTestApp = (max) => {
    const testApp = express();
    testApp.use(express.json());
    testApp.post('/write', createCommunityWriteLimiter({ max }), (req, res) => {
      res.status(201).json({ ok: true });
    });
    return testApp;
  };

  test('las peticiones dentro del límite responden con normalidad', async () => {
    const testApp = buildTestApp(3);

    for (let i = 0; i < 3; i += 1) {
      const res = await request(testApp).post('/write').send({});
      expect(res.status).toBe(201);
    }
  });

  test('superar el límite devuelve 429 con { error: TOO_MANY_REQUESTS, message }', async () => {
    const testApp = buildTestApp(3);

    for (let i = 0; i < 3; i += 1) {
      await request(testApp).post('/write').send({});
    }

    const res = await request(testApp).post('/write').send({});

    expect(res.status).toBe(429);
    expect(res.body.error).toBe('TOO_MANY_REQUESTS');
    expect(typeof res.body.message).toBe('string');
    expect(res.body.message.length).toBeGreaterThan(0);
    // Mensaje propio de Community — no el de login reutilizado literalmente.
    expect(res.body.message).not.toBe('Demasiados intentos. Inténtalo en 15 minutos.');
  });
});

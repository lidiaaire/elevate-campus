'use strict';

// Regresión Sprint 0: usa exclusivamente MongoMemoryServer. Los PDFs generados
// por estos fixtures se identifican en esa BD temporal y se limpian al terminar.
const fs = require('fs');
const path = require('path');
const request = require('supertest');
const app = require('../src/app');
const { connectDatabase, disconnectDatabase } = require('./setup/db');
const { createStudent, createTeacher, createAdmin } = require('./setup/user.factory');
const { getToken, authHeader } = require('./setup/auth');
const Course = require('../src/models/course.model');
const Unit = require('../src/models/unit.model');
const Lesson = require('../src/models/lesson.model');
const Enrollment = require('../src/models/enrollment.model');
const LessonProgress = require('../src/models/lessonProgress.model');
const Assessment = require('../src/models/assessment.model');
const AssessmentAttempt = require('../src/models/assessmentAttempt.model');
const Certificate = require('../src/models/certificate.model');
const Achievement = require('../src/models/achievement.model');
const UserAchievement = require('../src/models/userAchievement.model');
const User = require('../src/models/user.model');
const Notification = require('../src/models/notification.model');

let student;
let studentToken;
let otherStudentToken;
let adminToken;
let teacherToken;
let courseNumber = 0;

beforeAll(async () => {
  await connectDatabase();
  const teacherAccount = await createTeacher();
  const studentAccount = await createStudent({ assignedTeacherId: teacherAccount.user._id });
  const otherAccount = await createStudent({ email: 'other-completion@test.com' });
  const adminAccount = await createAdmin();
  student = studentAccount.user;
  [studentToken, otherStudentToken, adminToken, teacherToken] = await Promise.all(
    [studentAccount, otherAccount, adminAccount, teacherAccount].map(({ user, password }) => getToken(user.email, password)),
  );
  await Achievement.create({
    slug: 'first_course_completed', name: 'Primer curso completado',
    description: 'Completa un curso', icon: 'award', category: 'COURSE', points: 10,
  });
});

afterAll(async () => {
  // Solo archivos de certificados pertenecientes a la BD desechable de esta suite.
  const certificates = await Certificate.find({});
  for (const certificate of certificates) {
    if (!certificate.pdfUrl) continue;
    const file = path.resolve(__dirname, '../../uploads/certificates', `${certificate.certificateNumber}.pdf`);
    if (fs.existsSync(file)) fs.unlinkSync(file);
  }
  await disconnectDatabase();
});

async function makeCourse({ assessments = [true, true], sequentialUnlock = true, maxAttempts = 3 } = {}) {
  const course = await Course.create({
    title: `Sprint 0 course ${++courseNumber}`, description: 'Curso aislado para regresiones académicas.',
    level: 'A1', status: 'published',
  });
  const units = [];
  const lessons = [];
  for (let index = 0; index < assessments.length; index += 1) {
    const unit = await Unit.create({ courseId: course._id, title: `Unidad ${index + 1}`, order: index + 1, sequentialUnlock });
    const lesson = await Lesson.create({
      courseId: course._id, unitId: unit._id, title: `Lección ${index + 1}`,
      type: 'text', content: 'Contenido de repaso.', order: 1,
    });
    if (assessments[index]) {
      await Assessment.create({
        courseId: course._id, unitId: unit._id, title: `Evaluación ${index + 1}`, maxAttempts,
        questions: [{ text: 'Choose the correct answer', options: ['Correct', 'Incorrect'], correctIndex: 0 }],
      });
    }
    units.push(unit);
    lessons.push(lesson);
  }
  const response = await request(app).post('/api/enrollments').set(authHeader(adminToken))
    .send({ studentId: student._id.toString(), courseId: course._id.toString() });
  expect(response.status).toBe(201);
  const enrollment = await Enrollment.findOne({ studentId: student._id, courseId: course._id });
  return { course, units, lessons, enrollment };
}

const unitUrl = (fixture, index) => `/api/courses/${fixture.course._id}/units/${fixture.units[index]._id}`;
const complete = (fixture, index, token = studentToken) => request(app)
  .patch(`/api/progress/lessons/${fixture.lessons[index]._id}/complete`).set(authHeader(token));
const submit = (fixture, index, answer = 0, token = studentToken) => request(app)
  .post(`${unitUrl(fixture, index)}/assessment/attempts`).set(authHeader(token)).send({ answers: [answer] });

async function expectState(fixture, status, certificateCount) {
  expect((await Enrollment.findById(fixture.enrollment._id)).status).toBe(status);
  expect(await Certificate.countDocuments({ student: student._id, course: fixture.course._id })).toBe(certificateCount);
}

test('última lección → evaluación fallida → aprobada → certificado → repaso sin nuevas escrituras', async () => {
  const fixture = await makeCourse();
  const beforePoints = (await User.findById(student._id)).achievementPoints;
  expect((await complete(fixture, 0)).status).toBe(200);
  expect((await submit(fixture, 0)).status).toBe(201);
  await expectState(fixture, 'active', 0);

  const lastLesson = await complete(fixture, 1);
  expect(lastLesson.status).toBe(200);
  expect(lastLesson.body.courseSnapshot.overallProgress).toBe(100);
  await expectState(fixture, 'active', 0);
  expect(await UserAchievement.countDocuments({ user: student._id })).toBe(0);

  const assessmentUrl = `${unitUrl(fixture, 1)}/assessment`;
  const assessmentRead = await request(app).get(assessmentUrl).set(authHeader(studentToken));
  expect(assessmentRead.status).toBe(200);
  expect(assessmentRead.body.assessment.questions[0].correctIndex).toBeUndefined();

  const failed = await submit(fixture, 1, 1);
  expect(failed.status).toBe(201);
  expect(failed.body.attempt.passed).toBe(false);
  await expectState(fixture, 'active', 0);

  const passed = await submit(fixture, 1);
  expect(passed.status).toBe(201);
  expect(passed.body.attempt.passed).toBe(true);
  await expectState(fixture, 'completed', 1);
  expect((await User.findById(student._id)).achievementPoints).toBe(beforePoints + 10);
  expect(await UserAchievement.countDocuments({ user: student._id })).toBe(1);

  const progressBefore = await LessonProgress.find({ enrollmentId: fixture.enrollment._id }).lean();
  const attemptsBefore = await AssessmentAttempt.countDocuments({ studentId: student._id });
  const notificationsBefore = await Notification.countDocuments({ user: student._id });
  for (const url of [
    `/api/courses/${fixture.course._id}`,
    `/api/courses/${fixture.course._id}/units`,
    unitUrl(fixture, 1),
    `${unitUrl(fixture, 1)}/lessons`,
    `${unitUrl(fixture, 1)}/lessons/${fixture.lessons[1]._id}`,
    assessmentUrl,
    `${assessmentUrl}/attempts`,
  ]) {
    const response = await request(app).get(url).set(authHeader(studentToken));
    expect({ url, status: response.status }).toEqual({ url, status: 200 });
    expect(JSON.stringify(response.body)).not.toContain('correctIndex');
  }
  const history = await request(app).get(`${assessmentUrl}/attempts`).set(authHeader(studentToken));
  expect(history.body.attempts).toHaveLength(2);
  expect((await submit(fixture, 1)).status).toBe(403);
  const repeat = await complete(fixture, 1);
  expect(repeat.status).toBe(200);
  expect(repeat.body.alreadyCompleted).toBe(true);
  expect(await LessonProgress.find({ enrollmentId: fixture.enrollment._id }).lean()).toEqual(progressBefore);
  expect(await AssessmentAttempt.countDocuments({ studentId: student._id })).toBe(attemptsBefore);
  expect(await Notification.countDocuments({ user: student._id })).toBe(notificationsBefore);
  await expectState(fixture, 'completed', 1);

  // Usa exactamente el identificador del listado que consume CertificateCard.
  const listing = await request(app).get('/api/certificates/me').set(authHeader(studentToken));
  const certificate = listing.body.certificates.find((c) => c.course._id === fixture.course._id.toString());
  expect(certificate._id).toMatch(/^[a-f\d]{24}$/i);
  const downloadUrl = `/api/certificates/${certificate._id}/download`;
  const download = await request(app).get(downloadUrl).set(authHeader(studentToken));
  expect(download.status).toBe(200);
  expect(download.headers['content-type']).toMatch(/application\/pdf/);
  expect(download.headers['content-disposition']).toContain(certificate.certificateNumber);
  expect(download.body.subarray(0, 5).toString()).toBe('%PDF-');
  expect((await request(app).get(downloadUrl)).status).toBe(401);
  for (const token of [otherStudentToken, teacherToken, adminToken]) {
    const response = await request(app).get(downloadUrl).set(authHeader(token));
    expect(response.status).toBe(403);
    expect(response.body.error).toBe('CERTIFICATE_FORBIDDEN');
  }
});

test('sin evaluaciones, la última lección sigue completando el curso', async () => {
  const fixture = await makeCourse({ assessments: [false] });
  expect((await complete(fixture, 0)).status).toBe(200);
  await expectState(fixture, 'completed', 1);
});

test('aprobar una evaluación intermedia no completa el curso: faltan lecciones', async () => {
  const fixture = await makeCourse({ assessments: [true, false] });
  expect((await complete(fixture, 0)).status).toBe(200);
  expect((await submit(fixture, 0)).status).toBe(201);
  await expectState(fixture, 'active', 0);
  expect((await complete(fixture, 1)).status).toBe(200);
  await expectState(fixture, 'completed', 1);
});

test('aprobar la evaluación final no basta si queda otra unidad sin aprobar', async () => {
  const fixture = await makeCourse({ sequentialUnlock: false });
  expect((await complete(fixture, 0)).status).toBe(200);
  expect((await complete(fixture, 1)).status).toBe(200);
  expect((await submit(fixture, 1)).status).toBe(201);
  await expectState(fixture, 'active', 0);
  expect((await submit(fixture, 0)).status).toBe(201);
  await expectState(fixture, 'completed', 1);
});

test('no se permite evaluación antes de completar lecciones ni saltar unidades', async () => {
  const fixture = await makeCourse();
  const early = await submit(fixture, 0);
  expect(early.status).toBe(403);
  expect(early.body.error).toBe('LESSONS_INCOMPLETE');
  expect((await complete(fixture, 0)).status).toBe(200);
  const locked = await complete(fixture, 1);
  expect(locked.status).toBe(403);
  expect(locked.body.error).toBe('LESSON_LOCKED');
  await expectState(fixture, 'active', 0);
});

test('agotar intentos mantiene la matrícula activa y no emite certificado', async () => {
  const fixture = await makeCourse({ assessments: [true], maxAttempts: 1 });
  expect((await complete(fixture, 0)).status).toBe(200);
  expect((await submit(fixture, 0, 1)).status).toBe(201);
  const exhausted = await submit(fixture, 0);
  expect(exhausted.status).toBe(403);
  expect(exhausted.body.error).toBe('MAX_ATTEMPTS_REACHED');
  await expectState(fixture, 'active', 0);
});

test('lectura ampliada no da acceso a suspendidos o alumnos sin matrícula', async () => {
  const fixture = await makeCourse({ assessments: [true] });
  expect((await complete(fixture, 0)).status).toBe(200);
  const suspended = await request(app).patch(`/api/enrollments/${fixture.enrollment._id}/suspend`)
    .set(authHeader(adminToken));
  expect(suspended.status).toBe(200);
  for (const token of [studentToken, otherStudentToken]) {
    for (const suffix of ['/lessons', `/lessons/${fixture.lessons[0]._id}`, '/assessment', '/assessment/attempts']) {
      const response = await request(app).get(`${unitUrl(fixture, 0)}${suffix}`).set(authHeader(token));
      expect(response.status).toBe(403);
      expect(response.body.error).toBe('NOT_ENROLLED');
    }
    expect((await submit(fixture, 0, 0, token)).status).toBe(403);
  }
  await expectState(fixture, 'suspended', 0);
});

test('TEACHER y ADMIN conservan lectura, pero no pueden enviar intentos como STUDENT', async () => {
  const fixture = await makeCourse({ assessments: [true] });
  for (const token of [teacherToken, adminToken]) {
    expect((await request(app).get(`${unitUrl(fixture, 0)}/lessons/${fixture.lessons[0]._id}`)
      .set(authHeader(token))).status).toBe(200);
    const response = await submit(fixture, 0, 0, token);
    expect(response.status).toBe(403);
    expect(response.body.error).toBe('INSUFFICIENT_ROLE');
  }
  await expectState(fixture, 'active', 0);
});

test('la condición de finalización revisa evaluaciones más allá de la primera página', async () => {
  const fixture = await makeCourse({ assessments: Array(21).fill(true), sequentialUnlock: false });
  // Fixture de historial previo en la BD temporal; no usa seeds ni datos del campus.
  await LessonProgress.updateMany({ enrollmentId: fixture.enrollment._id }, { status: 'completed', completedAt: new Date() });
  const assessments = await Assessment.find({ courseId: fixture.course._id }).sort({ createdAt: -1 });
  const pending = assessments[20];
  for (const assessment of assessments.slice(0, 19)) {
    await AssessmentAttempt.create({
      assessmentId: assessment._id, studentId: student._id, attemptNumber: 1,
      answers: [{ questionId: assessment.questions[0]._id, selected: 0, isCorrect: true }], score: 100, passed: true,
    });
  }
  const index = fixture.units.findIndex((unit) => unit._id.equals(assessments[19].unitId));
  expect((await submit(fixture, index)).status).toBe(201);
  await expectState(fixture, 'active', 0);
  const pendingIndex = fixture.units.findIndex((unit) => unit._id.equals(pending.unitId));
  expect((await submit(fixture, pendingIndex)).status).toBe(201);
  await expectState(fixture, 'completed', 1);
});

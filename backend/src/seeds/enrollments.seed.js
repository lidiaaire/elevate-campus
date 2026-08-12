'use strict';

/**
 * seeds/enrollments.seed.js
 *
 * Responsabilidad: poblar matrículas, progreso de lecciones e intentos de
 * evaluación demo, de forma que dashboards/analytics (admin, teacher, student)
 * tengan datos reales y coherentes en lugar de aparecer vacíos.
 *
 * Principio: NUNCA se insertan documentos de progreso/intentos "a mano".
 * Toda la lógica de negocio pasa por los services oficiales
 * (ProgressService.initializeProgress/completeLesson, AssessmentService.submitAttempt),
 * que ya validan sequential unlock, calculan score/passed en servidor y disparan
 * achievements/certificados exactamente igual que en producción.
 *
 * La única razón para tocar el repository/colección directamente es backdatear
 * fechas para que el dataset demo sea creíble (matrículas y actividad repartidas
 * en semanas/meses recientes, en vez de "todo hoy"):
 *   - Enrollment.enrolledAt y AssessmentAttempt.submittedAt son `immutable: true`
 *     en el schema. Mongoose permite fijarlos en la CREACIÓN del documento
 *     (doc.isNew) pero descarta en silencio cualquier $set posterior sobre ellos
 *     en updates — por eso enrolledAt se pasa en el create() y submittedAt se
 *     corrige con una escritura nativa (bypass del cast de Mongoose) justo
 *     después del submitAttempt real.
 *   - LessonProgress.completedAt NO es immutable en el schema, así que ahí sí
 *     basta con un updateById normal después de completeLesson().
 *
 * Idempotencia: index.js vacía enrollments/lessonprogresses/assessmentattempts/
 * certificates/notifications/userachievements antes de llamar a este seed, así
 * que cada `npm run seed` parte de cero. Además cada helper de aquí comprueba
 * si el dato ya existe antes de crearlo, para que este módulo también se pueda
 * re-ejecutar de forma aislada sin duplicar ni fallar.
 */

const UserRepository               = require('../repositories/user.repository');
const CourseRepository             = require('../repositories/course.repository');
const UnitRepository               = require('../repositories/unit.repository');
const LessonRepository             = require('../repositories/lesson.repository');
const AssessmentRepository         = require('../repositories/assessment.repository');
const AssessmentAttemptRepository  = require('../repositories/assessmentAttempt.repository');
const EnrollmentRepository         = require('../repositories/enrollment.repository');
const LessonProgressRepository     = require('../repositories/lessonProgress.repository');

const ProgressService   = require('../modules/progress/progress.service');
const AssessmentService = require('../modules/assessments/assessment.service');

const { CEFR_LEVELS, COURSE_STATUS, ENROLLMENT_STATUS } = require('../config/constants');
const { daysAgo } = require('./helpers');

// ── Helpers de datos ──────────────────────────────────────────────────────

const getUser = (email) => UserRepository.findOne({ email });

const getCourseByLevel = (level) =>
  CourseRepository.findOne({ level, status: COURSE_STATUS.PUBLISHED });

// Cursor de fechas: reparte eventos (lecciones/assessments completados) entre
// hace `startDaysAgo` días y hace `endDaysAgo` días, en orden ascendente.
const makeDateCursor = (startDaysAgo, endDaysAgo) => {
  const span = Math.max(startDaysAgo - endDaysAgo, 1);
  const step = Math.max(1, Math.round(span / 12));
  let current = startDaysAgo;
  return () => {
    const date = daysAgo(Math.max(current, endDaysAgo));
    current = Math.max(current - step, endDaysAgo);
    return date;
  };
};

// ── Matrícula ──────────────────────────────────────────────────────────────

// Equivalente a EnrollmentService.createEnrollment, salvo que aquí controlamos
// enrolledAt (el service no lo expone). Reutiliza ProgressService.initializeProgress
// para crear el bloque de LessonProgress exactamente igual que en producción.
const enrollStudent = async (studentId, courseId, enrolledAt) => {
  const existing = await EnrollmentRepository.findOne({ studentId, courseId });
  if (existing) return existing;

  const enrollment = await EnrollmentRepository.create({
    studentId,
    courseId,
    status: ENROLLMENT_STATUS.ACTIVE,
    enrolledAt,
  });

  await ProgressService.initializeProgress(enrollment._id, courseId, studentId);
  return enrollment;
};

// ── Evaluaciones ───────────────────────────────────────────────────────────

const submitAndBackdate = async (studentId, courseId, unitId, answers, submittedAt) => {
  const attempt = await AssessmentService.submitAttempt(studentId, courseId, unitId, answers);
  // submittedAt es immutable → $set normal se ignora; se corrige con el driver nativo.
  await AssessmentAttemptRepository.model.collection.updateOne(
    { _id: attempt._id },
    { $set: { submittedAt } },
  );
  return attempt;
};

const passAssessment = async (studentId, courseId, unitId, submittedAt) => {
  const assessment = await AssessmentRepository.findByUnitId(unitId, true);
  if (!assessment) return null;

  const best = await AssessmentAttemptRepository.findBestScore(studentId, assessment._id);
  if (best?.passed) return best;

  const answers = assessment.questions.map((q) => q.correctIndex);
  return submitAndBackdate(studentId, courseId, unitId, answers, submittedAt);
};

// Intento fallido deliberado (variedad realista) antes del intento que aprueba.
const failThenPassAssessment = async (studentId, courseId, unitId, failDate, passDate) => {
  const assessment = await AssessmentRepository.findByUnitId(unitId, true);
  if (!assessment) return null;

  const attemptCount = await AssessmentAttemptRepository.countAttempts(studentId, assessment._id);
  if (attemptCount === 0) {
    const wrongAnswers = assessment.questions.map((q) => (q.correctIndex + 1) % q.options.length);
    await submitAndBackdate(studentId, courseId, unitId, wrongAnswers, failDate);
  }

  return passAssessment(studentId, courseId, unitId, passDate);
};

// ── Progreso de lecciones ───────────────────────────────────────────────────

// Avanza en orden curricular (unidad por unidad, lección por lección) hasta
// completar `targetCount` lecciones. Cada unidad que se termina por completo
// dispara automáticamente su assessment (si tiene) para no romper el
// sequential unlock de la siguiente unidad — igual que haría un alumno real.
const progressThroughCourse = async (
  studentId,
  courseId,
  targetCount,
  nextDate,
  { assessmentVariety = false, skipFinalAssessment = false } = {},
) => {
  const { docs: units } = await UnitRepository.findByCourseId(courseId);
  let completed = 0;
  let varietyUsed = false;

  for (let i = 0; i < units.length; i += 1) {
    const unit = units[i];
    if (completed >= targetCount) break;

    const { docs: lessons } = await LessonRepository.findByUnitId(unit._id);
    let unitFullyCompleted = lessons.length > 0;

    for (const lesson of lessons) {
      if (completed >= targetCount) {
        unitFullyCompleted = false;
        break;
      }

      await ProgressService.completeLesson(studentId, lesson._id);
      const progress = await LessonProgressRepository.findByStudentAndLesson(studentId, lesson._id);
      await LessonProgressRepository.updateById(progress._id, { completedAt: nextDate() });
      completed += 1;
    }

    // Completar el 100% del curso marca la matrícula como 'completed'
    // automáticamente (ProgressService.completeLesson) — y submitAttempt exige
    // matrícula 'active'. Por eso la última unidad, cuando el objetivo es
    // terminar el curso entero, se deja sin intentar (comportamiento real de
    // la plataforma, no un dato inconsistente del seed).
    const isLastUnit = i === units.length - 1;
    if (unitFullyCompleted && !(skipFinalAssessment && isLastUnit)) {
      if (assessmentVariety && !varietyUsed) {
        await failThenPassAssessment(studentId, courseId, unit._id, nextDate(), nextDate());
        varietyUsed = true;
      } else {
        await passAssessment(studentId, courseId, unit._id, nextDate());
      }
    }
  }

  return completed;
};

// Matricula + hace avanzar al student hasta el % objetivo del curso, con
// fechas repartidas entre startDaysAgo y endDaysAgo.
const buildStudentJourney = async (
  email,
  level,
  { enrolledDaysAgo, startDaysAgo, endDaysAgo, targetPercent, assessmentVariety = false },
) => {
  const student = await getUser(email);
  const course  = await getCourseByLevel(level);
  if (!student || !course) return;

  await enrollStudent(student._id, course._id, daysAgo(enrolledDaysAgo));

  const allLessons = await LessonRepository.findByCourseId(course._id);
  const targetCount = Math.max(1, Math.round((allLessons.length * targetPercent) / 100));

  const nextDate = makeDateCursor(startDaysAgo, endDaysAgo);
  await progressThroughCourse(student._id, course._id, targetCount, nextDate, {
    assessmentVariety,
    skipFinalAssessment: targetPercent === 100,
  });
};

// ── Dataset demo ─────────────────────────────────────────────────────────

module.exports = async () => {
  // Sarah Mitchell — student demo principal: A1 completado (100%, certificado
  // incluido vía ProgressService.completeLesson → certificateService.issueCertificate)
  // + A2 en curso con progreso intermedio y actividad reciente.
  await buildStudentJourney('sarah.mitchell@demo.com', CEFR_LEVELS.A1, {
    enrolledDaysAgo: 60,
    startDaysAgo:    58,
    endDaysAgo:      5,
    targetPercent:   100,
  });
  await buildStudentJourney('sarah.mitchell@demo.com', CEFR_LEVELS.A2, {
    enrolledDaysAgo: 18,
    startDaysAgo:    16,
    endDaysAgo:      1,
    targetPercent:   50,
  });

  // Carlos Rodríguez — A1 en curso ~50%, con un intento fallido antes del
  // aprobado en la primera evaluación de unidad que completa (variedad real).
  await buildStudentJourney('carlos.rodriguez@demo.com', CEFR_LEVELS.A1, {
    enrolledDaysAgo:   30,
    startDaysAgo:      28,
    endDaysAgo:        2,
    targetPercent:     50,
    assessmentVariety: true,
  });

  // Amara Diallo — A1 recién empezado, matrícula reciente.
  await buildStudentJourney('amara.diallo@demo.com', CEFR_LEVELS.A1, {
    enrolledDaysAgo: 4,
    startDaysAgo:    4,
    endDaysAgo:      1,
    targetPercent:   10,
  });

  // Nina Kowalski — caso real de "en riesgo": progreso bajo Y sin actividad
  // desde hace más de AT_RISK_DAYS (7) días — no es un flag artificial, se
  // deriva de que su última lección completada quedó fechada hace 12 días.
  await buildStudentJourney('nina.kowalski@demo.com', CEFR_LEVELS.A1, {
    enrolledDaysAgo: 40,
    startDaysAgo:    40,
    endDaysAgo:      12,
    targetPercent:   25,
  });

  // Cohorte de James (A2) — progreso variado, ninguno en riesgo real.
  await buildStudentJourney('maria.garcia@demo.com', CEFR_LEVELS.A2, {
    enrolledDaysAgo: 25,
    startDaysAgo:    23,
    endDaysAgo:      2,
    targetPercent:   70,
  });
  await buildStudentJourney('diego.herrera@demo.com', CEFR_LEVELS.A2, {
    enrolledDaysAgo: 20,
    startDaysAgo:    18,
    endDaysAgo:      5,
    targetPercent:   35,
  });
  // Valentina Cruz y Andrés López quedan sin matricular — EmptyState legítimo.

  // Cohorte de Sofía (B1) — progreso variado, ninguno en riesgo real.
  await buildStudentJourney('lucia.fernandez@demo.com', CEFR_LEVELS.B1, {
    enrolledDaysAgo: 35,
    startDaysAgo:    33,
    endDaysAgo:      1,
    targetPercent:   60,
  });
  await buildStudentJourney('miguel.sanchez@demo.com', CEFR_LEVELS.B1, {
    enrolledDaysAgo: 15,
    startDaysAgo:    13,
    endDaysAgo:      4,
    targetPercent:   20,
  });
  // Isabella Torres y Pablo Morales quedan sin matricular — EmptyState legítimo.
};

if (require.main === module) {
  require('../config/env');
  const { connectDB } = require('../config/database');
  const mongoose       = require('mongoose');
  connectDB()
    .then(() => module.exports())
    .then(() => mongoose.disconnect())
    .catch((err) => { console.error(err); process.exit(1); });
}

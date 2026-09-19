'use strict';

/**
 * utils/progressCalculator.js
 *
 * Responsabilidad: Calcular métricas de progreso a partir de documentos
 * LessonProgress. Utilidad pura sin dependencias externas ni acceso a BD.
 * El progreso NUNCA se almacena — siempre se calcula aquí.
 *
 * Expone:
 *   calcCourseProgress(lessonProgressDocs)
 *     → { overallProgress, completedLessons, totalLessons }
 *     overallProgress = floor((completedLessons / totalLessons) * 100)
 *
 *   calcUnitProgress(lessonProgressDocs, unitId)
 *     → { progress, completedLessons, totalLessons }
 *
 *   isUnitLocked(unitOrder, unitProgressMap, assessmentStatusMap)
 *     → boolean — unit[0] siempre false; unit[N] depende de unit[N-1]
 *
 *   isLessonLocked(lesson, lessonProgressMap, unit)
 *     → boolean — respeta sequentialUnlock de la unidad
 *
 *   getLastActivity(lessonProgressDocs)
 *     → Date | null — MAX(completedAt) entre los docs completados
 */

const { PROGRESS_STATUS } = require('../config/constants');

const calcCourseProgress = (docs) => {
  const totalLessons     = docs.length;
  const completedLessons = docs.filter((d) => d.status === PROGRESS_STATUS.COMPLETED).length;
  const overallProgress  = totalLessons === 0 ? 0 : Math.floor((completedLessons / totalLessons) * 100);
  return { overallProgress, completedLessons, totalLessons };
};

const calcUnitProgress = (docs, unitId) => {
  const unitDocs         = docs.filter((d) => d.unitId?.toString() === unitId?.toString());
  const totalLessons     = unitDocs.length;
  const completedLessons = unitDocs.filter((d) => d.status === PROGRESS_STATUS.COMPLETED).length;
  const progress         = totalLessons === 0 ? 0 : Math.floor((completedLessons / totalLessons) * 100);
  return { progress, completedLessons, totalLessons };
};

// progressMap: Map<lessonId_string, LessonProgress>
// lessonOrderMap: Map<lessonId_string, { order, unitId }> — necesario porque
// LessonProgress no almacena order/unitId. 'order' es un entero 1..N que se
// reinicia en cada unidad, así que la búsqueda de "la lección anterior" debe
// filtrar también por unitId — de lo contrario puede emparejar con una
// lección de OTRA unidad que casualmente tenga order = lesson.order - 1.
const isLessonLocked = (lesson, progressMap, unit, lessonOrderMap) => {
  if (!unit?.sequentialUnlock || lesson.order === 1) return false;
  const lessonUnitId = lesson.unitId.toString();
  const prevEntry = [...lessonOrderMap.entries()].find(
    ([, meta]) => meta.unitId === lessonUnitId && meta.order === lesson.order - 1
  );
  if (!prevEntry) return false;
  const prevProgress = progressMap.get(prevEntry[0]);
  return !prevProgress || prevProgress.status !== PROGRESS_STATUS.COMPLETED;
};

// docs: todos los LessonProgress del curso; units: array de Unit ordenados por order
// assessmentStatusMap: Map<unitId_string, boolean> — true si el assessment de esa unidad está passed
const isUnitLocked = (unit, units, docs, assessmentStatusMap = new Map()) => {
  if (!unit || unit.order === 1) return false;
  const prevUnit = units.find((u) => u.order === unit.order - 1);
  if (!prevUnit) return false;
  const { progress } = calcUnitProgress(docs, prevUnit._id);
  if (progress < 100) return true;
  const prevUnitId = prevUnit._id.toString();
  if (assessmentStatusMap.has(prevUnitId) && !assessmentStatusMap.get(prevUnitId)) return true;
  return false;
};

const getLastActivity = (docs) => {
  const completed = docs
    .filter((d) => d.status === PROGRESS_STATUS.COMPLETED && d.completedAt)
    .map((d) => new Date(d.completedAt));
  return completed.length === 0 ? null : new Date(Math.max(...completed));
};

module.exports = { calcCourseProgress, calcUnitProgress, isUnitLocked, isLessonLocked, getLastActivity };

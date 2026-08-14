'use strict';

/**
 * scripts/migrateNotificationStrings.js
 *
 * Migración puntual e idempotente de las notifications ya persistidas con
 * strings de sistema en inglés (title/message), generadas antes de que
 * achievement.service.js y certificate.service.js se corrigieran a español.
 *
 * Alcance: SOLO `title` y `message` de Notification. No toca metadata, user,
 * type, isRead, createdAtNotification, ni ninguna otra colección.
 *
 * Modo por defecto: DRY RUN (no escribe nada).
 * Para escribir en la base de datos conectada hace falta el flag --apply:
 *
 *   node backend/src/scripts/migrateNotificationStrings.js            → dry-run
 *   node backend/src/scripts/migrateNotificationStrings.js --apply    → escribe
 *
 * Idempotencia: los filtros de búsqueda usan el título antiguo exacto
 * ('Achievement unlocked' / 'Certificate issued'). Tras una migración
 * correcta, esos documentos ya no tienen ese título y una segunda ejecución
 * no vuelve a encontrarlos ni a tocarlos.
 *
 * Reconstrucción de `message`:
 *   - ACHIEVEMENT: se resuelve el Achievement real vía
 *     metadata.achievementId (o metadata.slug si lo anterior no resuelve) y
 *     se usa achievement.name TAL CUAL está en el documento actual — nunca
 *     una tabla hardcodeada en este script.
 *   - CERTIFICATE: se resuelve el Course real vía metadata.courseId y se
 *     preserva course.title exactamente como está.
 *
 * Si un documento no se puede reconstruir de forma fiable (referencia rota,
 * metadata ausente/con shape inesperado), se cuenta como "no reconstruible",
 * se imprime su _id y se continúa con el resto — nunca aborta la migración
 * completa ni escribe un fallback que pierda información.
 */

require('../config/env');

const mongoose = require('mongoose');

const { connectDB }   = require('../config/database');
const Notification     = require('../models/notification.model');
const Achievement       = require('../models/achievement.model');
const Course             = require('../models/course.model');
const logger             = require('../utils/logger');

const OLD_ACHIEVEMENT_TITLE = 'Achievement unlocked';
const NEW_ACHIEVEMENT_TITLE = 'Logro desbloqueado';

const OLD_CERTIFICATE_TITLE = 'Certificate issued';
const NEW_CERTIFICATE_TITLE = 'Certificado emitido';

// ── Funciones puras / reutilizables ─────────────────────────────────────────

// resolveAchievementForNotification — intenta metadata.achievementId primero,
// metadata.slug como respaldo. Devuelve null si ninguno resuelve.
const resolveAchievementForNotification = async (notification) => {
  const achievementId = notification.metadata?.achievementId;
  const slug           = notification.metadata?.slug;

  if (achievementId) {
    const byId = await Achievement.findById(achievementId);
    if (byId) return byId;
  }

  if (slug) {
    const bySlug = await Achievement.findOne({ slug });
    if (bySlug) return bySlug;
  }

  return null;
};

// resolveCourseForNotification — resuelve por metadata.courseId. Devuelve
// null si no hay courseId o no resuelve.
const resolveCourseForNotification = async (notification) => {
  const courseId = notification.metadata?.courseId;
  if (!courseId) return null;

  return Course.findById(courseId);
};

// buildAchievementUpdate — dado un Achievement ya resuelto, calcula el
// { title, message } nuevo. Función pura, sin I/O.
const buildAchievementUpdate = (achievement) => ({
  title:   NEW_ACHIEVEMENT_TITLE,
  message: achievement.name,
});

// buildCertificateUpdate — dado un Course ya resuelto, calcula el
// { title, message } nuevo. Función pura, sin I/O.
const buildCertificateUpdate = (course) => ({
  title:   NEW_CERTIFICATE_TITLE,
  message: `Tu certificado de ${course.title} ya está listo.`,
});

// ── Planificación (dry-run siempre; apply reutiliza el mismo plan) ─────────

const planAchievementMigration = async () => {
  const notifications = await Notification.find({
    type:  'ACHIEVEMENT',
    title: OLD_ACHIEVEMENT_TITLE,
  });

  const reconstructible    = [];
  const notReconstructible = [];

  for (const notification of notifications) {
    const achievement = await resolveAchievementForNotification(notification);
    if (achievement) {
      reconstructible.push({ notification, update: buildAchievementUpdate(achievement) });
    } else {
      notReconstructible.push(notification._id);
    }
  }

  return { found: notifications.length, reconstructible, notReconstructible };
};

const planCertificateMigration = async () => {
  const notifications = await Notification.find({
    type:  'CERTIFICATE',
    title: OLD_CERTIFICATE_TITLE,
  });

  const reconstructible    = [];
  const notReconstructible = [];

  for (const notification of notifications) {
    const course = await resolveCourseForNotification(notification);
    if (course) {
      reconstructible.push({ notification, update: buildCertificateUpdate(course) });
    } else {
      notReconstructible.push(notification._id);
    }
  }

  return { found: notifications.length, reconstructible, notReconstructible };
};

// ── Aplicación (solo se llama si --apply) ───────────────────────────────────

// applyUpdates — un updateOne por documento, $set únicamente title/message.
// Nunca updateMany ciego.
const applyUpdates = async (reconstructible) => {
  let applied = 0;
  for (const { notification, update } of reconstructible) {
    await Notification.updateOne(
      { _id: notification._id },
      { $set: { title: update.title, message: update.message } },
    );
    applied += 1;
  }
  return applied;
};

// ── Impresión de resumen ─────────────────────────────────────────────────────

const printPlanSummary = (label, plan) => {
  logger.info(`[${label}] encontradas: ${plan.found}`);
  logger.info(`[${label}] reconstruibles: ${plan.reconstructible.length}`);
  logger.info(`[${label}] no reconstruibles: ${plan.notReconstructible.length}`);
  if (plan.notReconstructible.length > 0) {
    logger.warn(`[${label}] IDs no reconstruibles:`, plan.notReconstructible.map((id) => id.toString()));
  }
};

// ── Orquestación ─────────────────────────────────────────────────────────────

const run = async () => {
  const apply = process.argv.includes('--apply');

  logger.info(apply ? '=== MODO: APPLY (se escribirá en la base de datos) ===' : '=== MODO: DRY RUN (no se escribirá nada) ===');

  await connectDB();

  try {
    const achievementPlan = await planAchievementMigration();
    printPlanSummary('ACHIEVEMENT', achievementPlan);

    const certificatePlan = await planCertificateMigration();
    printPlanSummary('CERTIFICATE', certificatePlan);

    if (!apply) {
      logger.info('Dry-run completado. Ningún documento fue modificado. Ejecuta con --apply para escribir.');
      return;
    }

    const achievementApplied = await applyUpdates(achievementPlan.reconstructible);
    logger.info(`[ACHIEVEMENT] actualizadas: ${achievementApplied}`);

    const certificateApplied = await applyUpdates(certificatePlan.reconstructible);
    logger.info(`[CERTIFICATE] actualizadas: ${certificateApplied}`);

    logger.info('Migración aplicada.');
  } finally {
    await mongoose.disconnect();
  }
};

if (require.main === module) {
  run()
    .then(() => process.exit(0))
    .catch((err) => {
      logger.error('[migrateNotificationStrings] Error fatal:', err.message);
      process.exit(1);
    });
}

module.exports = {
  resolveAchievementForNotification,
  resolveCourseForNotification,
  buildAchievementUpdate,
  buildCertificateUpdate,
  planAchievementMigration,
  planCertificateMigration,
  applyUpdates,
  OLD_ACHIEVEMENT_TITLE,
  NEW_ACHIEVEMENT_TITLE,
  OLD_CERTIFICATE_TITLE,
  NEW_CERTIFICATE_TITLE,
};

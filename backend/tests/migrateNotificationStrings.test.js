'use strict';

// Valida la lógica del script de migración puntual de notifications contra
// MongoMemoryServer (mismo patrón que el resto de tests de integración) —
// nunca se conecta a Atlas. Ejercita las funciones exportadas del script,
// no el CLI (require.main === module no se dispara al hacer require()).

const mongoose = require('mongoose');

const { connectDatabase, clearDatabase, disconnectDatabase } = require('./setup/db');

const Achievement    = require('../src/models/achievement.model');
const Course         = require('../src/models/course.model');
const Notification   = require('../src/models/notification.model');

const {
  planAchievementMigration,
  planCertificateMigration,
  applyUpdates,
  buildAchievementUpdate,
  buildCertificateUpdate,
  OLD_ACHIEVEMENT_TITLE,
  NEW_ACHIEVEMENT_TITLE,
  OLD_CERTIFICATE_TITLE,
  NEW_CERTIFICATE_TITLE,
} = require('../src/scripts/migrateNotificationStrings');

beforeAll(async () => {
  await connectDatabase();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await disconnectDatabase();
});

const aUserId = () => new mongoose.Types.ObjectId();

describe('migrateNotificationStrings — funciones puras', () => {
  test('buildAchievementUpdate usa achievement.name tal cual, no una tabla hardcodeada', () => {
    const achievement = { name: 'Primera lección completada' };
    expect(buildAchievementUpdate(achievement)).toEqual({
      title:   NEW_ACHIEVEMENT_TITLE,
      message: 'Primera lección completada',
    });
  });

  test('buildCertificateUpdate preserva course.title exacto dentro de la plantilla española', () => {
    const course = { title: 'English Survival Kit' };
    expect(buildCertificateUpdate(course)).toEqual({
      title:   NEW_CERTIFICATE_TITLE,
      message: 'Tu certificado de English Survival Kit ya está listo.',
    });
  });
});

describe('migrateNotificationStrings — planAchievementMigration', () => {
  test('resuelve por metadata.achievementId y calcula el update sin escribir nada', async () => {
    const achievement = await Achievement.create({
      name:        'Primera lección completada',
      slug:        'first_lesson_completed',
      description: 'desc',
      icon:        '📖',
      category:    'LESSON',
      points:      20,
      rarity:      'COMMON',
    });

    const notification = await Notification.create({
      user:    aUserId(),
      type:    'ACHIEVEMENT',
      title:   OLD_ACHIEVEMENT_TITLE,
      message: 'First Lesson Completed',
      metadata: { achievementId: achievement._id, slug: achievement.slug },
    });

    const plan = await planAchievementMigration();

    expect(plan.found).toBe(1);
    expect(plan.reconstructible).toHaveLength(1);
    expect(plan.notReconstructible).toHaveLength(0);
    expect(plan.reconstructible[0].notification._id.toString()).toBe(notification._id.toString());
    expect(plan.reconstructible[0].update).toEqual({
      title:   NEW_ACHIEVEMENT_TITLE,
      message: 'Primera lección completada',
    });

    // dry-run: el documento no debe haber cambiado en BD
    const untouched = await Notification.findById(notification._id);
    expect(untouched.title).toBe(OLD_ACHIEVEMENT_TITLE);
  });

  test('resuelve por metadata.slug cuando achievementId no resuelve', async () => {
    const achievement = await Achievement.create({
      name:        'Perfil completado',
      slug:        'profile_completed',
      description: 'desc',
      icon:        '👤',
      category:    'PLATFORM',
      points:      15,
      rarity:      'COMMON',
    });

    await Notification.create({
      user:    aUserId(),
      type:    'ACHIEVEMENT',
      title:   OLD_ACHIEVEMENT_TITLE,
      message: 'Profile Completed',
      metadata: { achievementId: aUserId(), slug: achievement.slug },
    });

    const plan = await planAchievementMigration();

    expect(plan.reconstructible).toHaveLength(1);
    expect(plan.reconstructible[0].update.message).toBe('Perfil completado');
  });

  test('achievement no encontrado → no reconstruible, no rompe el resto', async () => {
    const notification = await Notification.create({
      user:    aUserId(),
      type:    'ACHIEVEMENT',
      title:   OLD_ACHIEVEMENT_TITLE,
      message: 'Ghost Achievement',
      metadata: { achievementId: aUserId(), slug: 'no_existe' },
    });

    const plan = await planAchievementMigration();

    expect(plan.found).toBe(1);
    expect(plan.reconstructible).toHaveLength(0);
    expect(plan.notReconstructible).toEqual([notification._id]);
  });

  test('ignora notifications ACHIEVEMENT cuyo title ya no es el literal antiguo (idempotencia)', async () => {
    await Notification.create({
      user:    aUserId(),
      type:    'ACHIEVEMENT',
      title:   NEW_ACHIEVEMENT_TITLE,
      message: 'Ya migrada',
      metadata: {},
    });

    const plan = await planAchievementMigration();
    expect(plan.found).toBe(0);
  });
});

describe('migrateNotificationStrings — planCertificateMigration', () => {
  test('resuelve por metadata.courseId y preserva course.title', async () => {
    const course = await Course.create({
      title:       'English Survival Kit',
      description: 'Curso A1 de inglés para principiantes absolutos.',
      level:       'A1',
      status:      'published',
    });

    const notification = await Notification.create({
      user:    aUserId(),
      type:    'CERTIFICATE',
      title:   OLD_CERTIFICATE_TITLE,
      message: 'Your certificate for English Survival Kit is ready.',
      metadata: { courseId: course._id },
    });

    const plan = await planCertificateMigration();

    expect(plan.found).toBe(1);
    expect(plan.reconstructible).toHaveLength(1);
    expect(plan.reconstructible[0].notification._id.toString()).toBe(notification._id.toString());
    expect(plan.reconstructible[0].update).toEqual({
      title:   NEW_CERTIFICATE_TITLE,
      message: 'Tu certificado de English Survival Kit ya está listo.',
    });
  });

  test('curso no encontrado → no reconstruible', async () => {
    const notification = await Notification.create({
      user:    aUserId(),
      type:    'CERTIFICATE',
      title:   OLD_CERTIFICATE_TITLE,
      message: 'Your certificate for Ghost Course is ready.',
      metadata: { courseId: aUserId() },
    });

    const plan = await planCertificateMigration();

    expect(plan.reconstructible).toHaveLength(0);
    expect(plan.notReconstructible).toEqual([notification._id]);
  });

  test('sin metadata.courseId → no reconstruible, no lanza excepción', async () => {
    const notification = await Notification.create({
      user:    aUserId(),
      type:    'CERTIFICATE',
      title:   OLD_CERTIFICATE_TITLE,
      message: 'Your certificate for the course is ready.',
      metadata: {},
    });

    const plan = await planCertificateMigration();

    expect(plan.notReconstructible).toEqual([notification._id]);
  });
});

describe('migrateNotificationStrings — applyUpdates', () => {
  test('actualiza únicamente title/message, deja metadata/user/type/isRead intactos', async () => {
    const achievement = await Achievement.create({
      name:        'Primer curso completado',
      slug:        'first_course_completed',
      description: 'desc',
      icon:        '🎓',
      category:    'COURSE',
      points:      200,
      rarity:      'EPIC',
    });

    const userId = aUserId();
    const notification = await Notification.create({
      user:    userId,
      type:    'ACHIEVEMENT',
      title:   OLD_ACHIEVEMENT_TITLE,
      message: 'First Course Completed',
      metadata: { achievementId: achievement._id, slug: achievement.slug },
      isRead:  true,
    });
    const originalCreatedAt = notification.createdAtNotification;

    const plan = await planAchievementMigration();
    const applied = await applyUpdates(plan.reconstructible);

    expect(applied).toBe(1);

    const updated = await Notification.findById(notification._id);
    expect(updated.title).toBe(NEW_ACHIEVEMENT_TITLE);
    expect(updated.message).toBe('Primer curso completado');
    // resto de campos intactos
    expect(updated.user.toString()).toBe(userId.toString());
    expect(updated.type).toBe('ACHIEVEMENT');
    expect(updated.isRead).toBe(true);
    expect(updated.metadata.slug).toBe('first_course_completed');
    expect(updated.createdAtNotification.getTime()).toBe(originalCreatedAt.getTime());

    // segunda pasada del plan ya no debe encontrar el documento (idempotencia)
    const secondPlan = await planAchievementMigration();
    expect(secondPlan.found).toBe(0);
  });
});

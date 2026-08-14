'use strict';

const Achievement          = require('../models/achievement.model');
const { CATEGORY, RARITY } = require('../models/achievement.model');
const { upsert }           = require('./helpers');

const ACHIEVEMENTS = [
  {
    name:        'Bienvenido a Elevate',
    slug:        'welcome_to_elevate',
    description: 'Te uniste a Elevate Your English Campus. Tu viaje empieza aquí.',
    icon:        '🎉',
    category:    CATEGORY.PLATFORM,
    points:      10,
    rarity:      RARITY.COMMON,
    isActive:    true,
  },
  {
    name:        'Perfil completado',
    slug:        'profile_completed',
    description: 'Completaste tu perfil de alumno. Nos ayuda a personalizar tu experiencia.',
    icon:        '👤',
    category:    CATEGORY.PLATFORM,
    points:      15,
    rarity:      RARITY.COMMON,
    isActive:    true,
  },
  {
    name:        'Primera lección completada',
    slug:        'first_lesson_completed',
    description: 'Completaste tu primera lección. ¡Sigue así!',
    icon:        '📖',
    category:    CATEGORY.LESSON,
    points:      20,
    rarity:      RARITY.COMMON,
    isActive:    true,
  },
  {
    name:        'Cinco lecciones completadas',
    slug:        'five_lessons_completed',
    description: 'Has completado 5 lecciones. ¡Estás cogiendo impulso!',
    icon:        '✋',
    category:    CATEGORY.LESSON,
    points:      40,
    rarity:      RARITY.COMMON,
    isActive:    true,
  },
  {
    name:        'Diez lecciones completadas',
    slug:        'ten_lessons_completed',
    description: 'Diez lecciones completadas. ¡Eres un alumno muy constante!',
    icon:        '🔟',
    category:    CATEGORY.LESSON,
    points:      80,
    rarity:      RARITY.RARE,
    isActive:    true,
  },
  {
    name:        'Primera unidad completada',
    slug:        'first_unit_completed',
    description: 'Terminaste tu primera unidad. Un paso más cerca de la fluidez.',
    icon:        '🏁',
    category:    CATEGORY.COURSE,
    points:      50,
    rarity:      RARITY.COMMON,
    isActive:    true,
  },
  {
    name:        'Primer curso completado',
    slug:        'first_course_completed',
    description: 'Completaste un curso entero. ¡Una dedicación excepcional!',
    icon:        '🎓',
    category:    CATEGORY.COURSE,
    points:      200,
    rarity:      RARITY.EPIC,
    isActive:    true,
  },
  {
    name:        'Racha de siete días',
    slug:        'seven_day_streak',
    description: 'Siete días seguidos de aprendizaje constante. ¡Una disciplina increíble!',
    icon:        '🔥',
    category:    CATEGORY.STREAK,
    points:      100,
    rarity:      RARITY.RARE,
    isActive:    true,
  },
  {
    name:        'Evaluación perfecta',
    slug:        'perfect_assessment',
    description: 'Obtuviste un 100% en una evaluación. ¡Un resultado impecable!',
    icon:        '⭐',
    category:    CATEGORY.ASSESSMENT,
    points:      150,
    rarity:      RARITY.EPIC,
    isActive:    true,
  },
  {
    name:        'Cien puntos',
    slug:        'one_hundred_points',
    description: 'Alcanzaste 100 puntos en total. Tu esfuerzo está dando frutos.',
    icon:        '💯',
    category:    CATEGORY.PROGRESS,
    points:      50,
    rarity:      RARITY.RARE,
    isActive:    true,
  },
];

module.exports = async () => {
  for (const data of ACHIEVEMENTS) {
    await upsert(Achievement, { slug: data.slug }, data);
  }
};

if (require.main === module) {
  require('../config/env');
  const { connectDB } = require('../config/database');
  const mongoose      = require('mongoose');
  connectDB()
    .then(() => module.exports())
    .then(() => mongoose.disconnect())
    .catch((err) => { console.error(err); process.exit(1); });
}

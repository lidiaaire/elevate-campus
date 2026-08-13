'use strict';

/**
 * modules/achievements/achievement.routes.js
 * Montado bajo /api/achievements
 *
 *   GET /api/achievements/me                     → listUserAchievements    [cualquier rol autenticado, propios]
 *   GET /api/achievements/students/:studentId    → listStudentAchievements [admin sin restricción; teacher solo su cohorte]
 */

const { Router }              = require('express');
const AchievementController   = require('./achievement.controller');
const { studentIdParamSchema } = require('./achievement.validator');
const validate                 = require('../../middlewares/validate');
const verifyToken             = require('../../middlewares/verifyToken');
const requireRole             = require('../../middlewares/requireRole');
const { ROLES }                = require('../../config/constants');

const router = Router();

router.get('/me', verifyToken, AchievementController.listUserAchievements);

router.get('/students/:studentId',
  verifyToken,
  requireRole(ROLES.ADMIN, ROLES.TEACHER),
  ...validate(studentIdParamSchema),
  AchievementController.listStudentAchievements,
);

module.exports = router;

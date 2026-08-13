'use strict';

/**
 * modules/dashboard/dashboard.routes.js
 * Montado bajo /api/dashboard
 *
 *   GET  /api/dashboard/student                          → getStudentDashboard       [student]
 *   GET  /api/dashboard/teacher                          → getTeacherDashboard       [teacher]
 *   GET  /api/dashboard/teacher/students/:studentId      → getStudentAcademicDetail  [teacher, solo su cohorte]
 *   GET  /api/dashboard/admin                            → getAdminDashboard         [admin]
 *   GET  /api/dashboard/admin/activity                   → getAdminActivityFeed      [admin]
 *   GET  /api/dashboard/admin/at-risk                    → getAdminAtRisk            [admin]
 *   GET  /api/dashboard/admin/students/:studentId        → getStudentAcademicDetail  [admin, sin restricción]
 *
 * Las dos rutas .../students/:studentId comparten el mismo controller/service
 * (getStudentAcademicDetail) — el scope se resuelve dentro del Service según
 * req.user.role, no hay dos implementaciones del mismo cálculo.
 */

const { Router }               = require('express');
const DashboardController      = require('./dashboard.controller');
const { studentIdParamSchema } = require('./dashboard.validator');
const validate                 = require('../../middlewares/validate');
const verifyToken              = require('../../middlewares/verifyToken');
const requireRole              = require('../../middlewares/requireRole');
const { ROLES }                = require('../../config/constants');

const router = Router();

const studentOnly    = requireRole(ROLES.STUDENT);
const teacherOnly    = requireRole(ROLES.TEACHER);
const adminOnly      = requireRole(ROLES.ADMIN);

// --- Student ---

router.get('/student',
  verifyToken,
  studentOnly,
  DashboardController.getStudentDashboard,
);

// --- Teacher ---

router.get('/teacher',
  verifyToken,
  teacherOnly,
  DashboardController.getTeacherDashboard,
);

router.get('/teacher/students/:studentId',
  verifyToken,
  teacherOnly,
  ...validate(studentIdParamSchema),
  DashboardController.getStudentAcademicDetail,
);

// --- Admin ---

router.get('/admin',
  verifyToken,
  adminOnly,
  DashboardController.getAdminDashboard,
);

router.get('/admin/activity',
  verifyToken,
  adminOnly,
  DashboardController.getAdminActivityFeed,
);

router.get('/admin/at-risk',
  verifyToken,
  adminOnly,
  DashboardController.getAdminAtRisk,
);

router.get('/admin/students/:studentId',
  verifyToken,
  adminOnly,
  ...validate(studentIdParamSchema),
  DashboardController.getStudentAcademicDetail,
);

module.exports = router;

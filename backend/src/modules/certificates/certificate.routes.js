'use strict';

/**
 * modules/certificates/certificate.routes.js
 * Montado bajo /api/certificates
 *
 *   GET /api/certificates/me                     → getMyCertificates       [cualquier rol autenticado, propios]
 *   GET /api/certificates/students/:studentId    → getStudentCertificates  [admin sin restricción; teacher solo su cohorte]
 *   GET /api/certificates/verify/:certificateNumber → verifyCertificate    [público]
 *   GET /api/certificates/:id/download           → downloadCertificatePdf [autenticado]
 */

const { Router }                = require('express');
const CertificateController     = require('./certificate.controller');
const { studentIdParamSchema }  = require('./certificate.validator');
const validate                  = require('../../middlewares/validate');
const verifyToken               = require('../../middlewares/verifyToken');
const requireRole                = require('../../middlewares/requireRole');
const { ROLES }                  = require('../../config/constants');

const router = Router();

router.get('/me', verifyToken, CertificateController.getMyCertificates);

router.get('/students/:studentId',
  verifyToken,
  requireRole(ROLES.ADMIN, ROLES.TEACHER),
  ...validate(studentIdParamSchema),
  CertificateController.getStudentCertificates,
);

router.get('/verify/:certificateNumber', CertificateController.verifyCertificate);
router.get('/:id/download', verifyToken, CertificateController.downloadCertificatePdf);

module.exports = router;

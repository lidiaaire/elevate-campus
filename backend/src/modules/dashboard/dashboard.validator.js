'use strict';

// modules/dashboard/dashboard.validator.js
// studentIdParamSchema: mismo criterio que progress.validator.js/
// achievement.validator.js/certificate.validator.js — cada módulo mantiene
// su propio schema, no hay un validador compartido en este proyecto.

const { param } = require('express-validator');

const studentIdParamSchema = [
  param('studentId')
    .trim()
    .isMongoId().withMessage('studentId debe ser un ObjectId de MongoDB válido'),
];

module.exports = { studentIdParamSchema };

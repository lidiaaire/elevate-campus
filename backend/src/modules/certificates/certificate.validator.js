'use strict';

// modules/certificates/certificate.validator.js
const { param } = require('express-validator');

const studentIdParamSchema = [
  param('studentId')
    .trim()
    .isMongoId().withMessage('studentId debe ser un ObjectId de MongoDB válido'),
];

module.exports = { studentIdParamSchema };

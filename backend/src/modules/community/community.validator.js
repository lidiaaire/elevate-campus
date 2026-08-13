'use strict';

// modules/community/community.validator.js
// Mismo criterio que course.validator.js/listCoursesSchema para page/limit.

const { query, body } = require('express-validator');

const feedQuerySchema = [
  query('page')
    .optional()
    .toInt()
    .isInt({ min: 1 }).withMessage('page debe ser un entero mayor o igual a 1'),

  query('limit')
    .optional()
    .toInt()
    .isInt({ min: 1, max: 100 }).withMessage('limit debe ser un entero entre 1 y 100'),
];

// content: texto plano únicamente — sin sanitización HTML nueva porque no
// se renderiza como HTML (JSX escapa por defecto; nunca
// dangerouslySetInnerHTML para contenido de usuario, ver community.service.js).
// No se valida `type`: el body nunca puede decidirlo, ni siquiera
// enviándolo — el Service lo fuerza a POST y lo ignora si llega.
const createPostSchema = [
  body('content')
    .trim()
    .notEmpty().withMessage('El contenido es obligatorio')
    .isLength({ min: 1, max: 2000 }).withMessage('El contenido debe tener entre 1 y 2000 caracteres'),
];

module.exports = { feedQuerySchema, createPostSchema };

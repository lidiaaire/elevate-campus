'use strict';

/**
 * modules/community/community.routes.js
 * Montado bajo /api/community
 *
 *   GET  /api/community/feed  → getFeed
 *     [cualquier rol autenticado; el scope lo resuelve el Service por rol:
 *      student → su cohorte (mismo assignedTeacherId); teacher → su
 *      roster; admin → toda la academia]
 *
 *   POST /api/community/posts → createPost
 *     [student, teacher — admin → 403 INSUFFICIENT_ROLE en esta iteración.
 *      type y scopeTeacherId los decide el Service, nunca el body]
 */

const { Router }             = require('express');
const CommunityController    = require('./community.controller');
const { feedQuerySchema, createPostSchema } = require('./community.validator');
const validate                = require('../../middlewares/validate');
const verifyToken            = require('../../middlewares/verifyToken');
const requireRole            = require('../../middlewares/requireRole');
const { ROLES }               = require('../../config/constants');

const router = Router();

router.get('/feed', verifyToken, ...validate(feedQuerySchema), CommunityController.getFeed);

router.post('/posts',
  verifyToken,
  requireRole(ROLES.STUDENT, ROLES.TEACHER),
  ...validate(createPostSchema),
  CommunityController.createPost,
);

module.exports = router;

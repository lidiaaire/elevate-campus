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
 *     [student, teacher — admin → 403 INSUFFICIENT_ROLE.
 *      type y scopeTeacherId los decide el Service, nunca el body]
 *
 *   POST /api/community/announcements → createAnnouncement
 *     [teacher, admin — student → 403 INSUFFICIENT_ROLE. type siempre
 *      ANNOUNCEMENT; scopeTeacherId: teacher → su propia cohorte,
 *      admin → null (global). El body solo aporta `content` (misma
 *      validación que createPost — reutiliza createPostSchema)]
 *
 * Rate limiting: communityWriteLimiter (rateLimiter.js) protege las TRES
 * rutas de creación (posts, comentarios, announcements) con una única
 * instancia compartida — 100 requests/15min por IP. Solo se monta después
 * de verifyToken (una petición sin token sigue devolviendo 401, no consume
 * cupo del limiter). GET y DELETE no llevan limiter.
 *
 *   GET    /api/community/posts/:postId/comments  → getComments
 *   POST   /api/community/posts/:postId/comments  → createComment
 *     [cualquier rol autenticado; el acceso al post lo resuelve el Service
 *      con el mismo scope que el feed: student/teacher solo su propia
 *      cohorte, admin sin restricción. Post inexistente/borrado → 404,
 *      post de otra cohorte → 403. El body de createComment solo aporta
 *      `content`]
 *
 *   DELETE /api/community/posts/:postId                    → deletePost
 *   DELETE /api/community/posts/:postId/comments/:commentId → deleteComment
 *     [cualquier rol autenticado; el Service decide el permiso real: autor
 *      siempre, ADMIN siempre, TEACHER solo si el post (o el post padre del
 *      comentario) pertenece a su propia cohorte. STUDENT nunca sobre
 *      contenido ajeno → 403. Recurso inexistente/ya borrado → 404. Soft
 *      delete (isDeleted = true) — sin borrado físico. 204 sin body]
 */

const { Router }             = require('express');
const CommunityController    = require('./community.controller');
const {
  feedQuerySchema,
  createPostSchema,
  postIdParamSchema,
  createCommentSchema,
  commentIdParamSchema,
} = require('./community.validator');
const validate                = require('../../middlewares/validate');
const verifyToken            = require('../../middlewares/verifyToken');
const requireRole            = require('../../middlewares/requireRole');
const { communityWriteLimiter } = require('../../middlewares/rateLimiter');
const { ROLES }               = require('../../config/constants');

const router = Router();

router.get('/feed', verifyToken, ...validate(feedQuerySchema), CommunityController.getFeed);

router.post('/posts',
  verifyToken,
  communityWriteLimiter,
  requireRole(ROLES.STUDENT, ROLES.TEACHER),
  ...validate(createPostSchema),
  CommunityController.createPost,
);

router.post('/announcements',
  verifyToken,
  communityWriteLimiter,
  requireRole(ROLES.TEACHER, ROLES.ADMIN),
  ...validate(createPostSchema),
  CommunityController.createAnnouncement,
);

router.get('/posts/:postId/comments',
  verifyToken,
  ...validate(postIdParamSchema),
  CommunityController.getComments,
);

router.post('/posts/:postId/comments',
  verifyToken,
  communityWriteLimiter,
  ...validate([...postIdParamSchema, ...createCommentSchema]),
  CommunityController.createComment,
);

router.delete('/posts/:postId',
  verifyToken,
  ...validate(postIdParamSchema),
  CommunityController.deletePost,
);

router.delete('/posts/:postId/comments/:commentId',
  verifyToken,
  ...validate([...postIdParamSchema, ...commentIdParamSchema]),
  CommunityController.deleteComment,
);

module.exports = router;

'use strict';

/**
 * modules/community/community.service.js
 *
 * Responsabilidad: Feed de academia/cohorte + creación de publicaciones
 * (MVP social de Comunidad). El feed agrega TRES fuentes: dos derivadas
 * (UserAchievement, Certificate) y una persistida propia (CommunityPost).
 * No hay modelo Cohort: el "ámbito" (scope) sigue siendo implícito vía
 * User.assignedTeacherId, exactamente igual que validateTeacherScope /
 * getStudentAchievements / getStudentCertificates.
 *
 * Métodos:
 *
 *   getFeed(actorRole, actorId, { page, limit })
 *     → Resuelve el scope de students (resolveScopeStudentIds) para
 *       Achievement/Certificate, y el scope de posts (resolveScopeTeacherId)
 *       para CommunityPost — mismo dato fuente (assignedTeacherId), dos
 *       formas de consulta porque preguntan cosas distintas (lista de
 *       personas vs. una cohorte).
 *     → Normaliza las tres fuentes a un único shape
 *       { id, type, eventDate, author: {_id,firstName,lastName,email,role}, context }.
 *       "author" (no "student"): un POST puede estar firmado por un
 *       teacher, no solo por un student.
 *     → Combina, ordena por eventDate desc, pagina en memoria.
 *     → Devuelve { docs, total } — mismo shape que CourseRepository.findAll
 *       y el resto de listados paginados del proyecto.
 *
 *   createPost(actorRole, actorId, { content })
 *     → type se fuerza a CommunityPost.TYPE.POST, el body nunca puede
 *       decidirlo. scopeTeacherId se resuelve en backend
 *       (resolveScopeTeacherId), nunca desde el cliente. Restricción de rol
 *       (ADMIN excluido) vive en la ruta (requireRole), no aquí — mismo
 *       criterio que el resto del proyecto.
 *
 *   createAnnouncement(actorRole, actorId, { content })
 *     → type se fuerza a CommunityPost.TYPE.ANNOUNCEMENT. scopeTeacherId:
 *       TEACHER → su propio id (cohorte); ADMIN → null (global, visible
 *       para toda la academia). El cliente nunca decide ninguno de los dos.
 *       Restricción de rol (solo TEACHER/ADMIN, STUDENT → 403) vive en la
 *       ruta (requireRole).
 *
 *   getComments(actorRole, actorId, postId)
 *   createComment(actorRole, actorId, postId, { content })
 *     → Cualquier rol autenticado puede leer/crear comentarios, pero solo
 *       sobre un post accesible para su scope (_assertPostAccess, mismo
 *       criterio que _getVisiblePosts: ADMIN sin restricción, STUDENT/
 *       TEACHER solo su propia cohorte). Post inexistente o soft-deleted
 *       → 404; post de otra cohorte → 403. createComment incrementa
 *       commentCount del post de forma atómica ($inc).
 *
 *   deletePost(actorRole, actorId, postId)
 *   deleteComment(actorRole, actorId, postId, commentId)
 *     → Soft delete (isDeleted = true), nunca borrado físico. Permiso:
 *       autor siempre; ADMIN siempre; TEACHER solo si el post (o el post
 *       padre del comentario) pertenece a su propia cohorte
 *       (scopeTeacherId === su id); STUDENT nunca sobre contenido ajeno.
 *       Recurso inexistente o ya borrado → 404 (mismo criterio que
 *       _assertPostAccess: un segundo DELETE no encuentra nada visible y no
 *       repite efectos). deleteComment decrementa commentCount del post de
 *       forma atómica y nunca en negativo (filtro commentCount > 0 en el
 *       propio update).
 */

const UserRepository             = require('../../repositories/user.repository');
const UserAchievementRepository  = require('../../repositories/userAchievement.repository');
const CertificateRepository      = require('../../repositories/certificate.repository');
const CommunityPostRepository    = require('../../repositories/communityPost.repository');
const CommunityCommentRepository = require('../../repositories/communityComment.repository');
const CommunityPost              = require('../../models/communityPost.model');
const pagination                 = require('../../utils/pagination');
const { ROLES }                  = require('../../config/constants');
const { NotFoundError, ForbiddenError } = require('../../utils/ApiError');

// Límite defensivo para la resolución de scope (no hay paginación real aquí:
// necesitamos TODOS los ids del scope antes de poder ordenar/paginar el
// feed combinado). El dataset de la academia es pequeño; este límite solo
// evita una query sin cota si el dataset creciera mucho.
const SCOPE_FETCH_LIMIT = 5000;

// STUDENT  → compañeros con el mismo assignedTeacherId que el propio actor
//            (el actor se incluye a sí mismo: su assignedTeacherId siempre
//            coincide consigo mismo). EXCEPCIÓN: si el actor no tiene
//            assignedTeacherId (null/undefined), su scope es únicamente él
//            mismo — sin profesor asignado no hay cohorte real que
//            compartir, y filtrar por assignedTeacherId: null lo agruparía
//            con CUALQUIER otro student sin profesor, sin relación real
//            entre ellos.
// TEACHER  → alumnos cuyo assignedTeacherId es el propio actor.
// ADMIN    → todos los alumnos de la academia.
const resolveScopeStudentIds = async (actorRole, actorId) => {
  if (actorRole === ROLES.ADMIN) {
    const { docs } = await UserRepository.findAll(
      { role: ROLES.STUDENT },
      { limit: SCOPE_FETCH_LIMIT },
    );
    return docs.map((u) => u._id);
  }

  if (actorRole === ROLES.TEACHER) {
    const { docs } = await UserRepository.findAll(
      { role: ROLES.STUDENT, assignedTeacherId: actorId },
      { limit: SCOPE_FETCH_LIMIT },
    );
    return docs.map((u) => u._id);
  }

  // STUDENT
  const actor = await UserRepository.findById(actorId);
  if (!actor?.assignedTeacherId) {
    return [actorId];
  }

  const { docs } = await UserRepository.findAll(
    { role: ROLES.STUDENT, assignedTeacherId: actor.assignedTeacherId },
    { limit: SCOPE_FETCH_LIMIT },
  );
  return docs.map((u) => u._id);
};

// Scope de CommunityPost — mismo criterio que resolveScopeStudentIds, pero
// como UN valor (scopeTeacherId) en vez de una lista de ids: un post
// pertenece a una cohorte, no a una lista de personas.
// TEACHER  → su propio id.
// STUDENT  → su assignedTeacherId, o su propio id si no tiene profesor
//            (mismo caso límite que resolveScopeStudentIds).
// No se llama para ADMIN: sus posts se leen sin filtro (findAllVisible) y
// nunca crea posts en esta iteración (ADMIN → 403 en la ruta).
const resolveScopeTeacherId = async (actorRole, actorId) => {
  if (actorRole === ROLES.TEACHER) return actorId;

  const actor = await UserRepository.findById(actorId);
  return actor?.assignedTeacherId ?? actorId;
};

// author.role: viene gratis en el populate (una palabra más en la
// proyección, sin query adicional) — se incluye en los tres normalizadores
// porque el propio DTO ahora combina eventos de student (achievement,
// certificate) y de student O teacher (post), y "student" ya no describe
// a quien los genera. Mismo shape de author en los tres tipos.
const _achievementToFeedItem = (ua) => ({
  id:        ua._id,
  type:      'ACHIEVEMENT',
  eventDate: ua.unlockedAt,
  author: {
    _id:       ua.user._id,
    firstName: ua.user.firstName,
    lastName:  ua.user.lastName,
    email:     ua.user.email,
    role:      ua.user.role,
  },
  context: {
    name:        ua.achievement.name,
    slug:        ua.achievement.slug,
    description: ua.achievement.description,
    icon:        ua.achievement.icon,
    category:    ua.achievement.category,
    points:      ua.achievement.points,
    rarity:      ua.achievement.rarity,
  },
});

const _certificateToFeedItem = (c) => ({
  id:        c._id,
  type:      'CERTIFICATE',
  eventDate: c.issueDate,
  author: {
    _id:       c.student._id,
    firstName: c.student.firstName,
    lastName:  c.student.lastName,
    email:     c.student.email,
    role:      c.student.role,
  },
  context: {
    courseTitle:       c.course?.title ?? null,
    courseLevel:       c.course?.level ?? null,
    certificateNumber: c.certificateNumber,
    finalScore:        c.finalScore,
  },
});

// type viene del propio documento (POST | ANNOUNCEMENT) — ya no se fuerza
// a 'POST', CommunityPost persiste ambos tipos.
const _postToFeedItem = (p) => ({
  id:        p._id,
  type:      p.type,
  eventDate: p.createdAt,
  author: {
    _id:       p.author._id,
    firstName: p.author.firstName,
    lastName:  p.author.lastName,
    email:     p.author.email,
    role:      p.author.role,
  },
  context: {
    content:      p.content,
    commentCount: p.commentCount,
  },
});

// ADMIN → todos los posts visibles, sin filtro de scope (igual que
// resolveScopeStudentIds para achievements/certificates).
// STUDENT/TEACHER → posts/announcements de su propia cohorte +
// scopeTeacherId:null (announcements globales de ADMIN).
const _getVisiblePosts = async (actorRole, actorId) => {
  if (actorRole === ROLES.ADMIN) {
    return CommunityPostRepository.findAllVisible();
  }

  const scopeTeacherId = await resolveScopeTeacherId(actorRole, actorId);
  return CommunityPostRepository.findByScopes([scopeTeacherId, null]);
};

const getFeed = async (actorRole, actorId, query = {}) => {
  const { skip, limit } = pagination.toMongoOptions(query.page, query.limit);

  const scopeStudentIds = await resolveScopeStudentIds(actorRole, actorId);

  const [userAchievements, certificates, posts] = await Promise.all([
    scopeStudentIds.length > 0 ? UserAchievementRepository.findByUsers(scopeStudentIds) : [],
    scopeStudentIds.length > 0 ? CertificateRepository.findByStudents(scopeStudentIds)  : [],
    _getVisiblePosts(actorRole, actorId),
  ]);

  const items = [
    ...userAchievements.map(_achievementToFeedItem),
    ...certificates.map(_certificateToFeedItem),
    ...posts.map(_postToFeedItem),
  ].sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

  return {
    docs:  items.slice(skip, skip + limit),
    total: items.length,
  };
};

// type se fuerza SIEMPRE a POST — el body nunca decide el type, así que
// no puede llegar 'ANNOUNCEMENT' aunque el cliente lo envíe manipulado.
const createPost = async (actorRole, actorId, { content }) => {
  const scopeTeacherId = await resolveScopeTeacherId(actorRole, actorId);

  return CommunityPostRepository.create({
    author:         actorId,
    type:           CommunityPost.TYPE.POST,
    content,
    scopeTeacherId,
  });
};

// type se fuerza SIEMPRE a ANNOUNCEMENT — el body nunca decide el type ni
// el scopeTeacherId. Restricción de rol (solo TEACHER/ADMIN) vive en la
// ruta (requireRole), no aquí — mismo criterio que createPost.
// TEACHER → scopeTeacherId = su propio id (announcement de su cohorte).
// ADMIN    → scopeTeacherId = null (announcement global, visible para toda
//            la academia — mismo valor que _getVisiblePosts/findByScopes
//            ya contemplan para el feed).
const createAnnouncement = async (actorRole, actorId, { content }) => {
  const scopeTeacherId = actorRole === ROLES.ADMIN ? null : actorId;

  return CommunityPostRepository.create({
    author: actorId,
    type:   CommunityPost.TYPE.ANNOUNCEMENT,
    content,
    scopeTeacherId,
  });
};

// Shape compartido entre getComments y createComment.
const _commentToDTO = (c) => ({
  _id:     c._id,
  content: c.content,
  author: {
    _id:       c.author._id,
    firstName: c.author.firstName,
    lastName:  c.author.lastName,
    email:     c.author.email,
    role:      c.author.role,
  },
  createdAt: c.createdAt,
});

// Resuelve acceso al post padre de un comentario con el mismo criterio que
// _getVisiblePosts: ADMIN sin restricción; STUDENT/TEACHER solo si el post
// pertenece a su propia cohorte (scopeTeacherId resuelto). Post inexistente
// o soft-deleted → 404 (no se distingue de "no existe": un post borrado no
// es un recurso accesible para nadie fuera de este dato interno). Post
// existente pero de otra cohorte → 403.
const _assertPostAccess = async (actorRole, actorId, postId) => {
  const post = await CommunityPostRepository.findById(postId);
  if (!post || post.isDeleted) {
    throw new NotFoundError('POST_NOT_FOUND', 'Publicación no encontrada');
  }

  if (actorRole === ROLES.ADMIN) return post;

  // scopeTeacherId: null → announcement global de ADMIN, accesible para
  // cualquier rol autenticado (mismo criterio que el feed).
  if (post.scopeTeacherId === null) return post;

  const scopeTeacherId = await resolveScopeTeacherId(actorRole, actorId);
  if (post.scopeTeacherId.toString() !== scopeTeacherId.toString()) {
    throw new ForbiddenError('POST_FORBIDDEN', 'No tienes acceso a esta publicación');
  }

  return post;
};

// Permiso de borrado de un post: autor siempre puede; ADMIN siempre puede;
// TEACHER solo si el post pertenece a su propia cohorte (scopeTeacherId ===
// su propio id, mismo valor que resolveScopeTeacherId(TEACHER, actorId)
// devuelve siempre). STUDENT nunca puede borrar un post ajeno, ni dentro de
// su propia cohorte. scopeTeacherId?. — un announcement global (null) nunca
// coincide con el id de un TEACHER, así que cae directo al 403 (solo su
// propio autor, es decir ADMIN, puede borrarlo).
const _assertPostDeletePermission = (actorRole, actorId, post) => {
  if (post.author.toString() === actorId.toString()) return;
  if (actorRole === ROLES.ADMIN) return;
  if (actorRole === ROLES.TEACHER && post.scopeTeacherId?.toString() === actorId.toString()) return;

  throw new ForbiddenError('POST_DELETE_FORBIDDEN', 'No tienes permiso para eliminar esta publicación');
};

// Mismo criterio que _assertPostDeletePermission, pero el scope del
// comentario es el del post padre (el comentario no lleva su propio
// scopeTeacherId).
const _assertCommentDeletePermission = (actorRole, actorId, comment, post) => {
  if (comment.author.toString() === actorId.toString()) return;
  if (actorRole === ROLES.ADMIN) return;
  if (actorRole === ROLES.TEACHER && post.scopeTeacherId?.toString() === actorId.toString()) return;

  throw new ForbiddenError('COMMENT_DELETE_FORBIDDEN', 'No tienes permiso para eliminar este comentario');
};

// Post inexistente o ya borrado → 404, mismo criterio que _assertPostAccess
// (un post soft-deleted no es un recurso accesible para nadie). Segundo
// DELETE sobre el mismo post cae aquí: no vuelve a tocar isDeleted.
const deletePost = async (actorRole, actorId, postId) => {
  const post = await CommunityPostRepository.findById(postId);
  if (!post || post.isDeleted) {
    throw new NotFoundError('POST_NOT_FOUND', 'Publicación no encontrada');
  }

  _assertPostDeletePermission(actorRole, actorId, post);

  await CommunityPostRepository.softDelete(postId);
};

// Comentario inexistente, ya borrado, o que no pertenece al postId de la
// ruta → 404 (mismo criterio: no se distingue "no existe" de "borrado").
// El decremento de commentCount solo ocurre aquí, tras el soft delete real
// — un segundo DELETE sobre el mismo comentario ya no encuentra el
// comentario visible y no vuelve a decrementar.
const deleteComment = async (actorRole, actorId, postId, commentId) => {
  const comment = await CommunityCommentRepository.findById(commentId);
  if (!comment || comment.isDeleted || comment.post.toString() !== postId) {
    throw new NotFoundError('COMMENT_NOT_FOUND', 'Comentario no encontrado');
  }

  const post = await CommunityPostRepository.findById(comment.post);
  if (!post) {
    throw new NotFoundError('POST_NOT_FOUND', 'Publicación no encontrada');
  }

  _assertCommentDeletePermission(actorRole, actorId, comment, post);

  await CommunityCommentRepository.softDelete(commentId);
  await CommunityPostRepository.decrementCommentCount(post._id);
};

const getComments = async (actorRole, actorId, postId) => {
  await _assertPostAccess(actorRole, actorId, postId);

  const comments = await CommunityCommentRepository.findByPost(postId);
  return comments.map(_commentToDTO);
};

const createComment = async (actorRole, actorId, postId, { content }) => {
  await _assertPostAccess(actorRole, actorId, postId);

  const comment = await CommunityCommentRepository.create({
    post:   postId,
    author: actorId,
    content,
  });
  await CommunityPostRepository.incrementCommentCount(postId);

  await comment.populate('author', 'firstName lastName email role');
  return _commentToDTO(comment);
};

module.exports = {
  getFeed,
  createPost,
  createAnnouncement,
  deletePost,
  getComments,
  createComment,
  deleteComment,
  resolveScopeStudentIds,
  resolveScopeTeacherId,
};

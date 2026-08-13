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
 *       decidirlo (ANNOUNCEMENT no se crea todavía). scopeTeacherId se
 *       resuelve en backend (resolveScopeTeacherId), nunca desde el cliente.
 *       Restricción de rol (ADMIN excluido) vive en la ruta
 *       (requireRole), no aquí — mismo criterio que el resto del proyecto.
 */

const UserRepository             = require('../../repositories/user.repository');
const UserAchievementRepository  = require('../../repositories/userAchievement.repository');
const CertificateRepository      = require('../../repositories/certificate.repository');
const CommunityPostRepository    = require('../../repositories/communityPost.repository');
const CommunityPost              = require('../../models/communityPost.model');
const pagination                 = require('../../utils/pagination');
const { ROLES }                  = require('../../config/constants');

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

const _postToFeedItem = (p) => ({
  id:        p._id,
  type:      'POST',
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
// STUDENT/TEACHER → posts de su propia cohorte + scopeTeacherId:null.
// Ningún POST tiene hoy scopeTeacherId:null (solo lo tendrán los
// announcements globales de la siguiente fase) — incluirlo ya en el
// filtro no expone nada hoy y evita tener que tocar esta query cuando
// se implementen los announcements.
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

module.exports = { getFeed, createPost, resolveScopeStudentIds, resolveScopeTeacherId };

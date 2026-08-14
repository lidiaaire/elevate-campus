'use strict';

const BaseRepository  = require('./base.repository');
const CommunityPost   = require('../models/communityPost.model');

class CommunityPostRepository extends BaseRepository {
  constructor() {
    super(CommunityPost);
  }

  // Usado por community.service para el feed: posts no borrados dentro de
  // un conjunto de scopeTeacherId (el scope ya resuelto por rol). null se
  // incluye en el propio array para que STUDENT/TEACHER vean también los
  // announcements globales de ADMIN (scopeTeacherId: null), además de los
  // de su propia cohorte.
  async findByScopes(scopeTeacherIds) {
    return this.model
      .find({ scopeTeacherId: { $in: scopeTeacherIds }, isDeleted: false })
      .populate('author', 'firstName lastName email role')
      .sort({ createdAt: -1 })
      .lean();
  }

  // Admin: todos los posts no borrados, sin filtrar por scope.
  async findAllVisible() {
    return this.model
      .find({ isDeleted: false })
      .populate('author', 'firstName lastName email role')
      .sort({ createdAt: -1 })
      .lean();
  }

  // $inc atómico en vez de leer+sumar+guardar: sin condición de carrera
  // entre comentarios concurrentes sobre el mismo post.
  async incrementCommentCount(postId) {
    return this.model.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });
  }

  // Filtro { commentCount: { $gt: 0 } } en la propia condición de update:
  // atómico y nunca deja commentCount en negativo, sin necesidad de leer el
  // valor antes de decrementar (evita condición de carrera entre borrados
  // concurrentes del mismo post).
  async decrementCommentCount(postId) {
    return this.model.findOneAndUpdate(
      { _id: postId, commentCount: { $gt: 0 } },
      { $inc: { commentCount: -1 } },
    );
  }

  // Soft delete: nunca se borra físicamente. El feed y _assertPostAccess ya
  // filtran por isDeleted, así que esto basta para "desaparecer" el post.
  async softDelete(postId) {
    return this.model.findByIdAndUpdate(postId, { $set: { isDeleted: true } });
  }
}

module.exports = new CommunityPostRepository();

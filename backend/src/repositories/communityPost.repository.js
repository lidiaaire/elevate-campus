'use strict';

const BaseRepository  = require('./base.repository');
const CommunityPost   = require('../models/communityPost.model');

class CommunityPostRepository extends BaseRepository {
  constructor() {
    super(CommunityPost);
  }

  // Usado por community.service para el feed: posts no borrados dentro de
  // un conjunto de scopeTeacherId (el scope ya resuelto por rol). null se
  // incluye en el propio array cuando el actor puede ver announcements
  // globales (todavía no se crean, pero la lectura ya queda compatible
  // con esa fase sin tener que tocar esta query después).
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
}

module.exports = new CommunityPostRepository();

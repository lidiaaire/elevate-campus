'use strict';

const BaseRepository    = require('./base.repository');
const CommunityComment  = require('../models/communityComment.model');

class CommunityCommentRepository extends BaseRepository {
  constructor() {
    super(CommunityComment);
  }

  // Comentarios visibles de un post, orden cronológico ascendente (más
  // antiguo primero) — igual que un hilo de conversación.
  async findByPost(postId) {
    return this.model
      .find({ post: postId, isDeleted: false })
      .populate('author', 'firstName lastName email role')
      .sort({ createdAt: 1 })
      .lean();
  }

  // Soft delete: nunca se borra físicamente. findByPost ya filtra por
  // isDeleted, así que esto basta para "desaparecer" el comentario.
  async softDelete(commentId) {
    return this.model.findByIdAndUpdate(commentId, { $set: { isDeleted: true } });
  }
}

module.exports = new CommunityCommentRepository();

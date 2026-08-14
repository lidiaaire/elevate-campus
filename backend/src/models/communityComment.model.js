'use strict';

/**
 * models/communityComment.model.js
 *
 * Responsabilidad: Esquema Mongoose del documento CommunityComment.
 * Comentario persistido sobre un CommunityPost. No lleva su propio scope
 * (scopeTeacherId): hereda el del post al que pertenece — el acceso se
 * resuelve siempre a través del post (ver community.service.js).
 *
 * Campos:
 *   post       ObjectId  ref: CommunityPost  requerido
 *   author     ObjectId  ref: User            requerido
 *   content    String    requerido  trim  max 2000 chars  texto plano
 *   isDeleted  Boolean   default: false  (soft delete; sin endpoint DELETE
 *                todavía, pero la lectura ya filtra por este campo)
 *
 * Índices:
 *   { post: 1, createdAt: 1 }  — patrón de lectura del hilo (orden cronológico)
 */

const { Schema, model, Types } = require('mongoose');

const communityCommentSchema = new Schema(
  {
    post: {
      type:     Types.ObjectId,
      ref:      'CommunityPost',
      required: true,
    },
    author: {
      type:     Types.ObjectId,
      ref:      'User',
      required: true,
    },
    content: {
      type:      String,
      required:  true,
      trim:      true,
      maxlength: 2000,
    },
    isDeleted: {
      type:    Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

communityCommentSchema.index({ post: 1, createdAt: 1 });

module.exports = model('CommunityComment', communityCommentSchema);

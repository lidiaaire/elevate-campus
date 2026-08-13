'use strict';

/**
 * models/communityPost.model.js
 *
 * Responsabilidad: Esquema Mongoose del documento CommunityPost.
 * Contenido real (no agregado) del feed de Comunidad — a diferencia de
 * ACHIEVEMENT/CERTIFICATE, que son eventos derivados de otras colecciones.
 *
 * Campos:
 *   author          ObjectId  ref: User    requerido
 *   type            String    enum: TYPE ('POST' | 'ANNOUNCEMENT')  default: 'POST'
 *                     — en esta iteración solo se crea 'POST' vía la API;
 *                       el enum ya deja sitio a 'ANNOUNCEMENT' para la
 *                       siguiente fase, sin migración de schema.
 *   content         String    requerido  trim  max 2000 chars  texto plano
 *   scopeTeacherId  ObjectId  ref: User    requerido  NUNCA null en esta
 *                     iteración (los announcements globales, que sí usarán
 *                     null, no se crean todavía) — ver community.service.js
 *                     para la resolución exacta por rol.
 *   commentCount    Number    default: 0  (denormalizado; se incrementará
 *                     al implementar CommunityComment, no se recalcula)
 *   isDeleted       Boolean   default: false  (soft delete; sin endpoint
 *                     DELETE todavía, pero el feed ya filtra por este campo)
 *
 * Índices:
 *   { scopeTeacherId: 1, createdAt: -1 }  — patrón de lectura del feed
 *   { author: 1 }                          — moderación / "mis posts"
 */

const { Schema, model, Types } = require('mongoose');

const TYPE = Object.freeze({
  POST:         'POST',
  ANNOUNCEMENT: 'ANNOUNCEMENT',
});

const communityPostSchema = new Schema(
  {
    author: {
      type:     Types.ObjectId,
      ref:      'User',
      required: true,
    },
    type: {
      type:    String,
      enum:    Object.values(TYPE),
      default: TYPE.POST,
    },
    content: {
      type:      String,
      required:  true,
      trim:      true,
      maxlength: 2000,
    },
    scopeTeacherId: {
      type:     Types.ObjectId,
      ref:      'User',
      required: true,
    },
    commentCount: {
      type:    Number,
      default: 0,
      min:     0,
    },
    isDeleted: {
      type:    Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

communityPostSchema.index({ scopeTeacherId: 1, createdAt: -1 });
communityPostSchema.index({ author: 1 });

module.exports = model('CommunityPost', communityPostSchema);
module.exports.TYPE = TYPE;

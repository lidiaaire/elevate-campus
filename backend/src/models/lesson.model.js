'use strict';

/**
 * models/lesson.model.js
 *
 * Responsabilidad: Esquema Mongoose del documento Lesson.
 *
 * Campos:
 *   unitId     ObjectId  ref: Unit    requerido
 *   courseId   ObjectId  ref: Course  requerido  (denormalizado para queries eficientes)
 *   title      String    requerido  3-150 chars
 *   type       String    requerido  enum: LESSON_TYPES ('video' | 'text' | 'quiz')  inmutable tras creación
 *   content    String    condicional  requerido si type='text'  max 50000 chars
 *   videoUrl   String    condicional  requerido si type='video'  URL válida
 *   duration   Number    requerido  minutos  1-300
 *   order      Number    requerido  entero positivo  asignado por LessonService
 *   contentBlocks  [ContentBlock]  opcional  ver abajo
 *
 * ContentBlock (subdocumento, sin _id propio):
 *   Representación alternativa y opcional de 'content' como bloques
 *   pedagógicos tipados, pensada para lecciones type='text'. Es puramente
 *   aditiva: 'content' se sigue guardando siempre como fuente de verdad en
 *   texto plano; 'contentBlocks' solo se rellena en lecciones migradas a
 *   propósito. Si está vacío o ausente, el frontend usa el pipeline actual
 *   (parseLessonContent sobre 'content').
 *
 *   type   String  requerido  enum: CONTENT_BLOCK_TYPES
 *                  ('objectives'|'context'|'rule'|'patterns'|'practice'|'summary')
 *   heading, title, body   String opcionales — cabecera/eyebrow, título y texto libre corto
 *   items            [{ icon, title, description }]        — objectives / summary (lista breve)
 *   examples         [{ icon, text, highlight: [String] }]  — context (frases con fragmento a destacar)
 *   callout          { icon, text }                         — context (nota breve tipo bocadillo)
 *   transformations  [{ from, to }]                         — rule (pares infinitivo → pasado)
 *   note             { icon, text }                         — rule (aclaración breve)
 *   cards            [{ number, title, description,
 *                        example: { from, to },
 *                        examples: [{ from, to }], hint }]  — patterns (cards comparables).
 *                    'example' (singular) es un único par representativo de
 *                    una regla ortográfica; 'examples' (plural) es una lista
 *                    de pares que comparten un mismo patrón (p. ej. agrupar
 *                    varios verbos irregulares bajo "cambio vocálico i → o").
 *                    Un card usa uno u otro, nunca ambos.
 *   practiceQuestion { prompt, sentenceTemplate,
 *                       options: [{ text, isCorrect }],
 *                       feedbackCorrect, feedbackIncorrect } — practice (microactividad de selección)
 *
 *   No es un Mixed libre: cada bloque solo usa los subcampos relevantes a
 *   su 'type'; el resto quedan simplemente sin definir. Ampliar a un nuevo
 *   tipo de bloque implica añadir aquí su forma y su componente de render
 *   correspondiente en frontend (blocks/BlockRenderer.js).
 *
 * Índices:
 *   { unitId: 1, order: 1 }    para obtener lecciones de una unidad ordenadas
 *   { courseId: 1 }            para obtener todas las lecciones de un curso (usado en enrollment)
 *
 * Nota: 'type' es inmutable. Para cambiarlo hay que eliminar y recrear la lección.
 */

const { Schema, model, Types } = require('mongoose');
const { LESSON_TYPES, CONTENT_BLOCK_TYPES } = require('../config/constants');

const iconTextSchema = new Schema(
  {
    icon: { type: String, trim: true, maxlength: 40 },
    text: { type: String, trim: true, maxlength: 300 },
  },
  { _id: false }
);

const transformationSchema = new Schema(
  {
    from: { type: String, trim: true, maxlength: 40 },
    to:   { type: String, trim: true, maxlength: 40 },
  },
  { _id: false }
);

const contentBlockSchema = new Schema(
  {
    type: {
      type:     String,
      required: true,
      enum:     Object.values(CONTENT_BLOCK_TYPES),
    },
    heading: { type: String, trim: true, maxlength: 80 },
    title:   { type: String, trim: true, maxlength: 200 },
    body:    { type: String, trim: true, maxlength: 2000 },

    // objectives / summary
    items: [{
      _id:         false,
      icon:        { type: String, trim: true, maxlength: 40 },
      title:       { type: String, trim: true, maxlength: 120 },
      description: { type: String, trim: true, maxlength: 200 },
    }],

    // context
    examples: [{
      _id:       false,
      icon:      { type: String, trim: true, maxlength: 40 },
      text:      { type: String, trim: true, maxlength: 300 },
      highlight: [{ type: String, trim: true, maxlength: 60 }],
    }],
    callout: iconTextSchema,

    // rule
    transformations: [transformationSchema],
    note:            iconTextSchema,

    // patterns
    cards: [{
      _id:         false,
      number:      { type: Number, min: 1 },
      title:       { type: String, trim: true, maxlength: 120 },
      description: { type: String, trim: true, maxlength: 200 },
      example:     transformationSchema,
      examples:    [transformationSchema],
      hint:        { type: String, trim: true, maxlength: 120 },
    }],

    // practice
    practiceQuestion: {
      _id:              false,
      prompt:           { type: String, trim: true, maxlength: 300 },
      sentenceTemplate: { type: String, trim: true, maxlength: 300 },
      options: [{
        _id:       false,
        text:      { type: String, trim: true, maxlength: 60 },
        isCorrect: { type: Boolean, default: false },
      }],
      feedbackCorrect:   { type: String, trim: true, maxlength: 300 },
      feedbackIncorrect: { type: String, trim: true, maxlength: 300 },
    },
  },
  { _id: false }
);

const lessonSchema = new Schema(
  {
    unitId: {
      type:      Types.ObjectId,
      ref:       'Unit',
      required:  true,
    },
    courseId: {
      type:      Types.ObjectId,
      ref:       'Course',
      required:  true,
    },
    title: {
      type:      String,
      required:  true,
      trim:      true,
      minlength: 3,
      maxlength: 100,
    },
    type: {
      type:      String,
      required:  true,
      enum:      Object.values(LESSON_TYPES),
      immutable: true,
    },
    content: {
      type:    String,
      maxlength: 50000,
      default: null,
    },
    videoUrl: {
      type:    String,
      maxlength: 500,
      default: null,
    },
    duration: {
      type:    Number,
      min:     1,
      max:     300,
      default: null,
    },
    order: {
      type:     Number,
      required: true,
      min:      1,
    },
    contentBlocks: {
      type:    [contentBlockSchema],
      default: undefined,
    },
  },
  { timestamps: true }
);

lessonSchema.index({ unitId: 1, order: 1 });
lessonSchema.index({ courseId: 1 });

module.exports = model('Lesson', lessonSchema);

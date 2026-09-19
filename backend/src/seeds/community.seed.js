'use strict';

/**
 * seeds/community.seed.js
 *
 * Responsabilidad: publicaciones (y algunas respuestas) demo para que
 * /community arranque como una conversación real entre alumnos, no como un
 * muro vacío que solo se llena de logros/certificados automáticos.
 *
 * Reutiliza exclusivamente lo que ya existe: los mismos usuarios demo de
 * users.seed (ROLES.STUDENT), y los repositories oficiales de Community
 * (CommunityPostRepository/CommunityCommentRepository) — ningún modelo ni
 * endpoint nuevo. commentCount se fija a mano al crear cada post porque aquí
 * se escribe directo al repository (sin pasar por community.service), así
 * que no hay $inc atómico disparándose por cada comentario seedeado.
 *
 * scopeTeacherId por cohorte (igual que community.service.resolveScopeTeacherId):
 * un post solo es visible para los alumnos de la misma cohorte que su autor,
 * así que se reparte entre las tres cohortes para que cualquier alumno demo
 * (Sarah, María, Lucía...) vea conversación real al entrar, no solo la suya.
 *
 * Idempotencia: si ya existe algún CommunityPost, no vuelve a sembrar nada
 * (index.js limpia la colección antes de cada `npm run seed`, así que un
 * re-run completo siempre parte de cero; esto solo evita duplicar si este
 * módulo se ejecuta dos veces seguido de forma aislada).
 */

const UserRepository            = require('../repositories/user.repository');
const CommunityPostRepository   = require('../repositories/communityPost.repository');
const CommunityCommentRepository = require('../repositories/communityComment.repository');
const CommunityPost             = require('../models/communityPost.model');

const getUser = (email) => UserRepository.findOne({ email });

const hoursAgo = (n) => new Date(Date.now() - n * 60 * 60 * 1000);
const daysAgo  = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

module.exports = async () => {
  const alreadySeeded = await CommunityPostRepository.count({});
  if (alreadySeeded > 0) return;

  const [emma, james, sofia] = await Promise.all([
    getUser('emma.johnson@elevate.com'),
    getUser('james.parker@elevate.com'),
    getUser('sofia.reyes@elevate.com'),
  ]);

  const [sarah, amara, nina, carlos, maria, diego, lucia, miguel] = await Promise.all([
    getUser('sarah.mitchell@demo.com'),
    getUser('amara.diallo@demo.com'),
    getUser('nina.kowalski@demo.com'),
    getUser('carlos.rodriguez@demo.com'),
    getUser('maria.garcia@demo.com'),
    getUser('diego.herrera@demo.com'),
    getUser('lucia.fernandez@demo.com'),
    getUser('miguel.sanchez@demo.com'),
  ]);

  // Cada entrada: autor, cohorte (scopeTeacherId), fecha, contenido, y
  // opcionalmente respuestas ({ author, content, createdAt }). Voces
  // distintas a propósito (duda, experiencia, consejo, recomendación) —
  // nada de texto uniforme repetido entre alumnos.
  const posts = [
    {
      author: sarah, scopeTeacherId: emma._id, createdAt: hoursAgo(3),
      content: '¿Alguien tiene algún truco para diferenciar since y for? Siempre me lío con cuál va con cuál 😅',
      replies: [
        { author: carlos, createdAt: hoursAgo(2), content: "Yo lo pienso así: 'for' + duración (for two years) y 'since' + punto de partida (since 2020). ¡Suerte!" },
        { author: amara,  createdAt: hoursAgo(1), content: 'Yo apunto ejemplos en post-its 😂 me ayuda muchísimo a fijarlo.' },
      ],
    },
    {
      author: amara, scopeTeacherId: emma._id, createdAt: hoursAgo(7),
      content: '¿Qué series en inglés recomendáis para practicar listening? Busco algo que no vaya demasiado rápido.',
      replies: [
        { author: nina,  createdAt: hoursAgo(5), content: "A mí me funcionó mucho 'Friends', el ritmo es bastante asequible." },
        { author: carlos, createdAt: hoursAgo(4), content: 'Prueba también con documentales de naturaleza, hablan más despacio.' },
        { author: sarah, createdAt: hoursAgo(3), content: '¡Gracias por las recomendaciones, las apunto todas!' },
      ],
    },
    {
      author: carlos, scopeTeacherId: emma._id, createdAt: daysAgo(2),
      content: 'Hoy he terminado la unidad de Travel. Se me ha hecho amena, ¡y aprendí un montón de vocabulario nuevo! ¿Qué os pareció a vosotros?',
    },
    {
      author: nina, scopeTeacherId: emma._id, createdAt: daysAgo(4),
      content: 'Llevo dos semanas liada con el trabajo y sin poder practicar apenas. ¿Algún consejo para no perder el ritmo cuando falta tiempo?',
    },
    {
      author: maria, scopeTeacherId: james._id, createdAt: daysAgo(1),
      content: 'Me cuesta muchísimo el speaking, se me traba la lengua con la pronunciación 😅 ¿cómo lo practicáis vosotros?',
    },
    {
      author: diego, scopeTeacherId: james._id, createdAt: daysAgo(3),
      content: 'Acabo de terminar la evaluación de la unidad 3... ¡por fin entendí bien el present perfect!',
      replies: [
        { author: maria, createdAt: daysAgo(2), content: '¡Enhorabuena! A mí también me costó bastante al principio, ya verás que con la práctica se queda.' },
      ],
    },
    {
      author: lucia, scopeTeacherId: sofia._id, createdAt: daysAgo(9),
      content: '¿Alguna recomendación de podcast en inglés para el trayecto al trabajo? Algo de nivel intermedio a poder ser.',
    },
    {
      author: miguel, scopeTeacherId: sofia._id, createdAt: daysAgo(12),
      content: 'Un truco que me funciona bien: veo vídeos cortos en inglés con subtítulos en inglés, no en español. ¡Se nota la mejora en poco tiempo!',
    },
  ];

  for (const { author, scopeTeacherId, createdAt, content, replies = [] } of posts) {
    if (!author) continue; // usuario demo no encontrado (seed de usuarios no ejecutado) — se omite en vez de romper

    const post = await CommunityPostRepository.create({
      author:         author._id,
      type:           CommunityPost.TYPE.POST,
      content,
      scopeTeacherId,
      createdAt,
      commentCount:   replies.length,
    });

    for (const reply of replies) {
      if (!reply.author) continue;
      await CommunityCommentRepository.create({
        post:      post._id,
        author:    reply.author._id,
        content:   reply.content,
        createdAt: reply.createdAt,
      });
    }
  }
};

if (require.main === module) {
  require('../config/env');
  const { connectDB } = require('../config/database');
  const mongoose       = require('mongoose');
  connectDB()
    .then(() => module.exports())
    .then(() => mongoose.disconnect())
    .catch((err) => { console.error(err); process.exit(1); });
}

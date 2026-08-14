'use strict';

const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs:        15 * 60 * 1000,
  max:             5,
  standardHeaders: true,
  legacyHeaders:   false,
  handler: (req, res) => {
    res.status(429).json({
      error:   'TOO_MANY_REQUESTS',
      message: 'Demasiados intentos. Inténtalo en 15 minutos.',
    });
  },
});

// Limiter de escritura para Community (crear posts, comentarios y
// announcements) — protección moderada contra spam sin perjudicar el uso
// normal de una demo de portfolio. Deliberadamente NO reutiliza
// loginLimiter: dominio y mensaje distintos, y compartir la misma instancia
// acoplaría el límite de intentos de login al de creación de contenido sin
// relación real entre ambos.
//
// Exportado también como factory (createCommunityWriteLimiter) para poder
// instanciar una copia aislada con overrides en tests (p.ej. un `max` bajo
// para probar el 429 sin miles de requests), sin tocar el estado en memoria
// del limiter real que montan las rutas — communityWriteLimiter es esa
// instancia de producción, UNA sola, compartida por las tres rutas de
// escritura (no una por endpoint).
const createCommunityWriteLimiter = (overrides = {}) => rateLimit({
  windowMs:        15 * 60 * 1000,
  max:             100,
  standardHeaders: true,
  legacyHeaders:   false,
  handler: (req, res) => {
    res.status(429).json({
      error:   'TOO_MANY_REQUESTS',
      message: 'Has publicado demasiado contenido en Community. Inténtalo de nuevo en unos minutos.',
    });
  },
  ...overrides,
});

const communityWriteLimiter = createCommunityWriteLimiter();

module.exports = { loginLimiter, communityWriteLimiter, createCommunityWriteLimiter };

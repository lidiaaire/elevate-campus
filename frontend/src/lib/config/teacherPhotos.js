/**
 * teacherPhotos.js — Mismo patrón que studentPhotos.js: mapping explícito
 * y aislado de fotografía corporativa por profesor, keyed por email
 * (estable entre reseeds; el _id de Mongo no lo es).
 *
 * Rutas verificadas contra los archivos reales en
 * frontend/public/brand/photography/teachers/ (2026-08-12).
 *
 * Para añadir/actualizar la foto de un profesor: coloca el archivo en la
 * ruta exacta y actualiza aquí si el nombre cambia. No hace falta tocar
 * ningún componente — Avatar la consume vía la prop opcional `photoUrl`.
 */

export const TEACHER_PHOTOS = {
  'emma.johnson@elevate.com': '/brand/photography/teachers/emma-johnson.png',
  'james.parker@elevate.com': '/brand/photography/teachers/james-parker.png',
  'sofia.reyes@elevate.com':  '/brand/photography/teachers/sofia-reyes.png',
};

/**
 * @param {string} [email]
 * @returns {string|null} Ruta de la foto si hay mapping para ese email, o null.
 */
export function getTeacherPhoto(email) {
  if (!email) return null;
  return TEACHER_PHOTOS[email.toLowerCase()] ?? null;
}

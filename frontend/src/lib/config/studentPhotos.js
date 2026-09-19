/**
 * studentPhotos.js — Mapping explícito y aislado de fotografía demo por
 * alumno, keyed por email (estable entre reseeds; el _id de Mongo no lo es).
 *
 * Rutas verificadas contra los archivos reales en
 * frontend/public/brand/photography/students/ (2026-08-12). Si algún
 * archivo no existiera o fallara al cargar, el fallback a Avatar/iniciales
 * se activa automáticamente vía onError — este mapping nunca asume que el
 * archivo esté presente en disco.
 *
 * NOTA: el archivo de Carlos se llama "carlos.rodriguez.png" (con puntos,
 * no guiones) — nombre real del asset ya colocado, no un error de mapping.
 *
 * Para añadir/actualizar la foto de un alumno: coloca el archivo en la
 * ruta exacta y actualiza aquí si el nombre cambia. No hace falta tocar
 * ningún componente.
 */

export const STUDENT_PHOTOS = {
  'sarah.mitchell@demo.com':   '/brand/photography/students/sarah-mitchell.png',
  'nina.kowalski@demo.com':    '/brand/photography/students/nina-kowalski.png',
  'amara.diallo@demo.com':     '/brand/photography/students/amara-diallo.png',
  'carlos.rodriguez@demo.com': '/brand/photography/students/carlos.rodriguez.png',
};

/**
 * @param {string} [email]
 * @returns {string|null} Ruta de la foto si hay mapping para ese email, o null.
 */
export function getStudentPhoto(email) {
  if (!email) return null;
  return STUDENT_PHOTOS[email.toLowerCase()] ?? null;
}

/**
 * DASHBOARD_HERO_IMAGE — asset panorámico definitivo del hero del Dashboard
 * Student. Se muestra igual para cualquier alumno autenticado (no depende
 * de email, a diferencia de STUDENT_PHOTOS). Composición: zona oscura a la
 * izquierda pensada para alojar el texto del hero, estudiante visible a la
 * derecha — ver StudentDashboard.module.css (.heroScene) para el tratamiento
 * a sangre completa que respeta ese encuadre.
 *
 * Punto de sustitución único: para cambiar la imagen del hero, actualizar
 * solo este valor — ningún componente necesita tocarse.
 */
export const DASHBOARD_HERO_IMAGE = '/images/courses/dashboard-students.png';

/**
 * courseVisuals.js — Fuente de verdad de la identidad visual de cada curso.
 *
 * Filosofía: cada curso es una etapa de un viaje, no un nivel académico.
 * La clave es el slug derivado del título oficial del curso en base de datos.
 *
 * coverImage: ruta relativa a /public — preparada para assets definitivos.
 * accentColor: color semántico de la etapa, complementario al naranja de marca.
 *
 * Uso:
 *   import { getCourseVisual, DEFAULT_VISUAL } from '@/lib/config/courseVisuals';
 *   const visual = getCourseVisual(course.title);
 */

export const COURSE_VISUALS = {

  'english-survival-kit': {
    slug:        'english-survival-kit',
    title:       'English Survival Kit',
    level:       'A1',
    tagline:     'Your first words open every door.',
    coverImage:  '/images/courses/A1-course.png',
    accentColor: '#38bdf8',   /* sky-400   — horizonte, primeras posibilidades */
    emotion:     'Descubrimiento',
    scene:       'Aeropuerto internacional. Primer viaje. La confianza de orientarse solo.',
  },

  'english-every-day': {
    slug:        'english-every-day',
    title:       'English Every Day',
    level:       'A2',
    tagline:     'English becomes part of who you are.',
    coverImage:  '/images/courses/A2-course.png',
    accentColor: '#34d399',   /* emerald-400 — crecimiento natural, rutina positiva */
    emotion:     'Confianza',
    scene:       'Cafetería moderna. Portátil abierto. Conversaciones que ya salen solas.',
  },

  'english-unplugged': {
    slug:        'english-unplugged',
    title:       'English Unplugged',
    level:       'B1',
    tagline:     'Stop translating. Start connecting.',
    coverImage:  '/images/courses/B1-course.png',
    accentColor: '#818cf8',   /* indigo-400 — colaboración, flow, pensamiento fluido */
    emotion:     'Colaboración',
    scene:       'Reunión informal entre personas de distintas nacionalidades. Ideas sin fricción.',
  },

  'english-in-depth': {
    slug:        'english-in-depth',
    title:       'English in Depth',
    level:       'B2',
    tagline:     'Lead the conversation. Own the room.',
    coverImage:  '/images/courses/B2-course.png',
    accentColor: '#fbbf24',   /* amber-400 — liderazgo, excelencia, oro */
    emotion:     'Ambición',
    scene:       'Presentación profesional. Liderazgo visible. Equipo internacional.',
  },

};

/**
 * Fallback para cursos sin identidad visual definida.
 * Usa el acento de marca de Elevate.
 */
export const DEFAULT_VISUAL = {
  slug:        null,
  tagline:     'Open your next opportunity.',
  coverImage:  null,
  accentColor: '#FF5722',   /* elevate-accent-500 */
  emotion:     null,
  scene:       null,
};

/**
 * Devuelve la identidad visual de un curso a partir de su título oficial.
 * Normaliza el título a slug para hacer la búsqueda insensible a mayúsculas
 * y espacios extra.
 *
 * @param {string} title - Título del curso tal como lo devuelve la API.
 * @returns {object} Entrada de COURSE_VISUALS o DEFAULT_VISUAL si no hay match.
 */
export function getCourseVisual(title) {
  if (!title) return DEFAULT_VISUAL;
  const slug = title.trim().toLowerCase().replace(/\s+/g, '-');
  return COURSE_VISUALS[slug] ?? DEFAULT_VISUAL;
}

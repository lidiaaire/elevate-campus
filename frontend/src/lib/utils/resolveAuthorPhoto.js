import { getStudentPhoto } from '@/lib/config/studentPhotos';
import { getTeacherPhoto } from '@/lib/config/teacherPhotos';

/**
 * resolveAuthorPhoto — un único punto de resolución de foto para
 * cualquier "autor" de Comunidad (student o teacher), reutilizando los
 * mappings reales ya existentes (studentPhotos.js / teacherPhotos.js) sin
 * duplicarlos. No hardcodea ningún nombre: solo enruta por email según
 * el rol real que venga en los datos.
 *
 * @param {{ email?: string, role?: string }} [author]
 * @returns {string|null} Ruta de la foto, o null (Avatar cae a iniciales).
 */
export function resolveAuthorPhoto(author) {
  if (!author?.email) return null;

  if (author.role === 'teacher') return getTeacherPhoto(author.email);
  if (author.role === 'student') return getStudentPhoto(author.email);

  // role ausente/desconocido: intenta ambos mappings antes de rendirse —
  // nunca asume un rol por defecto.
  return getStudentPhoto(author.email) ?? getTeacherPhoto(author.email);
}

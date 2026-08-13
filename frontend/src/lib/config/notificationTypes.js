/**
 * notificationTypes.js — mapping PRESENTACIONAL del enum real de
 * Notification.type (backend/src/models/notification.model.js:
 * ACHIEVEMENT | CERTIFICATE | BOOKING | RECOMMENDATION | SYSTEM).
 *
 * Solo traduce el DISCRIMINADOR de tipo (un enum fijo y cerrado, no texto
 * libre) — nunca el título/mensaje real de la notificación, que sigue
 * viniendo tal cual del backend. No es traducción heurística: es un
 * lookup exacto por clave conocida.
 *
 * Si el backend añadiera un tipo nuevo no listado aquí, el fallback
 * conserva el valor real en vez de romper o inventar una etiqueta.
 */

export const NOTIFICATION_TYPE_LABEL = {
  ACHIEVEMENT:    'Logro',
  CERTIFICATE:    'Certificado',
  BOOKING:        'Reserva',
  RECOMMENDATION: 'Recomendación',
  SYSTEM:         'Sistema',
};

/**
 * @param {string} type
 * @returns {string} etiqueta en español, o el valor original si no hay mapping.
 */
export function getNotificationTypeLabel(type) {
  return NOTIFICATION_TYPE_LABEL[type] ?? type;
}

'use client';

import { Award, FileCheck, CalendarCheck, Sparkles, Bell } from 'lucide-react';
import { getNotificationTypeLabel } from '@/lib/config/notificationTypes';
import styles from '@/app/(protected)/notifications/Notifications.module.css';

// Mismos iconos que ya usa la ficha de alumno para Logros/Certificados
// (users/[id]/page.js: Award, FileCheck) — coherencia de lenguaje visual,
// no una elección nueva por pantalla.
const TYPE_ICON = {
  ACHIEVEMENT:    Award,
  CERTIFICATE:    FileCheck,
  BOOKING:        CalendarCheck,
  RECOMMENDATION: Sparkles,
  SYSTEM:         Bell,
};

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

export default function NotificationCard({ notification, onMarkRead, index = 0 }) {
  // El backend expone createdAtNotification (campo propio del modelo), no el
  // createdAt automático de Mongoose — de ahí que createdAt viniera undefined.
  const { _id, title, message, type, isRead, createdAtNotification } = notification;
  const Icon = TYPE_ICON[type] ?? Bell;
  const typeLabel = getNotificationTypeLabel(type);

  const inner = (
    <>
      <span className={styles.icon} aria-hidden="true"><Icon size={16} /></span>
      <div className={styles.body}>
        <div className={styles.mainRow}>
          <p className={styles.title}>{title}</p>
          <span className={styles.date}>{formatDate(createdAtNotification)}</span>
        </div>
        <p className={styles.message}>{message}</p>
        <div className={styles.meta}>
          <span className={styles.typeTag}>{typeLabel}</span>
          {!isRead && <span className={styles.unreadTag}>Nueva</span>}
        </div>
      </div>
    </>
  );

  return (
    <li
      className={`${styles.item} ${!isRead ? styles.itemUnread : ''}`}
      style={{ '--stagger': index }}
    >
      {isRead ? (
        <div className={styles.itemInner}>{inner}</div>
      ) : (
        <button
          type="button"
          className={styles.itemInner}
          onClick={() => onMarkRead(_id)}
        >
          {inner}
        </button>
      )}
    </li>
  );
}

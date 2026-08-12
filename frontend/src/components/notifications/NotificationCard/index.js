'use client';

import styles from '@/styles/Notifications.module.css';

export default function NotificationCard({ notification }) {
  // El backend expone createdAtNotification (campo propio del modelo), no el
  // createdAt automático de Mongoose — de ahí que createdAt viniera undefined.
  const { title, message, type, isRead, createdAtNotification } = notification;

  return (
    <li className={`${styles.card} ${!isRead ? styles.cardUnread : ''}`}>
      {!isRead && (
        <span className={styles.unreadDot} aria-hidden="true" />
      )}
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        <p className={styles.message}>{message}</p>
        <div className={styles.meta}>
          <span className={styles.badge}>{type}</span>
          <span className={styles.badge}>{isRead ? 'Leída' : 'No leída'}</span>
          <span>{new Date(createdAtNotification).toLocaleDateString('es-ES')}</span>
        </div>
      </div>
    </li>
  );
}

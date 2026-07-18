'use client';

import styles from './Toast.module.css';

const VARIANT_ICON = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
};

export function Toast({ id, message, variant = 'info', onDismiss }) {
  return (
    <div
      className={`${styles.toast} ${styles[variant]}`}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      <span className={styles.icon} aria-hidden="true">
        {VARIANT_ICON[variant]}
      </span>
      <span className={styles.message}>{message}</span>
      <button
        className={styles.close}
        onClick={() => onDismiss(id)}
        aria-label="Cerrar notificación"
      >
        ×
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onDismiss }) {
  if (!toasts.length) return null;
  return (
    <div className={styles.container} aria-label="Notificaciones">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

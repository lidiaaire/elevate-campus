import styles from './LoadingState.module.css';

export default function LoadingState({ message = 'Cargando...' }) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.message}>{message}</p>
    </div>
  );
}

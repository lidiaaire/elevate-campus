import styles from './ErrorState.module.css';

export default function ErrorState({ message }) {
  return (
    <div className={styles.wrapper} role="alert">
      <span className={styles.icon} aria-hidden="true">✕</span>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

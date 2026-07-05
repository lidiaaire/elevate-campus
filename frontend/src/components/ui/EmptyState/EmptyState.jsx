import styles from './EmptyState.module.css';

export default function EmptyState({ title, description }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">◯</span>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}

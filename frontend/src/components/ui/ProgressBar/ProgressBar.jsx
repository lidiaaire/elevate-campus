import styles from './ProgressBar.module.css';

export default function ProgressBar({ value, ariaLabel }) {
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div className={styles.track}>
      <div
        className={styles.fill}
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      />
    </div>
  );
}

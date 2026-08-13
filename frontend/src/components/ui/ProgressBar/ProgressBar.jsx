import styles from './ProgressBar.module.css';

/**
 * ProgressBar — Design System v2.0
 *
 * @param {number} value
 * @param {string} [ariaLabel]
 * @param {'default'|'accent'} [variant] - 'accent' (naranja de marca) se
 *   reserva al único indicador protagonista de la vista (p. ej. el
 *   progreso global del hero del Student Dashboard). El resto usa
 *   'default' (grafito).
 */
export default function ProgressBar({ value, ariaLabel, variant = 'default' }) {
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div className={styles.track}>
      <div
        className={`${styles.fill} ${variant === 'accent' ? styles.fillAccent : ''}`}
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

import styles from './StatCard.module.css';

/**
 * StatCard — Design System v1.0
 *
 * Tarjeta de métrica reutilizable para dashboards y vistas de resumen.
 *
 * @param {'default'|'brand'|'success'|'warning'|'danger'} variant
 * @param {string}    title           - Etiqueta de la métrica (requerido)
 * @param {string|number} value       - Valor principal a destacar (requerido)
 * @param {string}    [subtitle]      - Texto de contexto secundario
 * @param {ReactNode} [icon]          - Icono SVG o elemento visual decorativo
 * @param {{ direction: 'up'|'down'|'neutral', value: string, label?: string }} [trend]
 *   - Indicador de tendencia con dirección, valor numérico y etiqueta opcional
 * @param {ElementType} as            - Elemento HTML a renderizar (default: 'div')
 */
export default function StatCard({
  variant = 'default',
  title,
  value,
  subtitle,
  icon,
  trend,
  as: Tag = 'div',
  className = '',
  ...props
}) {
  const cls = [
    styles.card,
    styles[variant],
    className || null,
  ].filter(Boolean).join(' ');

  return (
    <Tag className={cls} {...props}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      </div>

      <div className={styles.body}>
        <span className={styles.value}>{value}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </div>

      {trend && (
        <div className={styles.footer}>
          <TrendIndicator direction={trend.direction} value={trend.value} />
          {trend.label && (
            <span className={styles.trendLabel}>{trend.label}</span>
          )}
        </div>
      )}
    </Tag>
  );
}

function TrendIndicator({ direction, value }) {
  const cls = [
    styles.trend,
    styles[`trend--${direction}`],
  ].filter(Boolean).join(' ');

  return (
    <span className={cls}>
      <TrendArrow direction={direction} />
      <span>{value}</span>
    </span>
  );
}

function TrendArrow({ direction }) {
  if (direction === 'up') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M6 2L10 7H2L6 2Z" fill="currentColor" />
      </svg>
    );
  }
  if (direction === 'down') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M6 10L2 5H10L6 10Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="1" y="5" width="10" height="2" fill="currentColor" />
    </svg>
  );
}

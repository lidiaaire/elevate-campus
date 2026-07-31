import styles from './Button.module.css';

function Spinner() {
  return <span className={styles.spinner} aria-hidden="true" />;
}

/**
 * Button — Design System v1.0
 *
 * @param {'primary'|'secondary'|'ghost'|'danger'|'success'|'link'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} loading      - Muestra spinner y bloquea interacción
 * @param {boolean} disabled     - Estado deshabilitado
 * @param {ReactNode} iconLeft   - Icono a la izquierda del label
 * @param {ReactNode} iconRight  - Icono a la derecha del label
 * @param {boolean} iconOnly     - Botón cuadrado sin label visible (requiere aria-label)
 * @param {string|number} badge  - Número/texto en badge de conteo
 * @param {boolean} groupActive  - Estado activo dentro de un ButtonGroup
 * @param {'button'|'submit'|'reset'} type
 * @param {ElementType} as       - Elemento HTML a renderizar (default: 'button')
 */
export default function Button({
  ref,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  iconOnly = false,
  badge = null,
  groupActive = false,
  type = 'button',
  as: Tag = 'button',
  className = '',
  children,
  ...props
}) {
  const isDisabled = disabled || loading;

  const cls = [
    styles.button,
    styles[variant],
    styles[size],
    iconOnly    ? styles.iconOnly    : null,
    loading     ? styles.loading     : null,
    groupActive ? styles.groupActive : null,
    className   || null,
  ].filter(Boolean).join(' ');

  return (
    <Tag
      ref={ref}
      type={Tag === 'button' ? type : undefined}
      disabled={Tag === 'button' ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      className={cls}
      {...props}
    >
      {/* Spinner sustituye al icono izquierdo en loading */}
      {loading ? (
        <Spinner />
      ) : iconLeft ? (
        <span className={styles.iconSlot} aria-hidden="true">{iconLeft}</span>
      ) : null}

      {/* Label: oculto en iconOnly */}
      {!iconOnly && children}

      {/* Icono derecho: no se muestra en loading */}
      {!loading && iconRight && (
        <span className={styles.iconSlot} aria-hidden="true">{iconRight}</span>
      )}

      {/* Badge de conteo */}
      {badge !== null && badge !== undefined && (
        <span className={styles.badge} aria-hidden="true">{badge}</span>
      )}
    </Tag>
  );
}

/**
 * ButtonGroup — Agrupa botones secondary como unidad visual.
 * Solo para botones secondary. El botón activo recibe la prop groupActive.
 */
export function ButtonGroup({ children, className = '', ...props }) {
  return (
    <div
      className={[styles.group, className].filter(Boolean).join(' ')}
      role="group"
      {...props}
    >
      {children}
    </div>
  );
}

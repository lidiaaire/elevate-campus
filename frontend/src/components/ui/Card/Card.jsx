import styles from './Card.module.css';

/**
 * Card — Design System v1.0
 *
 * @param {'default'|'elevated'|'outlined'|'filled'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} clickable    - Habilita hover/active y cursor pointer
 * @param {boolean} selected     - Estado seleccionado (resaltado con brand)
 * @param {boolean} disabled     - Estado deshabilitado
 * @param {boolean} noPadding    - Elimina el padding interno (útil cuando CardBody gestiona su propio padding)
 * @param {ElementType} as       - Elemento HTML a renderizar (default: 'div')
 */
export default function Card({
  variant = 'default',
  size = 'md',
  clickable = false,
  selected = false,
  disabled = false,
  noPadding = false,
  as: Tag = 'div',
  className = '',
  children,
  ...props
}) {
  const cls = [
    styles.card,
    styles[variant],
    styles[size],
    clickable  ? styles.clickable  : null,
    selected   ? styles.selected   : null,
    disabled   ? styles.disabled   : null,
    noPadding  ? styles.noPadding  : null,
    className  || null,
  ].filter(Boolean).join(' ');

  return (
    <Tag
      className={cls}
      aria-disabled={disabled || undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}

/**
 * CardHeader — Sección superior de la Card.
 * Distribuye título + actions en una fila.
 *
 * @param {ReactNode} actions  - Nodo opcional (botones, badges) alineado a la derecha
 * @param {boolean} divided    - Añade separador inferior
 */
export function CardHeader({ actions = null, divided = false, className = '', children, ...props }) {
  const cls = [
    styles.header,
    divided  ? styles.headerDivided : null,
    className || null,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} {...props}>
      <div className={styles.headerContent}>{children}</div>
      {actions && <div className={styles.headerActions}>{actions}</div>}
    </div>
  );
}

/**
 * CardBody — Área de contenido principal.
 * Ocupa el espacio disponible con flex: 1.
 */
export function CardBody({ className = '', children, ...props }) {
  return (
    <div className={[styles.body, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
}

/**
 * CardFooter — Sección inferior de la Card.
 *
 * @param {'start'|'end'|'between'|'center'} align  - Alineación horizontal del contenido
 * @param {boolean} divided                          - Añade separador superior
 */
export function CardFooter({
  align = 'end',
  divided = false,
  className = '',
  children,
  ...props
}) {
  const cls = [
    styles.footer,
    styles[`footerAlign${align.charAt(0).toUpperCase() + align.slice(1)}`],
    divided ? styles.footerDivided : null,
    className || null,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} {...props}>
      {children}
    </div>
  );
}

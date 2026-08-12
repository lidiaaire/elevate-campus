import styles from './Avatar.module.css';

const ROLE_VARIANT = {
  admin:   'warning',
  teacher: 'success',
  student: 'brand',
};

function initialsOf(firstName = '', lastName = '') {
  const a = firstName.trim().charAt(0);
  const b = lastName.trim().charAt(0);
  return `${a}${b}`.toUpperCase() || '?';
}

/**
 * Avatar — círculo de iniciales reutilizable (Design System v1.0).
 * Sin foto real disponible en el modelo de usuario: iniciales + color por rol
 * dan identidad visual consistente en tablas/listas de personas.
 *
 * @param {string} firstName
 * @param {string} [lastName]
 * @param {'admin'|'teacher'|'student'} [role]  - determina el color (default: brand)
 * @param {'sm'|'md'} [size]
 */
export default function Avatar({ firstName, lastName = '', role, size = 'md', className = '' }) {
  const variant = ROLE_VARIANT[role] ?? 'brand';
  const cls = [styles.avatar, styles[variant], styles[size], className || null]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={cls} aria-hidden="true">
      {initialsOf(firstName, lastName)}
    </span>
  );
}

import styles from './StudentSectionHeader.module.css';

/**
 * StudentSectionHeader — Design System v2.0 (dark Elevate)
 *
 * Cabecera editorial compacta para las páginas secundarias del alumno
 * (Notificaciones, Skill Radar, Logros, Certificados, Evaluaciones).
 * Variante reducida del hero de StudentDashboard: mismo gradiente de
 * marca, sin columna de foto, pensada para encabezar contenido en vez
 * de protagonizar toda la pantalla.
 *
 * @param {string}    [eyebrow]     - Etiqueta corta en mayúsculas sobre el título
 * @param {string}    title         - Título de la sección (requerido)
 * @param {string}    [description] - Contexto/resumen textual
 * @param {ReactNode} [actions]     - Botón(es) de acción, alineados a la derecha
 * @param {ReactNode} [children]    - Slot opcional de resumen (p. ej. StatCard)
 */
export default function StudentSectionHeader({ eyebrow, title, description, actions, children }) {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.text}>
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {children && <div className={styles.summary}>{children}</div>}
    </header>
  );
}

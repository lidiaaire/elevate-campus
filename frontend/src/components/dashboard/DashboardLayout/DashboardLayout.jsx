import PageHeader from '@/components/ui/PageHeader';
import styles from './DashboardLayout.module.css';

/**
 * DashboardLayout — infraestructura visual compartida por los dashboards de rol.
 *
 * Sin conocimiento de datos, hooks, servicios, loading, error, permisos ni roles:
 * solo compone PageHeader + el wrapper de página que cada dashboard ya usaba.
 *
 * @param {string}    title
 * @param {string}    [description]
 * @param {ReactNode} [actions]
 */
export default function DashboardLayout({ title, description, actions, children }) {
  return (
    <div className={styles.page}>
      <PageHeader title={title} description={description} actions={actions} />
      {children}
    </div>
  );
}

/**
 * DashboardSection — bloque de sección con título opcional en mayúsculas,
 * mismo tratamiento visual ya usado en AdminDashboard/TeacherDashboard.
 *
 * @param {string} [title]
 */
export function DashboardSection({ title, className = '', children, ...props }) {
  const cls = [styles.section, className || null].filter(Boolean).join(' ');

  return (
    <section className={cls} {...props}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      {children}
    </section>
  );
}

/**
 * DashboardStatGrid — grid de StatCards en <ul>, con ancho mínimo de columna
 * configurable para reproducir los distintos grids ya usados por rol.
 *
 * @param {string} [minWidth] - ancho mínimo de columna (default: '172px')
 */
export function DashboardStatGrid({ minWidth = '172px', className = '', children, ...props }) {
  const cls = [styles.statGrid, className || null].filter(Boolean).join(' ');

  return (
    <ul className={cls} style={{ '--dashboard-stat-grid-min': minWidth }} {...props}>
      {children}
    </ul>
  );
}

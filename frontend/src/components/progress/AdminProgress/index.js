'use client';

import { useAuth }          from '@/hooks/useAuth';
import { useAsyncData }     from '@/hooks/useAsyncData';
import { dashboardService } from '@/lib/services/dashboard.service';
import PageHeader   from '@/components/ui/PageHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState    from '@/components/ui/ErrorState';
import EmptyState    from '@/components/ui/EmptyState';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import ProgressBar   from '@/components/ui/ProgressBar';
import styles from './AdminProgress.module.css';

function StatCard({ value, label }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statValue}>{value ?? '—'}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function CourseProgressCard({ course }) {
  const { title, level, avgProgress, totalEnrollments, activeEnrollments, completedEnrollments } = course;

  return (
    <Card variant="default" noPadding className={styles.card}>
      <CardHeader>
        <h3 className={styles.courseTitle}>{title}</h3>
        {level && <span className={styles.level}>{level}</span>}
      </CardHeader>
      <CardBody>
        <div className={styles.progressRow}>
          <span className={styles.progressPct}>{avgProgress}%</span>
          <span className={styles.progressMeta}>
            {activeEnrollments} activas · {completedEnrollments} completadas de {totalEnrollments}
          </span>
        </div>
        <ProgressBar value={avgProgress} ariaLabel={`Progreso medio de ${title}`} />
      </CardBody>
    </Card>
  );
}

/**
 * Progreso de cursos y plataforma: evolución del aprendizaje agregada.
 * Distinto del Dashboard (que responde "qué está ocurriendo ahora":
 * usuarios, actividad diaria, alumnos en riesgo) — aquí el foco es
 * exclusivamente el progreso medio por curso y su crecimiento.
 */
export default function AdminProgress() {
  const { token } = useAuth();
  const { data, loading, error } = useAsyncData(() =>
    dashboardService.getAdminDashboard(token)
  );

  if (loading) return <LoadingState message="Cargando progreso..." />;
  if (error)   return <ErrorState message={error} />;

  const platformGrowth = data?.platformGrowth ?? {};
  const coursesSummary = data?.coursesSummary ?? [];

  return (
    <div className={styles.page}>
      <PageHeader
        title="Progreso de cursos y plataforma"
        description="Evolución del aprendizaje en la plataforma"
      />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Evolución reciente</h2>
        <div className={styles.statsGrid}>
          <StatCard value={platformGrowth.lessonsCompleted7d}  label="Lecciones completadas (7 días)" />
          <StatCard value={platformGrowth.lessonsCompleted30d} label="Lecciones completadas (30 días)" />
          <StatCard value={platformGrowth.assessmentsPassed30d} label="Evaluaciones superadas (30 días)" />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Progreso por curso</h2>
        {coursesSummary.length === 0 ? (
          <EmptyState title="No hay cursos registrados." />
        ) : (
          <div className={styles.grid}>
            {coursesSummary.map((c) => (
              <CourseProgressCard key={String(c.courseId)} course={c} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

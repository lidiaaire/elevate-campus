'use client';

import Link from 'next/link';
import { useAuth }           from '@/hooks/useAuth';
import { useAsyncData }      from '@/hooks/useAsyncData';
import { dashboardService }  from '@/lib/services/dashboard.service';
import StudentSectionHeader from '@/components/dashboard/student/StudentSectionHeader';
import StatCard     from '@/components/ui/StatCard';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState   from '@/components/ui/ErrorState';
import EmptyState   from '@/components/ui/EmptyState';
import Button       from '@/components/ui/Button';
import styles from './Assessments.module.css';

function attemptsLeft(a) {
  return a.maxAttempts - a.attemptsUsed;
}

function AssessmentCard({ assessment, featured = false }) {
  const left  = attemptsLeft(assessment);
  const href  = `/courses/${assessment.courseId}/units/${assessment.unitId}/assessment`;
  const isNew = assessment.attemptsUsed === 0;

  return (
    <div className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}>
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <div>
            <h3 className={styles.cardTitle}>{assessment.assessmentTitle}</h3>
            <p className={styles.cardMeta}>
              {assessment.courseTitle}
              {assessment.unitTitle && <> · {assessment.unitTitle}</>}
            </p>
          </div>
          <span className={`${styles.badge} ${isNew ? styles.badgeNew : styles.badgeRetry}`}>
            {isNew ? 'Nuevo' : 'Reintentar'}
          </span>
        </div>

        <div className={styles.attemptsRow}>
          <span className={styles.attemptsLabel}>Intentos usados</span>
          <span className={styles.attemptsVal}>
            {assessment.attemptsUsed} / {assessment.maxAttempts}
          </span>
        </div>

        <div className={styles.attemptsDots}>
          {Array.from({ length: assessment.maxAttempts }).map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i < assessment.attemptsUsed ? styles.dotUsed : styles.dotFree}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.attemptsLeftText}>
          {left} intento{left !== 1 ? 's' : ''} restante{left !== 1 ? 's' : ''}
        </span>
        <Button as={Link} href={href} variant="primary" size={featured ? 'md' : 'sm'}>
          {isNew ? 'Realizar' : 'Reintentar'} →
        </Button>
      </div>
    </div>
  );
}

export default function AssessmentsPage() {
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(() =>
    dashboardService.getStudentDashboard(token)
  );

  if (loading) return <LoadingState message="Cargando evaluaciones..." />;
  if (error)   return <ErrorState message={error} />;

  const pending  = data?.pendingAssessments ?? [];
  const summary  = data?.summary ?? {};
  const total    = summary.assessmentsTotal  ?? 0;
  const passed   = summary.assessmentsPassed ?? 0;
  const avgScore = summary.avgBestScore;

  return (
    <div className={styles.page}>
      <StudentSectionHeader
        eyebrow="Evaluación"
        title="Evaluaciones"
        description={`${pending.length} pendiente${pending.length !== 1 ? 's' : ''}`}
      >
        {total > 0 && (
          <>
            <StatCard title="Superadas" value={passed} />
            <StatCard title="Total" value={total} />
            {avgScore !== null && avgScore !== undefined && (
              <StatCard title="Media mejor nota" value={`${avgScore}%`} />
            )}
            <StatCard
              variant={passed === total ? 'success' : 'default'}
              title="Tasa de éxito"
              value={total === 0 ? '—' : `${Math.round((passed / total) * 100)}%`}
            />
          </>
        )}
      </StudentSectionHeader>

      {/* Lista pendientes */}
      {pending.length === 0 ? (
        <EmptyState
          title="No hay evaluaciones pendientes"
          description="Completa todas las lecciones de una unidad para desbloquear su evaluación."
        />
      ) : (
        <section>
          <h2 className={styles.sectionTitle}>Pendientes</h2>
          <div className={pending.length === 1 ? styles.gridSingle : styles.grid}>
            {pending.map((a) => (
              <AssessmentCard key={String(a.assessmentId)} assessment={a} featured={pending.length === 1} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

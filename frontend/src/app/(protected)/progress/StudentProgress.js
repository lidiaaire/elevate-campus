'use client';

import Link from 'next/link';
import { useAuth }          from '@/hooks/useAuth';
import { useAsyncData }     from '@/hooks/useAsyncData';
import { dashboardService } from '@/lib/services/dashboard.service';
import { getCourseVisual }  from '@/lib/config/courseVisuals';
import PageHeader        from '@/components/ui/PageHeader';
import LoadingState      from '@/components/ui/LoadingState';
import ErrorState        from '@/components/ui/ErrorState';
import EmptyState        from '@/components/ui/EmptyState';
import ProgressBar       from '@/components/ui/ProgressBar';
import StatCard          from '@/components/ui/StatCard';
import SkillProgressList from '@/components/dashboard/student/SkillProgressList';
import styles from './Progress.module.css';

function CourseProgressRow({ enrollment }) {
  const visual = getCourseVisual(enrollment.courseTitle);
  const pct    = enrollment.overallProgress ?? 0;
  const done   = enrollment.enrollmentStatus === 'completed';

  return (
    <Link href={`/courses/${enrollment.courseId}`} className={styles.courseRow}>
      <div
        className={styles.courseAccent}
        style={{ background: visual.accentColor }}
      />
      <div className={styles.courseInfo}>
        <div className={styles.courseTopRow}>
          <span className={styles.courseTitle}>{enrollment.courseTitle}</span>
          <span className={`${styles.coursePct} ${done ? styles.pctDone : ''}`}>{pct}%</span>
        </div>
        <ProgressBar value={pct} ariaLabel={`Progreso ${enrollment.courseTitle}`} />
        <span className={styles.courseMeta}>
          {enrollment.completedLessons} de {enrollment.totalLessons} lecciones completadas
        </span>
      </div>
      {done && <span className={styles.doneCheck}>✓</span>}
    </Link>
  );
}

function RecentActivityRow({ item }) {
  const date = new Date(item.completedAt).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'short',
  });
  return (
    <div className={styles.activityRow}>
      <span className={styles.activityDot} />
      <div className={styles.activityInfo}>
        <span className={styles.activityLesson}>{item.lessonTitle}</span>
        <span className={styles.activityCourse}>{item.courseTitle}</span>
      </div>
      <span className={styles.activityDate}>{date}</span>
    </div>
  );
}

export default function StudentProgress() {
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(() =>
    dashboardService.getStudentDashboard(token)
  );

  if (loading) return <LoadingState message="Cargando progreso..." />;
  if (error)   return <ErrorState message={error} />;

  const summary        = data?.summary        ?? {};
  const growth         = data?.growth         ?? {};
  const skillProgress  = data?.skillProgress  ?? {};
  const enrollments    = data?.enrollments    ?? [];
  const recentActivity = data?.recentActivity ?? [];

  const hasEnrollments = enrollments.length > 0;

  return (
    <div className={styles.page}>
      <PageHeader
        title="Mi progreso"
        description="Resumen de tu evolución en la plataforma"
      />

      {/* ── Resumen global ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Resumen global</h2>
        <div className={styles.statsGrid}>
          <StatCard
            value={`${summary.overallProgressAvg ?? 0}%`}
            title="Progreso global"
            subtitle={`${summary.totalEnrollments ?? 0} curso${summary.totalEnrollments !== 1 ? 's' : ''}`}
          />
          <StatCard
            value={summary.streakDays ?? 0}
            title="Días de racha"
            subtitle={summary.streakDays > 0 ? 'Sigue así' : 'Empieza hoy'}
          />
          <StatCard
            value={summary.totalLessonsCompleted ?? 0}
            title="Lecciones completadas"
            subtitle={`de ${summary.totalLessons ?? 0} totales`}
          />
          <StatCard
            value={
              summary.assessmentsTotal > 0
                ? `${summary.assessmentsPassed} / ${summary.assessmentsTotal}`
                : '—'
            }
            title="Evaluaciones superadas"
            subtitle={summary.avgBestScore != null ? `Media: ${summary.avgBestScore}%` : undefined}
          />
        </div>
      </section>

      {/* ── Evolución reciente ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Evolución reciente</h2>
        <div className={styles.growthGrid}>
          <div className={styles.growthCard}>
            <span className={styles.growthPeriod}>Últimos 7 días</span>
            <div className={styles.growthStats}>
              <div className={styles.growthStat}>
                <span className={styles.growthVal}>{growth.lessonsCompleted7d ?? 0}</span>
                <span className={styles.growthLabel}>Lecciones</span>
              </div>
              <div className={styles.growthDivider} />
              <div className={styles.growthStat}>
                <span className={styles.growthVal}>{growth.progressGained7d ?? 0}%</span>
                <span className={styles.growthLabel}>Progreso ganado</span>
              </div>
            </div>
          </div>
          <div className={styles.growthCard}>
            <span className={styles.growthPeriod}>Últimos 30 días</span>
            <div className={styles.growthStats}>
              <div className={styles.growthStat}>
                <span className={styles.growthVal}>{growth.lessonsCompleted30d ?? 0}</span>
                <span className={styles.growthLabel}>Lecciones</span>
              </div>
              <div className={styles.growthDivider} />
              <div className={styles.growthStat}>
                <span className={styles.growthVal}>{growth.progressGained30d ?? 0}%</span>
                <span className={styles.growthLabel}>Progreso ganado</span>
              </div>
            </div>
          </div>
          {growth.assessmentsPassed30d > 0 && (
            <div className={`${styles.growthCard} ${styles.growthCardAccent}`}>
              <span className={styles.growthPeriod}>Últimos 30 días</span>
              <div className={styles.growthStats}>
                <div className={styles.growthStat}>
                  <span className={styles.growthVal}>{growth.assessmentsPassed30d}</span>
                  <span className={styles.growthLabel}>Evaluaciones superadas</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Progreso por curso ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Progreso por curso</h2>
        {!hasEnrollments ? (
          <EmptyState title="Aún no estás matriculado en ningún curso." />
        ) : (
          <div className={styles.courseList}>
            {enrollments.map((e) => (
              <CourseProgressRow key={String(e.courseId)} enrollment={e} />
            ))}
          </div>
        )}
      </section>

      {/* ── Competencias ── */}
      {hasEnrollments && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Competencias lingüísticas</h2>
          <SkillProgressList skillProgress={skillProgress} />
        </section>
      )}

      {/* ── Actividad reciente ── */}
      {recentActivity.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Actividad reciente</h2>
          <div className={styles.activityList}>
            {recentActivity.map((item, i) => (
              <RecentActivityRow key={i} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

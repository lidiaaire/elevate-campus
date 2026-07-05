'use client';

import { useAuth } from '@/hooks/useAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { progressService } from '@/lib/services/progress.service';
import { buildCourseMap } from '@/lib/resolvers';
import PageHeader from '@/components/ui/PageHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/Progress.module.css';

export default function ProgressPage() {
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(() =>
    Promise.all([
      progressService.getOverview(token),
      buildCourseMap(token),
    ]).then(([progressData, map]) => ({
      overview:  progressData.overview ?? [],
      courseMap: map,
    })),
  );

  const overview  = data?.overview  ?? [];
  const courseMap = data?.courseMap ?? {};

  if (loading) return <LoadingState message="Cargando progreso…" />;
  if (error)   return <ErrorState message={error} />;

  return (
    <div className={styles.page}>
      <PageHeader title="Mi progreso" />

      {overview.length === 0 ? (
        <EmptyState title="No hay cursos con progreso registrado." />
      ) : (
        <div className={styles.list}>
          {overview.map((item) => (
            <div key={item.enrollmentId} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.courseName}>
                  {courseMap[item.courseId] ?? item.courseId}
                </span>
                <span className={styles.percent}>{item.overallProgress}%</span>
              </div>

              <div className={styles.track}>
                <div
                  className={styles.bar}
                  style={{ width: `${item.overallProgress}%` }}
                />
              </div>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Completadas</span>
                  <span className={styles.statValue}>{item.completedLessons}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Total</span>
                  <span className={styles.statValue}>{item.totalLessons}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

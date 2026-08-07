'use client';

import { useEffect, useState } from 'react';
import { useAuth }                    from '@/hooks/useAuth';
import { dashboardService }           from '@/lib/services/dashboard.service';
import { teacherAnalyticsService }    from '@/lib/services/teacher-analytics.service';
import CohortComparisonTable          from '@/components/teacher-analytics/CohortComparisonTable';
import InactivityRanking              from '@/components/teacher-analytics/InactivityRanking';
import AssessmentBreakdownTable       from '@/components/teacher-analytics/AssessmentBreakdownTable';
import StudentWeeklyTrendPanel        from '@/components/teacher-analytics/StudentWeeklyTrendPanel';
import PageHeader                     from '@/components/ui/PageHeader';
import LoadingState                   from '@/components/ui/LoadingState';
import ErrorState                     from '@/components/ui/ErrorState';
import styles from './TeacherAnalytics.module.css';

export default function TeacherAnalyticsPage() {
  const { token } = useAuth();

  const [teacherDashboard,  setTeacherDashboard]  = useState(null);
  const [assessments,       setAssessments]        = useState(null);
  const [loading,           setLoading]            = useState(true);
  const [error,             setError]              = useState(null);

  const [selectedStudentId, setSelectedStudentId]  = useState(null);
  const [weeklyTrend,       setWeeklyTrend]        = useState(null);
  const [trendLoading,      setTrendLoading]       = useState(false);

  useEffect(() => {
    Promise.all([
      dashboardService.getTeacherDashboard(token),
      teacherAnalyticsService.getAssessmentBreakdown(token),
    ])
      .then(([dashboard, breakdown]) => {
        setTeacherDashboard(dashboard);
        setAssessments(breakdown);
      })
      .catch((err) => setError(err.message ?? 'Error desconocido'))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (!selectedStudentId) return;

    setTrendLoading(true);
    teacherAnalyticsService.getWeeklyTrend(selectedStudentId, token)
      .then((res) => setWeeklyTrend(res))
      .finally(() => setTrendLoading(false));
  }, [token, selectedStudentId]);

  if (loading) return <LoadingState message="Cargando Teacher Analytics..." />;
  if (error)   return <ErrorState message={error} />;

  return (
    <div className={styles.page}>
      <PageHeader
        title="Teacher Analytics"
        description="Rendimiento y actividad de tu cohorte de alumnos"
      />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Comparativa de la cohorte</h2>
        <CohortComparisonTable
          students={teacherDashboard.students}
          cohortProgressAvg={teacherDashboard.cohortSummary.cohortProgressAvg}
          onSelectStudent={setSelectedStudentId}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Ranking de inactividad</h2>
        <InactivityRanking students={teacherDashboard.students} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Desglose de evaluaciones</h2>
        <AssessmentBreakdownTable assessments={assessments} />
      </section>

      {selectedStudentId && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tendencia semanal del alumno seleccionado</h2>
          {trendLoading ? (
            <p className={styles.trendNote}>Cargando tendencia...</p>
          ) : (
            <StudentWeeklyTrendPanel weeklyTrend={weeklyTrend ?? []} />
          )}
        </section>
      )}
    </div>
  );
}

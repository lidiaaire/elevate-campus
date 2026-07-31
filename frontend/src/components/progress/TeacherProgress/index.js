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
import styles from './TeacherProgress.module.css';

function StudentProgressCard({ student }) {
  const { firstName, lastName, enrollments } = student;

  return (
    <Card variant="default" noPadding>
      <CardHeader divided>
        <h3 className={styles.studentName}>{firstName} {lastName}</h3>
      </CardHeader>
      <CardBody>
        {enrollments.length === 0 ? (
          <p className={styles.emptyText}>Sin cursos activos.</p>
        ) : (
          <div className={styles.courseList}>
            {enrollments.map((e) => (
              <div key={String(e.courseId)} className={styles.courseRow}>
                <div className={styles.courseTopRow}>
                  <span className={styles.courseTitle}>{e.courseTitle}</span>
                  <span className={styles.coursePct}>{e.overallProgress}%</span>
                </div>
                <ProgressBar
                  value={e.overallProgress}
                  ariaLabel={`Progreso de ${firstName} ${lastName} en ${e.courseTitle}`}
                />
                <span className={styles.courseMeta}>
                  {e.completedLessons} / {e.totalLessons} lecciones
                </span>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}

/**
 * Progreso de la cohorte del profesor: evolución del aprendizaje por
 * alumno y curso. Distinto del Dashboard (que responde "qué está
 * ocurriendo ahora": alumnos activos/en riesgo hoy) — aquí se muestra
 * el desglose de progreso por curso de cada alumno, dato que el
 * Dashboard no despliega.
 */
export default function TeacherProgress() {
  const { token } = useAuth();
  const { data, loading, error } = useAsyncData(() =>
    dashboardService.getTeacherDashboard(token)
  );

  if (loading) return <LoadingState message="Cargando progreso..." />;
  if (error)   return <ErrorState message={error} />;

  const students = data?.students ?? [];

  return (
    <div className={styles.page}>
      <PageHeader
        title="Progreso de tus alumnos"
        description="Evolución del aprendizaje por alumno y curso"
      />

      {students.length === 0 ? (
        <EmptyState title="No tienes alumnos asignados." />
      ) : (
        <div className={styles.studentList}>
          {students.map((s) => (
            <StudentProgressCard key={String(s.studentId)} student={s} />
          ))}
        </div>
      )}
    </div>
  );
}

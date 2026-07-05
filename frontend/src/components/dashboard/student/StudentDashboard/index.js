'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { dashboardService } from '@/lib/services/dashboard.service';
import LoadingState  from '@/components/ui/LoadingState';
import ErrorState    from '@/components/ui/ErrorState';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import CourseProgressCard from '@/components/dashboard/student/CourseProgressCard';
import AssessmentSummary  from '@/components/dashboard/student/AssessmentSummary';
import SkillProgressList  from '@/components/dashboard/student/SkillProgressList';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import styles from './StudentDashboard.module.css';

export default function StudentDashboard() {
  const { token } = useAuth();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    dashboardService.getStudentDashboard(token)
      .then((res) => setData(res))
      .catch((err) => setError(err.message ?? 'Error desconocido'))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <LoadingState message="Cargando tu progreso..." />;
  if (error)   return <ErrorState message="No se pudo cargar tu progreso. Inténtalo de nuevo." />;

  const { profile, summary, growth, skillProgress, enrollments, continueLearning } = data;

  const lessonHref      = continueLearning
    ? `/courses/${continueLearning.courseId}/units/${continueLearning.unitId}/lessons/${continueLearning.lessonId}`
    : null;
  const activeCourseVisual = getCourseVisual(continueLearning?.courseTitle);

  return (
    <div className={styles.dashboard}>

      {/* Hero */}
      <Card variant="elevated" noPadding>
        <CardBody className={styles.heroBody}>
          <div className={styles.heroLeft}>
            <p className={styles.heroGreeting}>
              {summary.streakDays > 0
                ? `Hola, ${profile.firstName}. Llevas ${summary.streakDays} días de racha.`
                : `Hola, ${profile.firstName}.`}
            </p>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>{summary.overallProgressAvg}%</span>
                <span className={styles.heroStatLabel}>Progreso global</span>
              </div>
              {summary.streakDays > 0 && (
                <div className={styles.heroStat}>
                  <span className={styles.heroStatValue}>{summary.streakDays}</span>
                  <span className={styles.heroStatLabel}>días de racha</span>
                </div>
              )}
            </div>
            <ProgressBar value={summary.overallProgressAvg} ariaLabel="Progreso global" />
          </div>

          <div className={styles.heroRight}>
            {continueLearning ? (
              <>
                <p className={styles.heroCourseLabel}>{continueLearning.courseTitle}</p>
                <p className={styles.heroLessonLabel}>{continueLearning.lessonTitle}</p>
                <Button as={Link} href={lessonHref} variant="primary" size="lg">
                  Continuar aprendiendo
                </Button>
              </>
            ) : (
              <p className={styles.heroComplete}>
                Has completado todas las lecciones disponibles.
              </p>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Habilidades y métricas de actividad */}
      <div className={styles.bodyGrid}>
        <SkillProgressList skillProgress={skillProgress} />
        <AssessmentSummary
          assessmentScore={skillProgress.assessmentScore}
          lessonsCompleted7d={growth.lessonsCompleted7d}
          progressGained7d={growth.progressGained7d}
          streakDays={summary.streakDays}
        />
      </div>

      {/* Cursos matriculados */}
      <section>
        <h2 className={styles.sectionTitle}>Cursos matriculados</h2>
        <ul className={styles.courseGrid}>
          {enrollments.map((e) => (
            <CourseProgressCard
              key={e.enrollmentId}
              courseTitle={e.courseTitle}
              overallProgress={e.overallProgress}
              completedLessons={e.completedLessons}
              totalLessons={e.totalLessons}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

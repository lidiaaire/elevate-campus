'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { dashboardService } from '@/lib/services/dashboard.service';
import ErrorState            from '@/components/ui/ErrorState';
import DashboardSkeleton    from './DashboardSkeleton';
import EmptyDashboard       from './EmptyDashboard';
import CompletedDashboard  from './CompletedDashboard';
import Card, { CardBody }    from '@/components/ui/Card';
import ProgressBar           from '@/components/ui/ProgressBar';
import LearningPathCard      from '@/components/dashboard/student/LearningPathCard';
import AssessmentSummary     from '@/components/dashboard/student/AssessmentSummary';
import SkillProgressList     from '@/components/dashboard/student/SkillProgressList';
import ContinueLearningCard     from '@/components/dashboard/student/ContinueLearningCard';
import TodayInElevateCard      from '@/components/dashboard/student/TodayInElevateCard';
import WeeklyGoalsCard         from '@/components/dashboard/student/WeeklyGoalsCard';
import TodayActivityCard       from '@/components/dashboard/student/TodayActivityCard';
import RecommendedCard         from '@/components/dashboard/student/RecommendedCard';
import Link from 'next/link';
import Button from '@/components/ui/Button';
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

  if (loading) return <DashboardSkeleton />;
  if (error)   return <ErrorState message="No se pudo cargar tu progreso. Inténtalo de nuevo." />;
  if (data.enrollments.length === 0 && data.summary.totalAllEnrollments === 0)
    return <EmptyDashboard firstName={data.profile.firstName} />;
  if (data.enrollments.length === 0 && data.summary.totalAllEnrollments > 0)
    return <CompletedDashboard firstName={data.profile.firstName} />;

  const {
    profile, summary, growth, skillProgress,
    enrollments, continueLearning, upcomingActivities,
    pendingAssessments, recentActivity,
  } = data;

  return (
    <div className={styles.dashboard}>

      {/* Hero */}
      <Card variant="elevated" noPadding>
        <CardBody className={styles.heroBody}>
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
        </CardBody>
      </Card>

      {/* Continuar aprendiendo */}
      <section>
        <h2 className={styles.sectionTitle}>Continuar aprendiendo</h2>
        <div className={styles.continueLearningWrapper}>
          <ContinueLearningCard
            continueLearning={continueLearning}
            enrollments={enrollments}
          />
        </div>
      </section>

      {/* Actividad de hoy */}
      <TodayActivityCard
        summary={summary}
        growth={growth}
        recentActivity={recentActivity}
        pendingAssessments={pendingAssessments}
        continueLearning={continueLearning}
      />

      {/* Objetivos de la semana */}
      <WeeklyGoalsCard
        summary={summary}
        growth={growth}
        pendingAssessments={pendingAssessments}
        continueLearning={continueLearning}
      />

      {/* Continúa tu camino - Blueprint pos. 6 */}
      <section>
        <h2 className={styles.sectionTitle}>Continúa tu camino</h2>
        <ul className={styles.courseGrid}>
          {enrollments.map((e) => (
            <LearningPathCard key={e.enrollmentId} enrollment={e} />
          ))}
        </ul>
      </section>

      {/* Recomendado para ti - Blueprint pos. 7 */}
      <RecommendedCard
        continueLearning={continueLearning}
        pendingAssessments={pendingAssessments}
        enrollments={enrollments}
      />

      {/* Hoy en Elevate - Blueprint pos. 8 */}
      <TodayInElevateCard upcomingActivities={upcomingActivities} />

      {/* Mi espacio de aprendizaje - Blueprint pos. 9 */}
      <section>
        <h2 className={styles.sectionTitle}>Mi espacio de aprendizaje</h2>
        <div className={styles.bodyGrid}>
          <SkillProgressList skillProgress={skillProgress} />
          <AssessmentSummary
            assessmentScore={skillProgress.assessmentScore}
            lessonsCompleted7d={growth.lessonsCompleted7d}
            progressGained7d={growth.progressGained7d}
            streakDays={summary.streakDays}
          />
        </div>
        <div className={styles.progressCta}>
          <Button as={Link} href="/progress" variant="secondary" size="sm">
            Ver mi progreso completo
          </Button>
        </div>
      </section>
    </div>
  );
}

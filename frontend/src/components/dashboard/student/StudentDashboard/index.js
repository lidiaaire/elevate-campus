'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { dashboardService } from '@/lib/services/dashboard.service';
import { getStudentPhoto } from '@/lib/config/studentPhotos';
import ErrorState            from '@/components/ui/ErrorState';
import DashboardSkeleton    from './DashboardSkeleton';
import EmptyDashboard       from './EmptyDashboard';
import CompletedDashboard  from './CompletedDashboard';
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
import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from './StudentDashboard.module.css';

// Misma prioridad que TodayActivityCard: curso en curso primero,
// evaluación pendiente después. Duplicada intencionalmente (local al
// hero) para no forzar una dependencia cruzada entre componentes.
function buildNextAction(continueLearning, pendingAssessments) {
  if (continueLearning) {
    return {
      label: continueLearning.lessonTitle ?? 'Siguiente lección',
      meta:  continueLearning.courseTitle,
      href:  `/courses/${continueLearning.courseId}/units/${continueLearning.unitId}/lessons/${continueLearning.lessonId}`,
    };
  }
  if (pendingAssessments?.length > 0) {
    const pa = pendingAssessments[0];
    return {
      label: pa.assessmentTitle || `Evaluación: ${pa.unitTitle}`,
      meta:  pa.courseTitle,
      href:  `/courses/${pa.courseId}/units/${pa.unitId}/assessment`,
    };
  }
  return null;
}

export default function StudentDashboard() {
  const { user, token } = useAuth();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [photoFailed, setPhotoFailed] = useState(false);

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

  const nextAction = buildNextAction(continueLearning, pendingAssessments);
  const photoUrl = getStudentPhoto(user?.email);

  // "Continúa tu camino" no repite el curso que ya protagoniza el bloque
  // de "Continuar aprendiendo" — evita mostrar la misma información dos veces.
  const otherEnrollments = enrollments.filter(
    (e) => !continueLearning || e.courseId?.toString() !== continueLearning.courseId?.toString(),
  );

  return (
    <div className={styles.dashboard}>

      {/* Hero — bloque editorial de marca: escaparate principal de Sarah.
          Saludo, progreso global, siguiente acción y CTA viven dentro del
          mismo bloque oscuro; la fotografía es una columna real, no un
          fondo, con fundido hacia la superficie de marca. */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Aprender · Aplicar · Superarte</span>

            <h1 className={styles.heroGreeting}>
              {summary.streakDays > 0
                ? `Hola, ${profile.firstName}. Llevas ${summary.streakDays} días de racha.`
                : `Hola, ${profile.firstName}.`}
            </h1>

            <div className={styles.heroProgress}>
              <div className={styles.heroProgressHeader}>
                <span className={styles.heroProgressValue}>{summary.overallProgressAvg}%</span>
                <span className={styles.heroProgressLabel}>Progreso global</span>
              </div>
              <ProgressBar value={summary.overallProgressAvg} ariaLabel="Progreso global" variant="accent" />
            </div>

            {nextAction ? (
              <div className={styles.heroNext}>
                <span className={styles.heroNextLabel}>Siguiente paso</span>
                <p className={styles.heroNextTitle}>{nextAction.label}</p>
                {nextAction.meta && <p className={styles.heroNextMeta}>{nextAction.meta}</p>}
                <Button as={Link} href={nextAction.href} variant="accent" size="lg" className={styles.heroCta}>
                  Continuar aprendiendo
                </Button>
              </div>
            ) : (
              <div className={styles.heroNext}>
                <p className={styles.heroNextTitle}>Estás al día con tu contenido activo.</p>
                <Button as={Link} href="/courses" variant="accent" size="lg" className={styles.heroCta}>
                  Explorar cursos
                </Button>
              </div>
            )}
          </div>

          <div className={styles.heroPhoto} aria-hidden="true">
            {photoUrl && !photoFailed ? (
              <Image
                src={photoUrl}
                alt=""
                fill
                priority
                sizes="(max-width: 960px) 100vw, 42vw"
                className={styles.heroPhotoImg}
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              <div className={styles.heroPhotoFallback} />
            )}
            <div className={styles.heroPhotoFadeSide} />
            <div className={styles.heroPhotoFadeBottom} />
          </div>
        </div>
      </section>

      {/* Continuar aprendiendo — pieza protagonista, no una card aislada */}
      <ContinueLearningCard
        continueLearning={continueLearning}
        enrollments={enrollments}
      />

      {/* Actividad de hoy + Objetivos de la semana — compactos, en 2 columnas */}
      <div className={styles.pairSection}>
        <TodayActivityCard
          summary={summary}
          growth={growth}
          recentActivity={recentActivity}
          pendingAssessments={pendingAssessments}
          continueLearning={continueLearning}
        />
        <WeeklyGoalsCard
          summary={summary}
          growth={growth}
          pendingAssessments={pendingAssessments}
          continueLearning={continueLearning}
        />
      </div>

      {/* Continúa tu camino — el resto de cursos, sección secundaria */}
      {otherEnrollments.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle}>Continúa tu camino</h2>
          <ul className={styles.courseGrid}>
            {otherEnrollments.map((e) => (
              <LearningPathCard key={e.enrollmentId} enrollment={e} />
            ))}
          </ul>
        </section>
      )}

      {/* Recomendado para ti + Hoy en Elevate — en 2 columnas */}
      <div className={styles.pairSection}>
        <RecommendedCard
          continueLearning={continueLearning}
          pendingAssessments={pendingAssessments}
          enrollments={enrollments}
        />
        <TodayInElevateCard upcomingActivities={upcomingActivities} />
      </div>

      {/* Mi espacio de aprendizaje */}
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

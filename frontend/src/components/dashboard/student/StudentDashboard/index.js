'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { dashboardService } from '@/lib/services/dashboard.service';
import { achievementService } from '@/lib/services/achievement.service';
import { certificateService } from '@/lib/services/certificate.service';
import { DASHBOARD_HERO_IMAGE } from '@/lib/config/studentPhotos';
import ErrorState            from '@/components/ui/ErrorState';
import DashboardSkeleton    from './DashboardSkeleton';
import EmptyDashboard       from './EmptyDashboard';
import CompletedDashboard  from './CompletedDashboard';
import ContinueLearningCard     from '@/components/dashboard/student/ContinueLearningCard';
import ProgressOverviewCard     from '@/components/dashboard/student/ProgressOverviewCard';
import NextGoalCard             from '@/components/dashboard/student/NextGoalCard';
import RecentActivityCard       from '@/components/dashboard/student/RecentActivityCard';
import AchievementsCard         from '@/components/dashboard/student/AchievementsCard';
import LearningPathCard      from '@/components/dashboard/student/LearningPathCard';
import AssessmentSummary     from '@/components/dashboard/student/AssessmentSummary';
import SkillProgressList     from '@/components/dashboard/student/SkillProgressList';
import Image from 'next/image';
import styles from './StudentDashboard.module.css';

// Saludo por franja horaria — no hay dato de servidor para esto, es hora
// local del navegador del alumno, igual que cualquier reloj de UI.
function getTimeOfDayGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

// Titular del hero — variantes basadas en señales reales (racha, si hay
// curso en curso), nunca en datos inventados.
function getHeroHeadline({ streakDays, continueLearning }) {
  if (streakDays > 0) {
    return {
      line1: 'Sigue así,',
      line2: `llevas ${streakDays} día${streakDays !== 1 ? 's' : ''} de racha.`,
    };
  }
  if (continueLearning) {
    return { line1: 'Hoy es un buen día', line2: 'para seguir aprendiendo.' };
  }
  return { line1: 'Bienvenida de nuevo,', line2: 'tu progreso te espera.' };
}

export default function StudentDashboard() {
  const { token } = useAuth();
  const [data,         setData]         = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  useEffect(() => {
    Promise.all([
      dashboardService.getStudentDashboard(token),
      achievementService.getMyAchievements(token),
      certificateService.getMyCertificates(token),
    ])
      .then(([dashboardRes, achievementsRes, certificatesRes]) => {
        setData(dashboardRes);
        setAchievements(achievementsRes?.achievements ?? []);
        setCertificates(certificatesRes?.certificates ?? []);
      })
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
    enrollments, continueLearning, pendingAssessments, recentActivity,
  } = data;

  // "Continúa tu camino" no repite el curso que ya protagoniza "Continuar
  // aprendiendo" — evita mostrar la misma información dos veces.
  const otherEnrollments = enrollments.filter(
    (e) => !continueLearning || e.courseId?.toString() !== continueLearning.courseId?.toString(),
  );

  const headline = getHeroHeadline({ streakDays: summary.streakDays, continueLearning });

  return (
    <div className={styles.dashboard}>

      {/* Hero — banda compacta de bienvenida: saludo por franja horaria +
          titular motivacional + una línea de contexto. Sin CTA ni datos de
          curso aquí — eso vive en "Continuar aprendiendo", justo debajo. */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>
              {getTimeOfDayGreeting()}, {profile.firstName}
            </span>
            <h1 className={styles.heroHeadline}>
              {headline.line1}<br />
              <span className={styles.heroHeadlineAccent}>{headline.line2}</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Cada lección que completas te acerca a tu siguiente nivel de inglés.
            </p>
          </div>

          {/* Escena educativa — asset panorámico definitivo (DASHBOARD_HERO_IMAGE),
              igual para cualquier alumno. En desktop se muestra a sangre
              completa detrás de .heroContent (ver StudentDashboard.module.css). */}
          <div className={styles.heroScene} aria-hidden="true">
            <Image
              src={DASHBOARD_HERO_IMAGE}
              alt=""
              fill
              priority
              sizes="100vw"
              className={styles.heroSceneImg}
            />
            <div className={styles.heroSceneFade} />
          </div>
        </div>
      </section>

      {/* Continuar aprendiendo (2/3) + Tu progreso (1/3) */}
      <div className={styles.mainRow}>
        <ContinueLearningCard
          continueLearning={continueLearning}
          enrollments={enrollments}
        />
        <ProgressOverviewCard
          summary={summary}
          achievementsCount={achievements.length}
          certificatesCount={certificates.length}
        />
      </div>

      {/* Próximo objetivo · Actividad reciente · Últimos logros */}
      <div className={styles.tripleRow}>
        <NextGoalCard pendingAssessments={pendingAssessments} />
        <RecentActivityCard recentActivity={recentActivity} />
        <AchievementsCard achievements={achievements} />
      </div>

      {/* Continúa tu camino — el resto de cursos, cards compactas */}
      {otherEnrollments.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle}>Continúa tu camino</h2>
          <ul className={styles.exploreGrid}>
            {otherEnrollments.map((e) => (
              <LearningPathCard key={e.enrollmentId} enrollment={e} />
            ))}
          </ul>
        </section>
      )}

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
      </section>
    </div>
  );
}

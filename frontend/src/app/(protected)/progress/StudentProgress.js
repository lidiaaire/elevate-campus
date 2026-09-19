'use client';

import Link from 'next/link';
import {
  Target, BookOpen, Trophy, Flame,
  PlayCircle, RotateCcw, Headphones, PenLine, Mic, CheckCircle2,
} from 'lucide-react';
import { useAuth }          from '@/hooks/useAuth';
import { useAsyncData }     from '@/hooks/useAsyncData';
import { dashboardService } from '@/lib/services/dashboard.service';
import { getCourseVisual }  from '@/lib/config/courseVisuals';
import PageHeader   from '@/components/ui/PageHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState    from '@/components/ui/ErrorState';
import EmptyState    from '@/components/ui/EmptyState';
import ProgressBar    from '@/components/ui/ProgressBar';
import Card, { CardBody } from '@/components/ui/Card';
import Button         from '@/components/ui/Button';
import styles from './Progress.module.css';

/* ---- Copys contextuales — derivados de un valor real, nunca inventados ---- */

function overallProgressMessage(pct) {
  if (pct >= 90) return 'Estás a un paso de completar tu formación.';
  if (pct >= 60) return 'Vas por muy buen camino.';
  if (pct >= 30) return 'Buen ritmo, sigue así.';
  if (pct > 0)   return 'Acabas de empezar, sigue adelante.';
  return 'Empieza cuando quieras.';
}

function skillMessage(value) {
  if (value == null) return null;
  if (value >= 85) return 'Dominas este tipo de contenido con soltura.';
  if (value >= 70) return 'Entiendes bien este tipo de contenido.';
  if (value >= 50) return 'Vas progresando de forma constante.';
  return 'Sigue practicando para ganar confianza.';
}

function formatRelative(dateStr) {
  const date = new Date(dateStr);
  const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'Hoy';
  if (days === 1) return 'Ayer';
  return `Hace ${days} días`;
}

/* ---- Resumen superior ---- */

function SummaryCard({ icon, accent, label, value, children }) {
  return (
    <div className={`${styles.summaryCard} ${accent ? styles[`summaryCard--${accent}`] : ''}`}>
      <div className={styles.summaryHeader}>
        <span className={styles.summaryIcon} aria-hidden="true">{icon}</span>
        <span className={styles.summaryLabel}>{label}</span>
      </div>
      <span className={styles.summaryValue}>{value}</span>
      {children}
    </div>
  );
}

/* ---- Tu progreso por curso ---- */

function CourseCard({ enrollment, isFeatured, pendingAssessments }) {
  const {
    courseId, courseTitle, level,
    overallProgress, completedLessons, totalLessons,
    enrollmentStatus, nextLesson,
  } = enrollment;

  const visual = getCourseVisual(courseTitle);

  const isCompleted        = enrollmentStatus === 'completed' || overallProgress === 100;
  const isPendingAssessment = !isCompleted && !nextLesson;
  const notStarted          = !isCompleted && !isPendingAssessment && (completedLessons ?? 0) === 0;

  const matchingAssessment = isPendingAssessment
    ? pendingAssessments?.find((pa) => pa.courseId?.toString() === courseId?.toString())
    : null;

  const href = isCompleted
    ? `/courses/${courseId}`
    : isPendingAssessment
      ? (matchingAssessment
          ? `/courses/${courseId}/units/${matchingAssessment.unitId}/assessment`
          : `/courses/${courseId}`)
      : `/courses/${courseId}/units/${nextLesson.unitId}/lessons/${nextLesson.lessonId}`;

  const ctaLabel = isCompleted
    ? 'Repasar'
    : isPendingAssessment
      ? 'Ver evaluación'
      : notStarted
        ? 'Empezar'
        : 'Continuar';

  const stateLabel = isCompleted
    ? 'Completado'
    : isPendingAssessment
      ? 'Evaluación pendiente'
      : notStarted
        ? 'No iniciado'
        : 'En progreso';

  const cardStateClass = isCompleted
    ? styles.courseCardCompleted
    : isFeatured
      ? styles.courseCardFeatured
      : notStarted
        ? styles.courseCardNeutral
        : '';

  return (
    <div className={`${styles.courseCard} ${cardStateClass}`}>
      <div className={styles.courseCover}>
        {visual.coverImage ? (
          <img src={visual.coverImage} alt="" className={styles.courseCoverImg} />
        ) : (
          <div className={styles.courseCoverFallback} style={{ background: visual.accentColor }} aria-hidden="true" />
        )}
        {level && <span className={styles.courseLevelBadge}>{level}</span>}
        {isCompleted && (
          <span className={styles.courseDoneBadge}>
            <CheckCircle2 size={12} aria-hidden="true" /> Completado
          </span>
        )}
      </div>

      <div className={styles.courseCardBody}>
        <p className={styles.courseCardTitle}>{courseTitle}</p>

        <div className={styles.courseCardProgressRow}>
          <ProgressBar
            value={overallProgress}
            ariaLabel={`Progreso de ${courseTitle}`}
            variant={isFeatured ? 'accent' : 'default'}
          />
          <span className={styles.courseCardPct}>{overallProgress}%</span>
        </div>
        <span className={styles.courseCardMeta}>
          {completedLessons} de {totalLessons} lecciones
          {!isCompleted && <> · <span className={styles.courseCardState}>{stateLabel}</span></>}
        </span>

        <Button
          as={Link}
          href={href}
          variant={isCompleted ? 'secondary' : 'accent'}
          size="sm"
          iconRight={isCompleted ? <RotateCcw size={14} /> : <PlayCircle size={14} />}
          className={styles.courseCardCta}
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

/* ---- Tu próximo paso — misma fuente/lógica que ContinueLearningCard y
   NextGoalCard del Dashboard: prioriza la siguiente lección disponible
   (continueLearning) y, si no hay, la siguiente evaluación pendiente. ---- */

function NextStepCard({ continueLearning, pendingAssessments, enrollments }) {
  if (continueLearning) {
    const level = enrollments.find(
      (e) => e.courseId?.toString() === continueLearning.courseId?.toString(),
    )?.level;
    const visual = getCourseVisual(continueLearning.courseTitle);
    const href = `/courses/${continueLearning.courseId}/units/${continueLearning.unitId}/lessons/${continueLearning.lessonId}`;

    return (
      <Card variant="default" noPadding className={styles.nextStepCard}>
        <CardBody className={styles.nextStepBody}>
          <div className={styles.nextStepHeader}>
            <Target size={16} className={styles.nextStepIcon} aria-hidden="true" />
            <h2 className={styles.nextStepTitle}>Tu próximo paso</h2>
          </div>

          <div className={styles.nextStepMediaRow}>
            {visual.coverImage && (
              <img src={visual.coverImage} alt="" className={styles.nextStepThumb} aria-hidden="true" />
            )}
            <div className={styles.nextStepMeta}>
              <span className={styles.nextStepTag}>
                {level ? `${level} · ` : ''}{continueLearning.courseTitle}
              </span>
              <p className={styles.nextStepLessonTitle}>{continueLearning.lessonTitle}</p>
              <span className={styles.nextStepUnit}>{continueLearning.unitTitle}</span>
            </div>
          </div>

          <Button as={Link} href={href} variant="accent" size="sm" className={styles.nextStepCta}>
            Continuar aprendiendo
          </Button>
        </CardBody>
      </Card>
    );
  }

  const nextAssessment = pendingAssessments?.[0] ?? null;

  return (
    <Card variant="default" noPadding className={styles.nextStepCard}>
      <CardBody className={styles.nextStepBody}>
        <div className={styles.nextStepHeader}>
          <Target size={16} className={styles.nextStepIcon} aria-hidden="true" />
          <h2 className={styles.nextStepTitle}>Tu próximo paso</h2>
        </div>

        {nextAssessment ? (
          <>
            <span className={styles.nextStepTag}>{nextAssessment.courseTitle}</span>
            <p className={styles.nextStepLessonTitle}>
              {nextAssessment.assessmentTitle || nextAssessment.unitTitle}
            </p>
            <span className={styles.nextStepUnit}>Evaluación pendiente</span>
            <Button
              as={Link}
              href={`/courses/${nextAssessment.courseId}/units/${nextAssessment.unitId}/assessment`}
              variant="accent"
              size="sm"
              className={styles.nextStepCta}
            >
              Empezar evaluación
            </Button>
          </>
        ) : (
          <EmptyState title="Estás al día." description="No tienes lecciones ni evaluaciones pendientes ahora mismo." />
        )}
      </CardBody>
    </Card>
  );
}

/* ---- Competencias lingüísticas — misma fuente (skillProgress) que
   SkillProgressList del Dashboard, presentada en 4 cards independientes
   (aquí en local para no tocar el componente compartido con el Dashboard). ---- */

const SKILL_META = {
  listening: { sublabel: 'Comprensión auditiva', icon: Headphones, accent: 'brand' },
  reading:   { sublabel: 'Comprensión lectora',  icon: BookOpen,   accent: 'success' },
  writing:   { sublabel: 'Escritura',            icon: PenLine,    accent: 'warning' },
  speaking:  { sublabel: 'Expresión oral',       icon: Mic,        accent: 'danger' },
};
const SKILL_ORDER = ['listening', 'reading', 'writing', 'speaking'];

function SkillCard({ skillKey, value }) {
  const meta = SKILL_META[skillKey];
  const Icon = meta.icon;
  const hasValue = value !== null && value !== undefined;
  const message = skillMessage(value);

  return (
    <div className={`${styles.skillCard} ${styles[`skillCard--${meta.accent}`]}`}>
      <span className={styles.skillIcon} aria-hidden="true"><Icon size={18} /></span>
      <span className={styles.skillLabel}>{meta.sublabel}</span>
      {hasValue ? (
        <>
          <span className={styles.skillValue}>{value}%</span>
          <ProgressBar value={value} ariaLabel={meta.sublabel} />
          {message && <p className={styles.skillMessage}>{message}</p>}
        </>
      ) : (
        <>
          <span className={styles.skillValueEmpty}>En progreso</span>
          <div className={styles.skillBarEmpty} aria-hidden="true" />
          <p className={styles.skillMessage}>Próximamente</p>
        </>
      )}
    </div>
  );
}

/* ---- Actividad reciente ---- */

function RecentActivityRow({ item }) {
  return (
    <li className={styles.activityRow}>
      <CheckCircle2 size={14} className={styles.activityIcon} aria-hidden="true" />
      <div className={styles.activityInfo}>
        <span className={styles.activityLesson}>{item.lessonTitle}</span>
        <span className={styles.activityMeta}>{item.courseTitle} · Lección completada</span>
      </div>
      <span className={styles.activityDate}>{formatRelative(item.completedAt)}</span>
    </li>
  );
}

export default function StudentProgress() {
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(() =>
    dashboardService.getStudentDashboard(token)
  );

  if (loading) return <LoadingState message="Cargando progreso..." />;
  if (error)   return <ErrorState message={error} />;

  const summary           = data?.summary           ?? {};
  const skillProgress     = data?.skillProgress      ?? {};
  const enrollments       = data?.enrollments        ?? [];
  const recentActivity    = data?.recentActivity     ?? [];
  const pendingAssessments = data?.pendingAssessments ?? [];
  const continueLearning  = data?.continueLearning   ?? null;

  const hasEnrollments = enrollments.length > 0;
  const remainingLessons = Math.max((summary.totalLessons ?? 0) - (summary.totalLessonsCompleted ?? 0), 0);

  const { _source: skillSource, ...skillScores } = skillProgress;

  // El curso activo (misma fuente que "Continuar aprendiendo" del Dashboard)
  // se muestra primero y con mayor énfasis visual.
  const sortedEnrollments = continueLearning
    ? [...enrollments].sort((a, b) => {
        const aFeatured = a.courseId?.toString() === continueLearning.courseId?.toString();
        const bFeatured = b.courseId?.toString() === continueLearning.courseId?.toString();
        return (bFeatured ? 1 : 0) - (aFeatured ? 1 : 0);
      })
    : enrollments;

  return (
    <div className={styles.page}>
      <PageHeader
        title="Mi progreso"
        description="Aquí puedes ver tu evolución, tus logros y qué puedes hacer a continuación."
      />

      {/* ── Resumen superior ── */}
      <div className={styles.summaryGrid}>
        <SummaryCard
          icon={<Target size={18} />}
          accent="accent"
          label="Progreso general"
          value={`${summary.overallProgressAvg ?? 0}%`}
        >
          <div className={styles.summaryBar}>
            <ProgressBar value={summary.overallProgressAvg ?? 0} ariaLabel="Progreso general" variant="accent" />
          </div>
          <span className={styles.summaryFoot}>{overallProgressMessage(summary.overallProgressAvg ?? 0)}</span>
        </SummaryCard>

        <SummaryCard
          icon={<BookOpen size={18} />}
          label="Lecciones completadas"
          value={`${summary.totalLessonsCompleted ?? 0} de ${summary.totalLessons ?? 0}`}
        >
          <span className={styles.summaryFoot}>
            {remainingLessons > 0
              ? `Te queda${remainingLessons !== 1 ? 'n' : ''} ${remainingLessons} lección${remainingLessons !== 1 ? 'es' : ''}`
              : 'Has completado todas tus lecciones'}
          </span>
        </SummaryCard>

        <SummaryCard
          icon={<Trophy size={18} />}
          label="Evaluaciones superadas"
          value={summary.assessmentsTotal > 0 ? `${summary.assessmentsPassed} de ${summary.assessmentsTotal}` : '—'}
        >
          {summary.avgBestScore != null && (
            <span className={styles.summaryFoot}>Media: {summary.avgBestScore}%</span>
          )}
        </SummaryCard>

        <SummaryCard
          icon={<Flame size={18} />}
          label="Días de racha"
          value={summary.streakDays ?? 0}
        >
          <span className={styles.summaryFoot}>
            {summary.streakDays > 0 ? 'Sigue así' : '¡Empieza hoy tu racha!'}
          </span>
        </SummaryCard>
      </div>

      {/* ── Progreso por curso + Próximo paso ── */}
      <div className={styles.courseNextRow}>
        <section className={styles.coursesSection}>
          <div className={styles.sectionHeadRow}>
            <div>
              <h2 className={styles.sectionTitle}>Tu progreso por curso</h2>
              <p className={styles.sectionSubtitle}>Así vas en cada curso. Haz clic en uno para continuar aprendiendo.</p>
            </div>
            <Link href="/courses" className={styles.sectionLink}>Ver todos los cursos →</Link>
          </div>

          {!hasEnrollments ? (
            <EmptyState title="Aún no estás matriculado en ningún curso." />
          ) : (
            <div className={styles.courseGrid}>
              {sortedEnrollments.map((e) => (
                <CourseCard
                  key={String(e.courseId)}
                  enrollment={e}
                  isFeatured={continueLearning?.courseId?.toString() === e.courseId?.toString()}
                  pendingAssessments={pendingAssessments}
                />
              ))}
            </div>
          )}
        </section>

        <NextStepCard
          continueLearning={continueLearning}
          pendingAssessments={pendingAssessments}
          enrollments={enrollments}
        />
      </div>

      {/* ── Competencias lingüísticas + Actividad reciente (misma fila,
          como en la referencia: 60% / 40%, alineados desde arriba) ── */}
      <div className={styles.skillsActivityRow}>
        {hasEnrollments && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Competencias lingüísticas</h2>
            <p className={styles.sectionSubtitle}>Así vas en cada habilidad. Sigue practicando para equilibrarlas.</p>
            <div className={styles.skillsGrid}>
              {SKILL_ORDER.map((key) => (
                <SkillCard key={key} skillKey={key} value={skillScores[key]} />
              ))}
            </div>
            {skillSource === 'preliminary' && (
              <p className={styles.skillsNotice}>Los datos se actualizan con cada lección completada.</p>
            )}
          </section>
        )}

        {recentActivity.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Tu actividad reciente</h2>
            <ul className={styles.activityList} role="list">
              {recentActivity.slice(0, 6).map((item, i) => (
                <RecentActivityRow key={String(item.lessonId ?? i)} item={item} />
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

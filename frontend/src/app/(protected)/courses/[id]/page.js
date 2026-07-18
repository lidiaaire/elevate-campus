'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { coursesService }  from '@/lib/services/courses.service';
import { progressService } from '@/lib/services/progress.service';
import PageHeader   from '@/components/ui/PageHeader';
import Card, { CardBody } from '@/components/ui/Card';
import Button       from '@/components/ui/Button';
import ProgressBar  from '@/components/ui/ProgressBar';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState   from '@/components/ui/ErrorState';
import EmptyState   from '@/components/ui/EmptyState';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import styles from './CourseDetail.module.css';

const CEFR_LABEL = { A1: 'A1', A2: 'A2', B1: 'B1', B2: 'B2', C1: 'C1', C2: 'C2' };

const TYPE_LABEL = { video: 'Video', text: 'Texto', quiz: 'Test' };

function lessonHref(courseId, unitId, lessonId) {
  return `/courses/${courseId}/units/${unitId}/lessons/${lessonId}`;
}

function StatusIcon({ completed, locked }) {
  if (completed) return <span className={`${styles.statusIcon} ${styles.iconDone}`}>✓</span>;
  if (locked)    return <span className={`${styles.statusIcon} ${styles.iconLocked}`}>🔒</span>;
  return             <span className={`${styles.statusIcon} ${styles.iconOpen}`}>→</span>;
}

function LessonRow({ lesson, locked, completed, courseId, unitId }) {
  const id      = lesson._id ?? lesson.id;
  const canOpen = !locked;
  const rowCls  = `${styles.lessonRow} ${completed ? styles.lessonDone : locked ? styles.lessonLocked : styles.lessonAvailable}`;

  const inner = (
    <>
      <StatusIcon completed={completed} locked={locked} />
      <span className={styles.lessonTitle}>{lesson.title}</span>
      <span className={styles.lessonType}>{TYPE_LABEL[lesson.type] ?? lesson.type}</span>
      {lesson.duration && (
        <span className={styles.lessonDuration}>{lesson.duration} min</span>
      )}
    </>
  );

  if (canOpen) {
    return (
      <li className={rowCls}>
        <Link href={lessonHref(courseId, unitId, id)} className={styles.lessonLink}>
          {inner}
        </Link>
      </li>
    );
  }
  return <li className={rowCls}><div className={styles.lessonStatic}>{inner}</div></li>;
}

function UnitCard({ unitData, courseId }) {
  const { unit, locked, progress: unitPct, completedLessons, totalLessons, lessons } = unitData;
  const unitId = unit._id ?? unit.id;

  return (
    <div className={`${styles.unitCard} ${locked ? styles.unitCardLocked : ''}`}>
      <div className={styles.unitHeader}>
        <span className={`${styles.unitOrder} ${locked ? styles.unitOrderLocked : ''}`}>
          {unit.order}
        </span>
        <div className={styles.unitInfo}>
          <span className={styles.unitTitle}>{unit.title}</span>
          {unit.description && (
            <span className={styles.unitDescription}>{unit.description}</span>
          )}
        </div>
        <div className={styles.unitMeta}>
          {locked ? (
            <span className={styles.unitLockedBadge}>Bloqueada</span>
          ) : (
            <span className={styles.unitPct}>{unitPct ?? 0}%</span>
          )}
          <span className={styles.unitLessonsCount}>{completedLessons ?? 0}/{totalLessons ?? 0}</span>
        </div>
      </div>

      {!locked && lessons?.length > 0 && (
        <ul className={styles.lessonList}>
          {lessons.map((l) => (
            <LessonRow
              key={String(l.lesson._id ?? l.lesson.id)}
              lesson={l.lesson}
              locked={l.locked}
              completed={l.completed}
              courseId={courseId}
              unitId={unitId}
            />
          ))}
        </ul>
      )}

      {locked && lessons?.length > 0 && (
        <ul className={styles.lessonList}>
          {lessons.map((l) => (
            <LessonRow
              key={String(l.lesson._id ?? l.lesson.id)}
              lesson={l.lesson}
              locked
              completed={false}
              courseId={courseId}
              unitId={unitId}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CourseDetailPage() {
  const { id }    = useParams();
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(() =>
    Promise.all([
      coursesService.getCourseById(id, token),
      progressService.getCourseProgress(id, token).catch(() => null),
    ]).then(([courseRes, progressRes]) => ({
      course:   courseRes.course ?? courseRes,
      progress: progressRes,
    }))
  );

  if (loading) return <LoadingState message="Cargando curso..." />;
  if (error)   return <ErrorState message={error} />;

  const course   = data?.course   ?? null;
  const progress = data?.progress ?? null;

  if (!course) return <EmptyState title="Curso no encontrado." />;

  const visual        = getCourseVisual(course.title);
  const units         = progress?.units ?? [];
  const overallPct    = progress?.overallProgress ?? 0;
  const completedLsns = progress?.completedLessons ?? 0;
  const totalLsns     = progress?.totalLessons ?? 0;
  const hasProgress   = totalLsns > 0;

  // Primera lección disponible (no completada, no bloqueada)
  let nextLesson = null;
  for (const u of units) {
    if (u.locked) continue;
    const next = u.lessons?.find((l) => !l.completed && !l.locked);
    if (next) {
      nextLesson = {
        unitId:   u.unit._id ?? u.unit.id,
        lessonId: next.lesson._id ?? next.lesson.id,
        label:    next.lesson.title,
      };
      break;
    }
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title={course.title}
        description={course.description}
        actions={
          <Button as={Link} href="/courses" variant="ghost" size="sm">
            ← Mis cursos
          </Button>
        }
      />

      {/* Metadatos */}
      <Card variant="filled" size="sm">
        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Nivel</span>
            <span className={styles.metaValue}>{CEFR_LABEL[course.level] ?? course.level ?? '—'}</span>
          </div>
          {hasProgress && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Progreso</span>
              <span className={styles.metaValue}>{overallPct}%</span>
            </div>
          )}
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Lecciones</span>
            <span className={styles.metaValue}>
              {hasProgress ? `${completedLsns} / ${totalLsns}` : totalLsns || '—'}
            </span>
          </div>
        </div>
      </Card>

      {/* Barra de progreso + CTA */}
      {hasProgress && (
        <Card variant="elevated" noPadding>
          <CardBody className={styles.progressCard}>
            <div className={styles.progressTop}>
              <span className={styles.progressPct}>{overallPct}%</span>
              <span className={styles.progressMeta}>
                {completedLsns} de {totalLsns} lecciones completadas
              </span>
            </div>
            <ProgressBar value={overallPct} ariaLabel={`Progreso de ${course.title}`} />
            {nextLesson && (
              <div className={styles.ctaRow}>
                <span className={styles.ctaHint}>Siguiente: {nextLesson.label}</span>
                <Button
                  as={Link}
                  href={lessonHref(id, nextLesson.unitId, nextLesson.lessonId)}
                  variant="primary"
                  size="sm"
                >
                  Continuar
                </Button>
              </div>
            )}
            {!nextLesson && overallPct === 100 && (
              <p className={styles.completedMsg}>Has completado este curso.</p>
            )}
          </CardBody>
        </Card>
      )}

      {/* Unidades y lecciones */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Contenido del curso
          {units.length > 0 && <span className={styles.unitCount}>{units.length}</span>}
        </h2>

        {units.length === 0 ? (
          <EmptyState title="Este curso aún no tiene contenido." />
        ) : (
          <div className={styles.unitList}>
            {units.map((u) => (
              <UnitCard
                key={String(u.unit._id ?? u.unit.id)}
                unitData={u}
                courseId={id}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

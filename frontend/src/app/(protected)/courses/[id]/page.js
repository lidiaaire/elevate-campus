'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  PlayCircle, ArrowRight, CheckCircle2, Lock,
  Video, BookOpen, ClipboardCheck, ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { coursesService }  from '@/lib/services/courses.service';
import { progressService } from '@/lib/services/progress.service';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import CourseDetailSkeleton from './CourseDetailSkeleton';
import styles from './CourseDetail.module.css';

const CEFR_LABEL = { A1: 'A1', A2: 'A2', B1: 'B1', B2: 'B2', C1: 'C1', C2: 'C2' };

const TYPE_LABEL = { video: 'Vídeo', text: 'Texto', quiz: 'Test' };
const TYPE_ICON  = { video: Video, text: BookOpen, quiz: ClipboardCheck };

function lessonHref(courseId, unitId, lessonId) {
  return `/courses/${courseId}/units/${unitId}/lessons/${lessonId}`;
}

// ================================================================
// Lecciones
// ================================================================

function LessonState({ completed, locked }) {
  if (completed) {
    return <CheckCircle2 size={17} className={styles.stateDone} aria-hidden="true" />;
  }
  if (locked) {
    return <Lock size={14} className={styles.stateLocked} aria-hidden="true" />;
  }
  return <span className={styles.stateOpen} aria-hidden="true" />;
}

function LessonRow({ lesson, locked, completed, isNext, courseId, unitId }) {
  const id       = lesson._id ?? lesson.id;
  const canOpen  = !locked;
  const TypeIcon = TYPE_ICON[lesson.type] ?? BookOpen;
  const label    = completed ? 'Completada' : locked ? 'Bloqueada' : 'Disponible';

  const rowCls = [
    styles.lessonRow,
    locked ? styles.lessonLocked : '',
    isNext ? styles.lessonNext   : '',
  ].filter(Boolean).join(' ');

  const inner = (
    <>
      <LessonState completed={completed} locked={locked} />
      <span className={styles.lessonTitle}>{lesson.title}</span>
      <span className={styles.lessonMeta}>
        <TypeIcon size={13} aria-hidden="true" />
        {TYPE_LABEL[lesson.type] ?? lesson.type}
        {lesson.duration && <><span aria-hidden="true">·</span>{lesson.duration} min</>}
      </span>
      <span className={styles.srOnly}>{label}</span>
      {canOpen && <ChevronRight size={16} className={styles.lessonChevron} aria-hidden="true" />}
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

// ================================================================
// Unidades — cada una es un módulo, no una fila de tabla
// ================================================================

function UnitModule({ unitData, courseId, isCurrent, nextLessonId }) {
  const { unit, locked, progress: unitPct, totalLessons, lessons } = unitData;
  const unitId      = unit._id ?? unit.id;
  const isCompleted = !locked && unitPct === 100;

  const cardCls = [
    styles.unitCard,
    isCurrent   ? styles.unitCardCurrent   : '',
    locked      ? styles.unitCardLocked    : '',
    isCompleted ? styles.unitCardCompleted : '',
  ].filter(Boolean).join(' ');

  const badgeCls = [
    styles.unitOrder,
    isCurrent ? styles.unitOrderCurrent : '',
    locked    ? styles.unitOrderLocked  : '',
  ].filter(Boolean).join(' ');

  return (
    <Card variant="default" noPadding className={cardCls}>
      <div className={styles.unitHeader}>
        <span className={badgeCls} aria-hidden="true">
          {locked ? <Lock size={14} /> : unit.order}
        </span>
        <div className={styles.unitInfo}>
          <div className={styles.unitTitleRow}>
            {isCurrent && <span className={styles.unitCurrentTag}>En curso</span>}
            <span className={styles.unitTitle}>{unit.title}</span>
          </div>
          {unit.description && (
            <span className={styles.unitDescription}>{unit.description}</span>
          )}
          <span className={styles.unitProgressLine}>
            {totalLessons ?? 0} lecciones
            {!locked && <> · {unitPct ?? 0}%</>}
            {locked && <> · Bloqueada</>}
          </span>
        </div>
      </div>

      {lessons?.length > 0 && (
        <ul className={styles.lessonList}>
          {lessons.map((l) => {
            const lessonId = String(l.lesson._id ?? l.lesson.id);
            return (
              <LessonRow
                key={lessonId}
                lesson={l.lesson}
                locked={locked || l.locked}
                completed={!locked && l.completed}
                isNext={!locked && lessonId === nextLessonId}
                courseId={courseId}
                unitId={unitId}
              />
            );
          })}
        </ul>
      )}
    </Card>
  );
}

// ================================================================
// Página
// ================================================================

export default function CourseDetailPage() {
  const { id }    = useParams();
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(() =>
    Promise.all([
      coursesService.getCourseById(id, token),
      progressService.getCourseProgress(id, token).catch(() => null),
    ]).then(([courseRes, progressRes]) => ({
      course:   courseRes.course ?? courseRes,
      progress: progressRes?.progress ?? null,
    }))
  );

  if (loading) return <CourseDetailSkeleton />;
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

  // Primera lección disponible (no completada, no bloqueada) — misma lógica
  // de siempre; solo se enriquece con datos que el propio objeto de lección
  // ya trae (type, duration, unidad) para el bloque "Continuar aprendiendo".
  let nextLesson = null;
  for (const u of units) {
    if (u.locked) continue;
    const next = u.lessons?.find((l) => !l.completed && !l.locked);
    if (next) {
      nextLesson = {
        unitId:     u.unit._id ?? u.unit.id,
        unitTitle:  u.unit.title,
        lessonId:   String(next.lesson._id ?? next.lesson.id),
        title:      next.lesson.title,
        type:       next.lesson.type,
        duration:   next.lesson.duration,
      };
      break;
    }
  }

  const NextTypeIcon = nextLesson ? (TYPE_ICON[nextLesson.type] ?? BookOpen) : null;

  return (
    <div className={styles.page}>
      <nav aria-label="breadcrumb" className={styles.breadcrumb}>
        <Link href="/courses" className={styles.crumbLink}>Mis cursos</Link>
        <span className={styles.crumbSep} aria-hidden="true">›</span>
        <span className={styles.crumbCurrent}>{course.title}</span>
      </nav>

      {/* Hero — nivel, título, descripción, progreso y portada del curso */}
      <Card variant="default" noPadding className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.levelBadge}>{CEFR_LABEL[course.level] ?? course.level ?? '—'}</span>
          <h1 className={styles.heroTitle}>{course.title}</h1>
          {course.description && <p className={styles.heroDescription}>{course.description}</p>}

          {hasProgress && (
            <div className={styles.heroProgress}>
              <ProgressBar value={overallPct} ariaLabel={`Progreso de ${course.title}`} variant="accent" />
              <div className={styles.heroProgressMeta}>
                <span className={styles.heroProgressPct}>{overallPct}% completado</span>
                <span>{completedLsns} / {totalLsns} lecciones</span>
              </div>
            </div>
          )}
        </div>

        {visual.coverImage && (
          <div className={styles.heroImageWrap}>
            <img src={visual.coverImage} alt="" className={styles.heroImage} />
          </div>
        )}
      </Card>

      {/* Continuar aprendiendo — CTA principal de la página */}
      {hasProgress && nextLesson && (
        <Link href={lessonHref(id, nextLesson.unitId, nextLesson.lessonId)} className={styles.continueCard}>
          <div className={styles.continueHeader}>
            <PlayCircle size={16} aria-hidden="true" />
            <span>Continúa donde lo dejaste</span>
          </div>
          <p className={styles.continueTitle}>{nextLesson.title}</p>
          <p className={styles.continueUnit}>{nextLesson.unitTitle}</p>
          <div className={styles.continueFooter}>
            <span className={styles.continueMeta}>
              <NextTypeIcon size={13} aria-hidden="true" />
              {TYPE_LABEL[nextLesson.type] ?? nextLesson.type}
              {nextLesson.duration && <><span aria-hidden="true">·</span>{nextLesson.duration} min</>}
            </span>
            <span className={styles.continueCta}>
              Continuar <ArrowRight size={15} aria-hidden="true" />
            </span>
          </div>
        </Link>
      )}

      {hasProgress && !nextLesson && overallPct === 100 && (
        <div className={styles.completedBanner}>
          <CheckCircle2 size={18} aria-hidden="true" />
          Has completado todas las lecciones de este curso.
        </div>
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
            {units.map((u) => {
              const unitId = String(u.unit._id ?? u.unit.id);
              return (
                <UnitModule
                  key={unitId}
                  unitData={u}
                  courseId={id}
                  isCurrent={!!nextLesson && unitId === String(nextLesson.unitId)}
                  nextLessonId={nextLesson?.lessonId}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

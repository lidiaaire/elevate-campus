'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useToast } from '@/contexts/ToastContext';
import { lessonsService }  from '@/lib/services/lessons.service';
import { progressService } from '@/lib/services/progress.service';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState   from '@/components/ui/ErrorState';
import Button       from '@/components/ui/Button';
import ProgressBar  from '@/components/ui/ProgressBar';
import styles from './Lesson.module.css';

const TYPE_LABEL = { video: 'Video', text: 'Texto', quiz: 'Test' };

function toEmbedUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return { type: 'iframe', src: `https://www.youtube.com/embed/${v}` };
    }
    if (u.hostname === 'youtu.be') {
      return { type: 'iframe', src: `https://www.youtube.com/embed${u.pathname}` };
    }
  } catch {}
  return { type: 'video', src: url };
}

function VideoContent({ videoUrl }) {
  if (!videoUrl) return <p className={styles.noContent}>Sin vídeo disponible.</p>;
  const { type, src } = toEmbedUrl(videoUrl);
  if (type === 'iframe') {
    return (
      <div className={styles.videoWrapper}>
        <iframe
          src={src}
          title="Vídeo de la lección"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.videoFrame}
        />
      </div>
    );
  }
  return (
    <div className={styles.videoWrapper}>
      <video src={src} controls className={styles.videoNative} />
    </div>
  );
}

function parseQuiz(content) {
  if (!content) return null;
  try {
    const parsed = JSON.parse(content);
    const questions = Array.isArray(parsed) ? parsed : parsed?.questions;
    if (Array.isArray(questions) && questions.length > 0) return questions;
  } catch {}
  return null;
}

function QuizContent({ content, onAllAnswered }) {
  const questions = parseQuiz(content);
  const [answers,   setAnswers]   = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!questions) {
    return <div className={styles.htmlContent} dangerouslySetInnerHTML={{ __html: content ?? '' }} />;
  }

  const allAnswered = questions.every((_, i) => answers[i] !== undefined);
  const score = submitted
    ? questions.reduce((acc, q, i) => acc + (q.options?.[answers[i]]?.isCorrect ? 1 : 0), 0)
    : null;

  function handleSubmit() {
    setSubmitted(true);
    if (onAllAnswered) onAllAnswered();
  }

  return (
    <div className={styles.quiz}>
      <ol className={styles.questionList}>
        {questions.map((q, qi) => (
          <li key={qi} className={styles.question}>
            <p className={styles.questionText}>{q.question ?? q.text}</p>
            <ul className={styles.optionList}>
              {(q.options ?? []).map((opt, oi) => {
                const selected  = answers[qi] === oi;
                const showRight = submitted && opt.isCorrect;
                const showWrong = submitted && selected && !opt.isCorrect;
                return (
                  <li key={oi}>
                    <label
                      className={[
                        styles.option,
                        selected  ? styles.optionSelected : '',
                        showRight ? styles.optionCorrect  : '',
                        showWrong ? styles.optionWrong    : '',
                      ].filter(Boolean).join(' ')}
                    >
                      <input
                        type="radio"
                        name={`q${qi}`}
                        disabled={submitted}
                        checked={selected}
                        onChange={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                        className={styles.optionRadio}
                      />
                      {opt.text}
                    </label>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>

      {!submitted ? (
        <Button onClick={handleSubmit} disabled={!allAnswered} variant="secondary" size="sm">
          Comprobar respuestas
        </Button>
      ) : (
        <p className={styles.quizScore}>
          {score} de {questions.length} respuestas correctas
        </p>
      )}
    </div>
  );
}

function LessonContent({ lesson, onQuizAnswered }) {
  if (lesson.type === 'video') return <VideoContent videoUrl={lesson.videoUrl} />;
  if (lesson.type === 'quiz') {
    return <QuizContent content={lesson.content} onAllAnswered={onQuizAnswered} />;
  }
  return (
    <div
      className={styles.htmlContent}
      dangerouslySetInnerHTML={{ __html: lesson.content ?? '<p>Sin contenido disponible.</p>' }}
    />
  );
}

export default function LessonPage() {
  const { id: courseId, unitId, lessonId } = useParams();
  const { token }  = useAuth();
  const router     = useRouter();
  const { showError } = useToast();
  const [completing, setCompleting] = useState(false);
  const [quizReady,  setQuizReady]  = useState(false);

  const { data, loading, error } = useAsyncData(() =>
    Promise.all([
      lessonsService.getLessonById(courseId, unitId, lessonId, token),
      progressService.getCourseProgress(courseId, token).catch(() => null),
    ]).then(([lessonRes, progressRes]) => {
      const lesson = lessonRes.lesson ?? lessonRes;
      const units  = progressRes?.units ?? [];

      const flat = units.flatMap((u) =>
        (u.lessons ?? []).map((l) => ({
          lessonId:  String(l.lesson._id ?? l.lesson.id),
          unitId:    String(u.unit._id ?? u.unit.id),
          title:     l.lesson.title,
          locked:    l.locked,
          completed: l.completed,
        }))
      );

      const idx     = flat.findIndex((l) => l.lessonId === String(lessonId));
      const prev    = idx > 0 ? flat[idx - 1] : null;
      const next    = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;
      const current = flat[idx] ?? null;

      const courseUnit  = units.find((u) => String(u.unit._id ?? u.unit.id) === String(unitId));
      const unitTitle   = courseUnit?.unit?.title ?? null;
      const unitOrder   = courseUnit?.unit?.order ?? null;
      const totalInUnit = courseUnit?.lessons?.length ?? 0;
      const posInUnit   = (courseUnit?.lessons ?? []).findIndex(
        (l) => String(l.lesson._id ?? l.lesson.id) === String(lessonId)
      ) + 1;

      return {
        lesson,
        prev,
        next,
        current,
        unitTitle,
        unitOrder,
        posInUnit,
        totalInUnit,
        overallProgress: progressRes?.overallProgress ?? 0,
      };
    })
  );

  if (loading) return <LoadingState message="Cargando lección..." />;
  if (error)   return <ErrorState message={error} />;

  const { lesson, prev, next, current, unitTitle, unitOrder, posInUnit, totalInUnit, overallProgress } = data;

  const isLocked    = current?.locked    ?? false;
  const isCompleted = current?.completed ?? false;
  const isQuiz      = lesson.type === 'quiz';
  const hasStructuredQuiz = isQuiz && parseQuiz(lesson.content) !== null;

  function lessonHref(l) {
    return `/courses/${courseId}/units/${l.unitId}/lessons/${l.lessonId}`;
  }

  async function handleComplete() {
    setCompleting(true);
    try {
      await progressService.completeLesson(lessonId, token);
      if (next) {
        router.push(lessonHref(next));
      } else {
        router.push(`/courses/${courseId}`);
      }
    } catch {
      setCompleting(false);
      showError('No se pudo marcar la lección como completada. Inténtalo de nuevo.');
    }
  }

  if (isLocked) {
    return (
      <div className={styles.page}>
        <div className={styles.lockedState}>
          <span className={styles.lockedIcon}>🔒</span>
          <h2 className={styles.lockedTitle}>Lección bloqueada</h2>
          <p className={styles.lockedMsg}>Completa las lecciones anteriores para desbloquear esta.</p>
          <Button as={Link} href={`/courses/${courseId}`} variant="secondary">
            Volver al curso
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className={styles.breadcrumb}>
        <Link href="/courses" className={styles.crumbLink}>Mis cursos</Link>
        <span className={styles.crumbSep} aria-hidden="true">›</span>
        <Link href={`/courses/${courseId}`} className={styles.crumbLink}>Curso</Link>
        <span className={styles.crumbSep} aria-hidden="true">›</span>
        <span className={styles.crumbCurrent} aria-current="page">{lesson.title}</span>
      </nav>

      {/* Progreso del curso */}
      {overallProgress > 0 && (
        <div className={styles.progressRow}>
          <ProgressBar value={overallProgress} ariaLabel="Progreso del curso" />
          <span className={styles.progressPct}>{overallProgress}%</span>
        </div>
      )}

      {/* Título y metadatos */}
      <div className={styles.titleBlock}>
        <div className={styles.titleMeta}>
          <span className={styles.typeBadge}>{TYPE_LABEL[lesson.type] ?? lesson.type}</span>
          {lesson.duration && <span className={styles.duration}>{lesson.duration} min</span>}
          {isCompleted && <span className={styles.completedBadge}>Completada</span>}
        </div>
        <h1 className={styles.lessonTitle}>{lesson.title}</h1>
      </div>

      {/* Contenido */}
      <div className={styles.contentArea}>
        <LessonContent lesson={lesson} onQuizAnswered={() => setQuizReady(true)} />
      </div>

      {/* Navegación */}
      <div className={styles.nav}>
        <div className={styles.navPrev}>
          {prev && !prev.locked && (
            <Button as={Link} href={lessonHref(prev)} variant="ghost" size="sm">
              ← {prev.title}
            </Button>
          )}
        </div>

        <div className={styles.navActions}>
          {isCompleted ? (
            next ? (
              <Button
                as={Link}
                href={lessonHref(next)}
                variant="primary"
                size="sm"
                disabled={next.locked}
              >
                Siguiente →
              </Button>
            ) : (
              <Button as={Link} href={`/courses/${courseId}`} variant="primary" size="sm">
                Finalizar curso →
              </Button>
            )
          ) : (
            <Button
              variant="primary"
              size="sm"
              loading={completing}
              disabled={completing || (hasStructuredQuiz && !quizReady)}
              onClick={handleComplete}
            >
              Marcar como completada
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

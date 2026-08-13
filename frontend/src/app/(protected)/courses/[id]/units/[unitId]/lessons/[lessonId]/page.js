'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  BookOpen, MessageCircle, AlertTriangle, PenLine, Clock,
  CheckCircle2, Lock, ArrowLeft, ArrowRight, Video, VideoOff,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useToast } from '@/contexts/ToastContext';
import { lessonsService }  from '@/lib/services/lessons.service';
import { progressService } from '@/lib/services/progress.service';
import { parseLessonContent } from '@/lib/utils/parseLessonContent';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState   from '@/components/ui/ErrorState';
import Button        from '@/components/ui/Button';
import ProgressBar   from '@/components/ui/ProgressBar';
import styles from './Lesson.module.css';

const TYPE_LABEL = { video: 'Vídeo', text: 'Texto', quiz: 'Test' };

// ================================================================
// Bloques de contenido — parseo puramente visual sobre el texto real
// de la lección (parseLessonContent). No se reescribe ni genera texto,
// solo se reconoce estructura ya presente (separadores, listas "→",
// frases entre comillas, correcciones "❌/✅", bloque final PRACTICA).
// ================================================================

const SECTION_ICON = {
  warning:  AlertTriangle,
  practice: PenLine,
  dialogue: MessageCircle,
  vocab:    BookOpen,
  section:  BookOpen,
};

function VocabParagraph({ lines }) {
  const rows = lines.map((l) => {
    const [term, ...rest] = l.split('→');
    return { term: term.trim(), value: rest.join('→').trim() };
  });
  return (
    <div className={styles.vocabGrid}>
      {rows.map((r, i) => (
        <div className={styles.vocabRow} key={i}>
          <span className={styles.vocabTerm}>{r.term}</span>
          <span className={styles.vocabArrow} aria-hidden="true">→</span>
          <span className={styles.vocabValue}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function QuotesParagraph({ lines }) {
  return (
    <ul className={styles.quoteList}>
      {lines.map((l, i) => (
        <li key={i} className={styles.quoteItem}>{l.replace(/^"|"$/g, '')}</li>
      ))}
    </ul>
  );
}

function ErrorsParagraph({ lines }) {
  return (
    <div className={styles.errorLines}>
      {lines.map((l, i) => (
        <p key={i} className={l.startsWith('❌') ? styles.errorWrong : styles.errorRight}>{l}</p>
      ))}
    </div>
  );
}

function TextParagraph({ lines }) {
  return <p className={styles.bodyText}>{lines.join(' ')}</p>;
}

function Paragraph({ p }) {
  if (p.kind === 'vocab')  return <VocabParagraph lines={p.lines} />;
  if (p.kind === 'quotes') return <QuotesParagraph lines={p.lines} />;
  if (p.kind === 'errors') return <ErrorsParagraph lines={p.lines} />;
  return <TextParagraph lines={p.lines} />;
}

// El bloque PRACTICA oculta las respuestas tras un <details> nativo — misma
// información, sin obligar a leerla antes de intentar el ejercicio.
function PracticeParagraph({ p, index }) {
  const text = p.kind === 'text' ? p.lines.join(' ') : '';
  if (p.kind === 'text' && /^Respuestas/i.test(text)) {
    return (
      <details key={index} className={styles.answerReveal}>
        <summary>Ver respuestas</summary>
        <p className={styles.bodyText}>{text}</p>
      </details>
    );
  }
  return <Paragraph key={index} p={p} />;
}

function ContentSection({ section, index }) {
  const Icon = SECTION_ICON[section.type] ?? BookOpen;
  const cls = [styles.block, styles[`block_${section.type}`]].filter(Boolean).join(' ');
  return (
    <section className={cls} style={{ '--stagger': index }}>
      <div className={styles.blockHeader}>
        <Icon size={16} aria-hidden="true" />
        <h2 className={styles.blockHeading}>{section.heading}</h2>
      </div>
      {section.paragraphs.map((p, i) => (
        section.type === 'practice'
          ? <PracticeParagraph key={i} p={p} index={i} />
          : <Paragraph key={i} p={p} />
      ))}
    </section>
  );
}

function RichLessonText({ content }) {
  const parsed = parseLessonContent(content);

  if (parsed.type === 'html') {
    return <div className={styles.htmlContent} dangerouslySetInnerHTML={{ __html: parsed.html || '<p>Sin contenido disponible.</p>' }} />;
  }
  if (!parsed.lead.length && !parsed.sections.length) {
    return <p className={styles.noContent}>Sin contenido disponible.</p>;
  }

  return (
    <div className={styles.richContent}>
      {parsed.lead.map((line, i) => (
        <p key={i} className={styles.leadText}>{line}</p>
      ))}
      {parsed.sections.map((section, i) => (
        <ContentSection key={i} section={section} index={i} />
      ))}
    </div>
  );
}

// ================================================================
// Tipos de lección
// ================================================================

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
  } catch {
    // URL no parseable: se usa el fallback de vídeo nativo de abajo.
  }
  return { type: 'video', src: url };
}

// No hay ningún campo adicional real asociado a las lecciones de vídeo
// (lesson.content siempre es null para type='video' en los 24 seeds de
// contenido auditados) — el vídeo se presenta como pieza protagonista
// dentro de una superficie propia, con el mismo lenguaje de bloque
// (.block/.blockHeader) que ya usan las lecciones de texto, sin rellenar
// el espacio con nada inventado.
function VideoContent({ videoUrl }) {
  const [videoFailed, setVideoFailed] = useState(false);

  if (!videoUrl) {
    return (
      <div className={styles.block}>
        <div className={styles.videoEmpty}>
          <VideoOff size={22} aria-hidden="true" />
          <p className={styles.noContent}>Todavía no hay vídeo disponible para esta lección.</p>
        </div>
      </div>
    );
  }

  const { type, src } = toEmbedUrl(videoUrl);

  return (
    <div className={styles.block}>
      <div className={styles.blockHeader}>
        <Video size={16} aria-hidden="true" />
        <h2 className={styles.blockHeading}>Vídeo de la lección</h2>
      </div>

      {videoFailed ? (
        <div className={styles.videoEmpty}>
          <VideoOff size={22} aria-hidden="true" />
          <p className={styles.noContent}>No se ha podido reproducir el vídeo.</p>
        </div>
      ) : type === 'iframe' ? (
        <div className={styles.videoWrapper}>
          <iframe
            src={src}
            title="Vídeo de la lección"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.videoFrame}
          />
        </div>
      ) : (
        <div className={styles.videoWrapper}>
          <video
            src={src}
            controls
            className={styles.videoNative}
            onError={() => setVideoFailed(true)}
          />
        </div>
      )}
    </div>
  );
}

function parseQuiz(content) {
  if (!content) return null;
  try {
    const parsed = JSON.parse(content);
    const questions = Array.isArray(parsed) ? parsed : parsed?.questions;
    if (Array.isArray(questions) && questions.length > 0) return questions;
  } catch {
    // Contenido no es JSON válido: se trata como "sin preguntas".
  }
  return null;
}

function QuizContent({ content, onAllAnswered }) {
  const questions = parseQuiz(content);
  const [answers,   setAnswers]   = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Sin preguntas estructuradas: el contenido es texto plano con el mismo
  // formato pedagógico que una lección de texto — reutiliza el mismo
  // renderizado enriquecido en vez de volcarlo como HTML plano.
  if (!questions) {
    return <RichLessonText content={content} />;
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
  return <RichLessonText content={lesson.content} />;
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
      const lesson   = lessonRes.lesson ?? lessonRes;
      const progress = progressRes?.progress ?? null;
      const units    = progress?.units ?? [];

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
        overallProgress: progress?.overallProgress ?? 0,
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
          <Lock size={32} className={styles.lockedIcon} aria-hidden="true" />
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

      {/* Cabecera — breadcrumb, progreso, metadatos y título protagonista.
          Todo con datos reales; nada se muestra si no existe. */}
      <header className={styles.header}>
        <nav aria-label="breadcrumb" className={styles.breadcrumb}>
          <Link href="/courses" className={styles.crumbLink}>Mis cursos</Link>
          <span className={styles.crumbSep} aria-hidden="true">›</span>
          <Link href={`/courses/${courseId}`} className={styles.crumbLink}>Curso</Link>
          {unitTitle && (
            <>
              <span className={styles.crumbSep} aria-hidden="true">›</span>
              <span className={styles.crumbCurrent}>{unitOrder ? `Unidad ${unitOrder}` : unitTitle}</span>
            </>
          )}
        </nav>

        {overallProgress > 0 && (
          <div className={styles.progressRow}>
            <ProgressBar value={overallProgress} ariaLabel="Progreso del curso" variant="accent" />
            <span className={styles.progressPct}>{overallProgress}% del curso</span>
          </div>
        )}

        <div className={styles.titleMeta}>
          <span className={styles.typeBadge}>{TYPE_LABEL[lesson.type] ?? lesson.type}</span>
          {lesson.duration && (
            <span className={styles.duration}>
              <Clock size={13} aria-hidden="true" /> {lesson.duration} min
            </span>
          )}
          {totalInUnit > 0 && posInUnit > 0 && (
            <span className={styles.posInUnit}>Lección {posInUnit} de {totalInUnit}</span>
          )}
          {isCompleted && (
            <span className={styles.completedBadge}>
              <CheckCircle2 size={13} aria-hidden="true" /> Completada
            </span>
          )}
        </div>

        <h1 className={styles.lessonTitle}>{lesson.title}</h1>
        {unitTitle && <p className={styles.unitContext}>{unitTitle}</p>}
      </header>

      {/* Contenido */}
      <div className={styles.contentArea}>
        <LessonContent lesson={lesson} onQuizAnswered={() => setQuizReady(true)} />
      </div>

      {/* Navegación — footer con anterior / completar / siguiente. Solo se
          muestran acciones que realmente existen; la lógica de completado
          no cambia. */}
      <footer className={styles.nav}>
        <div className={styles.navSide}>
          {prev && !prev.locked ? (
            <Button as={Link} href={lessonHref(prev)} variant="ghost" size="sm" iconLeft={<ArrowLeft size={15} />}>
              {prev.title}
            </Button>
          ) : <span />}
        </div>

        <div className={styles.navActions}>
          {isCompleted ? (
            next ? (
              <Button
                as={Link}
                href={lessonHref(next)}
                variant="accent"
                size="md"
                disabled={next.locked}
                iconRight={<ArrowRight size={15} />}
              >
                Siguiente lección
              </Button>
            ) : (
              <Button as={Link} href={`/courses/${courseId}`} variant="accent" size="md">
                Finalizar curso
              </Button>
            )
          ) : (
            <Button
              variant="accent"
              size="md"
              loading={completing}
              disabled={completing || (hasStructuredQuiz && !quizReady)}
              onClick={handleComplete}
            >
              Marcar como completada
            </Button>
          )}
        </div>

        <div className={styles.navSide}>
          {isCompleted && next && (
            <span className={styles.navUpNext}>{next.title}</span>
          )}
        </div>
      </footer>
    </div>
  );
}

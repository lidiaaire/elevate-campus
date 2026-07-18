'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth }            from '@/hooks/useAuth';
import { useAsyncData }       from '@/hooks/useAsyncData';
import { useToast }           from '@/contexts/ToastContext';
import { assessmentsService } from '@/lib/services/assessments.service';
import PageHeader   from '@/components/ui/PageHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState   from '@/components/ui/ErrorState';
import EmptyState   from '@/components/ui/EmptyState';
import Button       from '@/components/ui/Button';
import styles from './Assessment.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

async function fetchAssessmentData(courseId, unitId, token) {
  const res = await fetch(
    `${BASE_URL}/courses/${courseId}/units/${unitId}/assessment`,
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
  );
  const body = await res.json();
  if (res.ok)             return { assessment: body.assessment, blocked: null };
  if (res.status === 403) return { assessment: null, blocked: body.error };
  throw new Error(body?.message ?? `Error ${res.status}`);
}

const BLOCKED_COPY = {
  LESSONS_INCOMPLETE: {
    title:       'Evaluación bloqueada',
    description: 'Completa todas las lecciones de la unidad para acceder a la evaluación.',
  },
  NOT_ENROLLED: {
    title:       'Sin matrícula activa',
    description: 'Necesitas una matrícula activa en este curso.',
  },
};

function formatDate(iso) {
  return new Date(iso).toLocaleString('es-ES', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

function AttemptsHistory({ attempts }) {
  if (!attempts?.length) return null;
  return (
    <section className={styles.historySection}>
      <h2 className={styles.historyTitle}>Historial de intentos</h2>
      <div className={styles.historyTable}>
        <div className={`${styles.historyRow} ${styles.historyHead}`}>
          <span>#</span>
          <span>Puntuación</span>
          <span>Resultado</span>
          <span>Fecha</span>
        </div>
        {attempts.map((a) => (
          <div key={a._id} className={styles.historyRow}>
            <span className={styles.attemptNum}>{a.attemptNumber}</span>
            <span className={styles.attemptScore}>{a.score}%</span>
            <span>
              <span className={`${styles.resultBadge} ${a.passed ? styles.badgePass : styles.badgeFail}`}>
                {a.passed ? 'Superado' : 'No superado'}
              </span>
            </span>
            <span className={styles.attemptDate}>{formatDate(a.submittedAt)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AssessmentPage() {
  const { id: courseId, unitId } = useParams();
  const { token } = useAuth();
  const { showError } = useToast();

  const [answers,     setAnswers]     = useState({});
  const [submitting,  setSubmitting]  = useState(false);
  const [lastAttempt, setLastAttempt] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const { data, loading, error, reload } = useAsyncData(() =>
    Promise.all([
      fetchAssessmentData(courseId, unitId, token),
      assessmentsService.listAttempts(courseId, unitId, token).catch(() => ({ attempts: [] })),
    ]).then(([assessData, attemptsData]) => ({
      ...assessData,
      attempts: attemptsData.attempts ?? [],
    }))
  );

  if (loading) return <LoadingState message="Cargando evaluación..." />;
  if (error)   return <ErrorState message={error} />;

  const { assessment, blocked, attempts } = data ?? {};

  if (blocked) {
    const copy = BLOCKED_COPY[blocked] ?? {
      title: 'Acceso restringido',
      description: 'No tienes acceso a esta evaluación.',
    };
    return (
      <div className={styles.page}>
        <EmptyState title={copy.title} description={copy.description} />
        <div className={styles.backRow}>
          <Button as={Link} href={`/courses/${courseId}`} variant="ghost" size="sm">
            ← Volver al curso
          </Button>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className={styles.page}>
        <EmptyState title="Esta unidad no tiene evaluación." />
        <div className={styles.backRow}>
          <Button as={Link} href={`/courses/${courseId}`} variant="ghost" size="sm">
            ← Volver al curso
          </Button>
        </div>
      </div>
    );
  }

  const attemptsUsed = attempts.length;
  const attemptsLeft = assessment.maxAttempts - attemptsUsed;
  const hasPassed    = attempts.some((a) => a.passed);
  const canAttempt   = !hasPassed && attemptsLeft > 0 && !lastAttempt;
  const allAnswered  = assessment.questions.every((q) => answers[q._id] !== undefined);

  function handleChange(questionId, index) {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const orderedAnswers = assessment.questions.map((q) => answers[q._id]);
      const res = await assessmentsService.submitAttempt(courseId, unitId, { answers: orderedAnswers }, token);
      setLastAttempt(res.attempt);
      reload();
    } catch (err) {
      const msg = err.message ?? 'Error al enviar las respuestas.';
      setSubmitError(msg);
      showError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  function handleRetry() {
    setLastAttempt(null);
    setAnswers({});
    setSubmitError(null);
  }

  return (
    <div className={styles.page}>
      <div className={styles.topNav}>
        <Button as={Link} href={`/courses/${courseId}`} variant="ghost" size="sm">
          ← Volver al curso
        </Button>
        <Button as={Link} href="/assessments" variant="ghost" size="sm">
          Mis evaluaciones
        </Button>
      </div>

      <PageHeader title={assessment.title} description={assessment.description} />

      {/* Meta */}
      <div className={styles.metaRow}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Nota mínima</span>
          <span className={styles.metaValue}>{assessment.passingScore}%</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Preguntas</span>
          <span className={styles.metaValue}>{assessment.questions.length}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Intentos restantes</span>
          <span className={`${styles.metaValue} ${attemptsLeft === 0 ? styles.metaValueDanger : ''}`}>
            {hasPassed ? '—' : `${attemptsLeft} / ${assessment.maxAttempts}`}
          </span>
        </div>
        {hasPassed && (
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Estado</span>
            <span className={`${styles.metaValue} ${styles.metaValueSuccess}`}>Superada</span>
          </div>
        )}
      </div>

      {/* Resultado del último intento enviado ahora mismo */}
      {lastAttempt && (
        <div className={`${styles.resultBox} ${lastAttempt.passed ? styles.resultPass : styles.resultFail}`}>
          <p className={styles.resultTitle}>
            {lastAttempt.passed ? '¡Evaluación superada!' : 'No has alcanzado la nota mínima'}
          </p>
          <p className={styles.resultScore}>
            Puntuación: <strong>{lastAttempt.score}%</strong>
            {' · '}Intento nº <strong>{lastAttempt.attemptNumber}</strong>
          </p>
          {!lastAttempt.passed && attemptsLeft > 1 && (
            <Button onClick={handleRetry} variant="secondary" size="sm">
              Intentar de nuevo ({attemptsLeft - 1} restante{attemptsLeft - 1 !== 1 ? 's' : ''})
            </Button>
          )}
          {!lastAttempt.passed && attemptsLeft <= 1 && (
            <p className={styles.noAttemptsMsg}>Has agotado todos los intentos.</p>
          )}
          <div className={styles.resultActions}>
            {lastAttempt.passed && (
              <Button as={Link} href="/progress" variant="primary" size="sm">
                Ver mi progreso →
              </Button>
            )}
            <Button as={Link} href={`/courses/${courseId}`} variant="ghost" size="sm">
              Volver al curso
            </Button>
          </div>
        </div>
      )}

      {/* Estado: ya superada */}
      {hasPassed && !lastAttempt && (
        <div className={`${styles.resultBox} ${styles.resultPass}`}>
          <p className={styles.resultTitle}>Ya has superado esta evaluación.</p>
          <p className={styles.resultScore}>
            Mejor puntuación: <strong>{Math.max(...attempts.map((a) => a.score))}%</strong>
          </p>
          <div className={styles.resultActions}>
            <Button as={Link} href="/progress" variant="primary" size="sm">
              Ver mi progreso →
            </Button>
            <Button as={Link} href={`/courses/${courseId}`} variant="ghost" size="sm">
              Volver al curso
            </Button>
          </div>
        </div>
      )}

      {/* Estado: sin intentos disponibles */}
      {!hasPassed && attemptsLeft === 0 && !lastAttempt && (
        <div className={`${styles.resultBox} ${styles.resultFail}`}>
          <p className={styles.resultTitle}>Has agotado todos los intentos.</p>
          <p className={styles.resultScore}>Contacta con tu profesor si necesitas ayuda.</p>
          <div className={styles.resultActions}>
            <Button as={Link} href={`/courses/${courseId}`} variant="ghost" size="sm">
              Volver al curso
            </Button>
          </div>
        </div>
      )}

      {/* Formulario */}
      {canAttempt && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <ol className={styles.questionList}>
            {assessment.questions.map((q, qi) => (
              <li key={q._id} className={styles.questionCard}>
                <p className={styles.questionText}>{q.text}</p>
                {q.points > 1 && (
                  <span className={styles.questionPoints}>{q.points} puntos</span>
                )}
                <ul className={styles.optionList}>
                  {q.options.map((opt, oi) => (
                    <li key={oi}>
                      <label className={`${styles.optionLabel} ${answers[q._id] === oi ? styles.optionSelected : ''}`}>
                        <input
                          type="radio"
                          name={`q-${q._id}`}
                          value={oi}
                          checked={answers[q._id] === oi}
                          onChange={() => handleChange(q._id, oi)}
                          disabled={submitting}
                          className={styles.optionRadio}
                        />
                        {opt}
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          {submitError && <p className={styles.errorText}>{submitError}</p>}

          <div className={styles.submitRow}>
            <span className={styles.answeredCount}>
              {Object.keys(answers).length} / {assessment.questions.length} respondidas
            </span>
            <Button
              type="submit"
              variant="primary"
              loading={submitting}
              disabled={!allAnswered || submitting}
            >
              Enviar respuestas
            </Button>
          </div>
        </form>
      )}

      <AttemptsHistory attempts={attempts} />
    </div>
  );
}

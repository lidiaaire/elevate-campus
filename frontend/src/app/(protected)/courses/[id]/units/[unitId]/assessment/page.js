'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { assessmentsService } from '@/lib/services/assessments.service';
import PageHeader from '@/components/ui/PageHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import styles from '@/styles/Assessment.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

// Fetcher local para preservar el código de error del backend (api.js lo descarta).
// Devuelve { assessment, blocked } en lugar de lanzar en casos 403 conocidos.
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
    description: 'Debes completar todas las lecciones de esta unidad antes de acceder a la evaluación.',
  },
  NOT_ENROLLED: {
    title:       'Sin matrícula activa',
    description: 'Necesitas una matrícula activa en este curso para acceder a la evaluación.',
  },
};

export default function AssessmentPage() {
  const { id, unitId } = useParams();
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(
    () => fetchAssessmentData(id, unitId, token),
  );

  // answers: { [questionId]: selectedIndex (Number) }
  const [answers,    setAnswers]    = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [attempt,    setAttempt]    = useState(null);
  const [submitError, setSubmitError] = useState(null);

  if (loading) return <LoadingState message="Cargando evaluación…" />;
  if (error)   return <ErrorState message={error} />;

  const { assessment, blocked } = data ?? {};

  if (blocked) {
    const copy = BLOCKED_COPY[blocked] ?? {
      title:       'Acceso restringido',
      description: 'No tienes acceso a esta evaluación en este momento.',
    };
    return <EmptyState title={copy.title} description={copy.description} />;
  }

  if (!assessment) {
    return <EmptyState title="Esta unidad no tiene evaluación." />;
  }

  const allAnswered = assessment.questions.every((q) => answers[q._id] !== undefined);

  function handleChange(questionId, index) {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const orderedAnswers = assessment.questions.map((q) => answers[q._id]);
      const res = await assessmentsService.submitAttempt(id, unitId, { answers: orderedAnswers }, token);
      setAttempt(res.attempt);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <PageHeader title={assessment.title} description={assessment.description} />

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          Nota mínima: <strong>{assessment.passingScore}%</strong>
        </span>
        <span className={styles.metaItem}>
          Intentos permitidos: <strong>{assessment.maxAttempts}</strong>
        </span>
        <span className={styles.metaItem}>
          Preguntas: <strong>{assessment.questions.length}</strong>
        </span>
      </div>

      {attempt ? (
        <div className={styles.result}>
          <h2 className={`${styles.resultTitle} ${attempt.passed ? styles.resultPass : styles.resultFail}`}>
            {attempt.passed ? '¡Evaluación superada!' : 'No has alcanzado la nota mínima'}
          </h2>
          <div className={styles.resultMeta}>
            <span>Puntuación: <strong>{attempt.score}%</strong></span>
            <span>Intento nº <strong>{attempt.attemptNumber}</strong></span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {assessment.questions.map((q, i) => (
            <div key={q._id} className={styles.questionCard}>
              <div className={styles.questionHeader}>
                <span className={styles.questionNumber}>{i + 1}</span>
                <span className={styles.questionText}>{q.text}</span>
              </div>
              <div className={styles.options}>
                {q.options.map((opt, j) => (
                  <label key={j} className={styles.optionLabel}>
                    <input
                      type="radio"
                      name={`q-${q._id}`}
                      value={j}
                      checked={answers[q._id] === j}
                      onChange={() => handleChange(q._id, j)}
                      disabled={submitting}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {submitError && (
            <p className={styles.errorText}>{submitError}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={!allAnswered || submitting}
          >
            {submitting ? 'Enviando…' : 'Enviar respuestas'}
          </Button>
        </form>
      )}
    </div>
  );
}

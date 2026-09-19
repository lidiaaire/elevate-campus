'use client';

import { useState } from 'react';
import { PenLine, CheckCircle2, XCircle } from 'lucide-react';
import styles from '../Lesson.module.css';

// Microactividad de opción única con feedback inmediato. Estado puramente
// local al componente — sin persistencia ni endpoint propio (fuera de
// alcance de esta piloto).
export default function PracticeBlock({ block }) {
  const q = block.practiceQuestion;
  const [selected, setSelected] = useState(null);

  if (!q?.options?.length) return null;

  const hasAnswered = selected !== null;
  const isCorrect   = hasAnswered && !!q.options[selected]?.isCorrect;

  return (
    <section className={[styles.block, styles.block_practice].join(' ')}>
      {block.heading && (
        <div className={styles.blockHeader}>
          <PenLine size={16} aria-hidden="true" />
          <h2 className={styles.blockHeading}>{block.heading}</h2>
        </div>
      )}

      {block.title && <h3 className={styles.blockTitle}>{block.title}</h3>}
      {q.prompt && <p className={styles.blockSubtitle}>{q.prompt}</p>}
      {q.sentenceTemplate && <p className={styles.practiceSentence}>{q.sentenceTemplate}</p>}

      <ul className={styles.optionList}>
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const showRight  = hasAnswered && opt.isCorrect;
          const showWrong  = hasAnswered && isSelected && !opt.isCorrect;
          return (
            <li key={i}>
              <button
                type="button"
                disabled={hasAnswered}
                onClick={() => setSelected(i)}
                className={[
                  styles.option,
                  styles.practiceOption,
                  isSelected ? styles.optionSelected : '',
                  showRight  ? styles.optionCorrect  : '',
                  showWrong  ? styles.optionWrong    : '',
                ].filter(Boolean).join(' ')}
              >
                {opt.text}
                {showRight && <CheckCircle2 size={15} aria-hidden="true" />}
                {showWrong && <XCircle size={15} aria-hidden="true" />}
              </button>
            </li>
          );
        })}
      </ul>

      {hasAnswered && (
        <p className={[styles.practiceFeedback, isCorrect ? styles.practiceFeedbackCorrect : styles.practiceFeedbackIncorrect].join(' ')}>
          {isCorrect ? q.feedbackCorrect : q.feedbackIncorrect}
        </p>
      )}
    </section>
  );
}

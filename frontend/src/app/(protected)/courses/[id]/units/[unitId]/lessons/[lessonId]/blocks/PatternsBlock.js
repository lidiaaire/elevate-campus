'use client';

import { Layers } from 'lucide-react';
import styles from '../Lesson.module.css';

export default function PatternsBlock({ block }) {
  const cards = block.cards ?? [];
  if (!cards.length) return null;

  return (
    <section className={styles.block}>
      {block.heading && (
        <div className={styles.blockHeader}>
          <Layers size={16} aria-hidden="true" />
          <h2 className={styles.blockHeading}>{block.heading}</h2>
        </div>
      )}

      {block.title && <h3 className={styles.blockTitle}>{block.title}</h3>}
      {block.body && <p className={styles.blockSubtitle}>{block.body}</p>}

      <div className={styles.patternGrid}>
        {cards.map((card, i) => (
          <div className={styles.patternCard} key={i}>
            {card.number && <span className={styles.patternNumber}>{card.number}</span>}
            {card.title && <p className={styles.objectiveTitle}>{card.title}</p>}
            {card.description && <p className={styles.patternDesc}>{card.description}</p>}

            {card.example?.from && card.example?.to && (
              <div className={styles.transformItem}>
                <span className={styles.transformFrom}>{card.example.from}</span>
                <span className={styles.transformArrow} aria-hidden="true">→</span>
                <span className={styles.transformTo}>{card.example.to}</span>
              </div>
            )}

            {/* Grupo de varios pares que comparten un mismo patrón (p. ej.
                varios verbos irregulares con el mismo cambio vocálico) —
                variante compacta de transformItem, un card usa una u otra. */}
            {card.examples?.length > 0 && (
              <div className={styles.patternExamplesList}>
                {card.examples.map((ex, j) => (
                  <div className={[styles.transformItem, styles.transformItemCompact].join(' ')} key={j}>
                    <span className={styles.transformFrom}>{ex.from}</span>
                    <span className={styles.transformArrow} aria-hidden="true">→</span>
                    <span className={styles.transformTo}>{ex.to}</span>
                  </div>
                ))}
              </div>
            )}

            {card.hint && <p className={styles.patternHint}>{card.hint}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

'use client';

import { Wand2, Lightbulb } from 'lucide-react';
import styles from '../Lesson.module.css';

export default function RuleBlock({ block }) {
  const transformations = block.transformations ?? [];

  return (
    <section className={[styles.block, styles.block_practice].join(' ')}>
      {block.heading && (
        <div className={styles.blockHeader}>
          <Wand2 size={16} aria-hidden="true" />
          <h2 className={styles.blockHeading}>{block.heading}</h2>
        </div>
      )}

      {block.title && <h3 className={styles.blockTitle}>{block.title}</h3>}

      {transformations.length > 0 && (
        <div className={styles.transformGrid}>
          {transformations.map((t, i) => (
            <div className={styles.transformItem} key={i}>
              <span className={styles.transformFrom}>{t.from}</span>
              <span className={styles.transformArrow} aria-hidden="true">→</span>
              <span className={styles.transformTo}>{t.to}</span>
            </div>
          ))}
        </div>
      )}

      {block.note?.text && (
        <div className={styles.noteBox}>
          <Lightbulb size={16} aria-hidden="true" className={styles.noteIcon} />
          <p>{block.note.text}</p>
        </div>
      )}
    </section>
  );
}

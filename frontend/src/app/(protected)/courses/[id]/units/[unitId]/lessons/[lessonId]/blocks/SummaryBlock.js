'use client';

import { BarChart3, CheckCircle2 } from 'lucide-react';
import styles from '../Lesson.module.css';

// Bloque puramente informativo — el CTA real de avance ("Marcar como
// completada" / "Siguiente lección") ya vive en el footer de la página,
// para no duplicar la lógica de navegación/progreso de la lección.
export default function SummaryBlock({ block }) {
  const items = block.items ?? [];
  if (!items.length) return null;

  return (
    <section className={styles.block}>
      {block.heading && (
        <div className={styles.blockHeader}>
          <BarChart3 size={16} aria-hidden="true" />
          <h2 className={styles.blockHeading}>{block.heading}</h2>
        </div>
      )}

      <ul className={styles.summaryList}>
        {items.map((item, i) => (
          <li className={styles.summaryItem} key={i}>
            <CheckCircle2 size={16} aria-hidden="true" className={styles.summaryCheck} />
            {item.title}
          </li>
        ))}
      </ul>
    </section>
  );
}

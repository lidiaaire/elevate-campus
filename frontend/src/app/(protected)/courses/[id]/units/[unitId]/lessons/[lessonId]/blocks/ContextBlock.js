'use client';

import { Sparkles as HeaderIcon } from 'lucide-react';
import { getItemIcon } from './icons';
import styles from '../Lesson.module.css';

// Envuelve cada término de `highlight` en <mark> dentro de `text`. Los
// términos son literales cortos (formas verbales), no HTML ni regex de
// usuario, así que un escape simple basta.
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function HighlightedText({ text, highlight }) {
  if (!highlight?.length) return <>{text}</>;
  const pattern = new RegExp(`(${highlight.map(escapeRegExp).join('|')})`, 'g');
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        highlight.includes(part)
          ? <mark key={i} className={styles.exampleHighlight}>{part}</mark>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}

export default function ContextBlock({ block }) {
  const examples = block.examples ?? [];

  return (
    <section className={styles.block}>
      {block.heading && (
        <div className={styles.blockHeader}>
          <HeaderIcon size={16} aria-hidden="true" />
          <h2 className={styles.blockHeading}>{block.heading}</h2>
        </div>
      )}

      {block.title && <h3 className={styles.blockTitle}>{block.title}</h3>}
      {block.body && <p className={styles.blockSubtitle}>{block.body}</p>}

      {examples.length > 0 && (
        <div className={styles.exampleList}>
          {examples.map((ex, i) => {
            const Icon = getItemIcon(ex.icon);
            return (
              <div className={styles.exampleRow} key={i}>
                <span className={styles.exampleIconWrap} aria-hidden="true">
                  <Icon size={16} />
                </span>
                <p className={styles.exampleText}>
                  <HighlightedText text={ex.text} highlight={ex.highlight} />
                </p>
              </div>
            );
          })}
        </div>
      )}

      {block.callout?.text && (
        <div className={styles.contextCallout}>
          {block.callout.text}
        </div>
      )}
    </section>
  );
}

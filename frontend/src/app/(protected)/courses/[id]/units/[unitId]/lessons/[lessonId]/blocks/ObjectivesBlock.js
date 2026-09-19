'use client';

import { Target } from 'lucide-react';
import { getItemIcon } from './icons';
import styles from '../Lesson.module.css';

export default function ObjectivesBlock({ block }) {
  const items = block.items ?? [];
  if (!items.length) return null;

  return (
    <section className={styles.block}>
      {block.heading && (
        <div className={styles.blockHeader}>
          <Target size={16} aria-hidden="true" />
          <h2 className={styles.blockHeading}>{block.heading}</h2>
        </div>
      )}

      <div className={styles.objectivesGrid}>
        {items.map((item, i) => {
          const Icon = getItemIcon(item.icon);
          return (
            <div className={styles.objectiveItem} key={i}>
              <span className={styles.objectiveIconWrap} aria-hidden="true">
                <Icon size={18} />
              </span>
              <div>
                <p className={styles.objectiveTitle}>{item.title}</p>
                {item.description && <p className={styles.objectiveDesc}>{item.description}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

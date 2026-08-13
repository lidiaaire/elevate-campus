'use client';

import styles from './SkillRadarLegend.module.css';

const SKILL_LABEL = {
  listening: 'Listening',
  reading: 'Reading',
  assessmentScore: 'Assessment',
  writing: 'Writing',
  speaking: 'Speaking',
};

export default function SkillRadarLegend({ skillProgress }) {
  const { listening, reading, assessmentScore, writing, speaking, _source } = skillProgress;
  const values = { listening, reading, assessmentScore, writing, speaking };

  return (
    <section className={styles.legend}>
      <h2 className={styles.title}>Tu perfil actual</h2>
      <ul className={styles.list}>
        {Object.entries(SKILL_LABEL).map(([key, label]) => {
          const value = values[key];
          return (
            <li key={key} className={styles.row}>
              <span className={styles.skill}>{label}</span>
              {value != null ? (
                <span className={styles.value}>{value}%</span>
              ) : (
                <span className={`${styles.value} ${styles.valueEmpty}`}>Sin datos</span>
              )}
            </li>
          );
        })}
      </ul>
      {_source === 'preliminary' && (
        <p className={styles.note}>Estimación preliminar basada en la actividad actual.</p>
      )}
    </section>
  );
}

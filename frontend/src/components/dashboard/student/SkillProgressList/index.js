'use client';

import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import styles from './SkillProgressList.module.css';

const SKILL_LABELS = {
  listening: 'Comprensión auditiva',
  reading:   'Comprensión lectora',
  writing:   'Escritura',
  speaking:  'Expresión oral',
};

const SKILL_KEYS = ['listening', 'reading', 'writing', 'speaking'];

export default function SkillProgressList({ skillProgress }) {
  const { _source, ...scores } = skillProgress;

  return (
    <Card variant="default" noPadding>
      <CardHeader divided>
        <h3 className={styles.cardTitle}>Competencias lingüísticas</h3>
      </CardHeader>
      <CardBody>
        <ul className={styles.list}>
          {SKILL_KEYS.map((key) => {
            const value = scores[key];
            const hasValue = value !== null && value !== undefined;
            return (
              <li key={key} className={styles.item}>
                <div className={styles.itemHeader}>
                  <span className={styles.skillLabel}>{SKILL_LABELS[key]}</span>
                  {hasValue
                    ? <span className={styles.skillValue}>{value}%</span>
                    : <span className={styles.skillValueEmpty}>Próximamente</span>
                  }
                </div>
                <div className={styles.bar}>
                  {hasValue && (
                    <ProgressBar value={value} ariaLabel={SKILL_LABELS[key]} />
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {_source === 'preliminary' && (
          <p className={styles.notice}>
            Los datos se actualizan con cada lección completada.
          </p>
        )}
      </CardBody>
    </Card>
  );
}

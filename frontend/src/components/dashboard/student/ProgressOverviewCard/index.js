'use client';

import Link from 'next/link';
import { BookOpenCheck, ClipboardCheck, Award, BadgeCheck } from 'lucide-react';
import Card, { CardBody } from '@/components/ui/Card';
import styles from './ProgressOverviewCard.module.css';

/**
 * ProgressOverviewCard — "Tu progreso".
 *
 * Anillo de progreso (conic-gradient, sin librería nueva) con el progreso
 * global real (summary.overallProgressAvg) + una lista compacta de datos
 * reales ya existentes en el payload del dashboard, más logros/certificados
 * (fetch aparte a endpoints ya existentes — no se inventa ningún dato).
 */
export default function ProgressOverviewCard({ summary, achievementsCount, certificatesCount }) {
  const pct = Math.min(100, Math.max(0, summary.overallProgressAvg ?? 0));

  return (
    <Card variant="default" className={styles.card}>
      <CardBody className={styles.body}>
        <div className={styles.header}>
          <h2 className={styles.title}>Tu progreso</h2>
          <Link href="/progress" className={styles.link}>Ver detalles →</Link>
        </div>

        <div className={styles.content}>
          <div className={styles.ring} style={{ '--pct': pct }} role="img" aria-label={`Progreso global: ${pct}%`}>
            <div className={styles.ringInner}>
              <span className={styles.ringValue}>{pct}%</span>
              <span className={styles.ringLabel}>Progreso</span>
            </div>
          </div>

          <ul className={styles.stats} role="list">
            <li className={styles.stat}>
              <BookOpenCheck size={16} className={styles.statIcon} aria-hidden="true" />
              <span>
                <strong>{summary.totalLessonsCompleted}/{summary.totalLessons}</strong> lecciones
              </span>
            </li>
            <li className={styles.stat}>
              <ClipboardCheck size={16} className={styles.statIcon} aria-hidden="true" />
              <span>
                {summary.assessmentsTotal > 0
                  ? <><strong>{summary.assessmentsPassed}/{summary.assessmentsTotal}</strong> evaluaciones</>
                  : 'Sin evaluaciones aún'}
              </span>
            </li>
            <li className={styles.stat}>
              <Award size={16} className={styles.statIcon} aria-hidden="true" />
              <span><strong>{achievementsCount}</strong> {achievementsCount === 1 ? 'logro' : 'logros'}</span>
            </li>
            <li className={styles.stat}>
              <BadgeCheck size={16} className={styles.statIcon} aria-hidden="true" />
              <span><strong>{certificatesCount}</strong> {certificatesCount === 1 ? 'certificado' : 'certificados'}</span>
            </li>
          </ul>
        </div>
      </CardBody>
    </Card>
  );
}

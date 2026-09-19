'use client';

import Link from 'next/link';
import { Award } from 'lucide-react';
import Card, { CardBody } from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import styles from './AchievementsCard.module.css';

const RARITY_CLASS = {
  COMMON:    styles.rarityCommon,
  RARE:      styles.rarityRare,
  EPIC:      styles.rarityEpic,
  LEGENDARY: styles.rarityLegendary,
};

// Solo logros reales ya desbloqueados (achievementService.getMyAchievements).
// No existe endpoint de logros bloqueados — no se fabrica esa lista.
export default function AchievementsCard({ achievements }) {
  const items = [...(achievements ?? [])]
    .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))
    .slice(0, 3);

  return (
    <Card variant="default" className={styles.card}>
      <CardBody className={styles.body}>
        <div className={styles.header}>
          <Award size={16} className={styles.headerIcon} aria-hidden="true" />
          <h2 className={styles.title}>Últimos logros</h2>
          <Link href="/achievements" className={styles.link}>Ver todos →</Link>
        </div>

        {items.length === 0 ? (
          <EmptyState title="Aún no has desbloqueado logros." description="¡Sigue aprendiendo!" />
        ) : (
          <ul className={styles.list} role="list">
            {items.map((a) => (
              <li key={a.slug} className={styles.item}>
                <span className={`${styles.iconBadge} ${RARITY_CLASS[a.rarity] ?? ''}`} aria-hidden="true">
                  {a.icon}
                </span>
                <span className={styles.itemName}>{a.name}</span>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}

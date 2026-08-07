'use client';

import styles from '@/styles/Achievements.module.css';

const RARITY_BADGE_CLASS = {
  COMMON:    styles.rarityCommon,
  RARE:      styles.rarityRare,
  EPIC:      styles.rarityEpic,
  LEGENDARY: styles.rarityLegendary,
};

export default function AchievementCard({ achievement }) {
  const { icon, name, description, category, rarity, points, unlockedAt } = achievement;
  const rarityClass = RARITY_BADGE_CLASS[rarity] ?? styles.badge;

  return (
    <li className={styles.card}>
      <span className={styles.icon}>{icon}</span>
      <div className={styles.body}>
        <p className={styles.name}>{name}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.meta}>
          <span className={styles.badge}>{category}</span>
          <span className={`${styles.badge} ${rarityClass}`}>{rarity}</span>
          <span className={styles.badge}>{points} pts</span>
          <span>Desbloqueado: {new Date(unlockedAt).toLocaleDateString('es-ES')}</span>
        </div>
      </div>
    </li>
  );
}

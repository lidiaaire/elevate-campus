'use client';

import styles from '@/app/(protected)/achievements/Achievements.module.css';

const RARITY_BADGE_CLASS = {
  COMMON:    styles.rarityCommon,
  RARE:      styles.rarityRare,
  EPIC:      styles.rarityEpic,
  LEGENDARY: styles.rarityLegendary,
};

const RARITY_CARD_CLASS = {
  COMMON:    styles.cardCommon,
  RARE:      styles.cardRare,
  EPIC:      styles.cardEpic,
  LEGENDARY: styles.cardLegendary,
};

const RARITY_ICON_BADGE_CLASS = {
  COMMON:    styles.iconBadgeCommon,
  RARE:      styles.iconBadgeRare,
  EPIC:      styles.iconBadgeEpic,
  LEGENDARY: styles.iconBadgeLegendary,
};

export default function AchievementCard({ achievement }) {
  const { icon, name, description, category, rarity, points, unlockedAt } = achievement;
  const rarityBadgeClass = RARITY_BADGE_CLASS[rarity] ?? '';
  const rarityCardClass  = RARITY_CARD_CLASS[rarity] ?? '';
  const iconBadgeClass   = RARITY_ICON_BADGE_CLASS[rarity] ?? '';

  return (
    <li className={`${styles.card} ${rarityCardClass}`}>
      <span className={`${styles.iconBadge} ${iconBadgeClass}`} aria-hidden="true">
        <span className={styles.icon}>{icon}</span>
      </span>
      <p className={styles.name}>{name}</p>
      <p className={styles.description}>{description}</p>
      <div className={styles.meta}>
        <span className={styles.badge}>{category}</span>
        <span className={`${styles.badge} ${rarityBadgeClass}`}>{rarity}</span>
        <span className={styles.badge}>{points} pts</span>
      </div>
      <span className={styles.date}>Desbloqueado: {new Date(unlockedAt).toLocaleDateString('es-ES')}</span>
    </li>
  );
}

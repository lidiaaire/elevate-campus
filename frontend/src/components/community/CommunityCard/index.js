'use client';

import { Award, FileBadge } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { resolveAuthorPhoto } from '@/lib/utils/resolveAuthorPhoto';
import styles from '@/styles/Community.module.css';

// Eventos automáticos del feed (ACHIEVEMENT/CERTIFICATE) — PostCard cubre
// type=POST con un tratamiento visual propio, más protagonista.

// Mismos iconos que ya usa el resto de Elevate para estos dos tipos
// (Notifications: TYPE_ICON; users/[id]: tabs Logros/Certificados) —
// coherencia de identidad, no una elección nueva por pantalla. FileBadge
// en vez de FileCheck: mismo campo semántico (documento oficial), trazo
// más "insignia/premium" para diferenciar del círculo de Achievement.
const TYPE_ICON = {
  ACHIEVEMENT: Award,
  CERTIFICATE: FileBadge,
};

const RARITY_LABEL = {
  COMMON:    'Común',
  RARE:      'Raro',
  EPIC:      'Épico',
  LEGENDARY: 'Legendario',
};

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function CommunityCard({ item, index = 0 }) {
  const { type, author, context, eventDate } = item;
  const Icon = TYPE_ICON[type] ?? Award;
  const isAchievement = type === 'ACHIEVEMENT';

  const photoUrl = resolveAuthorPhoto(author);

  const metaTags = isAchievement
    ? [
        context.rarity && RARITY_LABEL[context.rarity] ? RARITY_LABEL[context.rarity] : context.rarity,
        context.points != null ? `${context.points} pts` : null,
      ].filter(Boolean)
    : [
        context.courseLevel,
        context.finalScore != null ? `${context.finalScore}%` : null,
      ].filter(Boolean);

  return (
    <li className={`${styles.item} ${styles.itemCompact}`} style={{ '--stagger': index }}>
      <div className={styles.itemInner}>
        <span className={styles.avatarSlot}>
          <Avatar
            firstName={author.firstName}
            lastName={author.lastName}
            role="student"
            size="md"
            photoUrl={photoUrl}
          />
        </span>

        <div className={styles.body}>
          <p className={styles.actorName}>{author.firstName} {author.lastName}</p>

          <p className={styles.actionText}>
            <span className={`${styles.typeBadge} ${!isAchievement ? styles.typeBadgeCertificate : ''}`} aria-hidden="true">
              <Icon size={12} />
            </span>
            {isAchievement ? 'ha desbloqueado un logro' : 'ha conseguido un certificado'}
          </p>

          <p className={styles.protagonist}>
            {isAchievement ? context.name : context.courseTitle}
          </p>

          {isAchievement && context.description && (
            <p className={styles.description}>{context.description}</p>
          )}

          <div className={styles.metaRow}>
            {metaTags.length > 0 && (
              <div className={styles.metaTags}>
                {metaTags.map((tag, i) => <span key={i} className={styles.metaTag}>{tag}</span>)}
              </div>
            )}
            <span className={styles.date}>{formatDate(eventDate)}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

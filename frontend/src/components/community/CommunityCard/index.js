'use client';

import { Award, FileBadge } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { resolveAuthorPhoto } from '@/lib/utils/resolveAuthorPhoto';
import styles from '@/styles/Community.module.css';

// Eventos automáticos del feed (ACHIEVEMENT/CERTIFICATE) — PostCard cubre
// type=POST/ANNOUNCEMENT con un tratamiento visual propio, más protagonista.

// Mismos iconos que ya usa el resto de Elevate para estos dos tipos
// (Notifications: TYPE_ICON; users/[id]: tabs Logros/Certificados) —
// coherencia de identidad, no una elección nueva por pantalla. FileBadge
// en vez de FileCheck: mismo campo semántico (documento oficial), trazo
// más "insignia/premium" para diferenciar del bloque de Achievement.
const TYPE_ICON = {
  ACHIEVEMENT: Award,
  CERTIFICATE: FileBadge,
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

  // Comunidad no es un ranking: puntos y rareza son datos de Logros (ver
  // /achievements), no protagonismo aquí. Certificado sí conserva nivel del
  // curso — es informativo (qué curso), no una comparación entre alumnos.
  const metaTags = isAchievement
    ? []
    : [context.courseLevel].filter(Boolean);

  return (
    <li className={`${styles.item} ${styles.itemCompact}`} style={{ '--stagger': index }}>
      <div className={styles.itemInner}>
        {/* Bloque de tipo — más pequeño que el de PostCard (.itemCompact en
            Community.module.css): logro/certificado son actividad
            secundaria en Comunidad, no el contenido protagonista. Logro y
            certificado comparten acento naranja, distintos solo en forma
            (círculo tintado vs. insignia con borde), nunca color. */}
        <span
          className={`${styles.typeBlock} ${isAchievement ? '' : styles.typeBlockCertificate}`}
          aria-hidden="true"
        >
          <Icon size={18} />
        </span>

        <div className={styles.body}>
          <div className={styles.itemHeader}>
            <Avatar
              firstName={author.firstName}
              lastName={author.lastName}
              role="student"
              size="sm"
              photoUrl={photoUrl}
            />
            <span className={styles.actorName}>{author.firstName} {author.lastName}</span>
            <span className={styles.itemDate}>{formatDate(eventDate)}</span>
          </div>

          <p className={styles.protagonist}>
            {isAchievement ? context.name : context.courseTitle}
          </p>

          {isAchievement && context.description && (
            <p className={styles.description}>{context.description}</p>
          )}

          {metaTags.length > 0 && (
            <div className={styles.metaTags}>
              {metaTags.map((tag, i) => <span key={i} className={styles.metaTag}>{tag}</span>)}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

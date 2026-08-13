'use client';

import Avatar from '@/components/ui/Avatar';
import { resolveAuthorPhoto } from '@/lib/utils/resolveAuthorPhoto';
import styles from '@/styles/Community.module.css';

const ROLE_LABEL = {
  student: 'Alumno',
  teacher: 'Profesor',
};

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Publicación real de un student o teacher — tratamiento visual propio,
// más protagonista que un evento automático (CommunityCard): más padding,
// texto más grande, sin badges de logro/rareza/puntos que no le
// corresponden. Solo usa datos reales del DTO (author + context.content) —
// nada de "comentarios próximamente" ni afordancias que aún no existen.
export default function PostCard({ item, index = 0 }) {
  const { author, context, eventDate } = item;
  const photoUrl = resolveAuthorPhoto(author);
  const roleLabel = ROLE_LABEL[author.role] ?? null;

  return (
    <li className={`${styles.item} ${styles.itemPost}`} style={{ '--stagger': index }}>
      <div className={styles.postInner}>
        <div className={styles.postHeader}>
          <span className={styles.avatarSlot}>
            <Avatar
              firstName={author.firstName}
              lastName={author.lastName}
              role={author.role === 'teacher' ? 'teacher' : 'student'}
              size="lg"
              photoUrl={photoUrl}
            />
          </span>

          <div className={styles.postAuthorBlock}>
            <div className={styles.postAuthorRow}>
              <p className={styles.postAuthorName}>{author.firstName} {author.lastName}</p>
              <span className={styles.postDate}>{formatDate(eventDate)}</span>
            </div>
            {roleLabel && <p className={styles.postRoleBadge}>{roleLabel}</p>}
          </div>
        </div>

        <p className={styles.postContent}>{context.content}</p>
      </div>
    </li>
  );
}

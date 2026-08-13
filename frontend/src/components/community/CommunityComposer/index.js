'use client';

import { useState, useRef } from 'react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { resolveAuthorPhoto } from '@/lib/utils/resolveAuthorPhoto';
import styles from '@/styles/Community.module.css';

const MAX_LENGTH = 2000;

// Visible para student/teacher; oculto para admin (page.js decide eso).
// El backend sigue siendo la fuente de verdad de la validación — aquí solo
// se evita una petición inútil (vacío / demasiado largo).
export default function CommunityComposer({ user, onSubmit }) {
  const [expanded,   setExpanded]   = useState(false);
  const [content,    setContent]    = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState(null);
  const textareaRef = useRef(null);

  const photoUrl = resolveAuthorPhoto({ email: user?.email, role: user?.role });
  const trimmedLength = content.trim().length;
  const isOverLimit = content.length > MAX_LENGTH;
  const canSubmit = trimmedLength > 0 && !isOverLimit && !submitting;

  function handleExpand() {
    setExpanded(true);
    // Foco real en el textarea al expandir — coherente con "al hacer foco"
    // del compositor colapsado.
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  function handleCancel() {
    setContent('');
    setError(null);
    setExpanded(false);
  }

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(content.trim());
      setContent('');
      setExpanded(false);
    } catch (err) {
      setError(err.message ?? 'No se pudo publicar. Inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.composer}>
      <span className={`${styles.avatarSlot} ${styles.composerAvatar}`}>
        <Avatar
          firstName={user?.firstName}
          lastName={user?.lastName}
          role={user?.role === 'teacher' ? 'teacher' : 'student'}
          size="lg"
          photoUrl={photoUrl}
        />
      </span>

      <div className={styles.composerBody}>
        {expanded ? (
          <>
            <textarea
              ref={textareaRef}
              className={styles.composerTextarea}
              placeholder="Comparte algo con tu comunidad…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={submitting}
              maxLength={MAX_LENGTH + 200}
              /* margen sobre MAX_LENGTH para poder mostrar "te has pasado"
                 en vez de bloquear el tecleo en seco al llegar al límite */
            />

            {error && <p className={styles.composerError}>{error}</p>}

            <div className={styles.composerFooter}>
              <span className={`${styles.composerCount} ${isOverLimit ? styles.composerCountOver : ''}`}>
                {content.length} / {MAX_LENGTH}
              </span>
              <div className={styles.composerActions}>
                <Button variant="ghost" size="sm" onClick={handleCancel} disabled={submitting}>
                  Cancelar
                </Button>
                <Button variant="accent" size="sm" onClick={handleSubmit} loading={submitting} disabled={!canSubmit}>
                  Publicar
                </Button>
              </div>
            </div>
          </>
        ) : (
          <button type="button" className={styles.composerTrigger} onClick={handleExpand}>
            Comparte algo con tu comunidad…
          </button>
        )}
      </div>
    </div>
  );
}

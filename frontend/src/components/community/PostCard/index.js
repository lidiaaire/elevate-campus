'use client';

import { useState } from 'react';
import { MessageCircle, ChevronDown, ChevronUp, Megaphone, Trash2 } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { resolveAuthorPhoto } from '@/lib/utils/resolveAuthorPhoto';
import { communityService } from '@/lib/services/community.service';
import styles from '@/styles/Community.module.css';

const ROLE_LABEL = {
  student: 'Alumno',
  teacher: 'Profesor',
  admin:   'Administrador',
};

const COMMENT_MAX_LENGTH = 2000;

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Comentarios sí llevan hora: un hilo puede acumular varios el mismo día y
// el orden dentro de esa jornada importa para leerlo como conversación.
function formatCommentDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleString('es-ES', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

// Publicación real de un student/teacher, o ANNOUNCEMENT (student/teacher
// de una cohorte, o admin global) — mismo tratamiento visual protagonista;
// el ANNOUNCEMENT solo añade una etiqueta "Aviso" en vez de la línea de rol,
// sin rediseñar la card. Los comentarios se cargan de forma perezosa: nada
// se pide al backend hasta que el usuario despliega el bloque.
//
// Eliminar (post y comentarios): el backend es la autoridad final de
// permisos (autor / teacher de la cohorte / admin) — el frontend solo
// decide si tiene sentido MOSTRAR la acción, sin replicar el scope real:
//   - STUDENT: solo si es el autor (ownership estricto por _id).
//   - ADMIN:   siempre.
//   - TEACHER: si es el autor, o si NO es un announcement global de admin
//              (un announcement global es, por definición, ajeno a
//              cualquier cohorte — el resto de items que ve un teacher en
//              su feed ya pertenecen a su propia cohorte, filtrados por el
//              propio backend). Si el backend igualmente rechaza el
//              intento, el error se muestra inline.
export default function PostCard({ item, token, user, onDeletePost, index = 0 }) {
  const { type, author, context, eventDate } = item;
  const photoUrl = resolveAuthorPhoto(author);
  const roleLabel = ROLE_LABEL[author.role] ?? null;
  const isAnnouncement = type === 'ANNOUNCEMENT';
  const isGlobalAnnouncement = isAnnouncement && author.role === 'admin';
  const isOwnItem = user != null && String(author._id) === String(user.id);

  const canModeratePost =
    user?.role === 'admin' ||
    isOwnItem ||
    (user?.role === 'teacher' && !isGlobalAnnouncement);

  const [commentCount,    setCommentCount]    = useState(context.commentCount ?? 0);
  const [showComments,    setShowComments]    = useState(false);
  const [comments,        setComments]        = useState(null); // null = no cargados todavía
  const [commentsLoading, setCommentsLoading]  = useState(false);
  const [commentsError,   setCommentsError]    = useState(null);

  const [newComment,       setNewComment]       = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError,     setCommentError]     = useState(null);

  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deletingPost,     setDeletingPost]     = useState(false);
  const [deletePostError,  setDeletePostError]  = useState(null);

  const [commentDeleteId,      setCommentDeleteId]      = useState(null); // comentario en confirmación/carga
  const [commentDeleteLoading, setCommentDeleteLoading] = useState(false);
  const [commentDeleteError,   setCommentDeleteError]   = useState(null);

  const trimmedLength   = newComment.trim().length;
  const isOverLimit      = newComment.length > COMMENT_MAX_LENGTH;
  const canSubmitComment = trimmedLength > 0 && !isOverLimit && !submittingComment;

  // Un comentario propio siempre se puede borrar; el resto sigue el mismo
  // criterio que canModeratePost, porque la cohorte relevante es la del
  // post padre, no la del comentario.
  function canModerateComment(comment) {
    if (!user) return false;
    if (user.role === 'admin') return true;
    if (String(comment.author._id) === String(user.id)) return true;
    return user.role === 'teacher' && !isGlobalAnnouncement;
  }

  async function handleToggleComments() {
    const next = !showComments;
    setShowComments(next);

    // Carga lazy: solo pide comentarios la primera vez que se despliegan.
    if (next && comments === null && !commentsLoading) {
      setCommentsLoading(true);
      setCommentsError(null);
      try {
        const res = await communityService.getComments(token, item.id);
        const loaded = res.comments ?? [];
        setComments(loaded);
        // Corrige el contador (real desde el propio listado) por si difiere
        // del context.commentCount cargado con el feed.
        setCommentCount(loaded.length);
      } catch (err) {
        setCommentsError(err.message ?? 'No se pudieron cargar los comentarios.');
      } finally {
        setCommentsLoading(false);
      }
    }
  }

  async function handleSubmitComment(e) {
    e.preventDefault();
    if (!canSubmitComment) return;

    setSubmittingComment(true);
    setCommentError(null);
    try {
      const res = await communityService.createComment(token, item.id, newComment.trim());
      // El backend es la fuente de verdad del comentario creado — se añade
      // esa respuesta real al estado local, sin refetch completo.
      setComments((prev) => [...(prev ?? []), res.comment]);
      setCommentCount((prev) => prev + 1);
      setNewComment('');
    } catch (err) {
      setCommentError(err.message ?? 'No se pudo publicar el comentario.');
    } finally {
      setSubmittingComment(false);
    }
  }

  // Confirmación inline de 2 pasos (sin modal ni window.confirm): el botón
  // "Eliminar" se sustituye por un pequeño bloque Cancelar/Eliminar hasta
  // que el usuario decide. Si tiene éxito, page.js quita el item de `docs`
  // y este componente se desmonta — no hace falta resetear estado propio.
  async function handleConfirmDeletePost() {
    setDeletingPost(true);
    setDeletePostError(null);
    try {
      await onDeletePost(item.id);
    } catch (err) {
      setDeletePostError(err.message ?? 'No se pudo eliminar la publicación.');
      setDeletingPost(false);
    }
  }

  // El comentario borrado se quita del estado local de esta card (los
  // comentarios nunca se elevan a page.js) y el contador nunca baja de 0.
  async function handleConfirmDeleteComment(commentId) {
    setCommentDeleteLoading(true);
    setCommentDeleteError(null);
    try {
      await communityService.deleteComment(token, item.id, commentId);
      setComments((prev) => (prev ?? []).filter((c) => c._id !== commentId));
      setCommentCount((prev) => Math.max(0, prev - 1));
      setCommentDeleteId(null);
    } catch (err) {
      setCommentDeleteError(err.message ?? 'No se pudo eliminar el comentario.');
    } finally {
      setCommentDeleteLoading(false);
    }
  }

  return (
    <li className={`${styles.item} ${styles.itemPost}`} style={{ '--stagger': index }}>
      <div className={styles.postInner}>
        <div className={styles.postHeader}>
          <span className={styles.avatarSlot}>
            <Avatar
              firstName={author.firstName}
              lastName={author.lastName}
              role={author.role}
              size="lg"
              photoUrl={photoUrl}
            />
          </span>

          <div className={styles.postAuthorBlock}>
            <div className={styles.postAuthorRow}>
              <p className={styles.postAuthorName}>{author.firstName} {author.lastName}</p>
              <span className={styles.postDate}>{formatDate(eventDate)}</span>
            </div>
            {isAnnouncement ? (
              <p className={styles.announcementBadge}>
                <Megaphone size={12} aria-hidden="true" />
                Aviso
              </p>
            ) : (
              roleLabel && <p className={styles.postRoleBadge}>{roleLabel}</p>
            )}
          </div>
        </div>

        <p className={styles.postContent}>{context.content}</p>

        <div className={styles.postFooter}>
          <button
            type="button"
            className={styles.commentsToggle}
            aria-expanded={showComments}
            onClick={handleToggleComments}
          >
            <MessageCircle size={14} aria-hidden="true" />
            {commentCount > 0 ? `${commentCount} comentario${commentCount !== 1 ? 's' : ''}` : 'Comentar'}
            {showComments ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
          </button>

          {canModeratePost && (
            <div className={styles.postActions}>
              {!confirmingDelete ? (
                <button
                  type="button"
                  className={styles.deleteTrigger}
                  onClick={() => setConfirmingDelete(true)}
                  aria-label={isAnnouncement ? 'Eliminar aviso' : 'Eliminar publicación'}
                >
                  <Trash2 size={14} aria-hidden="true" />
                  Eliminar
                </button>
              ) : (
                <div className={styles.deleteConfirm} role="group" aria-label="Confirmar eliminación">
                  <span className={styles.deleteConfirmText}>¿Eliminar?</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setConfirmingDelete(false)}
                    disabled={deletingPost}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    loading={deletingPost}
                    onClick={handleConfirmDeletePost}
                  >
                    Eliminar
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {deletePostError && <p className={styles.deleteError}>{deletePostError}</p>}

        {showComments && (
          <div className={styles.commentsSection}>
            {commentsLoading && (
              <p className={styles.commentsStatus}>Cargando comentarios…</p>
            )}

            {!commentsLoading && commentsError && (
              <p className={styles.commentsErrorText}>{commentsError}</p>
            )}

            {!commentsLoading && !commentsError && comments !== null && comments.length === 0 && (
              <p className={styles.commentsEmpty}>Sé el primero en comentar.</p>
            )}

            {!commentsLoading && comments && comments.length > 0 && (
              <ul className={styles.commentsList}>
                {comments.map((c) => (
                  <li key={c._id} className={styles.commentItem}>
                    <span className={styles.avatarSlot}>
                      <Avatar
                        firstName={c.author.firstName}
                        lastName={c.author.lastName}
                        role={c.author.role}
                        size="sm"
                        photoUrl={resolveAuthorPhoto(c.author)}
                      />
                    </span>
                    <div className={styles.commentBody}>
                      <div className={styles.commentMeta}>
                        <span className={styles.commentAuthor}>{c.author.firstName} {c.author.lastName}</span>
                        <span className={styles.commentDate}>{formatCommentDate(c.createdAt)}</span>

                        {canModerateComment(c) && (
                          commentDeleteId === c._id ? (
                            <span className={styles.commentDeleteConfirm}>
                              <button
                                type="button"
                                className={styles.commentDeleteConfirmBtn}
                                onClick={() => handleConfirmDeleteComment(c._id)}
                                disabled={commentDeleteLoading}
                              >
                                {commentDeleteLoading ? 'Eliminando…' : 'Confirmar'}
                              </button>
                              <button
                                type="button"
                                className={styles.commentDeleteCancelBtn}
                                onClick={() => setCommentDeleteId(null)}
                                disabled={commentDeleteLoading}
                              >
                                Cancelar
                              </button>
                            </span>
                          ) : (
                            <button
                              type="button"
                              className={styles.commentDeleteTrigger}
                              onClick={() => setCommentDeleteId(c._id)}
                              aria-label="Eliminar comentario"
                            >
                              <Trash2 size={12} aria-hidden="true" />
                              Eliminar
                            </button>
                          )
                        )}
                      </div>
                      <p className={styles.commentContent}>{c.content}</p>
                      {commentDeleteId === c._id && commentDeleteError && (
                        <p className={styles.commentDeleteError}>{commentDeleteError}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <form className={styles.commentForm} onSubmit={handleSubmitComment}>
              <input
                type="text"
                className={styles.commentInput}
                placeholder="Escribe un comentario…"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={submittingComment}
                maxLength={COMMENT_MAX_LENGTH + 200}
                aria-label="Escribe un comentario"
              />
              <Button
                type="submit"
                variant="accent"
                size="sm"
                loading={submittingComment}
                disabled={!canSubmitComment}
              >
                Enviar
              </Button>
            </form>
            {commentError && <p className={styles.commentFormError}>{commentError}</p>}
          </div>
        )}
      </div>
    </li>
  );
}

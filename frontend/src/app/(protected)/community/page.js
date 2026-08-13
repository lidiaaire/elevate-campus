'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { communityService } from '@/lib/services/community.service';
import { resolveAuthorPhoto } from '@/lib/utils/resolveAuthorPhoto';
import CommunityCard from '@/components/community/CommunityCard';
import PostCard from '@/components/community/PostCard';
import CommunityComposer from '@/components/community/CommunityComposer';
import Avatar from '@/components/ui/Avatar';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import styles from '@/styles/Community.module.css';

const PAGE_SIZE = 20;

const FILTERS = [
  { key: 'all',         label: 'Todo' },
  { key: 'POST',        label: 'Publicaciones' },
  { key: 'ACHIEVEMENT', label: 'Logros' },
  { key: 'CERTIFICATE', label: 'Certificados' },
];

const EMPTY_FILTER_TITLE = {
  POST:        'No hay publicaciones recientes.',
  ACHIEVEMENT: 'No hay logros recientes.',
  CERTIFICATE: 'No hay certificados recientes.',
};

// "Publicaciones" agrupa POST y (cuando exista) ANNOUNCEMENT — hoy el
// backend solo devuelve POST, pero el filtro ya queda listo para esa
// siguiente fase sin tener que tocarlo.
function matchesFilter(item, filter) {
  if (filter === 'all') return true;
  if (filter === 'POST') return item.type === 'POST' || item.type === 'ANNOUNCEMENT';
  return item.type === filter;
}

// Texto de contexto estático por rol — no depende de ningún dato nuevo,
// solo de user.role (ya disponible vía useAuth en toda la app).
const ROLE_CONTEXT = {
  student: 'Actividad de alumnos de tu comunidad',
  teacher: 'Actividad de tus alumnos',
  admin:   'Actividad de toda la academia',
};

export default function CommunityPage() {
  const { user, token } = useAuth();

  const [docs,        setDocs]        = useState([]);
  const [total,       setTotal]       = useState(0);
  const [page,        setPage]        = useState(1);
  const [filter,      setFilter]      = useState('all');
  const [loading,     setLoading]     = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error,       setError]       = useState(null);
  const [loadMoreError, setLoadMoreError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    communityService.getFeed(token, { page: 1, limit: PAGE_SIZE })
      .then((res) => {
        setDocs(res.docs ?? []);
        setTotal(res.total ?? 0);
        setPage(1);
      })
      .catch((err) => setError(err.message ?? 'Error al cargar la comunidad'))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleLoadMore() {
    setLoadingMore(true);
    setLoadMoreError(null);
    try {
      const nextPage = page + 1;
      const res = await communityService.getFeed(token, { page: nextPage, limit: PAGE_SIZE });
      setDocs((prev) => [...prev, ...(res.docs ?? [])]);
      setTotal(res.total ?? total);
      setPage(nextPage);
    } catch (err) {
      // Error de "cargar más" no debe tirar todo el feed ya cargado —
      // se muestra junto al botón, no sustituye la pantalla.
      setLoadMoreError(err.message ?? 'No se pudo cargar más actividad.');
    } finally {
      setLoadingMore(false);
    }
  }

  // El backend es la fuente de verdad del post creado (id real, eventDate
  // real) — se inserta esa respuesta al principio del feed en vez de
  // recalcular nada en frontend. El error se propaga tal cual: lo muestra
  // el propio compositor (inline, junto al textarea), no esta página.
  async function handleCreatePost(content) {
    const res  = await communityService.createPost(token, content);
    const post = res.post;

    const feedItem = {
      id:        post._id,
      type:      'POST',
      eventDate: post.createdAt,
      author: {
        _id:       user.id,
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        role:      user.role,
      },
      context: {
        content:      post.content,
        commentCount: post.commentCount ?? 0,
      },
    };

    setDocs((prev) => [feedItem, ...prev]);
    setTotal((prev) => prev + 1);
  }

  // Personas visibles en el feed ya cargado (dedup por author._id) — dato
  // real derivado en frontend, no un endpoint nuevo.
  const people = useMemo(() => {
    const seen = new Map();
    for (const item of docs) {
      if (!seen.has(item.author._id)) seen.set(item.author._id, item.author);
    }
    return [...seen.values()];
  }, [docs]);

  if (loading) return <LoadingState message="Cargando comunidad..." />;
  if (error)   return <ErrorState message={error} />;

  const filteredDocs = docs.filter((d) => matchesFilter(d, filter));
  const hasMore = docs.length < total;
  const contextLine = ROLE_CONTEXT[user?.role] ?? ROLE_CONTEXT.student;
  const canCompose = user?.role === 'student' || user?.role === 'teacher';

  return (
    <div className={styles.pageGrid}>
      <div className={styles.main}>
        {/* Cabecera editorial — mismo tratamiento de gradiente de marca que
            el hero del Dashboard (color-mix sobre el negro oficial), pero
            compacta y sin fotografía protagonista. */}
        <header className={styles.headerBand}>
          <h1 className={styles.headerTitle}>Comunidad</h1>
          <p className={styles.headerTagline}>Lo que está pasando en tu academia.</p>

          <div className={styles.filters} role="group" aria-label="Filtrar por tipo">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`${styles.filterChip} ${filter === f.key ? styles.filterChipActive : ''}`}
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {total > 0 && (
            <p className={styles.headerCount}>
              {total} actividad{total !== 1 ? 'es' : ''} reciente{total !== 1 ? 's' : ''}
            </p>
          )}
        </header>

        {/* Compositor — visible para student/teacher; admin no publica
            todavía (announcements llegarán en otra fase). */}
        {canCompose && (
          <CommunityComposer user={user} onSubmit={handleCreatePost} />
        )}

        {docs.length === 0 ? (
          <EmptyState title="Aún no hay actividad en tu comunidad." />
        ) : filteredDocs.length === 0 ? (
          <EmptyState title={EMPTY_FILTER_TITLE[filter] ?? 'Sin resultados para este filtro.'} />
        ) : (
          <ul className={styles.list}>
            {filteredDocs.map((item, i) => (
              item.type === 'POST'
                ? <PostCard key={item.id} item={item} index={i} />
                : <CommunityCard key={item.id} item={item} index={i} />
            ))}
          </ul>
        )}

        {hasMore && (
          <div className={styles.loadMoreRow}>
            {loadMoreError && <p className={styles.loadMoreError}>{loadMoreError}</p>}
            <Button variant="secondary" size="sm" loading={loadingMore} onClick={handleLoadMore}>
              Ver más
            </Button>
          </div>
        )}
      </div>

      {/* Columna lateral — solo información derivada de los datos ya
          cargados en frontend, sin endpoint nuevo. */}
      {people.length > 0 && (
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Tu comunidad</h2>
          <p className={styles.sidebarCount}>
            {people.length} persona{people.length !== 1 ? 's' : ''} visible{people.length !== 1 ? 's' : ''} en el feed
          </p>

          <div className={styles.avatarMosaic}>
            {people.slice(0, 12).map((p) => (
              <Avatar
                key={p._id}
                firstName={p.firstName}
                lastName={p.lastName}
                role={p.role === 'teacher' ? 'teacher' : 'student'}
                size="sm"
                photoUrl={resolveAuthorPhoto(p)}
                className={styles.mosaicAvatar}
              />
            ))}
          </div>

          <p className={styles.sidebarContext}>{contextLine}</p>
        </aside>
      )}
    </div>
  );
}

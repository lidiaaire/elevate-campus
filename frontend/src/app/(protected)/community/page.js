'use client';

import { useState, useEffect, useMemo } from 'react';
import { Users } from 'lucide-react';
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

// "Publicaciones" agrupa POST y ANNOUNCEMENT — ambos se renderizan como
// contenido social (PostCard), a diferencia de ACHIEVEMENT/CERTIFICATE.
function matchesFilter(item, filter) {
  if (filter === 'all') return true;
  if (filter === 'POST') return item.type === 'POST' || item.type === 'ANNOUNCEMENT';
  return item.type === filter;
}

// Agrupación temporal del feed (Hoy / Esta semana / Anterior) — basada en
// eventDate, dato real presente en los tres tipos de item (post.createdAt,
// achievement.unlockedAt, certificate.issueDate vía el backend). "Esta
// semana" = últimos 7 días sin contar hoy; el resto cae en "Anterior". Sin
// fechas inventadas: si un item no trae eventDate válido, se trata como
// "Anterior" en vez de romper el agrupado.
const GROUP_LABEL = { today: 'Hoy', week: 'Esta semana', earlier: 'Anterior' };

function getRecencyGroup(eventDate) {
  const date = new Date(eventDate);
  if (Number.isNaN(date.getTime())) return 'earlier';

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - 6);

  if (date >= startOfToday) return 'today';
  if (date >= startOfWeek) return 'week';
  return 'earlier';
}

// docs ya llega ordenado por eventDate desc desde el backend (y las
// páginas siguientes de "Ver más" continúan ese mismo orden) — agrupar es
// solo partir la lista en tramos contiguos, sin reordenar nada.
function groupByRecency(items) {
  const groups = [];
  let current = null;

  for (const item of items) {
    const key = getRecencyGroup(item.eventDate);
    if (!current || current.key !== key) {
      current = { key, label: GROUP_LABEL[key], items: [] };
      groups.push(current);
    }
    current.items.push(item);
  }

  return groups;
}

// En el filtro "Todo", el grupo "Anterior" tiende a acumular muchos eventos
// automáticos (logros/certificados) consecutivos que sepultan las
// publicaciones al hacer scroll. Se limita SOLO ahí: se conservan TODAS las
// publicaciones del grupo y, como mucho, los MAX_OLD_AUTOMATIC_ITEMS eventos
// automáticos más recientes dentro de ese mismo grupo — el orden cronológico
// no cambia, solo se recorta la cola una vez alcanzado el límite. El resto
// sigue disponible sin recortar en el propio filtro "Logros" (matchesFilter
// no cambia), así que no se pierde ningún dato, solo se difiere su acceso.
const MAX_OLD_AUTOMATIC_ITEMS = 3;

const isAutomaticEvent = (item) => item.type === 'ACHIEVEMENT' || item.type === 'CERTIFICATE';

function capOldAutomaticEvents(groups, filter) {
  if (filter !== 'all') return groups;

  return groups.map((group) => {
    if (group.key !== 'earlier') return group;

    let automaticCount = 0;
    let hiddenAutomaticCount = 0;
    const items = [];

    for (const item of group.items) {
      if (!isAutomaticEvent(item)) {
        items.push(item);
        continue;
      }
      if (automaticCount < MAX_OLD_AUTOMATIC_ITEMS) {
        items.push(item);
        automaticCount += 1;
      } else {
        hiddenAutomaticCount += 1;
      }
    }

    return { ...group, items, hiddenAutomaticCount };
  });
}

// Texto de contexto estático por rol — no depende de ningún dato nuevo,
// solo de user.role (ya disponible vía useAuth en toda la app).
const ROLE_CONTEXT = {
  student: 'Actividad de alumnos de tu comunidad',
  teacher: 'Actividad de tus alumnos',
  admin:   'Actividad de toda la academia',
};

// Copy del compositor por modo — CommunityComposer no conoce POST vs
// ANNOUNCEMENT, solo recibe esta copy ya resuelta. Sin jerga técnica
// ("scope", "ANNOUNCEMENT"...) en ningún texto visible.
const COMPOSER_COPY = {
  POST: {
    placeholder:     'Comparte algo con tu comunidad…',
    submitLabel:     'Publicar',
    contextualLabel: null,
  },
  ANNOUNCEMENT_TEACHER: {
    placeholder:     'Escribe un aviso para tus alumnos…',
    submitLabel:     'Publicar aviso',
    contextualLabel: 'Este aviso se publicará para los alumnos de tu cohorte.',
  },
  ANNOUNCEMENT_ADMIN: {
    placeholder:     'Escribe un aviso para toda la academia…',
    submitLabel:     'Publicar aviso',
    contextualLabel: 'Aviso para toda la academia.',
  },
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

  // Solo relevante para TEACHER (único rol con dos modos posibles);
  // STUDENT y ADMIN tienen cada uno un único modo fijo, resuelto más abajo.
  const [composeMode, setComposeMode] = useState('POST');

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

  // Mismo criterio que handleCreatePost: el backend decide type (siempre
  // ANNOUNCEMENT) y scopeTeacherId (cohorte del teacher, o null si es
  // admin) — el frontend solo envía `content` y refleja la respuesta real.
  async function handleCreateAnnouncement(content) {
    const res  = await communityService.createAnnouncement(token, content);
    const post = res.post;

    const feedItem = {
      id:        post._id,
      type:      'ANNOUNCEMENT',
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

  // El backend es la fuente de verdad del borrado (permite/rechaza según
  // autor/cohorte/rol) — aquí solo se quita el item del feed ya cargado
  // tras la confirmación real del DELETE, sin refetch completo. El error
  // se propaga tal cual: lo muestra la propia PostCard (inline, junto al
  // botón eliminar), no esta página — mismo criterio que handleCreatePost.
  async function handleDeletePost(postId) {
    await communityService.deletePost(token, postId);
    setDocs((prev) => prev.filter((d) => d.id !== postId));
    setTotal((prev) => Math.max(0, prev - 1));
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

  // STUDENT: siempre POST normal. TEACHER: POST o ANNOUNCEMENT según el
  // selector (composeMode). ADMIN: siempre ANNOUNCEMENT global — nunca ve
  // la opción "Publicación", que el backend le rechazaría con 403.
  const canCompose = ['student', 'teacher', 'admin'].includes(user?.role);
  const isAnnouncementMode = user?.role === 'admin' || (user?.role === 'teacher' && composeMode === 'ANNOUNCEMENT');
  const composerCopy = isAnnouncementMode
    ? (user?.role === 'admin' ? COMPOSER_COPY.ANNOUNCEMENT_ADMIN : COMPOSER_COPY.ANNOUNCEMENT_TEACHER)
    : COMPOSER_COPY.POST;
  const composerSubmit = isAnnouncementMode ? handleCreateAnnouncement : handleCreatePost;

  return (
    <div className={styles.pageGrid}>
      {/* Hero — banda editorial ancha, con zona reservada a la derecha para
          una futura imagen de comunidad (community-hero.png). Mientras ese
          asset no exista, el degradado de .heroVisual sostiene la
          composición por sí solo (heroVisualImg se oculta vía onError). */}
      <header className={styles.headerBand}>
        <div className={styles.heroContent}>
          <p className={styles.headerEyebrow}>Juntos aprendemos más</p>
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
              {total} {total === 1 ? 'novedad' : 'novedades'} en tu comunidad
            </p>
          )}
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <img
            src="/images/community/community-hero.png"
            alt=""
            className={styles.heroVisualImg}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
      </header>

      {/* Columna lateral — solo información derivada de los datos ya
          cargados en frontend, sin endpoint nuevo. Misma fila que el hero
          (grid-row:1 en Community.module.css), altura coherente con él. */}
      {people.length > 0 && (
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <span className={styles.sidebarIcon} aria-hidden="true"><Users size={18} /></span>
            <h2 className={styles.sidebarTitle}>Tu comunidad</h2>
          </div>

          <p className={styles.sidebarCount}>
            {people.length} persona{people.length !== 1 ? 's' : ''} visible{people.length !== 1 ? 's' : ''} en el feed
          </p>

          <div className={styles.avatarMosaic}>
            {people.slice(0, 8).map((p) => (
              <Avatar
                key={p._id}
                firstName={p.firstName}
                lastName={p.lastName}
                role={p.role === 'teacher' ? 'teacher' : 'student'}
                size="md"
                photoUrl={resolveAuthorPhoto(p)}
                className={styles.mosaicAvatar}
              />
            ))}
          </div>

          <hr className={styles.sidebarDivider} />

          <p className={styles.sidebarContext}>{contextLine}</p>
        </aside>
      )}

      <div className={styles.main}>
        {/* Compositor — student: publicación normal fija. teacher: elige
            entre publicación y aviso de cohorte con el selector. admin:
            aviso global fijo (nunca ve la opción "Publicación", que el
            backend le rechazaría con 403). key por modo: fuerza a
            reiniciar el compositor (texto/estado expandido) al cambiar de
            modo, para no publicar por error un borrador de un modo en el
            otro. */}
        {canCompose && (
          <div className={styles.composerWrapper}>
            {user?.role === 'teacher' && (
              <div className={styles.composeModeSwitch} role="group" aria-label="Tipo de publicación">
                <button
                  type="button"
                  className={`${styles.composeModeOption} ${composeMode === 'POST' ? styles.composeModeOptionActive : ''}`}
                  aria-pressed={composeMode === 'POST'}
                  onClick={() => setComposeMode('POST')}
                >
                  Publicación
                </button>
                <button
                  type="button"
                  className={`${styles.composeModeOption} ${composeMode === 'ANNOUNCEMENT' ? styles.composeModeOptionActive : ''}`}
                  aria-pressed={composeMode === 'ANNOUNCEMENT'}
                  onClick={() => setComposeMode('ANNOUNCEMENT')}
                >
                  Aviso
                </button>
              </div>
            )}

            <CommunityComposer
              key={user?.role === 'teacher' ? composeMode : user?.role}
              user={user}
              onSubmit={composerSubmit}
              placeholder={composerCopy.placeholder}
              submitLabel={composerCopy.submitLabel}
              contextualLabel={composerCopy.contextualLabel}
            />
          </div>
        )}

        {docs.length === 0 ? (
          <EmptyState title="Aún no hay actividad en tu comunidad." />
        ) : filteredDocs.length === 0 ? (
          <EmptyState title={EMPTY_FILTER_TITLE[filter] ?? 'Sin resultados para este filtro.'} />
        ) : (
          capOldAutomaticEvents(groupByRecency(filteredDocs), filter).map((group, groupIndex) => (
            <section key={group.key + groupIndex} className={styles.group}>
              <h2 className={styles.groupHeading}>{group.label}</h2>
              <ul className={styles.list}>
                {group.items.map((item, i) => (
                  item.type === 'POST' || item.type === 'ANNOUNCEMENT'
                    ? (
                      <PostCard
                        key={item.id}
                        item={item}
                        index={i}
                        token={token}
                        user={user}
                        onDeletePost={handleDeletePost}
                      />
                    )
                    : <CommunityCard key={item.id} item={item} index={i} />
                ))}
              </ul>

              {group.hiddenAutomaticCount > 0 && (
                <button
                  type="button"
                  className={styles.groupMoreLink}
                  onClick={() => setFilter('ACHIEVEMENT')}
                >
                  Ver todos los logros →
                </button>
              )}
            </section>
          ))
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
    </div>
  );
}

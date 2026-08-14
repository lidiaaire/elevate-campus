import { api } from '@/lib/api';

export const communityService = {
  // El scope (cohorte del student, roster del teacher, toda la academia
  // para admin) lo resuelve el backend según el rol del token — el
  // frontend no filtra ni decide a quién se ve.
  getFeed(token, { page = 1, limit = 20 } = {}) {
    return api.get(`/community/feed?page=${page}&limit=${limit}`, token);
  },

  // type y scopeTeacherId los decide exclusivamente el backend — el
  // frontend solo envía el contenido.
  createPost(token, content) {
    return api.post('/community/posts', { content }, token);
  },

  // type y scopeTeacherId los decide exclusivamente el backend según el
  // rol del token (teacher → su cohorte, admin → global) — el frontend
  // solo envía el contenido, igual que createPost.
  createAnnouncement(token, content) {
    return api.post('/community/announcements', { content }, token);
  },

  // Funciona igual sobre POST y ANNOUNCEMENT — el backend no distingue por
  // type, solo por accesibilidad del post (scope de cohorte).
  getComments(token, postId) {
    return api.get(`/community/posts/${postId}/comments`, token);
  },

  createComment(token, postId, content) {
    return api.post(`/community/posts/${postId}/comments`, { content }, token);
  },

  // Mismo endpoint para POST y ANNOUNCEMENT — el backend no distingue por
  // type, solo decide el permiso real (autor, teacher de la cohorte, o
  // admin). 204 sin body en éxito.
  deletePost(token, postId) {
    return api.delete(`/community/posts/${postId}`, token);
  },

  deleteComment(token, postId, commentId) {
    return api.delete(`/community/posts/${postId}/comments/${commentId}`, token);
  },
};

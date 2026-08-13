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
};

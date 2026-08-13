import { api } from '@/lib/api';

export const achievementService = {
  getMyAchievements(token) {
    return api.get('/achievements/me', token);
  },

  // Admin: cualquier alumno. Teacher: solo su cohorte (scope validado en backend).
  getStudentAchievements(studentId, token) {
    return api.get(`/achievements/students/${studentId}`, token);
  },
};

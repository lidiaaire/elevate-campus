import { api } from '@/lib/api';

export const dashboardService = {
  getStudentDashboard(token) {
    return api.get('/dashboard/student', token);
  },

  getTeacherDashboard(token) {
    return api.get('/dashboard/teacher', token);
  },

  getTeacherStudentDetail(studentId, token) {
    return api.get(`/dashboard/teacher/students/${studentId}`, token);
  },

  // Mismo shape que getTeacherStudentDetail (backend: getStudentAcademicDetail
  // compartido), montado en /admin/students/:studentId para el actor admin.
  getAdminStudentDetail(studentId, token) {
    return api.get(`/dashboard/admin/students/${studentId}`, token);
  },

  getAdminDashboard(token) {
    return api.get('/dashboard/admin', token);
  },

  getAdminActivity(days = 30, token) {
    return api.get(`/dashboard/admin/activity?days=${days}`, token);
  },

  getAdminAtRisk(token) {
    return api.get('/dashboard/admin/at-risk', token);
  },
};

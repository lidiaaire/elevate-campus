import { api } from '@/lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

export const certificateService = {
  getMyCertificates(token) {
    return api.get('/certificates/me', token);
  },

  // Admin: cualquier alumno. Teacher: solo su cohorte (scope validado en backend).
  getStudentCertificates(studentId, token) {
    return api.get(`/certificates/students/${studentId}`, token);
  },

  verifyCertificate(certificateNumber) {
    return api.get(`/certificates/verify/${certificateNumber}`);
  },

  async downloadCertificate(id, certificateNumber, token) {
    if (typeof id !== 'string' || !/^[a-f\d]{24}$/i.test(id)) {
      throw new Error('El certificado no tiene un identificador válido.');
    }
    const res = await fetch(`${BASE_URL}/certificates/${id}/download`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('No se pudo descargar el certificado.');
    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `${certificateNumber}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
};

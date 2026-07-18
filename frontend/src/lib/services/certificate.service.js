import { api } from '@/lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

export const certificateService = {
  getMyCertificates(token) {
    return api.get('/certificates/me', token);
  },

  verifyCertificate(certificateNumber) {
    return api.get(`/certificates/verify/${certificateNumber}`);
  },

  async downloadCertificate(id, certificateNumber, token) {
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

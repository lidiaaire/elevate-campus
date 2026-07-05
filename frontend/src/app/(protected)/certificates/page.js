'use client';

import { useAuth } from '@/hooks/useAuth';
import { certificateService } from '@/lib/services/certificate.service';
import { useAsyncData } from '@/hooks/useAsyncData';
import CertificateCard from '@/components/certificates/CertificateCard';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/Certificates.module.css';

export default function CertificatesPage() {
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(
    () => certificateService.getMyCertificates(token)
  );

  const certificates = data?.certificates ?? [];

  if (loading) return <LoadingState message="Cargando certificados..." />;
  if (error)   return <ErrorState message={error} />;

  return (
    <div className={styles.page}>
      <h1>Mis certificados</h1>

      {certificates.length === 0 && (
        <EmptyState
          title="Todavía no tienes certificados."
          description="¡Completa un curso para obtener el tuyo!"
        />
      )}

      <ul className={styles.list}>
        {certificates.map((c) => (
          <CertificateCard key={c.certificateNumber} certificate={c} />
        ))}
      </ul>
    </div>
  );
}

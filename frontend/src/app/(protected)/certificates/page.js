'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth }              from '@/hooks/useAuth';
import { useAsyncData }         from '@/hooks/useAsyncData';
import { useToast }             from '@/contexts/ToastContext';
import { certificateService }   from '@/lib/services/certificate.service';
import { getCourseVisual }      from '@/lib/config/courseVisuals';
import StudentSectionHeader from '@/components/dashboard/student/StudentSectionHeader';
import StatCard      from '@/components/ui/StatCard';
import LoadingState  from '@/components/ui/LoadingState';
import ErrorState    from '@/components/ui/ErrorState';
import EmptyState    from '@/components/ui/EmptyState';
import Button        from '@/components/ui/Button';
import styles from './Certificates.module.css';

// Paleta categórica intencional (colores fijos por nivel CEFR), no deuda de
// marca — ver DESIGN_SYSTEM.md §10.6.
const CEFR_COLOR = {
  A1: '#38bdf8', A2: '#34d399',
  B1: '#818cf8', B2: '#fbbf24',
  C1: '#f97316', C2: '#f43f5e',
};

function AwardIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function CertificateCard({ certificate, token, featured = false }) {
  const [downloading, setDownloading] = useState(false);
  const [dlError,     setDlError]     = useState(null);
  const { showSuccess, showError } = useToast();

  const { _id, course, certificateNumber, finalScore, issueDate, pdfUrl } = certificate;
  const visual      = getCourseVisual(course?.title);
  const accentColor = CEFR_COLOR[course?.level] ?? visual.accentColor;
  const formattedDate = new Date(issueDate).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  async function handleDownload() {
    setDlError(null);
    setDownloading(true);
    try {
      await certificateService.downloadCertificate(_id, certificateNumber, token);
      showSuccess('Descarga iniciada correctamente.');
    } catch {
      setDlError('Error al descargar. Inténtalo de nuevo.');
      showError('No se pudo descargar el certificado. Inténtalo de nuevo.');
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}>
      <div className={styles.cardAccent} style={{ background: accentColor }} />

      <div className={styles.cardBody}>
        <div className={styles.iconWrap} style={{ color: accentColor }}>
          <AwardIcon />
        </div>

        <div className={styles.cardContent}>
          <h3 className={styles.courseTitle}>{course?.title ?? '—'}</h3>
          <div className={styles.metaRow}>
            {course?.level && (
              <span className={styles.levelBadge} style={{ background: `${accentColor}22`, color: accentColor }}>
                {course.level}
              </span>
            )}
            <span className={styles.score}>{finalScore}%</span>
          </div>
          <p className={styles.dateText}>Emitido el {formattedDate}</p>
          <p className={styles.certNumber}>Nº {certificateNumber}</p>
        </div>
      </div>

      <div className={styles.cardFooter}>
        {dlError && <span className={styles.dlError}>{dlError}</span>}
        {pdfUrl ? (
          <Button
            onClick={handleDownload}
            variant="primary"
            size={featured ? 'md' : 'sm'}
            loading={downloading}
            iconLeft={!downloading ? <DownloadIcon /> : null}
          >
            Descargar PDF
          </Button>
        ) : (
          <span className={styles.pdfPending}>PDF en preparación</span>
        )}
      </div>
    </div>
  );
}

export default function CertificatesPage() {
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(
    () => certificateService.getMyCertificates(token)
  );

  if (loading) return <LoadingState message="Cargando certificados..." />;
  if (error)   return <ErrorState message={error} />;

  const certificates = data?.certificates ?? [];
  const count        = certificates.length;

  const avgScore = count > 0
    ? Math.round(certificates.reduce((s, c) => s + c.finalScore, 0) / count)
    : null;

  return (
    <div className={styles.page}>
      <StudentSectionHeader
        eyebrow="Certificados"
        title="Mis certificados"
        description={count > 0
          ? `${count} certificado${count !== 1 ? 's' : ''} obtenido${count !== 1 ? 's' : ''}`
          : 'Completa un curso para obtener tu primer certificado'}
      >
        {count > 0 && (
          <>
            <StatCard title="Certificados" value={count} />
            {avgScore !== null && <StatCard title="Nota media" value={`${avgScore}%`} />}
            <StatCard title="PDF disponibles" value={certificates.filter((c) => c.pdfUrl).length} />
          </>
        )}
      </StudentSectionHeader>

      {/* Lista */}
      {count === 0 ? (
        <>
          <EmptyState
            title="Aún no tienes certificados"
            description="Completa todas las lecciones y evaluaciones de un curso para obtener tu certificado."
          />
          <div>
            <Button as={Link} href="/courses" variant="primary" size="sm">
              Ver cursos disponibles
            </Button>
          </div>
        </>
      ) : (
        <div className={count === 1 ? styles.gridSingle : styles.grid}>
          {certificates.map((c) => (
            <CertificateCard
              key={c.certificateNumber}
              certificate={c}
              token={token}
              featured={count === 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './MobileMenu.module.css';

const SECONDARY_LINKS = [
  { href: '/achievements',  label: 'Logros' },
  { href: '/certificates',  label: 'Certificados' },
  { href: '/notifications', label: 'Notificaciones' },
  { href: '/enrollments',   label: 'Matrículas' },
  { href: '/skill-radar',   label: 'Radar de habilidades' },
];

export default function MobileMenu({ open, onClose, triggerRef }) {
  const pathname = usePathname();
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // Gestión de foco: al abrir, mueve el foco al panel; al cerrar, lo devuelve al disparador.
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
    } else {
      triggerRef?.current?.focus?.();
    }
  }, [open, triggerRef]);

  return (
    <>
      {open && (
        <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      )}
      <div
        id="mobile-menu"
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        role="dialog"
        aria-label="Menú de navegación secundaria"
      >
        <nav className={styles.nav}>
          {SECONDARY_LINKS.map(({ href, label }, index) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                ref={index === 0 ? firstLinkRef : undefined}
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

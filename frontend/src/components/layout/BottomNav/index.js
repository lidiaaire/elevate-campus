'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from '@/components/layout/MobileMenu';
import styles from './BottomNav.module.css';

const PRIMARY_LINKS = [
  { href: '/dashboard',   label: 'Inicio' },
  { href: '/courses',     label: 'Cursos' },
  { href: '/progress',    label: 'Progreso' },
  { href: '/assessments', label: 'Evaluaciones' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const masBtnRef = useRef(null);

  return (
    <>
      <nav className={styles.bottomNav} aria-label="Navegación principal">
        {PRIMARY_LINKS.map(({ href, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              aria-current={isActive ? 'page' : undefined}
              className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
            >
              {label}
            </Link>
          );
        })}
        <button
          ref={masBtnRef}
          type="button"
          className={`${styles.item} ${menuOpen ? styles.itemActive : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          aria-controls="mobile-menu"
          aria-label="Más opciones"
        >
          Más
        </button>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} triggerRef={masBtnRef} />
    </>
  );
}

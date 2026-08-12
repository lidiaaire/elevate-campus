'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import styles from './Sidebar.module.css';

const ROLE_LABELS = {
  student: 'Alumno',
  teacher: 'Docente',
  admin:   'Administrador',
};

const NAV_LINKS = [
  { href: '/dashboard',    label: 'Inicio' },
  { href: '/courses',      label: 'Cursos' },
  { href: '/progress',     label: 'Progreso' },
];

// '/enrollments' está restringido a admin/teacher en routePermissions.js —
// no puede vivir en NAV_LINKS (compartido con student) sin producir un
// enlace del propio menú que lleva a "Acceso denegado" para todo student.
const ADMIN_LINKS = [
  { href: '/enrollments', label: 'Matrículas' },
  { href: '/users',       label: 'Usuarios' },
];

const STUDENT_LINKS = [
  { href: '/assessments',   label: 'Evaluaciones' },
  { href: '/certificates',  label: 'Certificados' },
  { href: '/achievements',  label: 'Logros' },
  { href: '/notifications', label: 'Notificaciones' },
  { href: '/skill-radar',   label: 'Radar de habilidades' },
];

const TEACHER_LINKS = [
  { href: '/enrollments',       label: 'Matrículas' },
  { href: '/teacher-analytics', label: 'Analítica' },
];

export default function Sidebar({ open = false, onClose = () => {}, triggerRef }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const firstLinkRef = useRef(null);

  const links = user?.role === 'admin'
    ? [...NAV_LINKS, ...ADMIN_LINKS]
    : user?.role === 'student'
      ? [...NAV_LINKS, ...STUDENT_LINKS]
      : user?.role === 'teacher'
        ? [...NAV_LINKS, ...TEACHER_LINKS]
        : NAV_LINKS;

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

      <aside id="app-sidebar" className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
        <div className={styles.brand}>
          <img src="/brand/elevate-symbol.svg" alt="" className={styles.brandMark} />
          <span className={styles.brandName}>Elevate Your English</span>
        </div>

        {user && (
          <div className={styles.userBlock}>
            <span className={styles.userName}>{user.firstName} {user.lastName}</span>
            <span className={styles.role}>{ROLE_LABELS[user.role] ?? user.role}</span>
          </div>
        )}

        <nav className={styles.nav}>
          {links.map(({ href, label }, index) => {
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
      </aside>
    </>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Avatar.module.css';

const ROLE_VARIANT = {
  admin:   'warning',
  teacher: 'success',
  student: 'brand',
};

const IMAGE_SIZES = { sm: '28px', md: '36px', lg: '48px', xl: '96px' };

// Admin Elevate no representa una persona física — nunca fotografía
// humana. Símbolo de marca ya existente, mismo asset que Sidebar/favicon.
const ELEVATE_SYMBOL = '/brand/elevate-symbol.svg';

function initialsOf(firstName = '', lastName = '') {
  const a = firstName.trim().charAt(0);
  const b = lastName.trim().charAt(0);
  return `${a}${b}`.toUpperCase() || '?';
}

/**
 * Avatar — círculo de identidad reutilizable (Design System v1.1).
 * Sin foto real disponible en el modelo de usuario: iniciales + color por rol
 * dan identidad visual consistente en tablas/listas de personas.
 *
 * Reglas de identidad por rol:
 *   - admin:           siempre el símbolo de marca Elevate (nunca fotografía
 *                       humana, nunca configurable vía `photoUrl`). Si el
 *                       asset falla al cargar, cae a iniciales "AE".
 *   - teacher/student:  fotografía individual si se pasa `photoUrl` y carga
 *                       correctamente; si no se pasa o falla, iniciales —
 *                       comportamiento idéntico al de antes de esta prop.
 *
 * @param {string} firstName
 * @param {string} [lastName]
 * @param {'admin'|'teacher'|'student'} [role]  - determina el color (default: brand)
 * @param {'sm'|'md'|'lg'|'xl'} [size]
 * @param {string|null} [photoUrl] - Opcional, ignorado para role="admin".
 */
export default function Avatar({ firstName, lastName = '', role, size = 'md', photoUrl = null, className = '' }) {
  const [imgFailed, setImgFailed] = useState(false);
  const variant = ROLE_VARIANT[role] ?? 'brand';
  const isAdmin = role === 'admin';
  const cls = [styles.avatar, styles[variant], styles[size], className || null]
    .filter(Boolean)
    .join(' ');

  if (isAdmin) {
    return (
      <span className={`${cls} ${styles.symbolAvatar}`} aria-hidden="true">
        {!imgFailed ? (
          // Símbolo local de marca, mismo patrón que Sidebar (img plana,
          // no next/image, para evitar el pipeline de optimización con SVG).
          <img
            src={ELEVATE_SYMBOL}
            alt=""
            className={styles.symbolImg}
            onError={() => setImgFailed(true)}
          />
        ) : (
          'AE'
        )}
      </span>
    );
  }

  if (photoUrl && !imgFailed) {
    return (
      <span className={cls} aria-hidden="true">
        <Image
          src={photoUrl}
          alt=""
          fill
          sizes={IMAGE_SIZES[size] ?? '48px'}
          className={styles.photoImg}
          onError={() => setImgFailed(true)}
        />
      </span>
    );
  }

  return (
    <span className={cls} aria-hidden="true">
      {initialsOf(firstName, lastName)}
    </span>
  );
}

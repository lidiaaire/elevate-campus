'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import styles from '@/styles/LoginForm.module.css';

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);

  function handleEmailChange(e)    { setEmail(e.target.value); }
  function handlePasswordChange(e) { setPassword(e.target.value); }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err) {
      setError(err.message ?? 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.backdrop} />

      <main className={styles.main}>
        {/* Bloque de marca */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>E</span>
            <span className={styles.logoName}>ELEVATE</span>
          </div>
          <div className={styles.accentBar} />
          <h1 className={styles.headline}>Open your next opportunity.</h1>
          <p className={styles.subline}>
            Learn with purpose. Grow with confidence.
          </p>
        </div>

        {/* Glass card — formulario */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Sign in to continue your journey.</h2>

          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={styles.input}
                placeholder="tu@empresa.com"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={styles.input}
                required
              />
            </div>

            {error && <p className={styles.error} role="alert">{error}</p>}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className={styles.cta}
            >
              {loading ? 'Entrando...' : 'Entrar en Elevate'}
            </Button>
          </form>

          <p className={styles.forgot}>
            <a href="#">¿Olvidaste tu contraseña?</a>
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 Elevate Your English</p>
      </footer>
    </div>
  );
}

'use client';

import { createContext, useState, useEffect } from 'react';
import { authService } from '@/lib/services/auth.service';

export const AuthContext = createContext(null);

function readStorage(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setUser(readStorage('auth_user'));
    setToken(readStorage('auth_token'));
    setLoaded(true);
  }, []);

  async function login(credentials) {
    const data = await authService.login(credentials);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('auth_user',  JSON.stringify(data.user));
    localStorage.setItem('auth_token', JSON.stringify(data.token));
  }

  async function logout() {
    try {
      await authService.logout(token);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, loaded, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


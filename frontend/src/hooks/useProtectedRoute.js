'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function useProtectedRoute() {
  const { user, token, loaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loaded && (!user || !token)) {
      router.replace('/login');
    }
  }, [loaded, user, token, router]);

  if (!loaded) return { isAuthenticated: null };
  return { isAuthenticated: Boolean(user && token) };
}

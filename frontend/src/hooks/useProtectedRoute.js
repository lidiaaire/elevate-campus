'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { isRouteAllowed } from '@/lib/config/routePermissions';

export function useProtectedRoute() {
  const { user, token, loaded } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loaded && (!user || !token)) {
      router.replace('/login');
    }
  }, [loaded, user, token, router]);

  if (!loaded) return { isAuthenticated: null, isAuthorized: null };

  const isAuthenticated = Boolean(user && token);
  const isAuthorized = isAuthenticated ? isRouteAllowed(user.role, pathname) : false;

  return { isAuthenticated, isAuthorized };
}

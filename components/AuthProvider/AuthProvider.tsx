'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { ReactNode, useEffect } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, clearIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const check = async () => {
      const { success } = await checkSession();
      if (success) {
        const user = await getMe();
        setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
    check();
  }, []);

  return children;
}

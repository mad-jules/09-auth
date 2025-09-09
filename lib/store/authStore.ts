import { create } from 'zustand';
import { User } from '@/types/user';

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<UserStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser(user) {
    return set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated() {
    return set(() => ({ user: null, isAuthenticated: false }));
  },
}));

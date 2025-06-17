import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  isLogin: boolean;
  setLogin: () => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLogin: false,
      setLogin: () => set({ isLogin: true }),
      setLogout: () => set({ isLogin: false }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

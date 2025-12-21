// store/useAuthStore.ts
import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        accessToken: null,
        isLoggedIn: false,
        login: (token) => set({ accessToken: token, isLoggedIn: true }),
        logout: () => set({ accessToken: null, isLoggedIn: false }),
      }),
      { name: 'auth-storage' },
    ),
  ),
);

useAuthStore.subscribe(
  (state) => state.accessToken,
  (token) => {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
  },
);

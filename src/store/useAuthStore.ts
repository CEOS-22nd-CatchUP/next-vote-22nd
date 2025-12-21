import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

interface MemberInfo {
  id: number;
  name: string;
  team: string;
  part: string;
  hasVotedForTeam: boolean;
  hasVotedForPartLead: boolean;
}

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  user: MemberInfo | null;
  login: (token: string) => void;
  setUserInfo: (user: MemberInfo) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        accessToken: null,
        isLoggedIn: false,
        user: null,
        login: (token) => set({ accessToken: token, isLoggedIn: true }),
        setUserInfo: (userInfo) => set({ user: userInfo }),
        logout: () => set({ accessToken: null, isLoggedIn: false, user: null }),
      }),
      { name: 'auth-storage' },
    ),
  ),
);

useAuthStore.subscribe(
  (state) => state.accessToken,
  (token) => {
    if (token) localStorage.setItem('accessToken', token);
    else localStorage.removeItem('accessToken');
  },
);

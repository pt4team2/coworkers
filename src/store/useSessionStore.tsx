import { create } from 'zustand';

interface User {
  id: number;
  nickname: string;
  email?: string;
  image: string | null;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

interface SessionState {
  user: User | null;
  accessToken: string | null;
  accessTokenExpires: number | null;
  setSession: (sessionData: {
    user: User | null;
    accessToken: string | null;
    accessTokenExpires: number | null;
  }) => void;
  clearSession: () => void;
}

const useSessionStore = create<SessionState>((set) => ({
  user: null,
  accessToken: null,
  accessTokenExpires: null,
  setSession: (session) =>
    set({
      user: session.user,
      accessToken: session.accessToken,
      accessTokenExpires: session.accessTokenExpires,
    }),
  clearSession: () =>
    set({
      user: null,
      accessToken: null,
      accessTokenExpires: null,
    }),
}));

export default useSessionStore;

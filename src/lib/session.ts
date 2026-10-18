import { create } from "zustand";

const KEY = "atelier-hs4-session";

type SessionState = {
  username: string | null;
  ready: boolean;
  restore: () => void;
  login: (username: string) => void;
  logout: () => void;
};

export const useSession = create<SessionState>((set) => ({
  username: null,
  ready: false,
  restore: () => {
    let username: string | null = null;
    try {
      username = localStorage.getItem(KEY);
    } catch {
      username = null;
    }
    set({ username, ready: true });
  },
  login: (username) => {
    localStorage.setItem(KEY, username);
    set({ username, ready: true });
  },
  logout: () => {
    localStorage.removeItem(KEY);
    set({ username: null });
  },
}));

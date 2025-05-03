import { create } from "zustand";

interface User {
  id: string;
  username: string;
  email: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (userData) =>
    set({
      user: userData,
      isAuthenticated: true,
    }),

  logout: () => {
    // suppression du token JWT
    localStorage.removeItem("token");

    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));

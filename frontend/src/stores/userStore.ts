import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
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

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (userData) =>
        set({
          user: userData,
          isAuthenticated: true,
        }),

      logout: () => {
        localStorage.removeItem("token"); // garde si tu gères un token séparé
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "user-storage", // nom dans le localStorage
    }
  )
);

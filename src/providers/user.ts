import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the user type
interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

// Define the store interface
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

// Create the store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "user",
    },
  ),
);

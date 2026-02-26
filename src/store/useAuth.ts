import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    user: { fullName: string; email: string } | null;
    isAuthenticated: boolean;
    login: (user: { fullName: string; email: string }) => void;
    logout: () => void;
}

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (user) => set({ user, isAuthenticated: true }),
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: "auth-storage",
        }
    )
);

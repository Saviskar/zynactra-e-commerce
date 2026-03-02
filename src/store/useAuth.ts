import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    user: { fullName: string; email: string } | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: { fullName: string; email: string }, token: string) => void;
    logout: () => void;
}

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: (user, token) => set({ user, token, isAuthenticated: true }),
            logout: () => set({ user: null, token: null, isAuthenticated: false }),
        }),
        {
            name: "auth-storage",
        }
    )
);

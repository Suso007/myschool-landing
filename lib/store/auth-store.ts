// Authentication Store - Zustand
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    _hasHydrated: boolean;
    setHasHydrated: (hasHydrated: boolean) => void;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            _hasHydrated: false,

            setHasHydrated: (hasHydrated) => {
                set({ _hasHydrated: hasHydrated });
            },

            setAuth: (user, token) => {
                // Store token in localStorage for Apollo Client
                if (typeof window !== 'undefined') {
                    localStorage.setItem('auth-token', token);
                }
                set({ user, token, isAuthenticated: true });
            },

            logout: () => {
                // Remove token from localStorage
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth-token');
                }
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);

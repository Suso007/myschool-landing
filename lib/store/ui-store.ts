// UI Store - Zustand
import { create } from 'zustand';

interface UIState {
    sidebarCollapsed: boolean;
    mobileMenuOpen: boolean;
    breadcrumbs: { label: string; href?: string }[];
    setSidebarCollapsed: (collapsed: boolean) => void;
    toggleSidebar: () => void;
    setMobileMenuOpen: (open: boolean) => void;
    toggleMobileMenu: () => void;
    setBreadcrumbs: (breadcrumbs: { label: string; href?: string }[]) => void;
}

export const useUIStore = create<UIState>((set) => ({
    sidebarCollapsed: false,
    mobileMenuOpen: false,
    breadcrumbs: [],

    setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

    toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

    setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

    toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

    setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
}));

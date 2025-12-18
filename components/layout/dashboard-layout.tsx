'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { useUIStore } from '@/lib/store';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const mobileMenuOpen = useUIStore((state) => state.mobileMenuOpen);
    const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);
    const pathname = usePathname();

    // Check if current route is /dashboard
    const isDashboard = pathname === '/dashboard';

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Mobile Sidebar */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent side="left" className="p-0 w-64">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <Sidebar isMobile={true} />
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className={`flex-1 overflow-y-auto ${isDashboard ? '' : 'p-6'}`}>
                    {children}
                </main>
            </div>
        </div>
    );
}

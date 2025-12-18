'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const hasHydrated = useAuthStore((state) => state._hasHydrated);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Wait for hydration before checking auth
        if (!hasHydrated) {
            return;
        }

        // Once hydrated, check authentication
        if (!isAuthenticated) {
            router.push('/login');
        } else {
            setIsChecking(false);
        }
    }, [isAuthenticated, hasHydrated, router]);

    // Show nothing while checking (prevents flash of content)
    if (!hasHydrated || isChecking) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}

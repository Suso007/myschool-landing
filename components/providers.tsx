'use client';

import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { client } from '@/lib/apollo-client';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
            >
                {children}
                <Toaster />
            </ThemeProvider>
        </ApolloProvider>
    );
}

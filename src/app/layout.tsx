import type { Metadata } from 'next';
import { queryClient } from '@/api';
import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
    title: 'Logixtoc Africa',
    description: 'Admin Service of MSQ Pay',
    icons: { icon: '/iconlogo.png', apple: '/iconlogo.png' },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>
                    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </QueryClientProvider>
            </body>
        </html>
    );
}

import type { Metadata } from 'next';
import { ThemeWrapper } from '@/Context';
import { queryClient } from '@/api';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { CssBaseline } from '@mui/material';

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
               <ThemeWrapper>
                  <CssBaseline />
                  <ToastContainer position="top-center" />
                  {children}
               </ThemeWrapper>
            </QueryClientProvider>
         </body>
      </html>
   );
}

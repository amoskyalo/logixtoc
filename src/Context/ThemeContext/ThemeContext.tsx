'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useResponsiveness } from '@/hooks';
import { useMemo, useState, createContext } from 'react';

export const ThemeContext = createContext<any>('');

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
   const [mode, setMode] = useState<'dark' | 'light'>('light');
   const { isMobile } = useResponsiveness();

   const theme = createTheme({
      palette: {
         mode,
         primary: { main: '#31c886' },
         secondary: { main: '#c1e547' },
         primaryGray: { main: '#F3F4F6' },
         ...(mode === 'dark'
            ? {
                 background: {
                    default: '#131a22',
                 },
                 text: {
                    primary: '#f8f9fc',
                 },
              }
            : {
                 primary: { main: '#10333f' },
                 background: { default: '#f3f4f6' },
              }),
      },
      typography: {
         fontFamily: ['Quicksand', 'sans-serif'].join(','),
         fontWeightRegular: '500',
         subtitle1: {
            fontWeight: '700',
            fontSize: 18,
         },
         h6: {
            fontWeight: '700',
            fontSize: 20,
         },
         h4: {
            fontWeight: '700',
         },
      },
      components: {
         MuiButton: {
            styleOverrides: {
               root: {
                  textTransform: isMobile ? 'none' : 'uppercase',
               },
            },
         },
         MuiAppBar: {
            styleOverrides: {
               colorPrimary: {
                  backgroundColor: mode === 'dark' ? '#131a22' : 'white',
               },
            },
         },
      },
   });

   const value = useMemo(
      () => ({
         mode,
         setMode,
      }),
      [mode, setMode],
   );

   return (
      <ThemeContext.Provider value={value}>
         <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
   );
};

export { ThemeWrapper };

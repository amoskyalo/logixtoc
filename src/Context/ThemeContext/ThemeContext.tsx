'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useResponsiveness } from '@/hooks';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
   const { isMobile } = useResponsiveness();

   const theme = createTheme({
      palette: {
         primary: { main: '#10333f' },
         secondary: { main: '#c1e547' },
         primaryGray: { main: '#F3F4F6' },
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
      },
   });

   return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export { ThemeWrapper };

'use client';

import React, { useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { MainBar } from '@/components/NavigationBar';
import { useGetUser, useGetUserDeviceTheme } from '@/hooks';
import { ThemeWrapper } from '@/Context';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   const { UserToken } = useGetUser();
   const { mode } = useGetUserDeviceTheme();

   useEffect(() => {
      if (!UserToken) {
         window.location.replace('/auth/login');
      }
   }, [UserToken]);

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const userTheme = localStorage.getItem('userTheme');

         if (!userTheme) {
            localStorage.setItem('userTheme', mode);
         }
      }
   }, [mode]);

   if (!UserToken) {
      return null;
   }

   return (
      <ThemeWrapper>
         <CssBaseline />
         <Box sx={{ height: '100dvh', overflowX: 'hidden', width: '100vw' }}>
            <MainBar>{children}</MainBar>
         </Box>
      </ThemeWrapper>
   );
};

export default DashboardLayout;

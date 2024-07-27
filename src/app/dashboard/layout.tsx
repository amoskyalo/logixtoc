'use client';

import React from 'react';
import { Box } from '@mui/material';
import { MainBar, AppBar } from '@/components/NavigationBar';
import Joyride from 'react-joyride';
import CssBaseline from '@mui/material/CssBaseline';

const steps = [
   {
      target: '.profile',
      content: 'profile.',
   },
];

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
   return (
      <Box sx={{ height: '100vh', overflowX: 'hidden', width: '100vw' }}>
         <MainBar>{children}</MainBar>
      </Box>
   );
};

export default DashboardLayout;

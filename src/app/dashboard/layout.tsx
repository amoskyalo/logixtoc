'use client';

import React from 'react';
import { Box } from '@mui/material';
import { MainBar } from '@/components/NavigationBar';

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
   return (
      <Box sx={{ height: '100vh' }}>
         <MainBar>{children}</MainBar>
      </Box>
   );
};

export default DashboardLayout;

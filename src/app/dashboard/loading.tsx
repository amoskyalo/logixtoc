import React from 'react';
import { Stack, CircularProgress } from '@mui/material';

const LoadingUI = () => {
   return (
      <Stack justifyContent="center" alignItems="center" sx={{ height: '100%', width: '100%' }}>
         <CircularProgress />
      </Stack>
   );
};

export default LoadingUI;

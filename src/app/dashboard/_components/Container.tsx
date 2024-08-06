import React from 'react';
import { Box, Typography } from '@mui/material';
import { ContainerInterface } from './types';
import { useThemeMode } from '@/hooks';

const Container = ({ title, children, renderActionButton }: Readonly<ContainerInterface>) => {
   const { isDarkMode } = useThemeMode();

   return (
      <Box
         sx={{
            backgroundColor: isDarkMode ? '#1c252e' : 'white',
            padding: 4,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 3,
            height: '100%',
         }}
      >
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
            }}
         >
            <Typography variant="h6">{title}</Typography>
            {React.isValidElement(renderActionButton?.()) && renderActionButton?.()}
         </Box>
         {children}
      </Box>
   );
};

export default Container;

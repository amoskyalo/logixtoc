import React from 'react';
import { Skeleton, Box, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CardsSkeleton = () => {
   const {
      palette: { mode },
   } = useTheme();

   const isDarkMode = mode === 'dark';

   return (
      <Card
         variant="outlined"
         sx={{
            width: '100%',
            padding: 2,
            backgroundColor: isDarkMode ? '#1c252e' : '',
            borderRadius: 2,
         }}
      >
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'flex-start',
               width: '100%',
            }}
         >
            <Box sx={{ width: '100%' }}>
               <Skeleton variant="text" sx={{ width: '45%', mb: 1 }} />
               <Skeleton variant="text" sx={{ height: 16, width: '80%' }} />
            </Box>
            <Skeleton variant="rectangular" sx={{ height: 32, width: 32, borderRadius: 1.5 }} />
         </Box>

         <Box sx={{ display: 'flex', columnGap: 4, mt: 2 }}>
            {['1', '2'].map((val) => (
               <Box
                  sx={{
                     display: 'flex',
                     columnGap: 0.5,
                     alignItems: 'center',
                     width: '100%',
                  }}
                  key={val}
               >
                  <Skeleton variant="circular" sx={{ height: 14, width: 16 }} />
                  <Skeleton variant="text" sx={{ height: 14, width: '100%' }} />
               </Box>
            ))}
         </Box>
      </Card>
   );
};

export default CardsSkeleton;

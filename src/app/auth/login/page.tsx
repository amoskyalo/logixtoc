import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { Form } from './_Components';

const Login = () => {
   return (
      <Box
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: 4,
            padding: 8,
            width: '100%',
         }}
         className="glassmorphism"
      >
         <Image src="/iconlogo.png" height={75} width={75} alt="logo" />
         <Box>
            <Typography variant="h4" sx={{ color: '#4B5563' }}>
               Welcome Back
            </Typography>
            <Typography
               variant="body1"
               sx={{ color: '#6B7280', textAlign: 'center', fontWeight: 600 }}
            >
               Sign in to continue
            </Typography>
         </Box>
         <Form />
      </Box>
   );
};

export default Login;

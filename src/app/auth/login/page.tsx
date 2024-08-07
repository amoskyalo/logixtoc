import React from 'react';
import { Box, Typography } from '@mui/material';
import { Form } from './_Components';
import Image from 'next/image';

const Login = () => {
   return (
      <Box
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: 4,
         }}
         className="glassmorphism w-[90%] mx-auto p-8 md:w-full md:px-16 md:py-8"
      >
         <Image src="/darkicon.png" height={75} width={75} alt="logo" />
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

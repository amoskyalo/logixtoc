import { Box, Grid } from '@mui/material';
import Image from 'next/image';
import auth from '../../Assets/auth.svg';

const center = {
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '100%',
   height: '100%',
};

const Auth = ({ children }: Readonly<{ children: React.ReactNode }>) => {
   return (
      <Box
         sx={{ height: '100vh', overflow: 'hidden !important' }}
         className="md:bg-gradient-to-r md:from-[#10333f] md:via-[#c1e547] md:to-[#b9b6f8]"
      >
         <Grid container sx={{ height: '100%' }}>
            <Grid item lg={7} xs={0} sx={{ ...center }} className="hidden md:flex">
               <Image alt="logixtoc" src={auth} height={600} width={600} />
            </Grid>

            <Grid item lg={4} xs={12} sx={{ py: 6, px: 2, ...center }}>
               {children}
            </Grid>
         </Grid>
      </Box>
   );
};

export default Auth;

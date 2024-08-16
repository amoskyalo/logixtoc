import React from 'react';
import { Button, CircularProgress } from '@mui/material';

export const SubmitButton = ({
   text,
   loading,
   isLogin,
}: Readonly<{ text: string; loading: boolean; isLogin?: boolean }>) => {
   return (
      <Button
         disableElevation
         fullWidth
         variant="contained"
         type="submit"
         sx={{
            height: '40px',
            textTransform: 'capitalize',
            ...(isLogin && {
               backgroundColor: '#10333f',
               ':hover': { backgroundColor: '#10333f' },
            }),
         }}
         startIcon={loading ? <CircularProgress color="inherit" size={18} /> : null}
      >
         {text}
      </Button>
   );
};

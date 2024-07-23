import React from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FormDialog = ({
   children,
   open,
   onClose,
   maxWidth = 'xs',
   title,
}: Readonly<{
   children: React.ReactNode;
   open: boolean;
   onClose: () => void;
   maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
   title: string;
}>) => {
   return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
         <DialogTitle>
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
               }}
            >
               <Typography variant="h6">{title}</Typography>
               <IconButton onClick={onClose}>
                  <CloseIcon />
               </IconButton>
            </Box>
         </DialogTitle>
         <DialogContent>
            <Box sx={{ py: 1 }}>{children}</Box>
         </DialogContent>
      </Dialog>
   );
};

export default FormDialog;

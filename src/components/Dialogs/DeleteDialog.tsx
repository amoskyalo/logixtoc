import {
   Dialog,
   Button,
   DialogTitle,
   DialogActions,
   DialogContent,
   CircularProgress,
   DialogContentText,
} from '@mui/material';

const DeleteDialog = ({
   open,
   onCancel,
   onOkay,
   loading,
}: Readonly<{
   open: boolean;
   loading: boolean;
   onCancel: () => void;
   onOkay: () => void;
}>) => {
   return (
      <Dialog
         open={open}
         onClose={onCancel}
         maxWidth="xs"
         fullWidth
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title">{'Delete item?'}</DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-description">
               Are you sure you want to delete this item? This action is irreversible!
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button
               onClick={onOkay}
               autoFocus
               startIcon={loading ? <CircularProgress size={14} color="inherit" /> : ''}
               color="error"
            >
               Delete
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default DeleteDialog;

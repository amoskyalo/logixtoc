import { Dialog, Button, DialogTitle, DialogActions, DialogContent, CircularProgress, DialogContentText } from '@mui/material';

type Props = {
    open: boolean;
    loading: boolean;
    onCancel: () => void;
    onOkay: () => void;
    dialogTitle?: string;
    contentText?: string;
    onOkayButtonText?: string;
    onCancelButtonText?: string;
};

const DeleteDialog = ({ open, onCancel, onOkay, loading, dialogTitle, contentText, onCancelButtonText, onOkayButtonText }: Readonly<Props>) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="xs"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{dialogTitle ?? 'Delete item?'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {contentText ?? 'Are you sure you want to delete this item? This action is irreversible!'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} onClick={onCancel}>
                    {onCancelButtonText ?? 'Cancel'}
                </Button>
                <Button
                    onClick={onOkay}
                    autoFocus
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={14} color="inherit" /> : ''}
                    color="error"
                >
                    {onOkayButtonText ?? 'Delete'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;

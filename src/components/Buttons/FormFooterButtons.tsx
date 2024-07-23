import { Stack, Button } from '@mui/material';
import { SubmitButton } from './SubmitButton';

export const FormFooterButtons = ({
   loading,
   submitText,
   cancelText,
   onCancel,
}: {
   loading: boolean;
   submitText: string;
   cancelText: string;
   onCancel: () => void;
}) => {
   return (
      <Stack direction="row" spacing={3}>
         <Button
            disableElevation
            fullWidth
            variant="outlined"
            onClick={onCancel}
            sx={{ textTransform: 'none' }}
         >
            {cancelText}
         </Button>
         <SubmitButton loading={loading} text={submitText} />
      </Stack>
   );
};

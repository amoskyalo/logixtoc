import React from 'react';
import { Button, CircularProgress, ButtonProps } from '@mui/material';

export const SubmitButton = ({ text, loading, isLogin, ...rest }: Readonly<{ text?: string; loading: boolean; isLogin?: boolean } & ButtonProps>) => {
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
            {...rest}
        >
            {text ?? 'Submit'}
        </Button>
    );
};

import { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import { TextFieldInput } from '@/components/Inputs';
import SettingsContainer from './Container';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Security = () => {
    const [passwords, setPasswords] = useState<string[]>([]);

    const handleChangeVisibility = (name: string) => {
        if (passwords.includes(name)) {
            setPasswords((prevPasswords) => prevPasswords.filter((pass) => pass !== name));
        } else {
            setPasswords((prevPasswords) => [...prevPasswords, name]);
        }
    };
    function getProps(name: string) {
        const type = passwords.includes(name) ? 'text' : 'password';
        const InputProps = {
            endAdornment: passwords.includes(name) ? (
                <IconButton onClick={() => handleChangeVisibility(name)}>
                    <VisibilityOffIcon />
                </IconButton>
            ) : (
                <IconButton onClick={() => handleChangeVisibility(name)}>
                    <RemoveRedEyeIcon />
                </IconButton>
            ),
        };

        return { type, InputProps };
    }

    return (
        <SettingsContainer title="Security settings" subtitle="Update your security settings.">
            <Grid container rowGap={4} columnSpacing={4} sx={{ mt: 4 }}>
                <Grid item xs={12} md={4} lg={6}>
                    <TextFieldInput label="Old Password" {...getProps('oldPassword')} />
                </Grid>
                <Grid item xs={12} md={4} lg={6}>
                    <TextFieldInput label="New Password" {...getProps('newPassword')} />
                </Grid>
                <Grid item xs={12} md={4} lg={6}>
                    <TextFieldInput label="Confirm Password" {...getProps('confirmPassword')} />
                </Grid>
            </Grid>
        </SettingsContainer>
    );
};

export default Security;

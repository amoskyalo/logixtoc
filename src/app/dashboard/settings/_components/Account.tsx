import { useState } from 'react';
import { Stack, Typography, Grid } from '@mui/material';
import { TextFieldInput, FileUpload } from '@/components/Inputs';
import { useGetUser } from '@/hooks';
import SettingsContainer from './Container';

const Account = () => {
    const { Email, FirstName, LastName, PhoneNumber } = useGetUser();
    const [fileUrl, setFileUrl] = useState<any>();

    return (
        <SettingsContainer title="Profile" subtitle="View and update your profile details">
            <Stack spacing={1} sx={{ mt: 4 }}>
                <FileUpload title="Upload or drag and drop" previewFile={fileUrl} setFileUrl={setFileUrl} />
                <Typography variant="body2">JPG*, PNG*, JPEG*. 10MB max.</Typography>
            </Stack>

            <Grid container sx={{ mt: 4 }} rowGap={4} columnSpacing={4}>
                <Grid item xs={12} md={6}>
                    <TextFieldInput label="First name" value={FirstName} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFieldInput label="Last name" value={LastName} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFieldInput label="Email" value={Email} disabled />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFieldInput label="Phone Number" value={PhoneNumber} disabled />
                </Grid>
            </Grid>
        </SettingsContainer>
    );
};

export default Account;

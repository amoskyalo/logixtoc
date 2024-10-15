import React, { useState } from 'react';
import Image from 'next/image';
import dark from '../../../../Assets/dark.png';
import light from '../../../../Assets/light.png';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import SettingsContainer from './Container';
import { Box, Stack, Typography, Grid, MenuItem } from '@mui/material';
import { useThemeMode, useResponsiveness } from '@/hooks';
import { SelectField } from '@/components/Inputs';

const Preferences = () => {
    const { isDarkMode, mode } = useThemeMode();
    const { isMobile } = useResponsiveness();

    const [userPreferences, setUserPreferences] = useState({
        region: '',
        currency: '',
        language: '',
        timeZone: '',
        columns: '',
    });

    const handleChangePreferences = (name: string, value: any) => {
        setUserPreferences((prevPreferences) => ({ ...prevPreferences, [name]: value }));
    };

    const handleGetCurrency = () => {
        const countryCurrency = [
            { name: 'Kenya', currency: 'KES' },
            { name: 'Uganda', currency: 'UGX' },
            { name: 'Tanzania', currency: 'TZS' },
            { name: 'Rwanda', currency: 'RWF' },
            { name: 'Burundi', currency: 'BIF' },
        ];

        let c = 'KES (local currency)';

        if (userPreferences.region) {
            const k = countryCurrency.find((c) => c.name === userPreferences.region);
            c = `${k!.currency} (local currency)`;
        }

        return { value: c, options: [c, 'USD'] };
    };

    const preferenceSettings = [
        { key: 'region', title: 'Region', value: 'Kenya', options: ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Burundi'] },
        { key: 'currency', title: 'Currency', ...handleGetCurrency() },
        { key: 'language', title: 'Language', value: 'English (US)', options: ['English (US)'] },
        { key: 'timeZone', title: 'Time Zone', value: '(UTC + 3) East Africa Time (EAT)', options: ['(UTC + 3) East Africa Time (EAT)'] },
        { key: 'columns', title: 'Columns Density', value: 'Standard', options: ['Standard', 'Comfortable'] },
    ];

    return (
        <SettingsContainer  title="Preferences" subtitle="Customize according to your preferences">
            <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: 14 }}>
                    Select Theme
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    {[
                        { name: 'Light', image: light },
                        { name: 'Dark', image: dark },
                    ].map(({ name, image }) => (
                        <Box
                            key={name}
                            sx={{
                                width: isMobile ? '50%' : 200,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                ...(mode === name.toLowerCase() && { border: 2, borderColor: isDarkMode ? 'primary.main' : '#1976d2' }),
                            }}
                        >
                            <Box sx={{ backgroundColor: '#dce4e7', pl: 1, pt: 1 }}>
                                <Image src={image} height={1440} width={1440} className="w-full h-28" alt={name} />
                            </Box>
                            <Stack direction="row" justifyContent="space-between" sx={{ border: 1, borderColor: 'divider', p: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                    {name} mode
                                </Typography>

                                {mode === name.toLowerCase() && (
                                    <CheckCircleOutlinedIcon fontSize="small" sx={{ color: isDarkMode ? '#31c886' : '#1976d2' }} />
                                )}
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </Box>

            <Stack direction="column" spacing={isMobile ? 3 : 4} sx={{ mt: 4 }}>
                {preferenceSettings.map(({ title, value, options, key }) => {
                    const k = key as keyof typeof userPreferences;

                    return (
                        <Grid container key={title} rowGap={1}>
                            <Grid item xs={12} md={4}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: 16 }}>
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <SelectField
                                    value={userPreferences[k] || value}
                                    onChange={(event) => handleChangePreferences(key, event.target.value)}
                                    disabled={key === 'timeZone'}
                                >
                                    {options.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </SelectField>
                            </Grid>
                        </Grid>
                    );
                })}
            </Stack>
        </SettingsContainer>
    );
};

export default Preferences;

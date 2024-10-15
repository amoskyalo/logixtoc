'use client';
import { useState } from 'react';
import { TablessContainer } from '@/components/Containers';
import { useResponsiveness } from '@/hooks';
import { Box, Tabs, Tab } from '@mui/material';
import { Account, Security, Preferences } from './_components';

const Settings = () => {
    const { isMobile } = useResponsiveness();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: isMobile ? '100%' : 900, marginX: 'auto', pb: 4 }}>
            <TablessContainer headerName="Settings">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        allowScrollButtonsMobile={isMobile}
                        scrollButtons={isMobile}
                    >
                        {['Personal Information', 'Security settings', 'Preferences'].map((item) => (
                            <Tab key={item} label={item} sx={{ textTransform: 'none', fontWeight: 700 }} />
                        ))}
                    </Tabs>
                </Box>

                {value === 0 && <Account />}
                {value === 1 && <Security />}
                {value === 2 && <Preferences />}
            </TablessContainer>
        </Box>
    );
};

export default Settings;

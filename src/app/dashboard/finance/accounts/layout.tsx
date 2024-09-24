'use client';

import React from 'react';
import { PageHeader } from '@/components/Headers';
import { PageTabs } from '@/components/Tabs';
import { Box, Divider } from '@mui/material';

const AccountsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box>
            <PageHeader headerName="Accounts" subTitle="Manage your accounts, and your accoun types from this page." />
            <Divider sx={{ mb: 2, mt: 1 }} />
            <PageTabs parentRoute="finance/accounts" initialRoute="accounts" tabsList={['Accounts', 'Account Types']} />
            {children}
        </Box>
    );
};

export default AccountsLayout;

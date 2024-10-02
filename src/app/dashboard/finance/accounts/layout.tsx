'use client';

import React from 'react';
import { TabsPageContainer } from '@/components/Containers';

const AccountsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <TabsPageContainer
            headerName="Accounts"
            subTitle="Manage your accounts, and your accoun types from this page."
            parentRoute="finance/accounts"
            initialRoute="accounts"
            tabsList={['Accounts', 'Account Types']}
        >
            {children}
        </TabsPageContainer>
    );
};

export default AccountsLayout;

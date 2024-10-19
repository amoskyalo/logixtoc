import React from 'react';
import { TabsPageContainer } from '@/components/Containers';

const AllowanceLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <TabsPageContainer
            headerName="Allowance"
            subTitle="Manage employees allowane request from this page, as well as add new allowance types."
            parentRoute="commission/allowance"
            initialRoute="allowance/allowance-request"
            tabsList={['Allowance Request', 'Allowance Type']}
        >
            {children}
        </TabsPageContainer>
    );
};

export default AllowanceLayout;

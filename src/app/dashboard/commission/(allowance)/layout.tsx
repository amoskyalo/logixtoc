import React from 'react';
import { TabsPageContainer } from '@/components/Containers';

const AllowanceLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <TabsPageContainer
            headerName="Allowance"
            subTitle="Allowance page"
            parentRoute="commission"
            initialRoute="allowance-request"
            tabsList={['Allowance Request', 'Allowance Type']}
        >
            {children}
        </TabsPageContainer>
    );
};

export default AllowanceLayout;

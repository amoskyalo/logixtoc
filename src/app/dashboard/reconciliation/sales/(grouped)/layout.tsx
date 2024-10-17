import React from 'react';
import { TabsPageContainer } from '@/components/Containers';

const SalesLayut = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <TabsPageContainer
            headerName="Sales"
            subTitle="Sales page"
            parentRoute="reconciliation/sales"
            initialRoute="sales/summary"
            tabsList={['Summary', 'Sale History']}
        >
            {children}
        </TabsPageContainer>
    );
};

export default SalesLayut;

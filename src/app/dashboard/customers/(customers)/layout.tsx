import React from 'react';
import { TabsPageContainer } from '@/components/Containers';

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <TabsPageContainer
            headerName="Customers"
            subTitle="Manage your custoners"
            parentRoute="customers"
            initialRoute="customers"
            tabsList={['Customers', 'Customer category']}
        >
            {children}
        </TabsPageContainer>
    );
};

export default layout;

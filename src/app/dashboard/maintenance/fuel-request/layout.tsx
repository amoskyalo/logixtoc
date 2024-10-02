import React from 'react';
import { TabsPageContainer } from '@/components/Containers';

const FueldRequestLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <TabsPageContainer
            headerName="Fuel Request"
            subTitle="Fueld Request page"
            initialRoute="fuel-request"
            parentRoute="maintenance/fuel-request"
            tabsList={['Fuel Request', 'Fuel Station']}
        >
            {children}
        </TabsPageContainer>
    );
};

export default FueldRequestLayout;

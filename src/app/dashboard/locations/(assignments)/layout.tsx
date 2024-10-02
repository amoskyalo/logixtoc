import React from 'react';
import { TabsPageContainer } from '@/components/Containers';

const LocationsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <TabsPageContainer
            headerName="Locations"
            subTitle="Manage vendor locations, and location assignments."
            parentRoute="locations"
            initialRoute="locations"
            tabsList={['Locations', 'Assigned Users', 'Assigned Locations', 'Assigned Products', 'Assigned Regions', 'Assigned Accounts']}
        >
            {children}
        </TabsPageContainer>
    );
};

export default LocationsLayout;

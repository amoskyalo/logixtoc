import React from 'react';
import { TabsPageContainer } from '@/components/Containers';

const NotificationsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <TabsPageContainer
            headerName="Notifications"
            subTitle="Notifications page"
            initialRoute="/notifications/notifications-users"
            parentRoute="analytics/notifications"
            tabsList={['Notifications Users', 'Notifications type']}
        >
            {children}
        </TabsPageContainer>
    );
};

export default NotificationsLayout;

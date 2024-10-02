import React from 'react';
import { TabsPageContainer } from '@/components/Containers';

const LeaveRequestLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <TabsPageContainer
            headerName="Leave Request"
            subTitle="Manage employees leave requests and leave types"
            initialRoute="leave-request"
            parentRoute="human-resource/leave-request"
            tabsList={['Leave Request', 'Leave Type']}
        >
            {children}
        </TabsPageContainer>
    );
};

export default LeaveRequestLayout;

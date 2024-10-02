import React from 'react';
import PageTabs from '../Tabs/Tabs';
import { PageHeader } from '../Headers';
import { Divider, Box } from '@mui/material';

type Props = {
    headerName: string;
    subTitle: string;
    parentRoute: string;
    initialRoute: string;
    tabsList: string[];
    children: React.ReactNode;
};

const TabsPageContainer = ({ headerName, subTitle, parentRoute, initialRoute, tabsList, children }: Props) => {
    return (
        <Box>
            <PageHeader headerName={headerName} subTitle={subTitle} />
            <Divider sx={{ mb: 2, mt: 1 }} />
            <PageTabs parentRoute={parentRoute} initialRoute={initialRoute} tabsList={tabsList} />
            {children}
        </Box>
    );
};

export default TabsPageContainer;

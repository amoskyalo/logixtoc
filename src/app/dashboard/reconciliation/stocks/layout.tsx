import React from 'react';
import { TabsPageContainer } from '@/components/Containers';

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <TabsPageContainer
            headerName="Stocks"
            subTitle="Stocks page"
            parentRoute="/reconciliation/stocks"
            initialRoute="stocks/stock-summary"
            tabsList={['Stock Summary', 'Stock History']}
        >
            {children}
        </TabsPageContainer>
    );
};

export default layout;

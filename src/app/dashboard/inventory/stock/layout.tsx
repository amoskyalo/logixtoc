import React from 'react';
import { TabsPageContainer } from '@/components/Containers';

const StockLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <TabsPageContainer
            parentRoute="inventory/stock"
            initialRoute="stock"
            tabsList={['Stock Movement', 'Stock Level', 'Actual Stock', 'Packaging Conversion']}
            headerName="Stock"
            subTitle="Manage your stocks, and packaging conversions."
        >
            {children}
        </TabsPageContainer>
    );
};

export default StockLayout;

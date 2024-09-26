import React from 'react';
import { PageHeader } from '@/components/Headers';
import { Box, Divider } from '@mui/material';
import { PageTabs } from '@/components/Tabs';

const StockLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box>
            <PageHeader headerName="Stock" subTitle="Manage your stocks, and packaging conversions." />
            <Divider sx={{ mb: 2, mt: 1 }} />
            <PageTabs
                parentRoute="inventory/stock"
                initialRoute="stock"
                tabsList={['Stock Movement', 'Stock Level', 'Actual Stock', 'Packaging Conversion']}
            />
            {children}
        </Box>
    );
};

export default StockLayout;

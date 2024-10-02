import React from 'react';
import { TablessContainer } from '@/components/Containers';

const CustomerSales = () => {
    return (
        <TablessContainer headerName="Customer Sales" backURL="/dashboard/customers">
            <div>CustomerSales</div>
        </TablessContainer>
    );
};

export default CustomerSales;

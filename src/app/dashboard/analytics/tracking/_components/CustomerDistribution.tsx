import React from 'react';
import { useFetch } from '@/api';
import { Box } from '@mui/material';
import CustomerHeatMap from './Maps/CustomerHeatMap';

const CustomerDistribution = () => {
    const { data: customerHeatMapData } = useFetch('getVendorCustomerHeatMap', { VendorLocationID: 0, VendorRegionID: 0 });

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <CustomerHeatMap heatData={customerHeatMapData?.Data || []} />
        </Box>
    );
};

export default CustomerDistribution;

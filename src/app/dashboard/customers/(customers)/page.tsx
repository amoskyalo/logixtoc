'use client';

import { APPCRUD, VendorCustomer, GetCustomer } from '@/api';
import { useRouter } from 'next/navigation';
import { useResponsiveness } from '@/hooks';

const Customers = () => {
    const router = useRouter();
    const { isMobile } = useResponsiveness();

    const handleNavigate = (activeRecord: any, route: string) => {
        router.push(`/dashboard/customers/${route}?VendorCustomerID=${activeRecord.VendorCustomerID}`);
    };

    const UI = new APPCRUD<VendorCustomer, void, void, GetCustomer>({
        grid: {
            fetchUrl: 'getVendorCustomer',
            actions: ['options'],
            params: {
                VendorCustomerCategoryID: 0,
                CustomerTypeID: 0,
            },
            options: [
                { name: 'Shops', onClick: (activeRecord) => handleNavigate(activeRecord, 'shops') },
                { name: 'Sales', onClick: (activeRecord) => handleNavigate(activeRecord, 'sales') },
                { name: 'Payment', onClick: (activeRecord) => handleNavigate(activeRecord, 'payment') },
                { name: 'Debit Note', onClick: (activeRecord) => handleNavigate(activeRecord, 'debit-note') },
                { name: 'Credit Note', onClick: (activeRecord) => handleNavigate(activeRecord, 'credit-note') },
                { name: 'Statement', onClick: (activeRecord) => handleNavigate(activeRecord, 'statement') },
                { name: 'UOM Statement', onClick: (activeRecord) => handleNavigate(activeRecord, 'uom-statement') },
                { name: 'Edit', onClick: () => null },
                { name: 'Delete', onClick: () => null },
            ],
            columns: [
                { field: 'CustomerName', headerName: 'Customer Name', width: isMobile ? 170 : 150 },
                { field: 'CustomerPhone', headerName: 'Customer Phone', width: isMobile ? 170 : 150 },
                { field: 'PaymentTerms', headerName: 'Payments Terms', width: isMobile ? 170 : 150, type: 'number' },
                { field: 'BalanceForward', headerName: 'Balance Forward', width: isMobile ? 180 : 150, type: 'number' },
                { field: 'Consumption', headerName: 'Consumption', width: isMobile ? 170 : 150, type: 'number' },
                { field: 'Payments', headerName: 'Payments', width: isMobile ? 170 : 150, type: 'number' },
                { field: 'CurrentBalance', headerName: 'Current Balance', width: isMobile ? 170 : 150, type: 'number' },
                { field: 'CustomerTypeName', headerName: 'Customer Type', width: isMobile ? 170 : 150 },
                { field: 'VendorCustomerCategoryName', headerName: 'Customer Category', width: isMobile ? 200 : 170 },
            ],
        },
    });

    return UI.render();
};

export default Customers;

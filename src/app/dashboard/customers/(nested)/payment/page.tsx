'use client';

import React from 'react';
import { TablessContainer } from '@/components/Containers';
import { APPCRUD, useFetch, VendorCustomerPayment, VendorAccount } from '@/api';
import { useSearchParams } from 'next/navigation';

type Delete = { vendorCustomerPaymentID: number };
type Params = { VendorCustomerID: number };
type Values = { paidAmount: string; paymentNO: string; vendorAccountID: string };

const CustomerPament = () => {
    const VendorCustomerID = useSearchParams().get('VendorCustomerID') as unknown as number;
    const { data: accounts } = useFetch<VendorAccount, void>('getVendorAccounts');

    const UI = new APPCRUD<VendorCustomerPayment, Values, Delete, Params>({
        grid: {
            fetchUrl: 'getVendorCustomerPayment',
            deleteUrl: 'removeVendorCustomerPayment',
            actions: ['delete'],
            params: { VendorCustomerID },
            initialDeleteParams: { vendorCustomerPaymentID: '' as unknown as number },
            columns: [
                { field: 'VendorAccountName', headerName: 'Account Name', mobileWidth: 170 },
                { field: 'VendorAccountNO', headerName: 'Account No', mobileWidth: 150 },
                { field: 'PaymentNO', headerName: 'Payment Number', mobileWidth: 180 },
                { field: 'TransDate', headerName: 'Transaction Date', mobileWidth: 180 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 180 },
                { field: 'PaidAmount', headerName: 'Paid Amount', mobileWidth: 150 },
            ],
        },
        form: {
            submitKey: 'addVendorCustomerPayment',
            title: 'Add Customer Payment',
            initialValues: {
                paidAmount: '',
                paymentNO: '',
                vendorAccountID: '',
            },
            modifyData(data) {
                return {
                    ...data,
                    transDate: new Date().toISOString(),
                    vendorCustomerID: VendorCustomerID,
                };
            },
            inputs: [
                {
                    label: 'Account Name',
                    key: 'vendorAccountID',
                    type: 'select',
                    validate: true,
                    lookups: accounts?.Data || [],
                    lookupDisplayName: 'VendorAccountName',
                    lookupDisplayValue: 'VendorAccountID',
                },
                { label: 'Paid Amount', key: 'paidAmount', type: 'number', validate: true },
                { label: 'Payment Number', key: 'paymentNO', type: 'text', validate: true },
            ],
        },
    });

    return (
        <TablessContainer headerName="Customer Payments" backURL="/dashboard/customers">
            {UI.render()}
        </TablessContainer>
    );
};

export default CustomerPament;

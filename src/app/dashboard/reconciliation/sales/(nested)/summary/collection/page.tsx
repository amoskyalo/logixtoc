'use client';

import { APPCRUD, SalePaymentCollection, useFetch, VendorAccount } from '@/api';
import { TablessContainer } from '@/components/Containers';
import { useSearchParams } from 'next/navigation';
import { useResponsiveness } from '@/hooks';

type Params = { DeliveryPlanNO: number };
type Values = {
    collectedAmount: number;
    refNO: string;
    vendorAccountID: number;
};
const Collection = () => {
    const { data: vendorAccounts } = useFetch<VendorAccount, void>('getVendorAccounts');
    const DeliveryPlanNO = useSearchParams().get('DeliveryPlanNO') as unknown as number;
    const stockNO = useSearchParams().get('stockNO');
    const { isMobile } = useResponsiveness();

    const UI = new APPCRUD<SalePaymentCollection, Values, void, Params>({
        grid: {
            showActions: false,
            fetchUrl: 'getSalePaymentCollection',
            params: { DeliveryPlanNO },
            columns: [
                { field: 'CollectionNO', headerName: 'Collection NO', mobileWidth: 170 },
                { field: 'VendorAccountName', headerName: 'Account Name', mobileWidth: 150 },
                { field: 'VendorAccountNO', headerName: 'Account NO', mobileWidth: 150 },
                { field: 'VendorAccountTypeName', headerName: 'Account Type', mobileWidth: 150 },
                { field: 'RefNO', headerName: 'Ref NO', type: 'number', mobileWidth: 150 },
                { field: 'CollectedAmount', headerName: 'Collected Amount', type: 'number', mobileWidth: 170 },
            ],
        },
        form: {
            type: 'gridForm',
            title: 'Add New Sale Collection',
            submitKey: 'postVendorSaleCollection',
            focusField: 'vendorAccountID',
            dialogSize: 'sm',
            newRow: { vendorAccountID: '', collectedAmount: '', refNO: '' },
            modifyData: (data) => ({
                paymentCollectionArray: data,
                deliveryPlanNO: DeliveryPlanNO,
                stockNO,
            }),
            columns: [
                {
                    field: 'vendorAccountID',
                    headerName: 'Account',
                    type: 'singleSelect',
                    valueOptions: vendorAccounts?.Data,
                    getOptionLabel: (account: any) => account.VendorAccountName,
                    getOptionValue: (account: any) => account.VendorAccountID,
                    ...(isMobile ? { width: 120 } : { flex: 1 }),
                },
                { field: 'collectedAmount', type: 'number', headerName: 'Collected Amount', ...(isMobile ? { width: 150 } : { flex: 1 }) },
                { field: 'refNO', headerName: 'Reference No', ...(isMobile ? { width: 120 } : { flex: 1 }) },
            ],
        },
    });

    return (
        <TablessContainer headerName="Summary Collections" backURL="/dashboard/reconciliation/sales/summary">
            {UI.render()}
        </TablessContainer>
    );
};

export default Collection;

'use client';

import { TablessContainer } from '@/components/Containers';
import { useSearchParams } from 'next/navigation';
import { APPCRUD, VendorRegionPrice, useFetch, VendorRegion } from '@/api';
import { StatusChips } from '@/components/Chips';
import { getMappedObjectArray } from '@/utils';

type Params = { VendorPriceNO: string };
type Values = { regionsArray: any[] };

const RegionPricing = () => {
    const VendorPriceNO = useSearchParams().get('VendorPriceNO') as string;
    const { data: regions } = useFetch<VendorRegion, void>('getVendorRegions');

    const UI = new APPCRUD<VendorRegionPrice, Values, void, Params>({
        grid: {
            showDates: false,
            showActions: false,
            fetchUrl: 'getVendorRegionPrice',
            params: { VendorPriceNO },
            columns: [
                { field: 'VendorRegionName', headerName: 'Region Name', flex: 1 },
                { field: 'VendorPriceNO', headerName: 'Price Number', flex: 1 },
                { field: 'AddedByName', headerName: 'Added By', flex: 1 },
                { field: 'DateAdded', headerName: 'Date Added', flex: 1 },
                { field: 'StatusID', headerName: 'Status', renderCell: ({ row: { StatusID } }) => <StatusChips name="Active" statusID={StatusID} /> },
            ],
        },
        form: {
            type: 'normal',
            title: 'Add New Region Prices',
            submitKey: 'postVendorRegionPriceAssignmentTx',
            initialValues: { regionsArray: [] },
            modifyData: (data) => ({ vendorPriceNO: VendorPriceNO, regionsArray: getMappedObjectArray('vendorRegionID', data.regionsArray) }),
            inputs: [
                {
                    label: 'Region',
                    type: 'multiple',
                    key: 'regionsArray',
                    lookups: regions?.Data || [],
                    validate: true,
                    optionKey: 'vendorRegionID',
                    optionLabelKey: 'VendorRegionName',
                    optionValueKey: 'VendorRegionID',
                },
            ],
        },
    });

    return (
        <TablessContainer headerName="Region Pries Details" backURL="/dashboard/finance/product-prices">
            {UI.render()}
        </TablessContainer>
    );
};

export default RegionPricing;

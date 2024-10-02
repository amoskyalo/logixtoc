'use client';

import { VendorRegionBranch, APPCRUD } from '@/api';
import { useSearchParams } from 'next/navigation';
import { StatusChips } from '@/components/Chips';
import { TablessContainer } from '@/components/Containers';

type Delete = { vendorRegionBranchID: number };
type Params = { VendorRegionID: number };
type Values = { vendorRegionBranchName: string };

const Branches = () => {
    const VendorRegionID = useSearchParams().get('VendorRegionID') as unknown as number;

    const UI = new APPCRUD<VendorRegionBranch, Values, Delete, Params>({
        grid: {
            showDates: false,
            actions: ['delete'],
            fetchUrl: 'getVendorRegionBranch',
            deleteUrl: 'removeVendorRegionBranch',
            initialDeleteParams: { vendorRegionBranchID: '' as unknown as number },
            params: { VendorRegionID },
            columns: [
                { field: 'VendorRegionName', headerName: 'Branch Name', mobileWidth: 150 },
                { field: 'VendorRegionBranchName', headerName: 'Region Name', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 170 },
                {
                    field: 'StatusID',
                    headerName: 'Status',
                    mobileWidth: 100,
                    renderCell: ({ row: { StatusID } }) => <StatusChips name="Active" statusID={StatusID} />,
                },
            ],
        },
        form: {
            title: 'Add new Region Branch',
            submitKey: 'addVendorRegionBranch',
            initialValues: { vendorRegionBranchName: '' },
            modifyData(arg) {
                return { ...arg, vendorRegionID: VendorRegionID };
            },
            inputs: [{ label: 'Region Branch Name', key: 'vendorRegionBranchName', type: 'text', validate: true }],
        },
    });
    return (
        <TablessContainer headerName="Branches Details" backURL="/dashboard/customers/regions">
            {UI.render()}
        </TablessContainer>
    );
};

export default Branches;

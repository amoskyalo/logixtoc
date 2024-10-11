'use client';

import { TablessContainer } from '@/components/Containers';
import { APPCRUD, VendorRegion } from '@/api';
import { StatusChips } from '@/components/Chips';
import { useRouter } from 'next/navigation';

type Delete = { vendorRegionID: number | string };

const Regions = () => {
    const router = useRouter();

    const UI = new APPCRUD<VendorRegion, any, Delete, void>({
        grid: {
            fetchUrl: 'getVendorRegions',
            deleteUrl: 'removeVendorRegion',
            actions: ['options'],
            initialDeleteParams: { vendorRegionID: '' },
            options: [
                {
                    name: 'Branches',
                    onClick: (activeRecord) => {
                        const url = `/dashboard/customers/regions/branches?VendorRegionID=${activeRecord.VendorRegionID}`;
                        router.push(url);
                    },
                },
                { name: 'Delete' },
            ],
            columns: [
                { field: 'VendorRegionName', headerName: 'Region Name', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 180 },
                { field: 'TotalAsset', headerName: 'Total Asset', type: 'number', mobileWidth: 150 },
                { field: 'TotalBranches', headerName: 'Total Branch', type: 'number', mobileWidth: 150, valueGetter: (__, row) => row.BranchArray.length },
                { field: 'TotalCustomers', headerName: 'Total Customers', type: 'number', mobileWidth: 180 },
                {
                    field: 'StatusID',
                    headerName: 'Status',
                    mobileWidth: 100,
                    renderCell: ({ row: { StatusID } }) => <StatusChips name="Active" statusID={StatusID} />,
                },
            ],
        },
        form: {
            type: 'stepperForm',
            title: 'Add New Region and Branches',
            submitKey: 'postVendorRegionTx',
            initialValues: { vendorRegionName: '' },
            stepsLabels: ['Add region name', 'Add region branches'],
            modifyData: ({ gridValues, ...rest }) => ({
                ...rest,
                postVendorRegionBranchArray: gridValues,
            }),
            steps: [
                {
                    type: 'normal',
                    inputs: [{ label: 'Region Name', type: 'text', key: 'vendorRegionName', validate: true }],
                },
                {
                    type: 'gridForm',
                    focusField: 'vendorRegionBranchName',
                    newRow: { vendorRegionBranchName: '' },
                    columns: [{ field: 'vendorRegionBranchName', headerName: 'Branch Name', flex: 1 }],
                },
            ],
        },
    });

    return (
        <TablessContainer headerName="Regions" subTitle="You can manage your regions, and view region branches from this page page">
            {UI.render()}
        </TablessContainer>
    );
};

export default Regions;

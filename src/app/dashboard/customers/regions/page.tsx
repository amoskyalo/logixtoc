'use client';

import { TablessContainer } from '@/components/Containers';
import { APPCRUD, VendorRegion } from '@/api';
import { StatusChips } from '@/components/Chips';
import { useRouter } from 'next/navigation';

type Delete = { vendorRegionID: number };

const Regions = () => {
    const router = useRouter();

    const UI = new APPCRUD<VendorRegion, void, Delete, void>({
        grid: {
            fetchUrl: 'getVendorRegions',
            deleteUrl: 'removeVendorRegion',
            actions: ['options'],
            options: [
                {
                    name: 'Branches',
                    onClick: (activeRecord) => {
                        const url = `/dashboard/customers/regions/branches?VendorRegionID=${activeRecord.VendorRegionID}`;
                        router.push(url);
                    },
                },
                {
                    name: 'Delete',
                    onClick(activeRecord, setDeleteParams, setDeleteOpen) {
                        setDeleteOpen(true);
                        setDeleteParams({ vendorRegionID: activeRecord.VendorRegionID });
                    },
                },
            ],
            columns: [
                { field: 'VendorRegionName', headerName: 'Region Name', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 180 },
                { field: 'TotalAsset', headerName: 'Total Asset', type: 'number', mobileWidth: 150 },
                { field: 'TotalBranches', headerName: 'Total Branch', type: 'number', mobileWidth: 150 },
                { field: 'TotalCustomers', headerName: 'Total Customers', type: 'number', mobileWidth: 180 },
                {
                    field: 'StatusID',
                    headerName: 'Status',
                    mobileWidth: 100,
                    renderCell: ({ row: { StatusID } }) => <StatusChips name="Active" statusID={StatusID} />,
                },
            ],
        },
    });

    return (
        <TablessContainer headerName="Regions" subTitle="Regions page">
            {UI.render()}
        </TablessContainer>
    );
};

export default Regions;

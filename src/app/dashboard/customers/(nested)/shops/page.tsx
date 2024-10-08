'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { TablessContainer } from '@/components/Containers';
import { APPCRUD, useFetch, VendorCustomerLocation, VendorRegion } from '@/api';
import { SelectField } from '@/components/Inputs';
import { MenuItem } from '@mui/material';
import { getFormikFieldProps } from '@/utils';

type Values = {
    locationName: string;
    locationPhone: string;
    vendorRegionBranchID: string;
    vendorRegionID: number;
};

type Params = { VendorCustomerID: number };

const CustomerShops = () => {
    const VendorCustomerID = useSearchParams().get('VendorCustomerID') as unknown as number;

    const { data: regions } = useFetch<VendorRegion, void>('getVendorRegions');

    const UI = new APPCRUD<VendorCustomerLocation, Values, void, Params>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorCustomerLocation',
            params: { VendorCustomerID },
            columns: [
                { field: 'CustomerName', headerName: 'Customer Name', mobileWidth: 170 },
                { field: 'LocationName', headerName: 'Location Name', mobileWidth: 170 },
                { field: 'LocationPhone', headerName: 'Location Phone', mobileWidth: 170 },
                { field: 'VendorRegionName', headerName: 'Region Name', mobileWidth: 150 },
            ],
        },
        form: {
            type: "normal",
            submitKey: 'addVendorCustomerLocation',
            title: 'Add Customer Shops',
            modifyData(data) {
                return {
                    ...data,
                    vendorCustomerID: VendorCustomerID,
                };
            },
            initialValues: {
                locationName: '',
                locationPhone: '',
                vendorRegionBranchID: '',
                vendorRegionID: '',
            },
            inputs: [
                { label: 'Shop Name', key: 'locationName', type: 'text', validate: true },
                { label: 'Shop Phone', key: 'locationPhone', type: 'text', validate: true },
                {
                    label: 'Region',
                    key: 'vendorRegionID',
                    type: 'select',
                    lookups: regions?.Data || [],
                    lookupDisplayValue: 'VendorRegionID',
                    lookupDisplayName: 'VendorRegionName',
                    validate: true,
                },
                {
                    label: 'Region Branch',
                    key: 'vendorRegionBranchID',
                    validate: true,
                    dataType: 'number',
                    type: 'customInput',
                    renderInput(formik) {
                        const lookup = regions?.Data.find((reg) => reg.VendorRegionID === formik.values.vendorRegionID);

                        return (
                            <SelectField label="Region Branch" {...getFormikFieldProps(formik, 'vendorRegionBranchID')}>
                                {lookup ? (
                                    lookup.BranchArray.map((lookup) => (
                                        <MenuItem key={lookup.VendorRegionBranchID} value={lookup.VendorRegionBranchID}>
                                            {lookup.VendorRegionBranchName}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem>Please select region </MenuItem>
                                )}
                            </SelectField>
                        );
                    },
                },
            ],
        },
    });

    return (
        <TablessContainer headerName="Customer Shops" backURL="/dashboard/customers">
            {UI.render()}
        </TablessContainer>
    );
};

export default CustomerShops;

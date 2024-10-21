'use client';

import { TablessContainer } from '@/components/Containers';
import { APPCRUD, VendorUserObjectInterface, SystemAccessType, SystemRole, useFetch } from '@/api';
import { Chip } from '@mui/material';

type Params = { SystemRoleID: number | string };
type Delete = { userID: string | number };
type Values = {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    systemAccessTypeID: number;
    systemRoleID: number;
};

const Employees = () => {
    const { data: systemAccessType } = useFetch<SystemAccessType, void>('getSystemAccessType');
    const { data: systemRole } = useFetch<SystemRole, void>('getSystemRole');

    const UI = new APPCRUD<VendorUserObjectInterface, Values, Delete, Params>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorUsers',
            deleteUrl: 'removeSystemUser',
            actions: ['options'],
            initialDeleteParams: { userID: '' },
            options: [{ name: 'User Roles', onClick: () => null }, { name: 'Edit', onClick: () => null }, { name: 'Delete' }],
            columns: [
                { field: 'User', mobileWidth: 150, valueGetter: (__, row) => row.FirstName + ' ' + row.LastName },
                { field: 'PhoneNumber', mobileWidth: 150, headerName: 'Phone Number' },
                { field: 'Email', mobileWidth: 150, headerName: 'Email' },
                { field: 'SystemRoleName', mobileWidth: 150, headerName: 'Role' },
                { field: 'AddedByName', mobileWidth: 150, headerName: 'Added By' },
                {
                    field: 'StatusID',
                    mobileWidth: 100,
                    headerName: 'Status',
                    renderCell: () => <Chip label="Active" color="primary" variant="outlined" />,
                },
            ],
        },
        form: {
            type: 'normal',
            title: 'Add ne Employee',
            submitKey: 'vendorUserRegistration',
            initialValues: {
                email: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                systemAccessTypeID: '',
                systemRoleID: '',
            },
            modifyData: (data) => ({ ...data, userImage: '', CountryCode: '254' }),
            inputs: [
                {
                    label: 'Access Type',
                    key: 'systemAccessTypeID',
                    type: 'select',
                    validate: true,
                    lookups: systemAccessType?.Data || [],
                    lookupDisplayName: 'SystemAccessTypeName',
                    lookupDisplayValue: 'SystemAccessTypeID',
                },
                {
                    label: 'System Role',
                    key: 'systemRoleID',
                    type: 'select',
                    validate: true,
                    lookups: systemRole?.Data || [],
                    lookupDisplayName: 'SystemRoleName',
                    lookupDisplayValue: 'SystemRoleID',
                },
                { label: 'Fist Name', key: 'firstName', type: 'text', validate: true },
                { label: 'Last Name', key: 'lastName', type: 'text', validate: true },
                { label: 'Email', key: 'email', type: 'text', validate: true },
                { label: 'Phone Number', key: 'phoneNumber', type: 'number', validate: true },
            ],
        },
    });

    return (
        <TablessContainer headerName="Employees" subTitle="Employees management page">
            {UI.render()}
        </TablessContainer>
    );
};

export default Employees;

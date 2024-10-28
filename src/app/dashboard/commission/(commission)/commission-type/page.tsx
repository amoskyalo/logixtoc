'use client';
import { CommissionTypeRange, SystemCommissionType, GetSystemCommissionUserType } from '@/api';
import { useFetch } from '@/hooks';
import { UIConstructor } from '@/UIModel';

type Values = { systemCommissionTypeID: number; systemCommissionUserTypeID: number };
type Delete = { vendorCommissionTypeID: number | string };

const CommisionType = () => {
    const { data: commissionType } = useFetch<SystemCommissionType, void>('getSystemCommissionType');
    const { data: getSystemCommissionUserType } = useFetch<GetSystemCommissionUserType, void>('getSystemCommissionUserType');

    const UI = new UIConstructor<CommissionTypeRange, Values, Delete, void>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorCommissionType',
            deleteUrl: 'removeVendorCommissionType',
            actions: ['delete'],
            initialDeleteParams: { vendorCommissionTypeID: '' },
            columns: [
                { field: 'SystemCommissionUserTypeName', headerName: 'Contact Person', mobileWidth: 200 },
                { field: 'SystemCommissionTypeName', headerName: 'Contact Mail', mobileWidth: 170 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 200 },
                { field: 'AddedByName', headerName: 'Added By', mobileWidth: 170 },
            ],
        },
        form: {
            title: 'Add Commission Type',
            submitKey: 'postVendorCommissionType',
            type: 'normal',
            initialValues: { systemCommissionTypeID: '', systemCommissionUserTypeID: '' },
            inputs: [
                {
                    label: 'Commision Type',
                    type: 'select',
                    key: 'systemCommissionTypeID',
                    lookups: commissionType?.Data || [],
                    lookupDisplayName: 'SystemCommissionTypeName',
                    lookupDisplayValue: 'SystemCommissionTypeID',
                    validate: true,
                },
                {
                    label: 'Commission User Type',
                    type: 'select',
                    key: 'systemCommissionUserTypeID',
                    lookups: getSystemCommissionUserType?.Data || [],
                    lookupDisplayName: 'SystemCommissionUserTypeName',
                    lookupDisplayValue: 'SystemCommissionUserTypeID',
                    validate: true,
                },
            ],
        },
    });

    return UI.render();
};

export default CommisionType;

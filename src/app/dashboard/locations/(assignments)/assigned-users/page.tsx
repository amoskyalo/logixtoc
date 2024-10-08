'use client';

import { useFetch, VendorLocationUserAssignmentRow, VendorUserObjectInterface, APPCRUD } from '@/api';
import { AutoCompleteField } from '@/components/Inputs';
import { getFormikFieldProps } from '@/utils';

type Params = {
    VendorLocationID: number;
};

type FormiValues = {
    vendorLocationID: number;
    usersArray: Array<{
        userID: number;
    }>;
};

type Delete = {
    vendorLocationUserAssignmentID: string | number;
};

const AssignedUsers = () => {
    const { data: vendorUsers } = useFetch<VendorUserObjectInterface, void>('getVendorUsers');

    const UI = new APPCRUD<VendorLocationUserAssignmentRow, FormiValues, Delete, Params>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorLocationUserAssignment',
            deleteUrl: 'deleteVendorLocationUserAssignmentTX',
            initialDeleteParams: { vendorLocationUserAssignmentID: '' },
            params: { VendorLocationID: 0 },
            columns: [
                { field: 'VendorLocationName', headerName: 'Location', mobileWidth: 150 },
                { field: 'UserName', headerName: 'Operator', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 200 },
            ],
        },
        form: {
            type: "normal",
            title: 'Add New User',
            submitKey: 'postVendorLocationUserAssignmentTx',
            initialValues: {
                usersArray: [],
                vendorLocationID: '' as unknown as number,
            },
            modifyData: (data) => ({
                vendorLocationID: data.vendorLocationID,
                usersArray: data.usersArray.map(({ userID }) => ({ userID })),
            }),
            inputs: [
                { label: 'Locations', key: 'vendorLocationID', type: 'singleLocation', validate: true },
                {
                    label: 'Users',
                    key: 'usersArray',
                    type: 'customInput',
                    dataType: 'array',
                    validate: true,
                    renderInput: (formik) => (
                        <AutoCompleteField
                            label="Users"
                            options={(vendorUsers?.Data ?? []).map(({ UserID, FirstName, LastName }) => ({
                                userID: UserID,
                                title: `${FirstName} ${LastName}`,
                            }))}
                            getOptionLabel={(option: any) => option.title}
                            {...getFormikFieldProps(formik, 'usersArray', true)}
                        />
                    ),
                },
            ],
        },
    });

    return UI.render();
};

export default AssignedUsers;

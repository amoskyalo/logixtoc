'use client';

import { AssignedAccountsTable, AssignedAcountsForm } from './_components';
import { useFetch, AssignedAccount, GetUserAccountsParams, VendorAccount } from '@/api';
import { useState } from 'react';

const AssignedAccounts = () => {
    const [open, setOpen] = useState(false);

    const { data: vendorAccounts } = useFetch<VendorAccount, GetUserAccountsParams>('getVendorAccounts', {
        VendorAccountTypeID: 0,
    });

    const {
        data: assignedAccounts,
        isLoading,
        refetch,
        isRefetching,
    } = useFetch<AssignedAccount, { VendorAccountTypeID: number; VendorLocationID: number }>('getAssignedAccounts', {
        VendorAccountTypeID: 0,
        VendorLocationID: 0,
    });

    return (
        <>
            <AssignedAccountsTable
                rows={assignedAccounts?.Data ?? []}
                isLoading={isLoading || isRefetching}
                refetch={refetch}
                onAdd={() => setOpen(true)}
            />

            <AssignedAcountsForm open={open} accounts={vendorAccounts?.Data ?? []} refetch={refetch} onClose={() => setOpen(false)} />
        </>
    );
};

export default AssignedAccounts;

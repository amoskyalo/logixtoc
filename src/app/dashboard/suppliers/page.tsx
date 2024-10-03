'use client';

import { TablessContainer } from '@/components/Containers';
import { APPCRUD, VendorSupplier } from '@/api';
import { StatusChips } from '@/components/Chips';
import { useRouter } from 'next/navigation';

type Values = {
    SupplierMail: string;
    openingBalance: number | string;
    supplierName: string;
    supplierPhone: string;
};

type Delete = { vendorSupplierID: number };

const Suppliers = () => {
    const router = useRouter();

    const handleNavigate = (record: any, route: string) => {
        router.push(`/dashboard/suppliers/${route}?VendorSupplierID=${record.VendorSupplierID}`);
    };

    const UI = new APPCRUD<VendorSupplier, Values, Delete, void>({
        grid: {
            fetchUrl: 'getVendorSupplier',
            deleteUrl: 'removeVendorSupplier',
            initialDeleteParams: { vendorSupplierID: '' as unknown as number },
            actions: ['options'],
            options: [
                { name: 'Purchases', onClick: (record) => handleNavigate(record, 'supplier-purchase') },
                { name: 'Payment', onClick: (record) => handleNavigate(record, 'supplier-payment') },
                { name: 'Statement', onClick: (record) => handleNavigate(record, 'supplier-statement') },
                { name: 'Edit', onClick: () => null },
                {
                    name: 'Delete',
                    onClick: (activeRecord, setDeleteParams, setDeleteOpen) => {
                        setDeleteOpen(true);
                        setDeleteParams(activeRecord.VendorSupplierID);
                    },
                },
            ],
            columns: [
                { field: 'SupplierName', headerName: 'Supplier Name', width: 150 },
                { field: 'SupplierPhone', headerName: 'Supplier Phone', width: 150 },
                { field: 'SupplierMail', headerName: 'Supplier Mail', width: 150 },
                { field: 'BalanceForward', headerName: 'Foward Balance', type: 'number', width: 150 },
                { field: 'Consumption', headerName: 'Purchases', type: 'number', width: 150 },
                { field: 'Payments', headerName: 'Payments', type: 'number', width: 150 },
                { field: 'CurrentBalance', headerName: 'Current Balance', type: 'number', width: 150 },
                {
                    field: 'StatusID',
                    headerName: 'Status',
                    width: 100,
                    renderCell: ({ row: { StatusID } }) => <StatusChips name="Active" statusID={StatusID} />,
                },
            ],
        },
        form: {
            submitKey: 'postVendorSupplierTx',
            title: 'Add Supplier Payment',
            initialValues: { SupplierMail: '', openingBalance: '', supplierName: '', supplierPhone: '' },
            inputs: [
                { label: 'Supplier Name', key: 'supplierName', type: 'text', validate: true },
                { label: 'Supplier Phone', key: 'supplierPhone', type: 'text', validate: true },
                { label: 'Supplier Email', key: 'SupplierMail', type: 'text', validate: true },
                { label: 'Opening Balance', key: 'openingBalance', type: 'number', validate: true },
            ],
        },
    });

    return (
        <TablessContainer headerName="Suppliers" subTitle="Suppliers page">
            {UI.render()}
        </TablessContainer>
    );
};

export default Suppliers;

'use client';

import { useSearchParams } from 'next/navigation';
import { APPCRUD, VendorCustomerNote } from '@/api';
import { TablessContainer } from '@/components/Containers';

type Params = { VendorCustomerID: number; NoteTypeID: number };
type Values = { noteAmount: string; noteDescription: string };
type Delete = { vendorCustomerNoteID: number };

const CustomerNote = ({ params }: { params: { note: string } }) => {
    const VendorCustomerID = useSearchParams().get('VendorCustomerID') as unknown as number;

    const noteTypeID = params.note === 'debit-note' ? 2 : 1;

    const UI = new APPCRUD<VendorCustomerNote, Values, Delete, Params>({
        grid: {
            fetchUrl: 'getVendorCustomerNote',
            deleteUrl: 'removeVendorCustomerNote',
            actions: ['delete'],
            params: { VendorCustomerID, NoteTypeID: noteTypeID },
            initialDeleteParams: { vendorCustomerNoteID: '' as unknown as number },
            columns: [
                { field: 'NoteNO', headerName: 'Note No', mobileWidth: 150 },
                { field: 'NoteDescription', headerName: 'Note Description', mobileWidth: 180 },
                { field: 'AddedByName', headerName: 'Added By', mobileWidth: 150 },
                { field: 'NoteDate', headerName: 'Note Date', mobileWidth: 180 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 180 },
                { field: 'NoteAmount', headerName: 'Note Amount', type: 'number', mobileWidth: 150 },
            ],
        },
        form: {
            title: 'Add New Customer debit Note',
            submitKey: 'addVendorCustomerNote',
            initialValues: { noteAmount: '', noteDescription: '' },
            modifyData(arg) {
                return {
                    ...arg,
                    noteTypeID,
                    vendorCustomerID: VendorCustomerID,
                    dateAdded: new Date().toISOString(),
                    noteDate: new Date().toISOString(),
                };
            },
            inputs: [
                { label: 'Amount', key: 'noteAmount', type: 'number', validate: true },
                { label: 'Description', key: 'noteDescription', type: 'text', validate: true },
            ],
        },
    });

    return (
        <TablessContainer headerName={`Customer ${noteTypeID === 2 ? 'Debit' : 'Credit'} Note`} backURL="/dashboard/customers">
            {UI.render()}
        </TablessContainer>
    );
};

export default CustomerNote;

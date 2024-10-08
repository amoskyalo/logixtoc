import React from 'react';
import { DataGrid } from '@/components/DataGrids';
// import { StatusChips } from '@/components/Chips';
import { Chip, Grid } from '@mui/material';
import { SectionsBox, StockMovementTableInterface } from '.';
import { GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { getIndexedRows } from '@/utils';

const StockMovementTable = ({ loading, rows }: StockMovementTableInterface) => {
    const router = useRouter();
    const renderActionButton = () => {
        return <Chip label="View all" color="secondary" onClick={() => router.push('/dashboard/inventory/stock')} sx={{ width: 75 }} />;
    };

    const columns: GridColDef[] = [
        { field: 'SourceVendorLocationName', headerName: 'Source', flex: 1 },
        { field: 'DestinationVendorLocationName', headerName: 'Destination', flex: 1 },
        { field: 'StockMovementTypeName', headerName: 'Type', flex: 1 },
        // {
        //    field: 'StockMovementStatusID',
        //    headerName: 'Status',
        //    width: 110,
        //    renderCell: ({ row: { StockMovementStatusID, StockMovementStatusName } }) => (
        //       <StatusChips statusID={StockMovementStatusID} name={StockMovementStatusName} />
        //    ),
        // },
    ];

    return (
        <Grid item lg={6} xs={12}>
            <SectionsBox title="Stock movement" renderActionButton={renderActionButton}>
                <DataGrid rows={getIndexedRows(rows)} checkboxSelection={false} columns={columns} loading={loading} hideToolbar hideFooter />
            </SectionsBox>
        </Grid>
    );
};

export default StockMovementTable;

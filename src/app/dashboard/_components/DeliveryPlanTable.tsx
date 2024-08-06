'use client';

import React from 'react';
import { DataGrid } from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { SectionsBox, DeliveryPlanTableInterface } from '.';
import { Chip, Grid } from '@mui/material';
import { StatusChips } from '@/components/Chips';
import { useRouter } from 'next/navigation';
import { useResponsiveness } from '@/hooks';
import { getIndexedRows } from '@/utils';

const DeliveryPlanTable = ({ loading, rows }: DeliveryPlanTableInterface) => {
   const router = useRouter();
   const { isMobile } = useResponsiveness();

   const columns: GridColDef[] = [
      {
         field: 'VendorLocationName',
         headerName: 'Location',
         ...(isMobile ? { width: 150 } : { flex: 1 }),
      },
      {
         field: 'DeliveryPlanTypeName',
         headerName: 'Type',
         ...(isMobile ? { width: 150 } : { flex: 1 }),
      },
      {
         field: 'DeliveryPlanStatusName',
         headerName: 'Status',
         ...(isMobile ? { width: 150 } : { flex: 1 }),
         renderCell: (param) => (
            <StatusChips
               statusID={param.row.DeliveryPlanStatusID}
               name={param.row.DeliveryPlanStatusName}
            />
         ),
      },
   ];

   const renderActionButton = () => {
      return (
         <Chip
            label="View all"
            color="secondary"
            onClick={() => router.push('/dashboard/inventory/planning')}
            sx={{ width: 75 }}
         />
      );
   };

   return (
      <Grid item lg={6} xs={12}>
         <SectionsBox title="Delivery plan" renderActionButton={renderActionButton}>
            <DataGrid
               rows={getIndexedRows(rows)}
               columns={columns}
               loading={loading}
               hideToolbar
               hideFooter
            />
         </SectionsBox>
      </Grid>
   );
};

export default DeliveryPlanTable;

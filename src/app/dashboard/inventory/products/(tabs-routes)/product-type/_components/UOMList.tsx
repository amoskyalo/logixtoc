import React from 'react';
import { DataGrid } from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { VendorProductTypeUOM } from '@/api';
import { FormDialog } from '@/components/Dialogs';
import { getColumnWidth } from '@/utils';
import { useResponsiveness } from '@/hooks';
import { PropsInterface } from './types';

const UOMList = ({ rows, open, onClose }: PropsInterface<VendorProductTypeUOM>) => {
   const { isMobile } = useResponsiveness();

   const columns: GridColDef[] = [
      {
         field: 'VendorProductTypeName',
         headerName: 'Product Type Name',
         sortable: false,
         ...getColumnWidth(200, isMobile),
      },
      {
         field: 'VendorProductUOMName',
         headerName: 'Product UOM Name',
         sortable: false,
         ...getColumnWidth(200, isMobile),
      },
      {
         field: 'VendorProductTypeUOMCode',
         headerName: 'UOM Code',
         sortable: false,
         ...getColumnWidth(150, isMobile),
      },
      {
         field: 'UOMSize',
         headerName: 'UOM Size',
         sortable: false,
         ...getColumnWidth(150, isMobile),
      },
      {
         field: 'UOMTypeName',
         headerName: 'UOM Type Name',
         sortable: false,
         ...getColumnWidth(170, isMobile),
      },
      {
         field: 'DateAdded',
         headerName: 'Date Added',
         sortable: false,
         ...getColumnWidth(170, isMobile),
      },
   ];

   return (
      <FormDialog open={open} title="Product UOM List" onClose={onClose} maxWidth="lg">
         <DataGrid
            columns={columns}
            rows={rows}
            hideFooter
            hideToolbar
            getRowId={(row) => row.VendorProductTypeUOMID}
         />
      </FormDialog>
   );
};

export default UOMList;

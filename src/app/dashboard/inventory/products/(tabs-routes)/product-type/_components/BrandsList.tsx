import React from 'react';
import { VendorProductTypeBrand } from '@/api';
import { DataGrid } from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { getColumnWidth, getIndexedRows } from '@/utils';
import { useResponsiveness } from '@/hooks';
import { PropsInterface } from './types';
import { FormDialog } from '@/components/Dialogs';

const BrandsList = ({ onClose, open, rows }: PropsInterface<VendorProductTypeBrand>) => {
   const { isMobile } = useResponsiveness();

   const columns: GridColDef[] = [
      {
         field: 'ProductClassName',
         headerName: 'Product Class Name',
         sortable: false,
         ...getColumnWidth(170, isMobile),
      },
      {
         field: 'VendorProductBrandName',
         headerName: 'Product Brand Name',
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
      <FormDialog title="Product Brands List" open={open} onClose={onClose} maxWidth="sm">
         <DataGrid rows={getIndexedRows(rows)} columns={columns} hideFooter hideToolbar />
      </FormDialog>
   );
};

export default BrandsList;

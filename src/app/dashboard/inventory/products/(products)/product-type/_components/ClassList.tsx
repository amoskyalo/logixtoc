import React from 'react';
import { PropsInterface } from './types';
import { VendorProductTypeClass } from '@/api';
import { GridColDef } from '@mui/x-data-grid';
import { getColumnWidth, getIndexedRows } from '@/utils';
import { useResponsiveness } from '@/hooks';
import { DataGrid } from '@/components/DataGrids';
import { FormDialog } from '@/components/Dialogs';

const ClassList = ({ rows, onClose, open }: PropsInterface<VendorProductTypeClass>) => {
   const { isMobile } = useResponsiveness();

   const columns: GridColDef[] = [
      {
         field: 'ProductClassName',
         headerName: 'Product Class Name',
         sortable: false,
         ...getColumnWidth(170, isMobile),
      },
      {
         field: 'VendorProductTypeName',
         headerName: 'Product Type Name',
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
      <FormDialog open={open} onClose={onClose} title="Product Class List" maxWidth="sm">
         <DataGrid rows={getIndexedRows(rows)} columns={columns} hideFooter hideToolbar />
      </FormDialog>
   );
};

export default ClassList;

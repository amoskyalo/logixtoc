import { DataGrid, DataGridActions, GridProps } from '@/components/DataGrids';
import { VendorProductCategory } from '@/api';
import { getColumnWidth, getIndexedRows } from '@/utils';
import { GridColDef } from '@mui/x-data-grid';
import { useResponsiveness } from '@/hooks';
import { Popover } from '@/components/Popover';
import { MenuItem } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';

const ProductTypeGrid = ({ rows, isLoading, ...otherProps }: GridProps<VendorProductCategory>) => {
   const { isMobile } = useResponsiveness();

   const [anchorEl, setAnchorEl] = useState(null);
   const [activeRow, setActiveRow] = useState<VendorProductCategory | null>(null);

   const onClose = () => {
      setAnchorEl(null);
   };

   const columns: GridColDef[] = [
      {
         field: 'VendorProductCategoryName',
         headerName: 'Product Category Name',
         ...getColumnWidth(220, isMobile),
      },
      {
         field: 'HasReturn',
         headerName: 'Has Return',
         type: 'boolean',
         valueGetter: (__, row) => row.HasReturn !== '0',
         ...getColumnWidth(170, isMobile),
      },
      {
         field: 'VendorProductCategoryTypeArray',
         headerName: 'Sale Category Count',
         type: 'number',
         valueGetter: (__, row) => row.VendorProductCategoryTypeArray.length,
         ...getColumnWidth(200, isMobile),
      },
      {
         field: 'DateAdded',
         headerName: 'Date Added',
         ...getColumnWidth(170, isMobile),
      },
      {
         field: 'Actions',
         headerName: 'Actions',
         type: 'actions',
         getActions: ({ row }) => [
            <DataGridActions
               key="actions"
               actions={['options']}
               onOptions={(event) => {
                  setActiveRow(row);
                  setAnchorEl(event.currentTarget);
               }}
            />,
         ],
      },
   ];

   return (
      <div>
         <DataGrid
            columns={columns}
            rows={getIndexedRows(rows)}
            loading={isLoading}
            {...otherProps}
         />

         <Popover anchorEl={anchorEl} open={Boolean(anchorEl)} handleClose={onClose}>
            <Link
               href={{
                  query: { VendorProductCategoryID: activeRow?.VendorProductCategoryID },
                  pathname: '/dashboard/inventory/products/product-category/sale-category-type',
               }}
            >
               <MenuItem dense={isMobile}> Sale Category Type</MenuItem>
            </Link>
            {['Edit', 'Delete'].map((item) => (
               <MenuItem dense={isMobile} key={item}>
                  {item}
               </MenuItem>
            ))}
         </Popover>
      </div>
   );
};

export default ProductTypeGrid;

import { DataGrid, DataGridActions, GridProps } from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { useResponsiveness } from '@/hooks';
import { VendorProductCategoryType } from '@/api';
import { getColumnWidth, getIndexedRows } from '@/utils';
import { useState } from 'react';
import { Popover } from '@/components/Popover';
import { MenuItem } from '@mui/material';
import Link from 'next/link';

const SaleCategoryTypeGrid = ({
   rows,
   isLoading,
   ...otherProps
}: GridProps<VendorProductCategoryType>) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [activeRow, setActiveRow] = useState<VendorProductCategoryType | null>(null);

   const { isMobile } = useResponsiveness();

   const onClose = () => {
      setActiveRow(null);
      setAnchorEl(null);
   };

   const columns: GridColDef[] = [
      {
         field: 'VendorProductCategoryTypeName',
         headerName: 'Category Type Name',
         ...getColumnWidth(200, isMobile),
      },
      {
         field: 'VendorProductCategoryName',
         headerName: 'Category Name',
         ...getColumnWidth(170, isMobile),
      },
      {
         field: 'VendorProductUOMName',
         headerName: 'Product UOM Name',
         ...getColumnWidth(200, isMobile),
      },
      {
         field: 'UOMTypeName',
         headerName: 'UOM Type Name',
         ...getColumnWidth(170, isMobile),
      },
      {
         field: 'UOMSize',
         headerName: 'UOM Size',
         type: 'number',
         ...getColumnWidth(120, isMobile),
      },
      {
         field: 'isAdminSaleOnly',
         headerName: 'Admin Sale Only',
         type: 'boolean',
         valueGetter: (__, row) => row.isAdminSaleOnly === 1,
         ...getColumnWidth(170, isMobile),
      },
      {
         field: 'VendorProductCategoryTypeDetailArray',
         headerName: 'Detail Count',
         type: 'number',
         valueGetter: (__, row) => row.VendorProductCategoryTypeDetailArray.length,
         ...getColumnWidth(140, isMobile),
      },
      {
         field: 'Actions',
         headerName: 'Actions',
         type: 'actions',
         getActions: ({ row }) => [
            <DataGridActions
               actions={['options']}
               key="options"
               onOptions={(event) => {
                  setAnchorEl(event.currentTarget);
                  setActiveRow(row);
               }}
            />,
         ],
      },
   ];

   return (
      <div>
         <DataGrid
            rows={getIndexedRows(rows)}
            columns={columns}
            loading={isLoading}
            {...otherProps}
         />

         <Popover open={Boolean(anchorEl)} handleClose={onClose} anchorEl={anchorEl}>
            <Link
               href={{
                  query: {
                     VendorProductCategoryID: activeRow?.VendorProductCategoryID,
                     VendorProductCategoryTypeID: activeRow?.VendorProductCategoryTypeID,
                  },
                  pathname: `/dashboard/inventory/products/product-category/sale-category-type/category-type-detail`,
               }}
            >
               <MenuItem dense={isMobile}>Category Type Detail</MenuItem>
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

export default SaleCategoryTypeGrid;

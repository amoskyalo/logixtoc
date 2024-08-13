import { useState } from 'react';
import { DataGrid, DataGridActions, GridProps } from '@/components/DataGrids';
import { ProductType, useDeleteProductType } from '@/api';
import { GridColDef } from '@mui/x-data-grid';
import { getColumnWidth, getIndexedRows, mutateOptions } from '@/utils';
import { useGetUser, useResponsiveness } from '@/hooks';
import { Popover } from '@/components/Popover';
import { MenuItem } from '@mui/material';
import { DeleteDialog } from '@/components/Dialogs';
import { UOMList, ClassList, BrandsList } from './Dialogs';

const ProductTypeGrid = ({ rows, isLoading, refetch, ...otherProps }: GridProps<ProductType>) => {
   const { isMobile } = useResponsiveness();
   const [anchorEl, setAnchorEl] = useState(null);
   const [loading, setLoading] = useState(false);
   const [activeRow, setActiveRow] = useState<{ type: string; row: ProductType | null }>({
      type: '',
      row: null,
   });

   const { mutate } = useDeleteProductType();
   const { VendorID, UserID: addedBy } = useGetUser();

   const onClose = () => {
      setAnchorEl(null);
      setActiveRow({ type: '', row: null });
   };

   const handleDelete = () => {
      if (activeRow.row) {
         setLoading(true);

         mutate(
            { VendorID, addedBy, vendorProductTypeID: activeRow.row.VendorProductTypeID },
            mutateOptions({ setLoading, refetch, onClose }),
         );
      }
   };

   const columns: GridColDef[] = [
      {
         field: 'id',
         headerName: 'No.',
         sortable: false,
         width: 50,
      },
      {
         field: 'VendorProductTypeName',
         headerName: 'Product Type Name',
         ...getColumnWidth(200, isMobile),
      },
      {
         field: 'VendorProductTypeUOM',
         headerName: 'Product UOM Count',
         type: 'number',
         valueGetter: (__, row) => row.VendorProductTypeUOM.length,
         ...getColumnWidth(200, isMobile),
      },
      {
         field: 'VendorProductTypeClass',
         headerName: 'Product Class Count',
         type: 'number',
         valueGetter: (__, row) => row.VendorProductTypeClass.length,
         ...getColumnWidth(200, isMobile),
      },
      {
         field: 'VendorProductTypeBrand',
         headerName: 'Product Brand Count',
         type: 'number',
         valueGetter: (__, row) => row.VendorProductTypeBrand.length,
         ...getColumnWidth(200, isMobile),
      },
      {
         field: 'DateAdded',
         headerName: 'DateAdded',
         ...getColumnWidth(200, isMobile),
      },
      {
         field: 'actions',
         headerName: 'Actions',
         type: 'actions',
         getActions: ({ row }) => [
            <DataGridActions
               key="actions"
               actions={['options']}
               onOptions={(el) => {
                  setAnchorEl(el.currentTarget);
                  setActiveRow((prev) => ({ ...prev, row }));
               }}
            />,
         ],
      },
   ];

   return (
      <>
         <DataGrid
            rows={getIndexedRows(rows)}
            columns={columns}
            loading={isLoading}
            {...otherProps}
         />

         <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={onClose}>
            {['UOM List', 'Class list', 'Brands list', 'Edit', 'Delete'].map((item) => (
               <MenuItem
                  key={item}
                  sx={{ pr: 6 }}
                  dense={isMobile}
                  onClick={() => {
                     setAnchorEl(null);
                     setActiveRow((prev) => ({ ...prev, type: item.toLowerCase() }));
                  }}
               >
                  {item}
               </MenuItem>
            ))}
         </Popover>

         <DeleteDialog
            open={activeRow.type === 'delete'}
            loading={loading}
            onCancel={onClose}
            onOkay={handleDelete}
         />

         <UOMList
            rows={activeRow?.row?.VendorProductTypeUOM || []}
            open={activeRow.type === 'uom list'}
            onClose={onClose}
         />

         <ClassList
            rows={activeRow?.row?.VendorProductTypeClass || []}
            open={activeRow.type === 'class list'}
            onClose={onClose}
         />

         <BrandsList
            rows={activeRow?.row?.VendorProductTypeBrand || []}
            open={activeRow.type === 'brands list'}
            onClose={onClose}
         />
      </>
   );
};

export default ProductTypeGrid;

'use client';

import { useState } from 'react';
import { AssignedProductsTable, AssignedProductsForm } from './_components';
import { useGetUser } from '@/hooks';
import { useGetAssignedProducts, useGetProductTypes } from '@/api';

const AssignedProducts = () => {
   const [page, setPage] = useState<number>(1);
   const [pageSize, setPageSize] = useState<number>(10);
   const [open, setOpen] = useState<boolean>(false);

   const { VendorID } = useGetUser();
   const { data: vendorProducts } = useGetProductTypes({ VendorID });
   const {
      data: assignedProducts,
      isLoading,
      refetch,
      isRefetching,
   } = useGetAssignedProducts({
      VendorID,
      VendorLocationID: 0,
      PageNO: page,
      PageSize: pageSize,
   });

   return (
      <>
         <AssignedProductsTable
            onAdd={() => setOpen(true)}
            isLoading={isLoading || isRefetching}
            rows={assignedProducts?.Data ?? []}
            refetch={refetch}
            pageNo={page}
            pageSize={pageSize}
            setPageNo={setPage}
            setPageSize={setPageSize}
            count={assignedProducts?.TotalCount}
         />

         <AssignedProductsForm
            open={open}
            onClose={() => setOpen(false)}
            products={vendorProducts?.Data ?? []}
            refetch={refetch}
         />
      </>
   );
};

export default AssignedProducts;

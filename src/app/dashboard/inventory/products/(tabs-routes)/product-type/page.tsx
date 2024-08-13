'use client';

import { useState } from 'react';
import {
   useGetProductTypes,
   useGetProductClass,
   useGetProductUOM,
   useGetVendorProductBrand,
} from '@/api';
import { useGetUser } from '@/hooks';
import { ProductTypeGrid, ProductTypeForm } from './_components';

const ProductType = () => {
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(10);
   const [open, setOpen] = useState(false);

   const { VendorID, VendorTypeID } = useGetUser();
   const {
      data: productTypes,
      isRefetching,
      isFetching,
      refetch,
   } = useGetProductTypes({
      VendorID,
      PageNO: pageSize,
      PageSize: pageSize,
   });

   const { data: productsClass } = useGetProductClass({ VendorID, VendorTypeID });
   const { data: productUOMTypes } = useGetProductUOM({ VendorID });
   const { data: productBrands } = useGetVendorProductBrand({ VendorID });

   return (
      <>
         <ProductTypeGrid
            rows={productTypes?.Data || []}
            isLoading={isRefetching || isFetching}
            pageNo={page}
            setPageNo={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            onAdd={() => setOpen(true)}
            refetch={refetch}
         />

         <ProductTypeForm
            open={open}
            onClose={() => setOpen(false)}
            refetch={refetch}
            productUOMTypes={productUOMTypes?.Data || []}
            productsClass={productsClass?.Data || []}
            productBrands={productBrands?.Data || []}
         />
      </>
   );
};

export default ProductType;

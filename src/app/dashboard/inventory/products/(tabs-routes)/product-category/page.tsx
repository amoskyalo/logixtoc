'use client';

import React from 'react';
import { useGetProductCategory } from '@/api';
import { useGetUser } from '@/hooks';
import { ProductTypeGrid } from './_components';

const ProductCategory = () => {
   const { VendorID } = useGetUser();

   const { data: productCategory, isLoading, isRefetching } = useGetProductCategory({ VendorID });

   return (
      <div>
         <ProductTypeGrid
            rows={productCategory?.Data || []}
            isLoading={isLoading || isRefetching}
            pageSize={20}
         />
      </div>
   );
};

export default ProductCategory;

'use client';

import React from 'react';
import { useFetch, VendorProductCategory } from '@/api';
import { ProductTypeGrid } from './_components';

const ProductCategory = () => {
    const { data: productCategory, isLoading, isRefetching } = useFetch<VendorProductCategory, void>('getVendorProductCategory');

    return (
        <div>
            <ProductTypeGrid rows={productCategory?.Data || []} isLoading={isLoading || isRefetching} pageSize={20} />
        </div>
    );
};

export default ProductCategory;

'use client';

import React, { useState } from 'react';
import { BrandTable, BrandForm } from './_components';
import { useGetUser } from '@/hooks';
import { useFetch, ProductClass, ProductBrand } from '@/api';

const Brand = () => {
    const [open, setOpen] = useState(false);

    const { VendorTypeID } = useGetUser();
    const { data: brands, isLoading, isRefetching, refetch } = useFetch<ProductBrand, void>('getProductBrands');
    const { data: productClass } = useFetch<ProductClass, { VendorTypeID: number }>('getProductClass', { VendorTypeID });

    return (
        <>
            <BrandTable rows={brands?.Data || []} isLoading={isLoading || isRefetching} onAdd={() => setOpen(true)} refetch={refetch} />
            <BrandForm open={open} onClose={() => setOpen(false)} productClass={productClass?.Data || []} refetch={refetch} />
        </>
    );
};

export default Brand;

'use client';

import { useState } from 'react';
import { ProductType as ProductTypeInterface, useFetch, ProductClass, ProductBrand, ProductUOM } from '@/api';
import { useGetUser } from '@/hooks';
import { ProductTypeGrid, ProductTypeForm } from './_components';

const ProductType = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [open, setOpen] = useState(false);

    const { VendorTypeID } = useGetUser();
    
    const {
        data: productTypes,
        isRefetching,
        isFetching,
        refetch,
    } = useFetch<ProductTypeInterface, any>('getVendorProductTypes', {
        PageNO: pageSize,
        PageSize: pageSize,
    });

    const { data: productsClass } = useFetch<ProductClass, { VendorTypeID: number }>('getProductClass', { VendorTypeID });
    const { data: productUOMTypes } = useFetch<ProductUOM, void>('getProductUOM');
    const { data: productBrands } = useFetch<ProductBrand, void>('getProductBrands');

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

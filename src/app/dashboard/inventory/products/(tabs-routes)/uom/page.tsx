'use client';

import React, { useState } from 'react';
import { useFetch, ProductUOMType, ProductUOM } from '@/api';
import { UOMGrid, UOMForm } from './_components';

const UOM = () => {
    const [open, setOpen] = useState(false);

    const { data: UOM, isLoading, isRefetching, refetch } = useFetch<ProductUOM, void>('getProductUOM');
    const { data: productUOMTypes } = useFetch<ProductUOMType, void>('getProductUOMType');

    return (
        <>
            <UOMGrid rows={UOM?.Data || []} isLoading={isLoading || isRefetching} onAdd={() => setOpen(true)} refetch={refetch} />
            <UOMForm open={open} onClose={() => setOpen(false)} refetch={refetch} productUOMTypes={productUOMTypes?.Data || []} />
        </>
    );
};

export default UOM;

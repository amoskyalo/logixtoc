'use client';

import { APPCRUD } from '@/api';
import { useRouter } from 'next/navigation';

const ProductCategory = () => {
    const router = useRouter();

    const UI = new APPCRUD({
        grid: {
            showDates: false,
            hasNew: false,
            fetchUrl: 'getVendorProductCategory',
            actions: ['options'],
            options: [
                { name: 'Sale Category Type', onClick: () => router.push('/dashboard/inventory/products/product-category/sale-category-type') },
                { name: 'Edit', onClick: () => null },
                { name: 'Delete', onClick: () => null },
            ],
            columns: [
                { field: 'VendorProductCategoryName', headerName: 'Product Category Name', mobileWidth: 220 },
                { field: 'HasReturn', headerName: 'Has Return', type: 'boolean', valueGetter: (__, row) => row.HasReturn !== '0', mobileWidth: 170 },
                {
                    field: 'VendorProductCategoryTypeArray',
                    headerName: 'Sale Category Count',
                    type: 'number',
                    valueGetter: (__, row) => row.VendorProductCategoryTypeArray.length,
                    mobileWidth: 200,
                },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 170 },
            ],
        },
    });

    return UI.render();
};

export default ProductCategory;

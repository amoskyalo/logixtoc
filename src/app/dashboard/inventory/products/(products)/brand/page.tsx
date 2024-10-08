'use client';

import { useGetUser } from '@/hooks';
import { useFetch, ProductClass, ProductBrand, APPCRUD } from '@/api';

type DeleteParams = {
    vendorProductBrandID: number | string;
};

type Values = {
    vendorProductBrandName: number;
    productClassID: number;
};

const Brand = () => {
    const { VendorTypeID, UserID: AddedBy } = useGetUser();
    const { data: productClass } = useFetch<ProductClass, { VendorTypeID: number }>('getProductClass', { VendorTypeID });

    const model = new APPCRUD<ProductBrand, Values, DeleteParams, void>({
        grid: {
            showDates: false,
            pagination: false,
            fetchUrl: 'getProductBrands',
            deleteUrl: 'deleteProductsBrand',
            initialDeleteParams: { vendorProductBrandID: '' },
            columns: [
                { field: 'VendorProductBrandName', headerName: 'Brand Name', mobileWidth: 150 },
                { field: 'ProductClassName', headerName: 'Class Name', mobileWidth: 150 },
                { field: 'TotalProducts', headerName: 'Total Products', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 150 },
            ],
        },
        form: {
            type: "normal",
            title: 'Add Product Brand',
            modifyData: (data: any) => ({ ...data, AddedBy }),
            initialValues: { productClassID: '' as unknown as number, vendorProductBrandName: '' },
            submitKey: 'postProductsBrand',
            inputs: [
                { label: 'Product Brand Name', key: 'vendorProductBrandName', type: 'text', validate: true },
                {
                    label: 'Product Class',
                    key: 'productClassID',
                    validate: true,
                    lookups: productClass?.Data ?? [],
                    type: 'select',
                    lookupDisplayName: 'ProductClassName',
                    lookupDisplayValue: 'ProductClassID',
                },
            ],
        },
    });

    return model.render();
};

export default Brand;

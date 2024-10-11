'use client';

import { TablessContainer } from '@/components/Containers';
import { APPCRUD, VendorProductPriceDetail, useFetch, VendorProductCategoryType } from '@/api';
import { useSearchParams } from 'next/navigation';
import { AutoCompleteField } from '@/components/Inputs';
import { getFormikFieldProps } from '@/utils';
import { useResponsiveness } from '@/hooks';

type Params = { VendorPriceNO: string };
type Delete = { vendorProductPriceDetailID: number | string };
type Values = {
    vendorProductCategoryTypeID: number | string;
    productPrice: number;
    brandArray: any[];
};

const PriceDetails = () => {
    const VendorPriceNO = useSearchParams().get('VendorPriceNO') as string;
    const { isMobile } = useResponsiveness();
    const { data: productCategoryType } = useFetch<VendorProductCategoryType, void>('getVendorProductCategoryType');

    const UI = new APPCRUD<VendorProductPriceDetail, Values, Delete, Params>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorProductPriceDetail',
            deleteUrl: 'removeVendorPriceDetail',
            actions: ['delete'],
            params: { VendorPriceNO },
            initialDeleteParams: { vendorProductPriceDetailID: '' },
            columns: [
                { field: 'VendorPriceNO', headerName: 'Price Number', mobileWidth: 150 },
                { field: 'VendorProductBrandName', headerName: 'Product Brand Name', mobileWidth: 200 },
                { field: 'VendorProductCategoryTypeName', headerName: 'Product Category Type Name', width: 230 },
                { field: 'VendorProductUOMName', headerName: 'Product UOM Name', mobileWidth: 190, type: 'number' },
                { field: 'UOMSize', headerName: 'UOM Size', type: 'number', width: isMobile ? 130 : 100 },
                { field: 'ProductPrice', headerName: 'Product Price', type: 'number', width: isMobile ? 150 : 120 },
            ],
        },
        form: {
            type: 'normal',
            submitKey: 'postVendorPriceDetail',
            title: 'Add New Price History',
            initialValues: { vendorProductCategoryTypeID: '', productPrice: '', brandArray: [] },
            modifyData: ({ brandArray, ...rest }) => ({
                VendorPriceNO,
                postVendorPriceModelDetailArray: [
                    {
                        brandArray: brandArray.map((item) => ({ vendorProductTypeBrandID: item.VendorProductTypeBrandID })),
                        ...rest,
                    },
                ],
            }),
            inputs: [
                {
                    label: 'product Category',
                    key: 'vendorProductCategoryTypeID',
                    type: 'select',
                    validate: true,
                    lookups: productCategoryType?.Data || [],
                    lookupDisplayName: 'VendorProductCategoryTypeName',
                    lookupDisplayValue: 'VendorProductCategoryID',
                },
                {
                    label: 'Product Type Brand',
                    key: 'brandArray',
                    type: 'customInput',
                    validate: true,
                    dataType: 'array',
                    renderInput: (formik) => (
                        <AutoCompleteField
                            options={
                                productCategoryType?.Data.find(
                                    (item) => item.VendorProductCategoryTypeID === formik.values.vendorProductCategoryTypeID,
                                )?.VendorProductCategoryTypeBrandArray || []
                            }
                            getOptionLabel={(option: any) => option.VendorProductBrandName}
                            label="Product Type Brands"
                            {...getFormikFieldProps(formik, 'brandArray', true)}
                            disabled={formik.values.vendorProductCategoryTypeID === ''}
                        />
                    ),
                },
                { label: 'Product Price', key: 'productPrice', type: 'number', validate: true },
            ],
        },
    });

    return (
        <TablessContainer headerName="Price Details" backURL="/dashboard/finance/product-prices">
            {UI.render()}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        </TablessContainer>
    );
};

export default PriceDetails;

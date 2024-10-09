'use client';

import { TablessContainer } from '@/components/Containers';
import { APPCRUD, useFetch, VendorProductCategoryType, VendorCustomerCategory, VendorProductPrice } from '@/api';
import { StatusChips } from '@/components/Chips';
import { AutoCompleteField } from '@/components/Inputs';
import { getFormikFieldProps } from '@/utils';
import { useRouter } from 'next/navigation';

type Values = {
    vendorProductCategoryTypeID: number | string;
    vendorCustomerCategoryID: number | string;
    productPrice: number;
    brandArray: any[];
};

const ProductPrices = () => {
    const router = useRouter();

    const { data: productCategoryType } = useFetch<VendorProductCategoryType, void>('getVendorProductCategoryType');
    const { data: customerCategory } = useFetch<VendorCustomerCategory, void>('getVendorCustomerCategory');

    const handleNavigate = (route: string, activeRecord: any) => {
        router.push(`/dashboard/finance/product-prices/${route}?VendorPriceNO=${activeRecord.VendorPriceNO}`);
    };

    const UI = new APPCRUD<VendorProductPrice, Values, void, void>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorPriceHistory',
            actions: ['options'],
            options: [
                { name: 'Price Details', onClick: (activeRecord) => handleNavigate('price-details', activeRecord) },
                { name: 'Region Pricing', onClick: (activeRecord) => handleNavigate('region-pricing', activeRecord) },
                { name: 'Delete' },
            ],
            columns: [
                { field: 'VendorPriceNO', headerName: 'Price Number', mobileWidth: 170},
                { field: 'regionsCount', headerName: 'Regions Count', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Started', mobileWidth: 150 },
                { field: 'DateClosed', headerName: 'Date Closed', mobileWidth: 150 },
                { field: 'AddedByName', headerName: 'Added By', mobileWidth: 150 },
                {
                    field: 'VendorProductPriceStatusID',
                    headerName: 'Status',
                    width: 100,
                    renderCell: ({ row: { VendorProductPriceStatusID, VendorProductPriceStatusName } }) => (
                        <StatusChips name={VendorProductPriceStatusName} statusID={VendorProductPriceStatusID} />
                    ),
                },
            ],
        },
        form: {
            type: 'normal',
            submitKey: 'postVendorPriceTx',
            title: 'Add New Price History',
            initialValues: { vendorProductCategoryTypeID: '', vendorCustomerCategoryID: '', productPrice: '', brandArray: [] },
            modifyData: ({ brandArray, ...rest }) => ({
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
                {
                    label: 'Customer Category',
                    key: 'vendorCustomerCategoryID',
                    type: 'select',
                    validate: true,
                    lookups: customerCategory?.Data || [],
                    lookupDisplayName: 'VendorCustomerCategoryName',
                    lookupDisplayValue: 'VendorCustomerCategoryID',
                },
                { label: 'Product Price', key: 'productPrice', type: 'number', validate: true },
            ],
        },
    });

    return (
        <TablessContainer headerName="Product Prices" subTitle="Manage product prices from this page">
            {UI.render()}
        </TablessContainer>
    );
};

export default ProductPrices;

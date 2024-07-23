import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosPrivate, urls, GetRes, GetParams, MutateParams } from "@/api";

export type ProductType = {
    VendorProductTypeID: number;
    VendorID: number;
    VendorProductTypeName: string;
    StatusID: number;
    DateAdded: string;
    VendorProductTypeUOM: any[];
    VendorProductTypeClass: any[];
    VendorProductTypeBrand: any[];
};

export type ProductClass = {
    ProductClassID: number;
    ProductClassName: string;
};

export type GetProductTypesRes = GetRes & { Data: ProductType[] };

export const useGetProductTypes = ({ VendorID, PageNO, PageSize }: GetParams) => (
    useQuery<GetProductTypesRes>({
        queryKey: ['productTypes', VendorID, PageNO, PageSize],
        queryFn: async () => {
            const res = await axiosPrivate.get(urls.getVendorProductTypes, {
                params: { VendorID, PageNO, PageSize }
            });

            return res.data
        },
    })
);

export const useGetProductClass = ({ VendorID, VendorTypeID }: GetParams & { VendorTypeID: number }) => (
    useQuery<GetRes & { Data: ProductClass[] }>({
        queryKey: ['procustClass', VendorID, VendorTypeID],
        queryFn: async () => (
            await axiosPrivate.get(urls.getProductClass, {
                params: { VendorID, VendorTypeID }
            })
        ).data
    })
);

// ====================================================================================

export type ProductBrand = {
    VendorProductBrandID: number;
    VendorID: number;
    VendorProductBrandName: string;
    ProductClassName: string;
    ProductClassID: number;
    StatusID: number;
    DateAdded: string;
};

export const useGetVendorProductBrand = ({ VendorID }: GetParams) => (
    useQuery<GetRes & { Data: ProductBrand[] }>({
        queryKey: ['brand', VendorID],
        queryFn: async () => (
            await axiosPrivate.get(urls.getProductBrands, {
                params: { VendorID }
            })
        ).data
    })
);

export const useAddVendorProductBrand = () => (
    useMutation({
        mutationFn: async (data: { VendorID: number, AddedBy: number, productClassID: number, vendorProductBrandName: string }) => (
            await axiosPrivate.post(urls.postProductsBrand, data)
        )
    })
);

export const useDeleteVendorProductBrand = () => (
    useMutation({
        mutationFn: async (data: { vendorProductBrandID: number | string, VendorID: number, addedBy: number }) => (
            await axiosPrivate.post(urls.deleteProductsBrand, data)
        )
    })
)
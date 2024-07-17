import { useQuery } from "@tanstack/react-query";
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
)
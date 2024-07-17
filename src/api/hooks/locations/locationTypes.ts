import { urls, axiosPrivate, GetParams, GetRes, MutateParams } from "@/api";
import { useQuery, useMutation } from "@tanstack/react-query";

export type SystemLocationType = {
    LocationTypeID: number;
    VendorID: number;
    LocationTypeName: string;
};

export type VendorLocationType = {
    VendorLocationTypeID: number;
    VendorID: number;
    VendorLocationTypeName: string;
    AddedByName: string;
    LocationTypeName: string;
    LocationTypeID: number;
    StatusID: number;
    DateAdded: string;
    LocationArray: any[];
}

export type VendorLocationRes = GetRes & {
    Data: VendorLocationType[]
}

export type SystemLocationTypeRes = GetRes & { Data: SystemLocationType[] }

export type VendorLocationDeleteParams = MutateParams & {
    vendorLocationTypeID: number | string
}

export type VendorLocationPostParams = MutateParams & {
    locationTypeID: number,
    vendorLocationTypeName: string
}

export const useGetVendorLocationTypes = ({ VendorID }: GetParams) => (
    useQuery<VendorLocationRes>({
        queryKey: ["vendorLocationTypes", VendorID],
        queryFn: async () => (
            await axiosPrivate.get(urls.getVendorLocationType, {
                params: { VendorID }
            })
        ).data
    })
);

export const useDeleteVendorLocationTypes = () => (
    useMutation({
        mutationFn: async (data: VendorLocationDeleteParams) => (
            await axiosPrivate.post(urls.deleteVendorLocationType, data)
        )
    })
);

export const usePostVendorLocationType = () => (
    useMutation({
        mutationFn: async (data: VendorLocationPostParams) => (
            await axiosPrivate.post(urls.postVendorLocationType, data)
        )
    })
);

export const useGetSystemLocationTypes = ({ VendorID }: GetParams) => (
    useQuery<SystemLocationTypeRes>({
        queryKey: ["systemLocationTypes", VendorID],
        queryFn: async () => (
            await axiosPrivate.get(urls.getSystemLocationType, {
                params: { VendorID }
            })
        ).data
    })
);
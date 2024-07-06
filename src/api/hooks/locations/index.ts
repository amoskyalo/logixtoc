import { urls, axiosPrivate } from "@/api";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface GetParams {
    PageSize?: number;
    PageNO?: number;
    VendorID: number;
};

export type LocationsArrayInterface = {
    VendorLocationID: number;
    VendorLocationName: string;
    VendorLocationTypeName: string;
    AddedByName: string;
    DateAdded: string;
    VendorLocationStatusID: number;
    VendorLocationStatusName: string;
    AssignedLocationArray: any[];
    AssignedUsersArray: any[];
    LocationProductTypeArray: any[];
    LocationAccountsArray: any[];
}
export type LocationsInterface = {
    Error: boolean;
    Message: string;
    Page: number;
    PageSize: number;
    StatusCode: number;
    TotalCount: number;
    Data: Array<LocationsArrayInterface>
};

export type GetVendorLocationParams = {
    VendorLocationTypeID: number;
} & GetParams

export const useGetVendorLocation = (
    { VendorID, VendorLocationTypeID, PageNO, PageSize }: GetVendorLocationParams
) => (
    useQuery<LocationsInterface>({
        queryKey: ['vendorLocation', VendorLocationTypeID, PageNO, PageSize, VendorID],
        queryFn: async () => {
            const res = await axiosPrivate.get(urls.getVendorLocation, {
                params: { VendorID, VendorLocationTypeID, PageNO, PageSize }
            });

            return res.data
        },
    })
);

export type DeleteParamsInterface = {
    VendorID: number;
    addedBy: number;
    vendorLocationID: number | string;
};

export const useDeleteVendorLocation = () => (
    useMutation({
        mutationFn: async (data: DeleteParamsInterface) => {
            console.log(data);
            return axiosPrivate.post(urls.deleteVendorLocation, data);
        },
    })
);

// ========================================================================================
export type VendorLocationUserAssignmentRow = {
    VendorLocationUserAssignmentID: number;
    UserID: number;
    VendorLocationID: number;
    VendorLocationName: string;
    VendorLocationTypeName: string;
    UserName: string;
    DateAdded: Date;
}

export type VendorLocationUserAssignmentResp = {
    Error: boolean;
    Message: string;
    Page: number;
    PageSize: number;
    StatusCode: number;
    TotalCount: number;
    Data: VendorLocationUserAssignmentRow[]
};

export type GetVendorLocationUserAssignmentParams = GetParams & {
    VendorLocationID: number
};

export type PostVendorLocationUserAssignment = {
    VendorID: number;
    addedBy: number;
    vendorLocationID: number;
    usersArray: Array<{
        userID: number;
    }>
};

export type DeleteVendorLocationUserData = {
    VendorID: number;
    addedBy: number;
    vendorLocationUserAssignmentID: number | string;
}

export const useGetVendorLocationUserAssignment = ({
    VendorID, PageNO, PageSize, VendorLocationID
}: GetVendorLocationUserAssignmentParams) => (
    useQuery<VendorLocationUserAssignmentResp>({
        queryKey: [
            'VendorLocationUserAssignment',
            VendorID,
            PageNO,
            PageSize,
            VendorLocationID
        ],
        queryFn: async () => {
            const res = await axiosPrivate.get(urls.getVendorLocationUserAssignment, {
                params: { VendorID, PageNO, PageSize, VendorLocationID }
            });

            return res.data
        },
    })
)

export const usePostVendorLocationUserAssignmentTx = () => (
    useMutation({
        mutationFn: async (data: PostVendorLocationUserAssignment) => {
            return await axiosPrivate.post(urls.postVendorLocationUserAssignmentTx, data)
        }
    })
)

export const useDeleteVendorLocationUserAssignement = () => {
    return useMutation({
        mutationFn: async (data: DeleteVendorLocationUserData) => {
            return await axiosPrivate.post(urls.deleteVendorLocationUserAssignmentTX, data)
        },
    })
}
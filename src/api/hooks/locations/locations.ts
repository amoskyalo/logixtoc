import { urls, axiosPrivate, GetParams, GetRes, MutateParams } from "@/api";
import { useQuery, useMutation } from "@tanstack/react-query";

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

export type LocationsInterface = GetRes & {
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

export type DeleteParamsInterface = MutateParams & {
    vendorLocationID: number | string;
};

export const useDeleteVendorLocation = () => (
    useMutation({
        mutationFn: async (data: DeleteParamsInterface) => {
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

export type VendorLocationUserAssignmentResp = GetRes & {
    Data: VendorLocationUserAssignmentRow[]
};

export type GetVendorLocationUserAssignmentParams = GetParams & {
    VendorLocationID: number
};

export type PostVendorLocationUserAssignment = MutateParams & {
    vendorLocationID: number;
    usersArray: Array<{
        userID: number;
    }>
};

export type DeleteVendorLocationUserData = MutateParams & {
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

// ========================================================================================
export type AssignedLocationObject = {
    VendorLocationAssignmentID: number;
    VendorLocationID: number;
    VendorLocationName: string;
    VendorLocationTypeName: string;
    AssignedVendorLocationID: number;
    AssignedVendorLocationName: string;
    AssignedVendorLocationTypeName: string;
    DateAdded: string;
    StatusID: number;
    AddedByName: string;
}

export type AssignedLocationsRes = GetRes & {
    Data: AssignedLocationObject[];
}

export type AssignedLocationsGetParams = GetParams & { VendorLocationID: number }

export type PostAssignedLocationsData = {
    VendorID: number;
    addedBy: number;
    vendorLocationID: number;
    locationsArray: Array<{ assignedVendorLocationID: number }>
};

export type DeleteAssignedLocationParams = MutateParams & {
    vendorLocationAssignmentID: number | string;
};

export const useGetVendorAssignedLocations = ({
    VendorID, PageNO, PageSize, VendorLocationID
}: AssignedLocationsGetParams) => (
    useQuery<AssignedLocationsRes>({
        queryKey: ["assignedLocations", VendorID, PageNO, PageSize, VendorLocationID],
        queryFn: async () => {
            const res = await axiosPrivate.get(urls.getVendorLocationAssignedLocation, {
                params: { VendorID, PageNO, PageSize, VendorLocationID },
            });

            return res.data
        }
    })
);

export const usePostAssignedLocations = () => (
    useMutation({
        mutationFn: async (data: PostAssignedLocationsData) => {
            return axiosPrivate.post(urls.postAssignedLocations, data);
        },
    })
);

export const useDeleteAssignedLocation = () => (
    useMutation({
        mutationFn: async (data: DeleteAssignedLocationParams) => {
            return axiosPrivate.post(urls.deleteAssignedLocation, data)
        }
    })
);

// ========================================================================================
export type AssignedProductInterface = {
    VendorLocationProductTypeID: number;
    VendorProductTypeID: number;
    VendorProductTypeName: string;
    VendorLocationID: number;
    VendorLocationName: string;
    StatusID: number;
    DateAdded: string;
};

export type AssignedProductRes = GetRes & {
    Data: AssignedProductInterface[]
};

export type GetAssignedProductsParams = GetParams & { VendorLocationID: number };

export type DeleteAssignedProductsParams = MutateParams & {
    vendorLocationProductTypeID: number | string
};

export type PostAssignedProductsParams = MutateParams & {
    vendorLocationID: number,
    productTypeArray: Array<{
        vendorProductTypeID: number
    }>
}

export const useGetAssignedProducts = ({
    VendorID, VendorLocationID, PageNO, PageSize
}: GetAssignedProductsParams) => {
    return useQuery<AssignedProductRes>({
        queryKey: ["assignedProducts", VendorID, VendorLocationID, PageNO, PageSize],
        queryFn: async () => {
            const res = await axiosPrivate.get(urls.getAssignedProducts, {
                params: { VendorID, VendorLocationID, PageNO, PageSize }
            });

            return res.data
        }
    })
};

export const useDeleteAssignedProducts = () => (
    useMutation({
        mutationFn: async (data: DeleteAssignedProductsParams) => {
            return await axiosPrivate.post(urls.deleteAssignedProducts, data);
        },
    })
);

export const usePostAssignedProducts = () => (
    useMutation({
        mutationFn: async (data: PostAssignedProductsParams) => (
            await axiosPrivate.post(urls.postAssignedProducts, data)
        )
    })
)
// ========================================================================================

export type AssignedRegionObjInterface = {
    VendorRegionLocationAssignmentID: number;
    VendorRegionID: number;
    VendorRegionName: string;
    VendorLocationID: number;
    VendorLocationName: string;
    DateAdded: string;
};

export type AssignedRegionsRes = GetRes & { Data: AssignedRegionObjInterface[] };

export type GetAssignedRegionsParams = GetParams & {
    VendorLocationID: number;
    VendorRegionID: number;
}

export type DeleteAssignedRegionsParams = MutateParams & {
    vendorLocationID: number | string;
    vendorRegionID: number | string;
}

export type PostAssignedRegionsParams = MutateParams & {
    vendorRegionID: number;
    vendorLocationArrays: Array<{ vendorLocationID: number }>
};

export const useGetAssignedRegions = ({
    VendorID, PageNO, PageSize, VendorLocationID, VendorRegionID
}: GetAssignedRegionsParams) => {
    return useQuery<AssignedRegionsRes>({
        queryKey: ['assignedRegions', VendorID, PageNO, PageSize, VendorLocationID, VendorRegionID],
        queryFn: async () => {
            const res = await axiosPrivate.get(urls.getAssignedRegions, {
                params: {
                    VendorID, PageNO, PageSize, VendorLocationID, VendorRegionID
                }
            });

            return res.data
        },
    })
};

export const useDeleteAssignedRegions = () => {
    return useMutation({
        mutationFn: async (data: DeleteAssignedRegionsParams) => (
            await axiosPrivate.post(urls.deleteAssignedRegions, data)
        )
    })
};

export const usePostAssignedRegions = () => (
    useMutation({
        mutationFn: async (data: PostAssignedRegionsParams) => (
            await axiosPrivate.post(urls.postAssignedRegions, data)
        )
    })
);

// ========================================================================================
export type AssignedAccount = {
    VendorAccountAssignmentID: number;
    VendorAccountID: number;
    VendorAccountTypeName: string;
    VendorLocationID: number;
    VendorLocationName: string;
    VendorAccountTypeLogo: string;
    VendorAccountName: string;
    VendorAccountNO: string;
    Description: string;
    isShared: number;
    isIntegrated: number;
    DateAdded: string;
    AddedByName: string;
}

export type GetAssignedAccounts = GetParams & {
    VendorAccountTypeID: number;
    VendorLocationID: number;
}

export type AssignedAccountsRes = GetRes & {
    Data: AssignedAccount[];
}

export type DeleteAssignedParams = MutateParams & {
    vendorAccountID: string | number;
    vendorLocationID: string | number;
};

export type PostAssignedAccParams = MutateParams & {
    vendorLocationID: number,
    vendorAccountArray: Array<{
        vendorAccountID: number;
    }>
}

export const useGetAssignedAccounts = ({
    VendorID, PageNO, PageSize, VendorAccountTypeID, VendorLocationID
}: GetAssignedAccounts) => (
    useQuery<AssignedAccountsRes>({
        queryKey: ['asssignedaccounts', VendorID, PageNO, PageSize, VendorAccountTypeID, VendorLocationID],
        queryFn: async () => (
            await axiosPrivate.get(urls.getAssignedAccounts, {
                params: { VendorID, PageNO, PageSize, VendorAccountTypeID, VendorLocationID }
            })
        ).data
    })
);

export const useDeleteAssignedAccount = () => (
    useMutation({
        mutationFn: async (data: DeleteAssignedParams) => (
            await axiosPrivate.post(urls.deleteAssignedAccount, data)
        )
    })
);

export const usePostAssignedAccount = () => (
    useMutation({
        mutationFn: async (data: PostAssignedAccParams) => (
            await axiosPrivate.post(urls.postAssignedAccount, data)
        )
    })
)
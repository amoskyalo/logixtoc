import { urls, axiosPrivate } from "@/api";
import { useQuery } from "@tanstack/react-query";

export type HRParams = {
    PageNo?: number;
    PageSize?: number;
    VendorID: number;
}

export type CommonResTypes = {
    Error: string;
    StatusCode: number;
    Message: string;
    TotalCount: number;
    Page: number;
    PageSize: number;
};

export type UserSystemRolePolicyInterface = {
    ID: number;
    SystemPolicyName: string;
    EndPointDescription: string;
}

export type VendorUserObjectInterface = {
    VendorUserID: number;
    UserID: number;
    SystemAccessTypeID: number;
    SystemAccessTypeName: string;
    SystemRoleID: number;
    SystemRoleName: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Email: string;
    AddedByName: string;
    StatusID: number;
    DateAdded: string;
    UserSystemRolePolicyArray: UserSystemRolePolicyInterface[]
}

export type GetVendorUsersInterface = CommonResTypes & {
    Data: VendorUserObjectInterface[]
};

export type GetUsersParams = HRParams & {
    SystemRoleID?: number;
}

export const useGetVendorUsers = ({ VendorID, SystemRoleID, PageNo, PageSize }: GetUsersParams) => (
    useQuery<GetVendorUsersInterface>({
        queryKey: ['vendorUsers', VendorID, SystemRoleID, PageNo, PageSize],
        queryFn: async () => {
            const res = await axiosPrivate.get(urls.getVendorUsers, {
                params: { VendorID, SystemRoleID, PageNo, PageSize }
            });

            return res.data
        },
    })
)
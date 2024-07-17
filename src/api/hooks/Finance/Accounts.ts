import { useQuery } from "@tanstack/react-query";
import { urls, axiosPrivate, GetParams, GetRes } from "@/api";

export type VendorAssignedAccount = {
    VendorAccountID: number;
    VendorLocationName: string;
    VendorAccountTypeName: string;
    VendorAccountTypeLogo: string;
    StatusID: number;
    DateAdded: string;
    AddedByName: string;
};

export type VendorAccount = {
    VendorAccountID: number;
    VendorAccountTypeName: string;
    VendorAccountTypeLogo: string;
    VendorAccountName: string;
    VendorAccountNO: string;
    Description: string;
    isShared: number;
    isAdminOnly: number;
    isIntegrated: number;
    DateAdded: string;
    AddedByName: string;
    AssignmentArray: VendorAssignedAccount[];
};

export type UserAccountsRes = GetRes & {
    Data: VendorAccount[]
};

export type GetUserAccountsParams = GetParams & {
    VendorAccountTypeID: number;
    StartDate?: string;
    EndDate?: string;
};

export const useGetVendorAccounts = ({
    VendorID, VendorAccountTypeID, StartDate, EndDate, PageNO, PageSize
}: GetUserAccountsParams) => (
    useQuery<UserAccountsRes>({
        queryKey: ['vendorAccounts', VendorID, VendorAccountTypeID, StartDate, EndDate, PageNO, PageSize],
        queryFn: async () => (
            await axiosPrivate.get(urls.getVendorAccounts, {
                params: { VendorID, VendorAccountTypeID, StartDate, EndDate, PageNO, PageSize }
            })
        ).data
    })
)
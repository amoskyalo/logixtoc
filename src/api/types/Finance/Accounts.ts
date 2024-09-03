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

export type GetUserAccountsParams =  {
    VendorAccountTypeID: number;
    StartDate?: string;
    EndDate?: string;
};

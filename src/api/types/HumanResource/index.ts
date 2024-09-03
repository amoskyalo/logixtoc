export type HRParams = {
    PageNo?: number;
    PageSize?: number;
    VendorID: number;
};

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
};

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
    UserSystemRolePolicyArray: UserSystemRolePolicyInterface[];
};

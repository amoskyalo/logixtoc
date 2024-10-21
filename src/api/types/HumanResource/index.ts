export * from './UserWallet';
export * from './LeaveRequest';
export interface UserSystemRolePolicyInterface {
    ID: number;
    SystemPolicyName: string;
    EndPointDescription: string;
}
export interface VendorUserObjectInterface {
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
}
export interface CommissionTypeRange {
    SystemCommissionUserTypeName: string;
    SystemCommissionUserTypeID: number;
    SystemCommissionTypeName: string;
    Description: string;
    IsProductCommission: number;
    SystemCommissionTypeID: number;
    VendorCommissionTypeID: number;
    StatusID: number;
    DateAdded: string;
}
export interface SystemCommissionType {
    SystemCommissionTypeName: string;
    Description: string;
    IsProductCommission: number;
    SystemCommissionTypeID: number;
}
export interface GetSystemCommissionUserType {
    SystemCommissionUserTypeName: string;
    SystemCommissionUserTypeID: number;
}
export interface SystemAccessType {
    SystemAccessTypeID: string;
    SystemAccessTypeName: string;
}
export interface SystemRole {
    SystemRoleID: number;
    SystemRoleName: string;
    SystemRolePolicyArray: any[];
}

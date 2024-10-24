import { VendorAccount } from './Accounts';

export interface AccountType {
    AccountTypeID: number;
    AccountTypeName: string;
}

export interface VendorAccountAssignment {
    VendorAccountID: number;
    VendorLocationName: string;
    VendorAccountTypeName: string;
    VendorAccountTypeLogo: string;
    StatusID: number;
    DateAdded: string;
    AddedByName: string;
}

export type VendorAccountType = {
    VendorAccountTypeID: number;
    VendorAccountTypeName: string;
    VendorAccountTypeLogo: string;
    AddedByName: string;
    AccountTypeID: number;
    AccountTypeName: string;
    StatusID: number;
    DateAdded: string;
    AccountsArray: VendorAccount[];
}

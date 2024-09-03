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
};

export type VendorLocationUserAssignmentRow = {
    VendorLocationUserAssignmentID: number;
    UserID: number;
    VendorLocationID: number;
    VendorLocationName: string;
    VendorLocationTypeName: string;
    UserName: string;
    DateAdded: Date;
};

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
};

export type AssignedProductInterface = {
    VendorLocationProductTypeID: number;
    VendorProductTypeID: number;
    VendorProductTypeName: string;
    VendorLocationID: number;
    VendorLocationName: string;
    StatusID: number;
    DateAdded: string;
};

export type AssignedRegionObjInterface = {
    VendorRegionLocationAssignmentID: number;
    VendorRegionID: number;
    VendorRegionName: string;
    VendorLocationID: number;
    VendorLocationName: string;
    DateAdded: string;
};

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
};

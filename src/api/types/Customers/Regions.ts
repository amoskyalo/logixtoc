export type VendorRegionBranch = {
    VendorRegionBranchID: number;
    VendorRegionID: number;
    VendorRegionBranchName: string;
    VendorRegionName: string;
    AddedBy: number;
    DateAdded: string;
    StatusID: number;
}

export type VendorRegionLocationAssignment = {
    VendorRegionLocationAssignmentID: number;
    VendorRegionID: number;
    VendorRegionName: string;
    VendorLocationID: number;
    VendorLocationName: string;
    DateAdded: string;
}

export type VendorRegion = {
    VendorRegionID: number;
    VendorRegionName: string;
    DateAdded: string;
    TotalAsset: number;
    StatusID: number;
    TotalBranches: number;
    BranchArray: VendorRegionBranch[];
    AssetsArray: VendorRegionLocationAssignment[];
}
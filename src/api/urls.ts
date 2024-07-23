export const urls = {
    getUser: "Users/UserLogin",
    getVendorDashboard: "DashBoard/GetVendorMainDashBoard",

    //locations
    getVendorLocation: "Location/GetVendorLocation",
    deleteVendorLocation: "Location/RemoveVendorLocation",

    //assigned users
    getVendorLocationUserAssignment: "Location/GetVendorLocationUserAssignment",
    postVendorLocationUserAssignmentTx: "Location/PostVendorLocationUserAssignmentTx",
    deleteVendorLocationUserAssignmentTX: "Location/RemoveVendorLocationUserAssignmentTx",

    //assigned locations
    getVendorLocationAssignedLocation: "Location/GetVendorLocationAssignedLocation",
    postAssignedLocations: "Location/PostVendorLocationAssignLocation",
    deleteAssignedLocation: "Location/RemoveVendorLocationAssignLocation",

    //asigned products
    getAssignedProducts: "Location/GetVendorLocationProductType",
    postAssignedProducts: "Location/PostVendorLocationProductType",
    deleteAssignedProducts: "Location/RemoveVendorLocationProductType",

    //asigned regions
    getAssignedRegions: "Location/GetVendorRegionLocationAssignment",
    deleteAssignedRegions: "Location/RemoveVendorRegionLocationAssignment",
    postAssignedRegions: "Location/PostVendorRegionLocationAssignment",

    //asigned accounts
    getAssignedAccounts: "Location/GetVendorAccountLocationAssignment",
    deleteAssignedAccount: "Location/RemoveVendorAccountLocationAssignment",
    postAssignedAccount: "Location/PostVendorAccountLocationAssignment",

    //location types
    getVendorLocationType: "Location/GetVendorLocationType",
    deleteVendorLocationType: "Location/RemoveVendorLocationType",
    postVendorLocationType: "Location/PostVendorLocationType",
    getSystemLocationType: "Location/GetLocationType",

    //planning
    getDeliveryPlanHistory: "Planning/GetVendorDeliveryPlanHistory",

    //stock-movement
    getStockMovementHistory: "/Stock/GetVendorStockMovementHistory",

    //stock-level
    getStockLevel: "Stock/GetVendorStockLevel",

    //actual-stock
    getActualStock: "Stock/GetVendorActualStock",

    //HR
    getVendorUsers: "HR/GetVendorUsers",

    //products
    getProductClass: "Product/GetProductClass",

    getProductBrands: "Product/GetVendorProductBrand",
    postProductsBrand: "Product/AddVendorProductBrand",
    deleteProductsBrand: "Product/RemoveVendorProductBrand",

    getVendorProductTypes: "Product/GetVendorProductType",

    //regions
    getVendorRegions: "Region/GetVendorRegion",

    //accounts
    getVendorAccounts: "Finance/GetVendorAccount"
}
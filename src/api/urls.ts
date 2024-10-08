export const urls = {
    getUser: 'Users/UserLogin',
    getVendorDashboard: 'DashBoard/GetVendorMainDashBoard',

    //locations
    getVendorLocation: 'Location/GetVendorLocation',
    deleteVendorLocation: 'Location/RemoveVendorLocation',
    postVendorLocationTx: 'Location/PostVendorLocationTx',

    //assigned users
    getVendorLocationUserAssignment: 'Location/GetVendorLocationUserAssignment',
    postVendorLocationUserAssignmentTx: 'Location/PostVendorLocationUserAssignmentTx',
    deleteVendorLocationUserAssignmentTX: 'Location/RemoveVendorLocationUserAssignmentTx',

    //assigned locations
    getVendorLocationAssignedLocation: 'Location/GetVendorLocationAssignedLocation',
    postAssignedLocations: 'Location/PostVendorLocationAssignLocation',
    deleteAssignedLocation: 'Location/RemoveVendorLocationAssignLocation',

    //asigned products
    getAssignedProducts: 'Location/GetVendorLocationProductType',
    postAssignedProducts: 'Location/PostVendorLocationProductType',
    deleteAssignedProducts: 'Location/RemoveVendorLocationProductType',

    //asigned regions
    getAssignedRegions: 'Location/GetVendorRegionLocationAssignment',
    deleteAssignedRegions: 'Location/RemoveVendorRegionLocationAssignment',
    postAssignedRegions: 'Location/PostVendorRegionLocationAssignment',

    //asigned accounts
    getAssignedAccounts: 'Location/GetVendorAccountLocationAssignment',
    deleteAssignedAccount: 'Location/RemoveVendorAccountLocationAssignment',
    postAssignedAccount: 'Location/PostVendorAccountLocationAssignment',

    //location types
    getVendorLocationType: 'Location/GetVendorLocationType',
    deleteVendorLocationType: 'Location/RemoveVendorLocationType',
    postVendorLocationType: 'Location/PostVendorLocationType',
    getSystemLocationType: 'Location/GetLocationType',

    //planning
    getDeliveryPlanHistory: 'Planning/GetVendorDeliveryPlanHistory',

    //stock-movement
    getStockMovementHistory: '/Stock/GetVendorStockMovementHistory',

    //stock-level
    getStockLevel: 'Stock/GetVendorStockLevel',

    //actual-stock
    getActualStock: 'Stock/GetVendorActualStock',

    //HR
    getVendorUsers: 'HR/GetVendorUsers',

    //products
    getProductClass: 'Product/GetProductClass',
    getProductUOMType: 'Product/GetProductUOMType',

    // 1. Brand
    getProductBrands: 'Product/GetVendorProductBrand',
    postProductsBrand: 'Product/AddVendorProductBrand',
    deleteProductsBrand: 'Product/RemoveVendorProductBrand',

    // 2. UOM
    getProductUOM: 'Product/GetVendorProductUOM',
    postProductUOM: 'Product/AddVendorProductUOM',
    deleteProductUOM: 'Product/RemoveVendorProductUOM',

    // 3. Product Types
    getVendorProductTypes: 'Product/GetVendorProductType',
    addVendorProductTypes: 'Product/AddVendorProductType',
    deleteVendorProductTypes: 'Product/RemoveVendorProductType',

    // 4. Product Category
    getVendorProductCategory: 'Product/GetVendorProductCategory',
    getVendorProductCategoryType: 'Product/GetVendorProductCategoryType',
    addVendorProductCategoryType: 'Product/AddVendorProductCategoryType',
    getVendorProductCategoryTypeDetail: 'Product/GetVendorProductCategoryTypeDetail',

    //regions
    getVendorRegions: 'Region/GetVendorRegion',
    removeVendorRegion: 'Region/RemoveVendorRegion',
    getVendorRegionBranch: 'Region/GetVendorRegionBranch',
    addVendorRegionBranch: 'Region/AddVendorRegionBranch',
    removeVendorRegionBranch: 'Region/RemoveVendorRegionBranch',

    //accounts
    getVendorAccounts: 'Finance/GetVendorAccount',
    getVendorAccountTypes: 'Finance/GetVendorAccountType',
    getAccountType: 'Finance/GetAccountType',
    postVendorAccountType: '/Finance/PostVendorAccountType',
    deleteVendorAccountType: 'Finance/RemoveVendorAccountType',

    //customers
    getVendorCustomer: 'Customer/GetVendorCustomer',
    getVendorCustomerLocation: 'Customer/GetVendorCustomerLocation',
    addVendorCustomerLocation: 'Customer/AddVendorCustomerLocation',
    getVendorCustomerPayment: 'Customer/GetVendorCustomerPayment',
    removeVendorCustomerPayment: 'Customer/RemoveVendorCustomerPayment',
    addVendorCustomerPayment: 'Customer/AddVendorCustomerPayment',
    getVendorCustomerNote: 'Customer/GetVendorCustomerNote',
    addVendorCustomerNote: 'Customer/AddVendorCustomerNote',
    removeVendorCustomerNote: 'Customer/RemoveVendorCustomerNote',
    getVendorCustomerStatement: 'Customer/GetVendorCustomerStatement',
    getVendorCustomerProductSummary: 'Customer/GetVendorCustomerProductSummary',
    getVendorCustomerProductStatement: 'Customer/GetVendorCustomerProductStatement',
    getVendorCustomerCategory: 'Customer/GetVendorCustomerCategory',
    postVendorCustomerCategory: 'Customer/PostVendorCustomerCategory',
    removeVendorCustomerCategory: 'Customer/RemoveVendorCustomerCategory',

    //suppliers
    getVendorSupplier: 'Supplier/GetVendorSupplier',
    postVendorSupplierTx: 'Supplier/PostVendorSupplierTx',
    removeVendorSupplier: 'Supplier/RemoveVendorSupplier',
    getVendorSupplierStatement: 'Supplier/GetVendorSupplierStatement',
};

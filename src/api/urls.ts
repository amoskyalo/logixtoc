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
    postVendorDeliveryPlanTx: 'Planning/PostVendorDeliveryPlanTx',
    getDeliveryPlanType: 'Planning/GetDeliveryPlanType',
    removeDeliveryPlan: 'Planning/RemoveDeliveryPlan',
    getStockMovementStockNOSummary: 'Stock/GetStockMovementStockNOSummary',
    changeDeliveryPlanType: 'Planning/ChangeDeliveryPlanType',
    changeDeliveryPlanDriver: 'Planning/ChangeDeliveryPlanDriver',

    //stock-movement
    getStockMovementHistory: '/Stock/GetVendorStockMovementHistory',

    //stock-level
    getStockLevel: 'Stock/GetVendorStockLevel',

    //actual-stock
    getActualStock: 'Stock/GetVendorActualStock',

    //HR
    getVendorUsers: 'HR/GetVendorUsers',
    vendorUserRegistration: 'HR/VendorUserRegistration',
    removeSystemUser: 'HR/RemoveSystemUser',
    GetVendorCommissionTypeRange: 'HR/GetVendorCommissionTypeRange',
    getVendorCommissionType: 'HR/GetVendorCommissionType',
    getSystemCommissionType: 'HR/GetSystemCommissionType',
    postVendorCommissionType: 'HR/PostVendorCommissionType',
    getSystemCommissionUserType: 'HR/GetSystemCommissionUserType',
    removeVendorCommissionType: 'HR/RemoveVendorCommissionType',
    getSystemAccessType: 'HR/GetSystemAccessType',
    getSystemRole: 'HR/GetSystemRole',
    getVendorUserWallet: 'HR/GetVendorUserWallet',
    getVendorUserWalletStatement: 'HR/GetVendorUserWalletStatement',
    getVendorLeaveRequest: 'HR/GetVendorLeaveRequest',
    getVendorLeaveType: 'HR/GetVendorLeaveType',
    postVendorLeaveType: 'HR/PostVendorLeaveType',
    removeVendorLeaveType: 'HR/RemoveVendorLeaveType',

    //products
    getProductClass: 'Product/GetProductClass',
    getProductUOMType: 'Product/GetProductUOMType',
    getProductBrands: 'Product/GetVendorProductBrand',
    postProductsBrand: 'Product/AddVendorProductBrand',
    deleteProductsBrand: 'Product/RemoveVendorProductBrand',
    getProductUOM: 'Product/GetVendorProductUOM',
    postProductUOM: 'Product/AddVendorProductUOM',
    deleteProductUOM: 'Product/RemoveVendorProductUOM',
    getVendorProductTypes: 'Product/GetVendorProductType',
    addVendorProductTypes: 'Product/AddVendorProductType',
    deleteVendorProductTypes: 'Product/RemoveVendorProductType',
    getVendorProductCategory: 'Product/GetVendorProductCategory',
    addVendorProductCategory: 'Product/AddVendorProductCategory',
    getVendorProductCategoryType: 'Product/GetVendorProductCategoryType',
    addVendorProductCategoryType: 'Product/AddVendorProductCategoryType',
    getVendorProductCategoryTypeDetail: 'Product/GetVendorProductCategoryTypeDetail',
    postVendorRegionPriceAssignmentTx: 'Finance/PostVendorRegionPriceAssignmentTx',

    //regions
    getVendorRegions: 'Region/GetVendorRegion',
    postVendorRegionTx: 'Region/PostVendorRegionTx',
    removeVendorRegion: 'Region/RemoveVendorRegion',
    getVendorRegionBranch: 'Region/GetVendorRegionBranch',
    addVendorRegionBranch: 'Region/AddVendorRegionBranch',
    removeVendorRegionBranch: 'Region/RemoveVendorRegionBranch',

    //finance
    getVendorAccounts: 'Finance/GetVendorAccount',
    postVendorAccount: 'Finance/PostVendorAccount',
    removeVendorAccount: 'Finance/RemoveVendorAccount',
    getVendorAccountStatement: 'Finance/GetVendorAccountStatement',
    getVendorAccountTypes: 'Finance/GetVendorAccountType',
    getAccountType: 'Finance/GetAccountType',
    postVendorAccountType: '/Finance/PostVendorAccountType',
    deleteVendorAccountType: 'Finance/RemoveVendorAccountType',
    getVendorPriceHistory: 'Finance/GetVendorPriceHistory',
    postVendorPriceTx: 'Finance/PostVendorPriceTx',
    getVendorProductPriceDetail: 'Finance/GetVendorProductPriceDetail',
    postVendorPriceDetail: 'Finance/PostVendorPriceDetail',
    removeVendorPriceDetail: 'Finance/RemoveVendorPriceDetail',
    getVendorRegionPrice: 'Finance/GetVendorRegionPrice',
    getVendorAllowanceRequest: 'Finance/GetVendorAllowanceRequest',
    getVendorAllowanceType: 'Finance/GetVendorAllowanceType',
    postVendorAllowanceType: 'Finance/PostVendorAllowanceType',
    removeVendorAllowanceType: 'Finance/RemoveVendorAllowanceType',

    //customers
    getCustomerType: 'Customer/GetCustomerType',
    getVendorCustomer: 'Customer/GetVendorCustomer',
    postVendorCustomerTx: 'Customer/PostVendorCustomerTx',
    removeVendorCustomer: 'Customer/RemoveVendorCustomer',
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

    //reconciliation
    getVendorLocationStockSaleSummary: 'Reconciliation/GetVendorLocationStockSaleSummary',
    getSalePaymentCollection: 'Reconciliation/GetSalePaymentCollection',
    postVendorSaleCollection: 'Reconciliation/PostVendorSaleCollection',
    getVendorSaleHistory: 'Reconciliation/GetVendorSaleHistory',

    //maintenance
    getVendorLocationFuelRequest: 'Maintenance/GetVendorLocationFuelRequest',
    getVendorFuelStation: 'Maintenance/GetVendorFuelStation',
    removeVendorFuelStation: 'Maintenance/RemoveVendorFuelStation',
    postVendorFuelStation: 'Maintenance/PostVendorFuelStation',
    getVendorLocationFuelConsumption: 'Maintenance/GetVendorLocationFuelConsumption',
    getVendorLocationFuelSetup: 'Maintenance/GetVendorLocationFuelSetup',
    postVendorLocationFuelSetup: 'Maintenance/PostVendorLocationFuelSetup',
    getVendorMaintenanceRequest: 'Maintenance/GetVendorMaintenanceRequest',
    getMaintenanceRequestType: 'Maintenance/GetMaintenanceRequestType',
    addMaintenanceRequestType: 'Maintenance/AddMaintenanceRequestType',
    removeMaintenanceRequestType: 'Maintenance/RemoveMaintenanceRequestType',

    //notifications
    getVendorNotificationUsers: 'Notification/GetVendorNotificationUsers',
    postVendorNotificationUserTx: 'Notification/PostVendorNotificationUserTx',
    getVendorNotificationType: 'Notification/GetVendorNotificationType',
    removeVendorNotificationUser: 'Notification/RemoveVendorNotificationUser',

    // Tracker
    getVendorTrackerLocation: 'Tracker/GetVendorTrackerLocation',
    getVendorCustomerHeatMap: 'Tracker/GetVendorCustomerHeatMap',
};

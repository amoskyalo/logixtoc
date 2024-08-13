export const urls = {
   getUser: 'Users/UserLogin',
   getVendorDashboard: 'DashBoard/GetVendorMainDashBoard',

   //locations
   getVendorLocation: 'Location/GetVendorLocation',
   deleteVendorLocation: 'Location/RemoveVendorLocation',

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
   addVendorProductCategoryType: "Product/AddVendorProductCategoryType",

   //regions
   getVendorRegions: 'Region/GetVendorRegion',

   //accounts
   getVendorAccounts: 'Finance/GetVendorAccount',
};

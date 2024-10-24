export type VendorProductTypeUOM = {
    VendorProductTypeUOMID: number;
    VendorProductTypeName: string;
    VendorProductUOMName: string;
    VendorProductTypeUOMCode: string;
    UOMSize: number;
    UOMTypeName: string;
    StatusID: number;
    DateAdded: string;
};

export type VendorProductTypeClass = {
    VendorProductTypeClassID: number;
    VendorProductTypeName: string;
    ProductClassName: string;
    StatusID: number;
    DateAdded: string;
};

export type VendorProductTypeBrand = {
    VendorProductTypeBrandID: number;
    VendorProductBrandID: number;
    VendorProductBrandName: string;
    ProductClassName: string;
    StatusID: number;
    DateAdded: string;
};

export type ProductType = {
    VendorProductTypeID: number;
    VendorID: number;
    VendorProductTypeName: string;
    StatusID: number;
    DateAdded: string;
    VendorProductTypeUOM: VendorProductTypeUOM[];
    VendorProductTypeClass: VendorProductTypeClass[];
    VendorProductTypeBrand: VendorProductTypeBrand[];
};

export type AddProductTypeInterface = {
    vendorProductTypeName: string;
    vendorProductTypeBrandArray: Array<{
        vendorProductBrandID: number;
    }>;
    vendorProductTypeClassArray: Array<{
        productClassID: number;
    }>;
    vendorProductTypeUOMArray: Array<{
        vendorProductUOMID: number;
    }>;
};

export type ProductUOMType = {
    ProductUOMTypeID: number;
    UOMTypeName: string;
};

export type ProductClass = {
    ProductClassID: number;
    ProductClassName: string;
};

export type ProductBrand = {
    VendorProductBrandID: number;
    VendorID: number;
    VendorProductBrandName: string;
    ProductClassName: string;
    ProductClassID: number;
    StatusID: number;
    DateAdded: string;
};

export type ProductUOM = {
    VendorProductUOMID: number;
    VendorID: number;
    VendorProductUOMName: string;
    UOMTypeName: string;
    ProductUOMTypeID: number;
    UOMSize: number;
    StatusID: number;
    DateAdded: string;
};

export type VendorProductCategoryTypeDetail = {
    VendorProductCategoryTypeDetailID: number;
    VendorProductTypeCount: number;
    IsReturn: number;
    StatusID: number;
    DateAdded: string;
    VendorProductCategoryTypeName: string;
    VendorProductCategoryName: string;
    VendorProductTypeName: string;
    VendorProductUOMName: string;
    UOMTypeName: string;
    UOMSize: string;
};

export type VendorProductCategoryTypeBrand = {
    VendorProductTypeBrandID: number;
    VendorProductBrandName: string;
    VendorProductTypeName: string;
    IsReturn: number;
    StatusID: number;
    DateAdded: string;
};

export type VendorProductCategoryType = {
    VendorProductCategoryTypeID: number;
    VendorProductCategoryID: number;
    VendorProductCategoryTypeName: string;
    StatusID: number;
    DateAdded: string;
    VendorProductCategoryName: string;
    VendorProductUOMID: number;
    VendorProductUOMName: string;
    UOMTypeName: string;
    UOMSize: string;
    isAdminSaleOnly: number;
    HasReturn: number;
    VendorProductCategoryTypeDetailArray: VendorProductCategoryTypeDetail[];
    VendorProductCategoryTypeBrandArray: VendorProductCategoryTypeBrand[];
};

export type VendorProductCategory = {
    VendorProductCategoryID: number;
    VendorProductCategoryName: string;
    DateAdded: string;
    HasReturn: string;
    StatusID: number;
    VendorProductCategoryTypeArray: VendorProductCategoryType[];
};

export type OrderType = {
    SaleOrderTypeID: number;
    SaleOrderTypeName: string;
};

export type VendorOrderType = {
    VendorSaleOrderTypeID: number;
    SaleOrderTypeID: number;
    SaleOrderTypeName: string;
    StatusID: number;
    DateAdded: string;
}
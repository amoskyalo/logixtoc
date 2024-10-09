export interface VendorProductPriceDetail {
    VendorProductPriceDetailID: number;
    VendorPriceNO: string;
    VendorProductCategoryTypeID: number;
    VendorProductTypeBrandID: number;
    ProductPrice: number;
    StatusID: number;
    DateAdded: string;
    VendorProductCategoryTypeName: string;
    VendorProductBrandName: string;
    VendorProductUOMName: string;
    VendorCustomerCategoryName: string;
    UOMSize: number;
}

export interface VendorProductPrice {
    VendorProductPriceID: number;
    VendorPriceNO: string;
    VendorID: number;
    AddedBy: number;
    VendorProductPriceStatusID: number;
    VendorProductPriceStatusName: string;
    DateAdded: string;
    DateClosed: string | null;
    AddedByName: string;
    VendorProductPriceDetailArray: VendorProductPriceDetail[];
}

export interface VendorProductPriceDetail {
    VendorProductPriceDetailID: number;
    VendorPriceNO: string;
    VendorProductCategoryTypeID: number;
    VendorProductTypeBrandID: number;
    ProductPrice: number;
    StatusID: number;
    DateAdded: string;
    VendorProductCategoryTypeName: string;
    VendorProductBrandName: string;
    VendorProductUOMName: string;
    VendorCustomerCategoryName: string;
    UOMSize: number;
}

export interface VendorRegionPrice {
    VendorRegionPriceID: number;
    VendorPriceNO: string;
    VendorRegionName: string;
    VendorID: number;
    AddedBy: number;
    StatusID: number;
    StatusName: string | null;
    DateAdded: string;
    DateClosed: string | null;
    AddedByName: string;
    VendorProductPriceDetailArray: VendorProductPriceDetail[];
}

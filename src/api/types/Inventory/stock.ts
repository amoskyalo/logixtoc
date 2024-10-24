export type StockMovementDetail = {
    StockMovementDetailID: number;
    VendorProductTypeBrandID: number;
    VendorProductBrandID: number;
    VendorProductBrandName: string;
    VendorProductUOMID: number;
    VendorProductUOMName: string;
    VendorProductTypeID: number;
    VendorProductTypeName: string;
    UOMSize: number;
    UOMTypeName: string;
    Quantity: number;
    ProductMovementTypeID: number;
    ProductMovementTypeName: string;
    ProductClassName: string;
    StatusID: number;
    DateAdded: string;
};

export type StockMovement = {
    StockMovementID: number;
    StockNO: string;
    SourceStockNO: string;
    VendorID: number;
    SourceVendorLocationID: number;
    SourceVendorLocationName: string;
    DestinationVendorLocationID: number;
    DestinationVendorLocationName: string;
    StockMovementTypeID: number;
    StockMovementTypeName: string;
    StockMovementStatusID: number;
    StockMovementStatusName: string;
    DateAdded: string;
    AddedBy: number;
    AddedByName: string;
    StockMovementDetailArray: StockMovementDetail[];
};

export type VendorStock = {
    VendorLocationID: number;
    VendorLocationName: string;
    VendorID: number;
    VendorName: string;
    VendorProductTypeBrandID: number;
    VendorProductTypeID: number;
    VendorProductTypeName: string;
    VendorProductBrandID: number;
    VendorProductBrandName: string;
    VendorProductUOMID: number;
    VendorProductUOMName: string;
    OpeningStock: number;
    ReceivedStock: number;
    SoldStock: number;
    CurrentStock: number;
    IssuedStock: number;
};

export type GetVendorStockParams = {
    VendorLocationID: number;
    VendorProductTypeID: number;
    VendorProductBrandID: number;
    VendorProductUOMID: number;
};

export type ActualStock = {
    StockMovementID: number;
    StockNO: string;
    SourceStockNO: string;
    VendorID: number;
    SourceVendorLocationID: number;
    SourceVendorLocationName: string;
    DestinationVendorLocationID: number;
    DestinationVendorLocationName: string;
    StockMovementTypeID: number;
    StockMovementTypeName: string;
    StockMovementStatusID: number;
    StockMovementStatusName: string;
    DateAdded: string;
    AddedBy: number;
    AddedByName: string;
    StockMovementDetailArray: StockMovementDetail[];
};

export type StockMovementType = {
    StockMovementTypeID: number;
    StockMovementTypeName: string;
}

export type StockMovementStatus = {
    StockMovementStatusID: number;
    StockMovementStatusName: string;
};
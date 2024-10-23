export type StockSummary = {
    PositionID: number;
    VendorProductTypeID: number;
    VendorProductTypeName: string;
    VendorProductBrandName: string;
    VendorProductUOMName: string;
    LoadedQuantity: number;
    SoldQuantity: number;
    SaleReturnQuantity: number;
    DeliveryQuantity: number;
    DeliveryReturnQuantity: number;
    Variance: number;
};

export type DeliveryPlan = {
    DeliveryPlanID: number;
    DeliveryPlanNO: string;
    VendorID: number;
    VendorLocationID: number;
    VendorLocationName: string;
    DriverName: string;
    DeliveryPlanTypeID: number;
    DeliveryPlanTypeName: string;
    DeliveryPlanStatusID: number;
    DeliveryPlanStatusName: string;
    StockNO: string;
    StockMovementStatusID: number;
    StockMovementStatusName: string;
    GeneratedBy: string;
    DateAdded: string;
    ServedCustomers: number;
    DeliveredLocations: number;
    DirectSaleAmount: number;
    CreditSaleAmount: number;
    OnlineSaleAmount: number;
    TotalOrderAmount: number;
    TotalPaidAmount: number;
    PendingSaleAmount: number;
    CollectedAmount: number;
    VarianceAmount: number;
    SourceVendorLocationName: string;
    StockSummaryArray: StockSummary[];
    DeliveryPlanLocationArray: any[];
};

export type DeliveryPlanType = {
    DeliveryPlanTypeID: number;
    DeliveryPlanTypeName: string;
};

export type DeliveryPlanStatus = {
    DeliveryPlanStatusID: number;
    DeliveryPlanStatusName: string;
};
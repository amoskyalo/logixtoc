export interface LoadDetail {
    StockNO: string;
    VendorProductUOMName: string;
    VendorProductTypeName: string;
    VendorProductBrandName: string;
    LoadedQuantity: number;
    SoldQuantity: number;
}

export interface SalePaymentCollection {
    SalePaymentCollectionID: number;
    CollectionNO: string;
    DeliveryPlanNO: string;
    StockNO: string;
    RefNO: string;
    VendorAccountID: number;
    VendorAccountName: string;
    VendorAccountNO: string;
    VendorAccountTypeName: string;
    CollectedAmount: number;
    StatusID: number;
    DateAdded: string;
}

export interface AssignedLocation {
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
}

export interface SummaryDeliveryPlan {
    DeliveryPlanNO: string;
    StockNO: string;
    StockMovementStatusID: number;
    StockMovementStatusName: string;
    DeliveryPlanStatusID: number;
    DeliveryPlanStatusName: string;
    DirectSaleAmount: number;
    CreditSaleAmount: number;
    OnlineSaleAmount: number;
    TotalOrderAmount: number;
    TotalPaidAmount: number;
    PendingSaleAmount: number;
    CollectedAmount: number;
    VarianceAmount: number;
    VendorLocationID: number;
    VendorLocationName: string;
    FirstSale: string;
    LastSale: string;
    DateLoaded: string;
    ServedCustomers: number;
    LoadDetailArray: LoadDetail[];
    SaleDetailArray: any[];
    ReturnDetailArray: any[];
    SalePaymentCollectionArray: SalePaymentCollection[];
    AssignedLocationArray: AssignedLocation[];
}

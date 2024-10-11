export interface CustomerType {
    CustomerTypeID: number;
    CustomerTypeName: string;
}
export interface VendorCustomerPayment {
    VendorCustomerPaymentID: number;
    VendorAccountName: string;
    VendorAccountNO: string;
    PaidAmount: number;
    PaymentNO: string;
    TransDate: string;
    DateAdded: string;
}

export interface VendorCustomerNote {
    VendorCustomerNoteID: number;
    NoteNO: string;
    NoteDescription: string;
    NoteAmount: number;
    AddedByName: string;
    NoteDate: string;
    DateAdded: string;
}

export interface Statement {
    PositionID: number;
    ReferenceNO: string;
    TransactionDate: string;
    Description: string;
    Type: 'OP' | 'DB' | 'CR';
    Amount: number;
    AccountBalance: number;
}

export interface VendorCustomerUOMStatement {
    VendorCustomerID: number;
    VendorProductUOMID: number;
    VendorProductUOMName: string;
    SalesReturnQuantity: number;
    SalesQuantity: number;
    NewOpeningQuantity: number;
}

export interface VendorCustomerCategory {
    VendorCustomerCategoryID: number;
    VendorCustomerCategoryName: string;
    DateAdded: string;
    StatusID: number;
}

export interface VendorCustomerLocation {
    VendorID: number;
    VendorCustomerID: number;
    VendorCustomerLocationID: number;
    CustomerName: string;
    LocationName: string;
    VendorRegionID: number;
    VendorRegionName: string;
    Longitude: string;
    Latitude: string;
    LocationPhone: string;
    HasDeliveryNote: boolean;
}

export interface VendorCustomer {
    VendorID: number;
    VendorCustomerID: number;
    CustomerName: string;
    CustomerPhone: string;
    CustomerMail: string;
    OpeningBalance: number;
    Consumption: number;
    Payments: number;
    CurrentBalance: number;
    BalanceForward: number;
    CreditLimit: number;
    PaymentTerms: number;
    AddedByName: string;
    StatusID: number;
    SaleNotification: number;
    DateAdded: string;
    CustomerTypeID: number;
    CustomerTypeName: string;
    VendorCustomerCategoryID: number;
    VendorCustomerCategoryName: string;
    VendorCustomerLocationArray: VendorCustomerLocation[];
}

export interface GetCustomer {
    VendorCustomerCategoryID: number;
    CustomerTypeID: number;
}

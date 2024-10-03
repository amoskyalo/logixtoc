export interface VendorSupplier {
    VendorID: number;
    VendorSupplierID: number;
    SupplierName: string;
    SupplierPhone: string;
    SupplierMail: string;
    OpeningBalance: number;
    Consumption: number;
    Payments: number;
    CurrentBalance: number;
    BalanceForward: number;
    AddedByName: string;
    StatusID: number;
    DateAdded: string;
}

export interface VendorSupplierStatement {
    PositionID: number;
    ReferenceNO: string;
    TransactionDate: string;
    Description: string;
    Type: string;
    Amount: number;
    AccountBalance: number;
}

export interface UserWallet {
    UserID: number;
    VendorID: number;
    UserName: string;
    PhoneNumber: string;
    TotalCommission: number;
    WithdrawalAmount: number;
    CurrentBalance: number;
    BalanceForward: number;
    StatusID: number;
    DateAdded: string;
}

export interface VendorUserStatement {
    PositionID: number;
    ReferenceNO: string;
    TransactionDate: string;
    Description: string;
    Type: string;
    Amount: number;
    AccountBalance: number;
}
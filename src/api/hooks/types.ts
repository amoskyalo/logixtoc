export interface GetRes {
    Error: boolean;
    Message: string;
    Page: number;
    PageSize: number;
    StatusCode: number;
    TotalCount: number;
}

export interface GetParams {
    PageSize?: number;
    PageNO?: number;
    StartDate?: string;
    EndDate?: string;
    VendorID: number;
};

export interface MutateParams {
    VendorID: number;
    addedBy: number;
}
import { useQuery } from "@tanstack/react-query";
import { GetParams, GetRes, urls, axiosPrivate } from "@/api";

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
}

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
}

export type StockHistoryResponse = GetRes & {
    Data: StockMovement[];
}

export type GetStockMovementHistoryParams = GetParams & {
    StockMovementTypeID: number;
    StockMovementStatusID: number;
    VendorLocationID: number;
};

export const useGetStockMovementHistory = ({
    VendorID,
    VendorLocationID,
    StockMovementTypeID,
    StockMovementStatusID,
    StartDate,
    EndDate,
    PageNO,
    PageSize
}: GetStockMovementHistoryParams) => (
    useQuery<StockHistoryResponse>({
        queryKey: [
            'stockMovementHistory',
            VendorID,
            VendorLocationID,
            StockMovementTypeID,
            StockMovementStatusID,
            StartDate,
            EndDate,
            PageNO,
            PageSize
        ],
        queryFn: async () => (
            await axiosPrivate.get(urls.getStockMovementHistory, {
                params: {
                    VendorID,
                    VendorLocationID,
                    StockMovementTypeID,
                    StockMovementStatusID,
                    StartDate,
                    EndDate,
                    PageNO,
                    PageSize
                }
            })
        ).data
    })
)

//==========================================================================================

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

export type VendorStockRes = GetRes & { Data: VendorStock[] };

export type GetVendorStockParams = GetParams & {
    VendorLocationID: number;
    VendorProductTypeID: number;
    VendorProductBrandID: number;
    VendorProductUOMID: number;
};

export const useGetStockLevel = ({
    VendorLocationID,
    VendorProductTypeID,
    VendorProductBrandID,
    VendorProductUOMID,
    VendorID,
    StartDate,
    EndDate,
    PageNO,
    PageSize,
}: GetVendorStockParams) => (
    useQuery<VendorStockRes>({
        queryKey: [
            'stockLevel',
            VendorLocationID,
            VendorProductTypeID,
            VendorProductBrandID,
            VendorProductUOMID,
            VendorID,
            StartDate,
            EndDate,
            PageNO,
            PageSize,
        ],
        queryFn: async () => (
            await axiosPrivate.get(urls.getStockLevel, {
                params: {
                    VendorLocationID,
                    VendorProductTypeID,
                    VendorProductBrandID,
                    VendorProductUOMID,
                    VendorID,
                    StartDate,
                    EndDate,
                    PageNO,
                    PageSize,
                },
            })
        ).data
    })
);

//==========================================================================================

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
}

export type GetActualStockParams = GetParams & { VendorLocationID: number };

export type GetActualStockRes = GetRes & { Data: ActualStock[] };

export const useGetActualStock = ({
    VendorID,
    VendorLocationID,
    StartDate,
    EndDate,
    PageNO,
    PageSize
}: GetActualStockParams) => (
    useQuery<GetActualStockRes>({
        queryKey: [
            'actualStock',
            VendorID,
            VendorLocationID,
            StartDate,
            EndDate,
            PageNO,
            PageSize
        ],
        queryFn: async () => (
            await axiosPrivate.get(urls.getActualStock, {
                params: {
                    VendorID,
                    VendorLocationID,
                    StartDate,
                    EndDate,
                    PageNO,
                    PageSize
                }
            })
        ).data
    })
)
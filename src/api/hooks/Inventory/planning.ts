import { axiosPrivate, urls, GetParams, GetRes } from "@/api";
import { useQuery } from "@tanstack/react-query";

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

export type GetDeliveryPlanRes = GetRes & {
    Data: DeliveryPlan[]
};

export type GetDeliveryPlanParams = GetParams & {
    VendorLocationID: number;
    DeliveryPlanStatusID: number;
    DeliveryPlanTypeID: number;
};

export const useGetDeliveryPlan = ({
    VendorID,
    VendorLocationID,
    DeliveryPlanStatusID,
    DeliveryPlanTypeID,
    StartDate,
    EndDate,
    PageSize,
    PageNO
}: GetDeliveryPlanParams) => (
    useQuery<GetDeliveryPlanRes>({
        queryKey: [
            'deliveryPlanHistory',
            VendorID,
            VendorLocationID,
            DeliveryPlanStatusID,
            DeliveryPlanTypeID,
            StartDate,
            EndDate,
            PageSize,
            PageNO
        ],
        queryFn: async () => (
            await axiosPrivate.get(urls.getDeliveryPlanHistory, {
                params: {
                    VendorID,
                    VendorLocationID,
                    DeliveryPlanStatusID,
                    DeliveryPlanTypeID,
                    StartDate,
                    EndDate,
                    PageSize,
                    PageNO
                }
            })
        ).data
    })
)
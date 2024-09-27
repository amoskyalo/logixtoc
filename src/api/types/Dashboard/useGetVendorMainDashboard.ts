'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { axiosPrivate, urls } from '@/api/';
import { snackbarToast } from '@/components/Snackbar';

export type DailyPerformanceArray = Array<{
    Dates: string;
    DayName: string;
    WeeklyPerformanceArray: Array<{
        DayName: string;
        TotalQuantity: number;
        TotalValue: number;
        TotalVolume: number;
        UOMTypeName: string;
        VendorProductCategoryName: string;
    }>;
}>;

export type LatestDeliveryPlanArray = Array<{
    DateAdded: string;
    DeliveryPlanID: number;
    DeliveryPlanNO: string;
    DeliveryPlanStatusID: number;
    DeliveryPlanStatusName: string;
    DeliveryPlanTypeID: number;
    DeliveryPlanTypeName: string;
    UserName: string;
    VendorLocationName: string;
}>;

export type LatestStockMovementArray = Array<{
    DateAdded: string;
    DestinationVendorLocationName: string;
    SourceStockNO: string;
    SourceVendorLocationName: string;
    StockMovementID: number;
    StockMovementStatusID: number;
    StockMovementStatusName: string;
    StockMovementTypeID: number;
    StockMovementTypeName: string;
    StockNO: string;
}>;

export type DashBoardResponse = {
    Data: {
        CountryCode: string;
        CountryName: string;
        CurrencyCode: string;
        DashBoardData: {
            ActiveDeliveryPlan: number;
            AvailableAssets: number;
            DailyPerformanceArray: DailyPerformanceArray;
            LatestDeliveryPlanArray: LatestDeliveryPlanArray;
            LatestStockMovementArray: LatestStockMovementArray;
            PerformanceArray: Array<any>;
            PlannedMaintenanceRequest: number;
            ServedCustomers: number;
            TodayMaintenanceRequest: number;
            TotalAssets: number;
            TotalCustomers: number;
            TotalDeliveryPlan: number;
            TotalMaintenanceRequest: number;
            UnAvailableAssets: number;
        };
        UserID: number;
        UserName: string;
        UserStatusID: number;
        VendorID: number;
        VendorIType: number;
        VendorName: string;
        VendorParentID: number;
        VendorParentName: string;
        VendorStatusID: number;
        VendorTypeName: string;
    };
    Error: boolean;
    Message: string;
    Page: number;
    PageSize: number;
    StatusCode: number;
    TotalCount: number;
};

export type GetVendorMainDashboardParams = {
    VendorID: number;
    UserID: number;
};

export const useGetVendorMainDashboard = (
    { VendorID, UserID }: GetVendorMainDashboardParams,
    options?: Omit<UseQueryOptions<DashBoardResponse>, 'queryKey' | 'queryFun'>,
) =>
    useQuery<DashBoardResponse>({
        queryKey: ['dashboard', VendorID, UserID],
        queryFn: async () => {
            try {
                const res = await axiosPrivate.get(urls.getVendorDashboard, {
                    params: { VendorID, UserID },
                });

                return res.data;
            } catch (error: any) {
                snackbarToast.error(error.message);
            }
        },
        ...options,
    });

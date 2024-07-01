import { SvgIconComponent } from "@mui/icons-material";
import { DailyPerformanceArray, LatestDeliveryPlanArray, LatestStockMovementArray } from "@/api";

export type CardsInterface = {
    title: string;
    subTitle: string;
    color: string;
    value: number;
    iconBackground: string;
    cardBackground?: string;
    Icon: SvgIconComponent;
    percentages: { text: string, value: number }[];
}

export type ContainerInterface = {
    title: string;
    children: React.ReactNode;
    renderActionButton?: () => React.ReactNode;
};

export type StatisticsCardsInterface = {
    loading: boolean;
    TotalCustomers: number;
    ServedCustomers: number;
    TotalAssets: number;
    AvailableAssets: number;
    UnAvailableAssets: number;
    TotalDeliveryPlan: number;
    ActiveDeliveryPlan: number;
    TotalMaintenanceRequest: number;
    TodayMaintenanceRequest: number;
    PlannedMaintenanceRequest: number
}

export type ProductPerfomanecInterface = {
    DailyPerformanceArray: DailyPerformanceArray;
    loading: boolean;
};

export type SalesPerformanceInterface = {
    PerformanceArray: any[];
    loading: boolean;
}

export type DeliveryPlanTableInterface = {
    loading: boolean;
    rows: LatestDeliveryPlanArray
}

export type StockMovementTableInterface = {
    loading: boolean;
    rows: LatestStockMovementArray
}
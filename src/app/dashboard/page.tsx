'use client';

import {
   DashboardStaticsCards,
   DashboardProductPerfomanceChart,
   DashboardSalesPerformanceChart,
   DashboardDeliveryPlanTable,
   DashboardStockMovementTable,
} from './_components';
import { Box, Grid } from '@mui/material';
import { useResponsiveness, useGetUser } from '@/hooks';
import { useGetVendorMainDashboard } from '@/api';

const DashboardPage = () => {
   const { isMobile } = useResponsiveness();
   const { VendorID, UserID } = useGetUser();

   const { data, isLoading } = useGetVendorMainDashboard({ VendorID, UserID });

   const dashboardData = data?.Data.DashBoardData;

   return (
      <Box
         sx={{
            width: '100%',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            rowGap: 6,
         }}
      >
         <Box className="overflow-scroll lg:overflow-hidden">
            <DashboardStaticsCards
               loading={isLoading}
               TotalCustomers={dashboardData?.TotalCustomers ?? 0}
               ServedCustomers={dashboardData?.ServedCustomers ?? 0}
               TotalAssets={dashboardData?.TotalAssets ?? 0}
               AvailableAssets={dashboardData?.AvailableAssets ?? 0}
               UnAvailableAssets={dashboardData?.UnAvailableAssets ?? 0}
               TotalDeliveryPlan={dashboardData?.TotalDeliveryPlan ?? 0}
               ActiveDeliveryPlan={dashboardData?.ActiveDeliveryPlan ?? 0}
               TotalMaintenanceRequest={dashboardData?.TotalMaintenanceRequest ?? 0}
               TodayMaintenanceRequest={dashboardData?.TodayMaintenanceRequest ?? 0}
               PlannedMaintenanceRequest={dashboardData?.PlannedMaintenanceRequest ?? 0}
            />
         </Box>

         <Grid container spacing={4}>
            <Grid item md={8} xs={12}>
               <DashboardProductPerfomanceChart
                  DailyPerformanceArray={dashboardData?.DailyPerformanceArray ?? []}
                  loading={isLoading}
               />
            </Grid>

            <Grid item md={4} xs={12}>
               <DashboardSalesPerformanceChart
                  PerformanceArray={dashboardData?.PerformanceArray ?? []}
                  loading={isLoading}
               />
            </Grid>
         </Grid>

         <Grid container spacing={4}>
            <DashboardDeliveryPlanTable
               loading={isLoading}
               rows={dashboardData?.LatestDeliveryPlanArray ?? []}
            />
            <DashboardStockMovementTable
               loading={isLoading}
               rows={dashboardData?.LatestStockMovementArray ?? []}
            />
         </Grid>
      </Box>
   );
};

export default DashboardPage;

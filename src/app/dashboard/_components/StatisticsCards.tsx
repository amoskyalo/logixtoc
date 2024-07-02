import { Grid } from "@mui/material";
import { CardsInterface, StatisticsCardsInterface } from ".";
import { Cards as DashboardCard, CardsSkeleton } from "./Cards";
import {
  Groups2,
  LocalShipping,
  DeliveryDining,
  Build,
} from "@mui/icons-material";
import { useResponsiveness } from "@/hooks";

const StatisticsCards = ({
  loading,
  TotalCustomers,
  ServedCustomers,
  TotalAssets,
  AvailableAssets,
  UnAvailableAssets,
  TotalDeliveryPlan,
  ActiveDeliveryPlan,
  TotalMaintenanceRequest,
  TodayMaintenanceRequest,
  PlannedMaintenanceRequest,
}: StatisticsCardsInterface) => {
  const { isMobile } = useResponsiveness();

  const cards: CardsInterface[] = [
    {
      title: "Customers",
      subTitle: "Total customers",
      iconBackground: "rgba(136, 135, 182, 0.5)",
      color: "#8e96d3",
      cardBackground: "#c1e547",
      Icon: Groups2,
      value: TotalCustomers,
      percentages: [
        { text: "Served", value: (ServedCustomers / TotalCustomers) * 100 },
        {
          text: "Unserved",
          value: ((TotalCustomers - ServedCustomers) / TotalCustomers) * 100,
        },
      ],
    },
    {
      title: "Assets",
      subTitle: "Total assets",
      color: "#c7e6e5",
      iconBackground: "rgba(199, 230, 229, 0.3)",
      Icon: LocalShipping,
      value: TotalAssets,
      percentages: [
        { text: "Available", value: (AvailableAssets / TotalAssets) * 100 },
        { text: "Unavailable", value: (UnAvailableAssets / TotalAssets) * 100 },
      ],
    },
    {
      title: "Delivery plan",
      subTitle: "Total delivery plan",
      color: "#9e9dc3",
      iconBackground: "rgba(158, 157, 195, 0.3)",
      Icon: DeliveryDining,
      value: TotalDeliveryPlan,
      percentages: [
        {
          text: "Active",
          value: (ActiveDeliveryPlan / TotalDeliveryPlan) * 100,
        },
        {
          text: "Inactive",
          value:
            ((TotalDeliveryPlan - ActiveDeliveryPlan) / TotalDeliveryPlan) *
            100,
        },
      ],
    },
    {
      title: "Maintenance",
      subTitle: "Total request",
      color: "#b2d0f9",
      iconBackground: "rgba(178, 208, 249, 0.3)",
      Icon: Build,
      value: TotalMaintenanceRequest,
      percentages: [
        {
          text: "Today",
          value: (TodayMaintenanceRequest / TotalMaintenanceRequest) * 100,
        },
        {
          text: "Planned",
          value: (PlannedMaintenanceRequest / TotalMaintenanceRequest) * 100,
        },
      ],
    },
  ];

  return (
    <Grid container spacing={2} sx={{ ...(isMobile ? { width: 1200 } : {}) }}>
      {cards.map(
        ({
          title,
          subTitle,
          color,
          iconBackground,
          cardBackground,
          Icon,
          percentages,
          value,
        }) => (
          <Grid item xs={3} key={title}>
            {loading ? (
              <CardsSkeleton />
            ) : (
              <DashboardCard
                title={title}
                subTitle={subTitle}
                color={color}
                iconBackground={iconBackground}
                Icon={Icon}
                cardBackground={cardBackground}
                percentages={percentages}
                value={value}
              />
            )}
          </Grid>
        )
      )}
    </Grid>
  );
};

export default StatisticsCards;

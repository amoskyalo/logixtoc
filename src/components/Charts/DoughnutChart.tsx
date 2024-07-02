"use client";

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useResponsiveness } from "@/hooks";

ChartJS.register(ArcElement, Tooltip);

const options = {
  cutout: "60%",
  maintainAspectRatio: false,
};

export type DataInterface = {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
    borderColor: string;
    weight: number;
    borderJoinStyle: any;
  }>;
};

export type DoughnutChartInterface = {
  data: DataInterface;
  loading: boolean;
};

export const DoughnutChart = ({ data, loading }: DoughnutChartInterface) => {
  const { isMobile } = useResponsiveness();

  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  };

  return (
    <Box height={isMobile ? 200 : 300}>
      {loading ? (
        <Box sx={styles}>
          <CircularProgress color="primary" size={48} />
        </Box>
      ) : !loading && data.labels.length == 0 ? (
        <Box sx={styles}>
          <Typography variant="body1">No data to display</Typography>
        </Box>
      ) : (
        <Doughnut data={data} options={options} />
      )}
    </Box>
  );
};

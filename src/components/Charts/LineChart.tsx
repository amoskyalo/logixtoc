"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useResponsiveness } from "@/hooks";
import { Box, CircularProgress, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
      ticks: {
        stepSize: 50,
        beginAtZero: true,
      },
      beginAtZero: true,
      padding: 10,
      border: {
        display: false,
      },
    },
    x: {
      grid: {
        color: "rgba(244, 245, 249, 1)",
      },
    },
  },
};

export type LineChartInterface = {
  data: {
    labels: string[];
    datasets: Array<{
      borderColor: string;
      borderWidth: number;
      data: number[];
      label: string;
      pointRadius: number;
      tension: number;
    }>;
  };
  loading: boolean;
};

const LineChart = ({ data, loading }: LineChartInterface) => {
  const { isMobile } = useResponsiveness();

  return (
    <Box height={isMobile ? 200 : 300}>
      {loading ? (
        <CircularProgress color="primary" size={48} />
      ) : !loading && data.labels.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="body1">No data to display</Typography>
        </Box>
      ) : (
        <Line options={options} data={data} />
      )}
    </Box>
  );
};

export default LineChart;

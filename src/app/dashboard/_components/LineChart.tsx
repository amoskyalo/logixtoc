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

const LineChart = () => {
  const { isMobile } = useResponsiveness();

  return (
    <Line
      options={options}
      height={isMobile ? 200 : 300}
      data={{
        labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          { data: [0, 0, 0, 0, 0, 0, 0, 0] },
          { data: [0, 0, 0, 0, 0, 0, 0, 0] },
          { data: [0, 0, 0, 0, 0, 0, 0, 0] },
        ],
      }}
    />
  );
};

export default LineChart;

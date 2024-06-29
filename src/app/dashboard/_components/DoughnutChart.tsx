"use client";

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartColors } from "@/Constants";
import { useResponsiveness } from "@/hooks";

ChartJS.register(ArcElement, Tooltip);

const options = {
  cutout: "60%",
  maintainAspectRatio: false,
};

const DoughnutChart = () => {
  const { isMobile } = useResponsiveness();

  return (
    <Doughnut
      data={{
        labels: ["label1", "label2", "label3", "label4"],
        datasets: [
          {
            data: [1, 2, 3, 4],
            backgroundColor: ChartColors,
          },
        ],
      }}
      options={options}
      height={isMobile ? 200 : 300}
    />
  );
};

export default DoughnutChart;

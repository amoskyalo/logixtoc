'use client';

import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useResponsiveness, useThemeMode } from '@/hooks';
import { Box, CircularProgress, Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

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
   const { isDarkMode } = useThemeMode();

   const ticksColor = isDarkMode ? 'rgba(244, 245, 249, 1)' : '';

   const styles = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
   };

   const options = {
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
            border: {
               display: false,
            },
            ticks: {
               stepSize: 50,
               beginAtZero: true,
               color: ticksColor,
            },
            beginAtZero: true,
            padding: 10,
         },
         x: {
            grid: {
               color: 'rgba(244, 245, 249, 1)',
            },
            ticks: {
               color: ticksColor,
            },
         },
      },
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
            <Line options={options} data={data} />
         )}
      </Box>
   );
};

export default LineChart;

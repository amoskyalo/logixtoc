import { useState, useEffect } from 'react';
import { SectionsBox, ProductPerfomanecInterface } from '.';
import { Box, Typography } from '@mui/material';
import { LineChart } from '@/components/Charts';
import { ChartColors } from '@/Constants';
import FiberSmartRecord from '@mui/icons-material/FiberSmartRecord';

const ProductPerformance = ({ DailyPerformanceArray, loading }: ProductPerfomanecInterface) => {
   const [labels, setLabels] = useState<string[]>([]);
   const [graphData, setGraphData] = useState<any[]>([]);

   useEffect(() => {
      if (!DailyPerformanceArray) return;

      const days: string[] = [];
      const categoryMap: Map<string, number[]> = new Map();

      for (const el of DailyPerformanceArray) {
         days.push(el.DayName);

         for (const item of el.WeeklyPerformanceArray) {
            if (!categoryMap.has(item.VendorProductCategoryName)) {
               categoryMap.set(item.VendorProductCategoryName, []);
            }
         }
      }

      categoryMap.forEach((_, categoryName) => {
         DailyPerformanceArray.forEach((x) => {
            const el = x.WeeklyPerformanceArray.find(
               (el) => el.VendorProductCategoryName === categoryName,
            );
            categoryMap.get(categoryName)?.push(el?.TotalVolume ?? 0);
         });
      });

      let colorIndex = 0;
      const productsGraph = Array.from(categoryMap, ([label, data]) => ({
         label,
         data: [...data].reverse(),
         tension: 0.4,
         borderWidth: 2,
         pointRadius: 4,
         borderColor: ChartColors[colorIndex++],
      }));

      setLabels([...days].reverse());
      setGraphData(productsGraph);
   }, [DailyPerformanceArray]);

   const data = {
      labels,
      datasets: graphData,
   };

   return (
      <SectionsBox title="Product Performance">
         <Box
            sx={{
               justifyContent: 'center',
               columnGap: 2,
               display: 'flex',
               alignItems: 'center',
               flexWrap: 'wrap',
            }}
         >
            {!loading &&
               labels.length > 0 &&
               data.datasets.map(({ label, borderColor }) => (
                  <Box key={label} sx={{ display: 'flex', columnGap: 0.5, alignItems: 'center' }}>
                     <FiberSmartRecord
                        sx={{
                           color: borderColor,
                           fontSize: 14,
                        }}
                     />
                     <Typography sx={{ fontSize: 14, textTransform: 'capitalize' }}>
                        {label.toLowerCase()}
                     </Typography>
                  </Box>
               ))}
         </Box>

         <LineChart data={data} loading={loading} />
      </SectionsBox>
   );
};

export default ProductPerformance;

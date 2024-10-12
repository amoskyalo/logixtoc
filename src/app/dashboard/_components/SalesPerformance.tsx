import { useEffect, useState } from 'react';
import { SalesPerformanceInterface, SectionsBox } from '.';
import { DoughnutChart, DataInterface } from '@/components/Charts';
import { Box, Grid, Typography } from '@mui/material';
import { ChartColors } from '@/Constants';
import FiberSmartRecord from '@mui/icons-material/FiberSmartRecord';

const SalesPerformance = ({ PerformanceArray, loading }: SalesPerformanceInterface) => {
   const [data, setData] = useState<DataInterface>({
      labels: [],
      datasets: [
         {
            data: [],
            backgroundColor: ChartColors,
            borderColor: 'transparent',
            weight: 80,
            borderJoinStyle: 'round',
         },
      ],
   });

   useEffect(() => {
      const totalValue = [];
      const totalCategories = [];

      for (let sale of PerformanceArray || []) {
         totalValue.push(sale.TotalValue);
         totalCategories.push(sale.VendorProductCategoryTypeName);
      }

      const obj = {
         labels: totalCategories,
         datasets: [
            {
               data: totalValue,
               backgroundColor: [...ChartColors].reverse(),
               borderColor: 'transparent',
               weight: 80,
               borderJoinStyle: 'round',
            },
         ],
      };

      setData(obj);
   }, [PerformanceArray]);

   return (
      <SectionsBox title="Sales Per Category">
         <DoughnutChart data={data} loading={loading} />
         <Grid>
            {data.labels.map((p, i) => (
               <Box key={p}>
                  <Typography sx={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                     {p.toLowerCase()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
                     <FiberSmartRecord
                        style={{
                           color: data?.datasets[0]?.backgroundColor[i],
                           fontSize: 14,
                        }}
                     />
                     <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                        {data?.datasets[0]?.data[i]?.toLocaleString('en')}
                     </Typography>
                  </Box>
               </Box>
            ))}
         </Grid>
      </SectionsBox>
   );
};

export default SalesPerformance;

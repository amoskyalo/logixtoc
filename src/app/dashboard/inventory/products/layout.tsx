import React from 'react';
import { PageHeader } from '@/components/Headers';
import { Box, Divider } from '@mui/material';
import { PageTabs } from '@/components/Tabs';

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <Box>
         <PageHeader headerName="Products" subTitle="Manage your different products" />
         <Divider sx={{ mb: 2, mt: 1 }} />
         <PageTabs
            initialRoute="products/brand"
            parentRoute="inventory/products"
            tabsList={['Brand', 'UOM', 'Product Type', 'Product Category', 'Order Type']}
         />
         {children}
      </Box>
   );
};

export default ProductsLayout;

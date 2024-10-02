import React from 'react';
import { TabsPageContainer } from '@/components/Containers';

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <TabsPageContainer
            initialRoute="products/brand"
            parentRoute="inventory/products"
            tabsList={['Brand', 'UOM', 'Product Type', 'Product Category', 'Order Type']}
            headerName="Products"
            subTitle="Manage your different products"
        >
            {children}
        </TabsPageContainer>
    );
};

export default ProductsLayout;

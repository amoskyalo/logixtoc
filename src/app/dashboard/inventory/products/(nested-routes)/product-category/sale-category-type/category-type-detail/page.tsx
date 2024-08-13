'use client';

import { useSearchParams } from 'next/navigation';
import { Breadcrumbs, Link, Typography, Stack } from '@mui/material';
import { StyledBreadcrumb } from '@/components/Breadcrumbs';
import { useResponsiveness } from '@/hooks';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const CategoryTypeDetail = () => {
   const VendorProductCategoryTypeID = useSearchParams().get('VendorProductCategoryTypeID');
   const VendorProductCategoryID = useSearchParams().get('VendorProductCategoryID');
   const { isMobile } = useResponsiveness();

   return (
      <div>
         <Breadcrumbs aria-label="breadcrumb" maxItems={isMobile ? 2 : 10}>
            {/* <Link underline="hover" color="inherit">
               <NextLink href="/dashboard/inventory/products/product-category">
                  Product Category
               </NextLink>
            </Link>
            <Link underline="hover" color="inherit">
               <NextLink
                  href={{
                     query: { VendorProductCategoryID },
                     pathname: '/dashboard/inventory/products/product-category/sale-category-type',
                  }}
               >
                  Sale Category Type
               </NextLink>
            </Link>
            <Typography color="#10333f">Category Type Detail</Typography> */}

            <StyledBreadcrumb
               component="a"
               label="Products Category"
               icon={<ProductionQuantityLimitsIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" label="Sale Category Type" />
            <StyledBreadcrumb label="Category Type Detail" />
         </Breadcrumbs>
      </div>
   );
};

export default CategoryTypeDetail;

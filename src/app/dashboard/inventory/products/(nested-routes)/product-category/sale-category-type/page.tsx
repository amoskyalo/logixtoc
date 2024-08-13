'use client';

import React, { useState } from 'react';
import { Breadcrumbs, Link, Typography, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useGetUser } from '@/hooks';
import { useGetSaleCategoryType, useGetProductUOM } from '@/api';
import { SaleCategoryTypeGrid, SaleCategoryTypeForm } from './_components';
import { StyledBreadcrumb } from '@/components/Breadcrumbs';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import NextLink from 'next/link';

const SaleCategoryType = () => {
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(10);
   const [open, setOpen] = useState(false);

   const VendorProductCategoryID = useSearchParams().get(
      'VendorProductCategoryID',
   ) as unknown as number;

   const { VendorID, UserID: addedBy } = useGetUser();

   const { data: uomList } = useGetProductUOM({ VendorID });

   const {
      data: saleCategoryType,
      isLoading,
      isRefetching,
      refetch,
   } = useGetSaleCategoryType({
      VendorID,
      VendorProductCategoryID,
      PageSize: pageSize,
      PageNO: page,
   });

   return (
      <>
         <Stack spacing={3} sx={{ mt: 1 }}>
            <Breadcrumbs aria-label="breadcrumb">
               {/* <Link underline="hover" color="inherit">
                  <NextLink href="/dashboard/inventory/products/product-category">
                     Product Category
                  </NextLink>
               </Link>
               <Typography color="#10333f">Sale Category Type</Typography> */}

               <StyledBreadcrumb
                  component="a"
                  label="Products Category"
                  icon={<ProductionQuantityLimitsIcon fontSize="small" />}
               />
               <StyledBreadcrumb component="a" label="Sale Category Type" />
            </Breadcrumbs>

            <SaleCategoryTypeGrid
               rows={saleCategoryType?.Data || []}
               isLoading={isLoading || isRefetching}
               pageNo={page}
               pageSize={pageSize}
               setPageNo={setPage}
               setPageSize={setPageSize}
               onAdd={() => setOpen(true)}
            />
         </Stack>

         <SaleCategoryTypeForm
            open={open}
            onClose={() => setOpen(false)}
            uomList={uomList?.Data || []}
            VendorID={VendorID}
            vendorProductCategoryID={VendorProductCategoryID}
            addedBy={addedBy}
            refetch={refetch}
         />
      </>
   );
};

export default SaleCategoryType;

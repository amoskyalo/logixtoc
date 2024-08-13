'use client';

import React, { useState } from 'react';
import { useGetProductUOM, useGetProductUOMType } from '@/api';
import { useGetUser } from '@/hooks';
import { UOMGrid, UOMForm } from './_components';

const UOM = () => {
   const [open, setOpen] = useState(false);

   const { VendorID } = useGetUser();
   const { data: UOM, isLoading, isRefetching, refetch } = useGetProductUOM({ VendorID });
   const { data: productUOMTypes } = useGetProductUOMType({ VendorID });

   return (
      <>
         <UOMGrid
            rows={UOM?.Data || []}
            isLoading={isLoading || isRefetching}
            onAdd={() => setOpen(true)}
            refetch={refetch}
         />
         <UOMForm
            open={open}
            onClose={() => setOpen(false)}
            refetch={refetch}
            productUOMTypes={productUOMTypes?.Data || []}
         />
      </>
   );
};

export default UOM;

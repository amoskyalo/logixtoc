import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosPrivate, urls, GetRes, GetParams, MutateParams } from '@/api';

export type VendorProductTypeUOM = {
   VendorProductTypeUOMID: number;
   VendorProductTypeName: string;
   VendorProductUOMName: string;
   VendorProductTypeUOMCode: string;
   UOMSize: number;
   UOMTypeName: string;
   StatusID: number;
   DateAdded: string;
};

export type VendorProductTypeClass = {
   VendorProductTypeClassID: number;
   VendorProductTypeName: string;
   ProductClassName: string;
   StatusID: number;
   DateAdded: string;
};

export type VendorProductTypeBrand = {
   VendorProductTypeBrandID: number;
   VendorProductBrandID: number;
   VendorProductBrandName: string;
   ProductClassName: string;
   StatusID: number;
   DateAdded: string;
};

export type ProductType = {
   VendorProductTypeID: number;
   VendorID: number;
   VendorProductTypeName: string;
   StatusID: number;
   DateAdded: string;
   VendorProductTypeUOM: VendorProductTypeUOM[];
   VendorProductTypeClass: VendorProductTypeClass[];
   VendorProductTypeBrand: VendorProductTypeBrand[];
};

export type AddProductTypeInterface = {
   vendorProductTypeName: string;
   vendorProductTypeBrandArray: Array<{
      vendorProductBrandID: number;
   }>;
   vendorProductTypeClassArray: Array<{
      productClassID: number;
   }>;
   vendorProductTypeUOMArray: Array<{
      vendorProductUOMID: number;
   }>;
};
export type GetProductTypesRes = GetRes & { Data: ProductType[] };

export const useGetProductTypes = ({ VendorID, PageNO, PageSize }: GetParams) =>
   useQuery<GetProductTypesRes>({
      queryKey: ['productTypes', VendorID, PageNO, PageSize],
      queryFn: async () => {
         const res = await axiosPrivate.get(urls.getVendorProductTypes, {
            params: { VendorID, PageNO, PageSize },
         });

         return res.data;
      },
   });

export const usePostProductType = () =>
   useMutation({
      mutationFn: async (data: MutateParams & AddProductTypeInterface) =>
         await axiosPrivate.post(urls.addVendorProductTypes, data),
   });

export const useDeleteProductType = () =>
   useMutation({
      mutationFn: async (data: MutateParams & { vendorProductTypeID: number }) =>
         await axiosPrivate.post(urls.deleteVendorProductTypes, data),
   });
// =============================================================================================================================

export type ProductUOMType = {
   ProductUOMTypeID: number;
   UOMTypeName: string;
};

export const useGetProductUOMType = ({ VendorID }: { VendorID: number }) =>
   useQuery<GetRes & { Data: ProductUOMType[] }>({
      queryKey: ['uomType', VendorID],
      queryFn: async () =>
         (
            await axiosPrivate.get(urls.getProductUOMType, {
               params: { VendorID },
            })
         ).data,
   });

// =============================================================================================================================

export type ProductClass = {
   ProductClassID: number;
   ProductClassName: string;
};

export const useGetProductClass = ({
   VendorID,
   VendorTypeID,
}: GetParams & { VendorTypeID: number }) =>
   useQuery<GetRes & { Data: ProductClass[] }>({
      queryKey: ['procustClass', VendorID, VendorTypeID],
      queryFn: async () =>
         (
            await axiosPrivate.get(urls.getProductClass, {
               params: { VendorID, VendorTypeID },
            })
         ).data,
   });

// =============================================================================================================================

export type ProductBrand = {
   VendorProductBrandID: number;
   VendorID: number;
   VendorProductBrandName: string;
   ProductClassName: string;
   ProductClassID: number;
   StatusID: number;
   DateAdded: string;
};

export const useGetVendorProductBrand = ({ VendorID }: GetParams) =>
   useQuery<GetRes & { Data: ProductBrand[] }>({
      queryKey: ['brand', VendorID],
      queryFn: async () =>
         (
            await axiosPrivate.get(urls.getProductBrands, {
               params: { VendorID },
            })
         ).data,
   });

export const useAddVendorProductBrand = () =>
   useMutation({
      mutationFn: async (data: {
         VendorID: number;
         AddedBy: number;
         productClassID: number;
         vendorProductBrandName: string;
      }) => await axiosPrivate.post(urls.postProductsBrand, data),
   });

export const useDeleteVendorProductBrand = () =>
   useMutation({
      mutationFn: async (data: {
         vendorProductBrandID: number | string;
         VendorID: number;
         addedBy: number;
      }) => await axiosPrivate.post(urls.deleteProductsBrand, data),
   });

// =============================================================================================================================

export type ProductUOM = {
   VendorProductUOMID: number;
   VendorID: number;
   VendorProductUOMName: string;
   UOMTypeName: string;
   ProductUOMTypeID: number;
   UOMSize: number;
   StatusID: number;
   DateAdded: string;
};

export const useGetProductUOM = ({ VendorID }: { VendorID: number }) =>
   useQuery<GetRes & { Data: ProductUOM[] }>({
      queryKey: ['productUOM', VendorID],
      queryFn: async () =>
         (
            await axiosPrivate.get(urls.getProductUOM, {
               params: { VendorID },
            })
         ).data,
   });

export const useAddProductUOM = () =>
   useMutation({
      mutationFn: async (data: {
         VendorID: number;
         AddedBy: number;
         uomSize: number;
         vendorProductUOMName: string;
         productUOMTypeID: number;
      }) => await axiosPrivate.post(urls.postProductUOM, data),
   });

export const useDeleteProductUOM = () =>
   useMutation({
      mutationFn: async (data: {
         vendorProductUOMID: number | string;
         VendorID: number;
         addedBy: number;
      }) => await axiosPrivate.post(urls.deleteProductUOM, data),
   });

// =============================================================================================================================

export type VendorProductCategoryTypeDetail = {
   VendorProductCategoryTypeDetailID: number;
   VendorProductTypeCount: number;
   IsReturn: number;
   StatusID: number;
   DateAdded: string;
   VendorProductCategoryTypeName: string;
   VendorProductCategoryName: string;
   VendorProductTypeName: string;
   VendorProductUOMName: string;
   UOMTypeName: string;
   UOMSize: string;
};

export type VendorProductCategoryTypeBrand = {
   VendorProductTypeBrandID: number;
   VendorProductBrandName: string;
   VendorProductTypeName: string;
   IsReturn: number;
   StatusID: number;
   DateAdded: string;
};

export type VendorProductCategoryType = {
   VendorProductCategoryTypeID: number;
   VendorProductCategoryID: number;
   VendorProductCategoryTypeName: string;
   StatusID: number;
   DateAdded: string;
   VendorProductCategoryName: string;
   VendorProductUOMID: number;
   VendorProductUOMName: string;
   UOMTypeName: string;
   UOMSize: string;
   isAdminSaleOnly: number;
   HasReturn: number;
   VendorProductCategoryTypeDetailArray: VendorProductCategoryTypeDetail[];
   VendorProductCategoryTypeBrandArray: VendorProductCategoryTypeBrand[];
};

export type VendorProductCategory = {
   VendorProductCategoryID: number;
   VendorProductCategoryName: string;
   DateAdded: string;
   HasReturn: string;
   StatusID: number;
   VendorProductCategoryTypeArray: VendorProductCategoryType[];
};

export const useGetProductCategory = ({ VendorID }: { VendorID: number }) =>
   useQuery<GetRes & { Data: VendorProductCategory[] }>({
      queryKey: ['productCategory', VendorID],
      queryFn: async () =>
         (
            await axiosPrivate.get(urls.getVendorProductCategory, {
               params: { VendorID },
            })
         ).data,
   });

export const useGetSaleCategoryType = ({
   VendorProductCategoryID,
   VendorID,
   PageNO,
   PageSize,
}: GetParams & { VendorProductCategoryID: number }) =>
   useQuery<GetRes & { Data: VendorProductCategoryType[] }>({
      queryKey: ['saleCategoryType', VendorProductCategoryID, VendorID, PageNO, PageSize],
      queryFn: async () =>
         (
            await axiosPrivate.get(urls.getVendorProductCategoryType, {
               params: { VendorProductCategoryID, VendorID, PageNO, PageSize },
            })
         ).data,
   });

export const useAddVendorProductCategoryType = () =>
   useMutation({
      mutationFn: async (
         data: MutateParams & {
            isAdminSaleOnly: number;
            vendorProductCategoryTypeName: string;
            vendorProductUOMID: number;
            vendorProductCategoryID: number;
         },
      ) => await axiosPrivate.post(urls.addVendorProductCategoryType, data),
   });
// =============================================================================================================================

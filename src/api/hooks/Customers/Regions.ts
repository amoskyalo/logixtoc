import { axiosPrivate, urls, GetParams, GetRes } from "@/api";
import { useQuery } from "@tanstack/react-query";

export type VendorRegionBranch = {
    VendorRegionBranchID: number;
    VendorRegionID: number;
    VendorRegionBranchName: string;
    VendorRegionName: string;
    AddedBy: number;
    DateAdded: string;
    StatusID: number;
}

export type VendorRegionLocationAssignment = {
    VendorRegionLocationAssignmentID: number;
    VendorRegionID: number;
    VendorRegionName: string;
    VendorLocationID: number;
    VendorLocationName: string;
    DateAdded: string;
}

export type VendorRegion = {
    VendorRegionID: number;
    VendorRegionName: string;
    DateAdded: string;
    TotalAsset: number;
    StatusID: number;
    TotalBranches: number;
    BranchArray: VendorRegionBranch[];
    AssetsArray: VendorRegionLocationAssignment[];
}

export type RegionsRes = GetRes & {
    Data: VendorRegion[];
};

export const useGetRegions = ({ VendorID }: GetParams) => {
    return useQuery<RegionsRes>({
        queryKey: ["regions", VendorID],
        queryFn: async () => {
            const res = await axiosPrivate.get(urls.getVendorRegions, {
                params: { VendorID }
            });

            return res.data
        }
    });
};
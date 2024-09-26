export type SystemLocationType = {
   LocationTypeID: number;
   VendorID: number;
   LocationTypeName: string;
};

export type VendorLocationType = {
   VendorLocationTypeID: number;
   VendorID: number;
   VendorLocationTypeName: string;
   AddedByName: string;
   LocationTypeName: string;
   LocationTypeID: number;
   StatusID: number;
   DateAdded: string;
   LocationArray: any[];
};

import { useMutation } from "@tanstack/react-query";
import { urls } from "@/api";
import axios from "axios";

export type UserLogins = {
    password: string;
    phoneNumber: string;
};

export type UserInterface = {
    AssignedLocation: Array<any>;
    CountryCode: string;
    CountryFlag: string;
    CountryLat: string;
    CountryLng: string;
    CountryName: string;
    CurrencyCode: string;
    Email: string;
    Error: boolean;
    FirstName: string;
    HasResetPassword: number;
    ImageURL: string;
    LastName: string;
    Message: string;
    PhoneNumber: string;
    StatusID: number;
    SystemAccessTypeID: number;
    SystemAccessTypeName: string;
    SystemRoleID: number;
    SystemRoleName: string;
    TokenID: string;
    UserID: number;
    UserImageID: string;
    UserSystemPolicyArray: Array<any>;
    UserToken: string;
    VendorID: number;
    VendorImageID: string;
    VendorName: string;
    VendorParentID: number;
    VendorParentName: string;
    VendorSaleOrderTypeArray: Array<any>;
    VendorTypeID: number;
    VendorUserID: number;
};


const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const useUserLogin = () => (
    useMutation({
        mutationFn: async ({ password, phoneNumber }: UserLogins) => {
            const res = await axios.post(`${baseURL}/${urls.getUser}`, { password, phoneNumber });
            return res.data
        },
    })
)
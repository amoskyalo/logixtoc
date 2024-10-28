import { axiosPrivate, urls } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { snackbarToast } from "@/components/Snackbar";

export const useMutate = <T>(url: keyof typeof urls | undefined | null) => {
    // T here is the interface of the data we are sending to the API;

    return useMutation({
        mutationFn: async (data: T) => {
            try {
                if (url) {
                    const response = await axiosPrivate.post(urls[url], data);
                    return response;
                }
            } catch (error: any) {
                snackbarToast.error(error?.message);
            }
        },
    });
};

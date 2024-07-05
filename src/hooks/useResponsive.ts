import { useEffect, useState } from "react";

export const useResponsiveness = () => {
    const [innerWidth, setInnerWidth] = useState<number>(0);

    useEffect(() => {
        function eventListener() {
            typeof window !== "undefined" && setInnerWidth(window.innerWidth);
        }
        window.addEventListener("resize", eventListener, true);

        return () => window.removeEventListener("resize", eventListener, true);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setInnerWidth(window.innerWidth);
        }
    }, []);

    const isMobile = innerWidth < 900;

    return {
        isMobile
    }
};
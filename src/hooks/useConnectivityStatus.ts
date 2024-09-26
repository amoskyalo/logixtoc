'use client';

import { useState } from "react";

export const useConnectivityStatus = () => {
    const [status, setStatus] = useState<'online' | 'offline'>('online');

    //for production only.
    
    // const checkSatus = async () => {
    //     try {
    //         const headers = new Headers();
    //         headers.append('Cache-Control', 'no-cache');
    //         const res = await fetch('https://logixtoc.africa', {
    //             mode: 'no-cors'
    //         });

    //         if (res && status === 'offline') {
    //             setStatus('online');
    //         }
    //     } catch (error) {
    //         if (status === 'online') {
    //             setStatus('offline');
    //         }
    //     }
    // };

    // setInterval(async () => {
    //     await checkSatus()
    // }, 3000)

    return { status }
};
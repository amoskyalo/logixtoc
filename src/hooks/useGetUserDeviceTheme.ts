'use client';

export const useGetUserDeviceTheme = (): {
   mode: 'light' | 'dark';
   userDeviceDark?: boolean;
   userDeviceLight?: boolean;
} => {
   if (typeof window !== 'undefined') {
      const userDeviceDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const userDeviceLight = window.matchMedia('(prefers-color-scheme: light)').matches;

      const mode = userDeviceLight ? 'light' : 'dark';

      return { userDeviceDark, userDeviceLight, mode };
   }

   return { mode: 'light' };
};

'use client';
import { APPCRUD, NotificationType as NotificationTypeInterface } from '@/api';

const NotificationType = () => {
    const UI = new APPCRUD<NotificationTypeInterface, void, void, void>({
        grid: {
            showDates: false,
            showActions: false,
            pagination: false,
            fetchUrl: 'getVendorNotificationType',
            columns: [
                { field: 'NotificationTypeName', headerName: 'Notification Type', mobileWidth: 230 },
                { field: 'NotificationChannelName', headerName: 'Access Channel', mobileWidth: 200 },
            ],
        },
    });

    return UI.render();
};

export default NotificationType;

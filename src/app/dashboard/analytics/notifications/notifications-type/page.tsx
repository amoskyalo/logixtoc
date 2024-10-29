'use client';
import { NotificationType as NotificationTypeInterface } from '@/api';
import { UIConstructor } from '@/UIModel';

const NotificationType = () => {
    const UI = new UIConstructor<NotificationTypeInterface, void, void, void>({
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

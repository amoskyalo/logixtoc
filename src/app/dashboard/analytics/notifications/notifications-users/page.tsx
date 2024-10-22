'use client';

import { APPCRUD, NotificationData, VendorUserObjectInterface, NotificationType, useFetch } from '@/api';
import { AutoCompleteField } from '@/components/Inputs';
import { getFormikFieldProps } from '@/utils';

type Values = {
    notificationTypeID: string;
    usersArray: Array<{ userID: number }>;
};

type Delete = { NotificationUserID: number };

const NotificationsUsers = () => {
    const { data: vendorUsers } = useFetch<VendorUserObjectInterface, void>('getVendorUsers');
    const { data: notificationType } = useFetch<NotificationType, void>('getVendorNotificationType');

    const UI = new APPCRUD<NotificationData, Values, Delete, any>({
        grid: {
            showDates: false,
            actions: ['delete'],
            fetchUrl: 'getVendorNotificationUsers',
            deleteUrl: 'removeVendorNotificationUser',
            initialDeleteParams: { NotificationUserID: 0 },
            columns: [
                { field: 'NotificationTypeName', headerName: 'Notification Type', mobileWidth: 200 },
                { field: 'NotificationChannelName', headerName: 'Contact Channel', mobileWidth: 200 },
                { field: 'UserName', headerName: 'User Name', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 150 },
            ],
        },
        form: {
            type: 'normal',
            title: 'Add Notification User',
            submitKey: 'postVendorNotificationUserTx',
            initialValues: {
                notificationTypeID: '',
                usersArray: [],
            },
            modifyData: ({ usersArray, ...rest }) => ({
                ...rest,
                usersArray: usersArray.map((item) => ({
                    userId: item.userID,
                })),
            }),
            inputs: [
                {
                    label: 'Notification Users',
                    key: 'usersArray',
                    type: 'customInput',
                    dataType: 'array',
                    validate: true,
                    renderInput: (formik) => (
                        <AutoCompleteField
                            label="Users"
                            options={(vendorUsers?.Data ?? []).map(({ UserID, FirstName, LastName }) => ({
                                userID: UserID,
                                title: `${FirstName} ${LastName}`,
                            }))}
                            getOptionLabel={(option: any) => option.title}
                            {...getFormikFieldProps(formik, 'usersArray', true)}
                        />
                    ),
                },
                {
                    label: 'Notification Type',
                    key: 'notificationTypeID',
                    type: 'select',
                    validate: true,
                    lookups: notificationType?.Data || [],
                    lookupDisplayName: 'NotificationTypeName',
                    lookupDisplayValue: 'NotificationTypeID',
                },
            ],
        },
    });

    return UI.render();
};

export default NotificationsUsers;

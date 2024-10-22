export interface NotificationData {
    NotificationUserID: number;
    NotificationTypeID: number;
    NotificationTypeName: string;
    NotificationChannelName: string;
    UserName: string;
    StatusID: number;
    DateAdded: string;
}

export interface NotificationType {
    NotificationTypeID: number;
    NotificationTypeName: string;
    NotificationChannelName: string;
}

import {
    Dashboard,
    Inventory,
    DeliveryDining,
    ShowChart,
    OilBarrel,
    WarehouseRounded,
    LocationOn,
    PaymentsRounded,
    RequestPage,
    Groups2,
    FilterCenterFocus,
    Category,
    EmojiTransportation,
    Loyalty,
    Handshake,
    RedeemRounded,
    Badge,
    Engineering,
    EvStation,
    WebAsset,
    Insights,
    NotificationAddRounded,
    Help,
    Settings
} from '@mui/icons-material';

export const routes = [
    {
        name: "Dashboard",
        Icon: Dashboard,
        path: "/dashboard",
    },
    {
        name: "Inventory",
        Icon: Inventory,
        path: "/dashboard/inventory",
        subTabs: [
            {
                name: "Planning",
                Icon: DeliveryDining,
                path: "/dashboard/inventory/planning",
            },
            {
                name: "Stock",
                Icon: ShowChart,
                path: "/dashboard/inventory/stock/stock-movement"
            },
            {
                name: "Products",
                Icon: OilBarrel,
                path: "/dashboard/inventory/products/brand",
            }
        ]
    },
    {
        name: "Location",
        Icon: WarehouseRounded,
        path: "/locations",
        subTabs: [
            {
                name: "Locations",
                Icon: LocationOn,
                path: "/dashboard/locations",
            },
            {
                name: "Location types",
                Icon: DeliveryDining,
                path: "/dashboard/locations/location-types",
            }
        ]
    },
    {
        name: "Finance",
        Icon: PaymentsRounded,
        path: "/finance",
        subTabs: [
            {
                name: "Accounts",
                Icon: PaymentsRounded,
                path: "/dashboard/finance/accounts",
            },

            {
                name: "Product prices",
                Icon: RequestPage,
                path: "/finance/product prices/price history",
            }
        ]
    },
    {
        name: "Customers",
        Icon: Groups2,
        path: "/dashboard/customers",
        subTabs: [
            {
                name: "Customers",
                path: "/dashboard/customers"
            },
            {
                name: "Regions",
                path: "/dashboard/customers/regions"
            }
        ]
    },
    {
        name: "Suppliers",
        Icon: FilterCenterFocus,
        path: "/dashboard/suppliers",
        subTabs: [
            {
                name: "Suppliers",
                Icon: Category,
                path: "/dashboard/suppliers",
            },
            {
                name: "Purchases",
                Icon: EmojiTransportation,
                path: "/dashboard/suppliers/purchases",
            }
        ]
    },
    {
        name: "Reconciliation",
        Icon: Handshake,
        path: "/reconciliation",
        subTabs: [
            {
                name: "Sales",
                Icon: Loyalty,
                path: "/dashboard/reconciliation/sales/summary",
            },
            {
                name: "Stocks",
                Icon: ShowChart,
                path: "/dashboard/reconciliation/stocks/stock-summary",
            }
        ]
    },
    {
        name: "Commission",
        Icon: RedeemRounded,
        path: "/commission",
        subTabs: [
            {
                name: "Commission",
                path: "/dashboard/commission/commission-range",
            },
            {
                name: "Allowance",
                path: "/commission/allowance/allowance request",
            }
        ]
    },
    {
        name: "Human Resource",
        Icon: Badge,
        path: "/dashboard/employees",
        subTabs: [
            {
                name: "Employees",
                path: "/dashboard/human-resource/employees",
            },
            {
                name: "User Wallet",
                path: "/dashboard/human-resource/user-wallet",
            },
            {
                name: "Leave Request",
                path: "/dashboard/human-resource/leave-request",
            }
        ]
    },

    {
        name: "Maintenance",
        Icon: Engineering,
        path: "/maintenance",
        subTabs: [
            {
                name: "Fuel Request",
                icon: EvStation,
                path: "/dashboard/maintenance/fuel-request",
            },
            {
                name: "Consumption",
                path: "/dashboard/maintenance/consumption/fuel-consumption",
                icon: EvStation,
            },
            {
                name: "Asset maintainance",
                icon: WebAsset,
                path: "/dashboard/maintenance/asset-maintenance/maintenance-request",
            }
        ]
    },

    {
        name: "Analytics",
        Icon: Insights,
        path: "/insights",
        subTabs: [

            {
                name: "Notification",
                icon: NotificationAddRounded,
                path: "/dashboard/analytics/notifications/notifications-users",
            },
            {
                name: "Tracking",
                icon: EvStation,
                path: "/insights/tracking"
            },
            {
                name: "Analytics",
                icon: EvStation,
                path: "/coming soon",
                isNew: true
            }
        ]
    },
    {
        name: "Help Center",
        Icon: Help,
        path: "/dashboard/help-center"
    },
    {
        name: "Settings",
        Icon: Settings,
        path: "/dashboard/settings"
    },
];

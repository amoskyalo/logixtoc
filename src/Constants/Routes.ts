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
                path: "/dashboard/inventory/stock"
            },
            {
                name: "Products",
                Icon: OilBarrel,
                path: "/dashboard/inventory/products",
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
                path: "/locations",
            },
            {
                name: "Location types",
                Icon: DeliveryDining,
                path: "/locations/location types",
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
                path: "/finance/accounts/accounts",
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
        path: "/customers",
        subTabs: [
            {
                name: "Customers",
                path: "/customers"
            },
            {
                name: "Regions",
                path: "/customers/regions"
            }
        ]
    },
    {
        name: "Suppliers",
        Icon: FilterCenterFocus,
        path: "/suppliers",
        subTabs: [
            {
                name: "Suppliers",
                Icon: Category,
                path: "/suppliers/suppliers",
            },
            {
                name: "Purchases",
                Icon: EmojiTransportation,
                path: "/suppliers/purchases/purchases",
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
                path: "/reconciliation/sales/summary",
            },
            {
                name: "Stocks",
                Icon: ShowChart,
                path: "/reconciliation/stocks/stock summary",
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
                path: "/commission/commission/commission range",
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
        path: "/employees",
        subTabs: [
            {
                name: "Employees",
                path: "/employees",
            },
            {
                name: "User Wallet",
                path: "/employees/wallets",
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
                path: "/maintenance/fuel request/fuel request",
            },
            {
                name: "Asset maintainance",
                icon: WebAsset,
                path: "/maintenance/asset maintainance/maintenance request",
            }
        ]
    },

    {
        name: "Insights",
        Icon: Insights,
        path: "/insights",
        subTabs: [

            {
                name: "Notification",
                icon: NotificationAddRounded,
                path: "/insights/notification/notification users",
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
        path: "/helper-center"
    },
    {
        name: "Settings",
        Icon: Settings,
        path: "/settings"
    },
];

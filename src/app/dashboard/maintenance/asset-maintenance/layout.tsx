import { TabsPageContainer } from '@/components/Containers';

const AssetMaintenanceLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <TabsPageContainer
            headerName="Asset maintenance"
            subTitle="Asset maintenace page"
            initialRoute="asset-maintenance/maintenance-request"
            parentRoute="maintenance/asset-maintenance"
            tabsList={['Maintenance Request', 'Maintenance Type']}
        >
            {children}
        </TabsPageContainer>
    );
};

export default AssetMaintenanceLayout;

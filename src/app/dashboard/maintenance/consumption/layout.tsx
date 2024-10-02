import { TabsPageContainer } from '@/components/Containers';

const ConsumptionLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <TabsPageContainer
            headerName="Consumption"
            subTitle="Consumption page"
            initialRoute="consumption/fuel-consumption"
            parentRoute="maintenance/consumption"
            tabsList={['Fuel Consumption', 'Ratio Setup']}
        >
            {children}
        </TabsPageContainer>
    );
};

export default ConsumptionLayout;

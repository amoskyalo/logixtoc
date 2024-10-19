import React from 'react';
import { TabsPageContainer } from '@/components/Containers';

const CommisionLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <TabsPageContainer
            headerName="Commision"
            subTitle="View, add your commisions from this page, from commision ranges, to commision types"
            initialRoute="commissions-rage"
            parentRoute="commission"
            tabsList={['Commission Range', 'Commission Type']}
        >
            {children}
        </TabsPageContainer>
    );
};

export default CommisionLayout;

'use client';

import { TablessContainer } from '@/components/Containers';
import { APPCRUD, UserWallet as UserWalletDataInterface } from '@/api';
import { useRouter } from 'next/navigation';

type Params = { UserID: number };

const UserWallet = () => {
    const router = useRouter();

    const handleNavigate = (route: string, activeRecord: UserWalletDataInterface) => {
        const url = `/dashboard/human-resource/user-wallet/${route}?UserID=${activeRecord.UserID}`;
        router.push(url);
    };

    const UI = new APPCRUD<UserWalletDataInterface, void, void, Params>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorUserWallet',
            actions: ['options'],
            params: { UserID: 0 },
            options: [
                { name: 'Statement', onClick: (activeRecord) => handleNavigate('statement', activeRecord) },
                { name: 'Withdraws', onClick: (activeRecord) => handleNavigate('withdraws', activeRecord) },
                { name: 'Earnings', onClick: (activeRecord) => handleNavigate('earnings', activeRecord) },
            ],
            columns: [
                { field: 'UserName', headerName: 'User Name', mobileWidth: 150 },
                { field: 'PhoneNumber', headerName: 'Phone Number', mobileWidth: 150 },
                { field: 'TotalCommission', headerName: 'Total Commission', type: 'number', mobileWidth: 170 },
                { field: 'WithdrawalAmount', headerName: 'Withdrawal', type: 'number', mobileWidth: 150 },
                { field: 'CurrentBalance', headerName: 'Current Balance', type: 'number', mobileWidth: 170 },
                { field: 'BalanceForward', headerName: 'Balance Forward', type: 'number', mobileWidth: 170 },
            ],
        },
    });

    return (
        <TablessContainer headerName="User Wallet" subTitle="User Wallet page">
            {UI.render()}
        </TablessContainer>
    );
};

export default UserWallet;

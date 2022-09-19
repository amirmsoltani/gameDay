import UsersPage from '@/components/users';
import AppLayout from '@/layout/app-layout';
import React, { FC } from 'react';

const Dashboard: FC = () => {
    return (
        <AppLayout>
            <UsersPage />
        </AppLayout>
    );
};

export default Dashboard;

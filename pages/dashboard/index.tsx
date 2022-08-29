import { DashboardPage } from '@/components/dashboard';
import AppLayout from '@/layout/app-layout';
import React, { FC } from 'react';

const Dashboard: FC = () => {
    return (
        <AppLayout>
            <DashboardPage />
        </AppLayout>
    );
};

export default Dashboard;

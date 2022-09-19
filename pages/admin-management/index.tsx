import AdminManagement from '@/components/admin-management';
import AppLayout from '@/layout/app-layout';
import React, { FC } from 'react';

const Dashboard: FC = () => {
    return (
        <AppLayout>
            <AdminManagement />
        </AppLayout>
    );
};

export default Dashboard;

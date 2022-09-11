import JobsPage from '@/components/jobs';
import AppLayout from '@/layout/app-layout';
import React, { FC } from 'react';

const Dashboard: FC = () => {
    return (
        <AppLayout>
            <JobsPage />
        </AppLayout>
    );
};

export default Dashboard;

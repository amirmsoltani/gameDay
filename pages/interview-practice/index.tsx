import InterviewPracticePage from '@/components/interview-practice/interview-practice';
import AppLayout from '@/layout/app-layout';
import React, { FC } from 'react';

const Dashboard: FC = () => {
    return (
        <AppLayout>
            <InterviewPracticePage />
        </AppLayout>
    );
};

export default Dashboard;

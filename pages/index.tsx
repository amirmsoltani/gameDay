import React, { useEffect } from 'react';
import AppLayout from '@/layout/app-layout';
import { useRouter } from 'next/router';
import Loading from '@/components/loading';

const Dashboard = () => {
    const router = useRouter();
    useEffect(() => {
        router.replace('/dashboard');
    }, []);

    return (
        <AppLayout>
            <Loading />
        </AppLayout>
    );
};

export default Dashboard;

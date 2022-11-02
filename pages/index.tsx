import React from 'react';
import AppLayout from '@/layout/app-layout';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
    return { redirect: { destination: '/dashboard', permanent: false } };
};

const Dashboard = () => {
    return <AppLayout>test</AppLayout>;
};

export default Dashboard;

import React from 'react';
import BaseLayout from '@/layout/base.layout';
import LoginComponent from '@/components/auth/login';

const Index = () => {
    return (
        <BaseLayout>
            <LoginComponent />
        </BaseLayout>
    );
};

export default Index;

import React from 'react';
import BaseLayout from '@/layout/base.layout';
import CreateNewPassWord from '@/components/auth/login/create-new-password';

const Index = () => {
    return (
        <BaseLayout>
            <CreateNewPassWord />
        </BaseLayout>
    );
};

export default Index;

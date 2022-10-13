import ChatPage from '@/components/chat/index';
import AppLayout from '@/layout/app-layout';
import React, { FC } from 'react';

const CareerCoach: FC = () => {
    return (
        <AppLayout>
            <ChatPage name={'Problem'} />
        </AppLayout>
    );
};

export default CareerCoach;

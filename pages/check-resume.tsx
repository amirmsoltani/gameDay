import ChatPage from '@/components/chat/index';
import AppLayout from '@/layout/app-layout';
import React, { FC } from 'react';

const CheckResume: FC = () => {
    return (
        <AppLayout>
            <ChatPage name={'Resume check'} />
        </AppLayout>
    );
};

export default CheckResume;

import ChatPage from '@/components/chat/index';
import AppLayout from '@/layout/app-layout';
import React, { FC } from 'react';

const InterviewPractice: FC = () => {
    return (
        <AppLayout>
            <ChatPage name={'Practice'} />
        </AppLayout>
    );
};

export default InterviewPractice;

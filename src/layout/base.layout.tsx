import React, { FC,ReactNode } from 'react';
import Modals from '@/components/shared/modals/modals';

interface Props  {
    children: ReactNode;
}

const BaseLayout:FC<Props> = ({ children }) => {
    return (
        <>
            {children}
            <Modals />
        </>
    );
};

export default BaseLayout;

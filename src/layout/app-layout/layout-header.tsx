import React, { FC, ReactNode, useContext, useEffect } from 'react';
import { LayoutContext } from './layout-context';

type PropsType = { children: ReactNode };

const LayoutHeader: FC<PropsType> = ({ children }) => {
    const { setChildren } = useContext(LayoutContext);

    useEffect(() => {
        setChildren(children);
    }, [children]);

    return null;
};

export default LayoutHeader;

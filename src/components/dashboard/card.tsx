import { Typography } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import * as S from './dashboard-style';

type PropsType = {
    children: ReactNode;
    column: string;
    row?: string;
    primary?: boolean;
    title: string;
    headerOptions?: ReactNode;
    minHeight?: number;
};

export const Card: FC<PropsType> = ({
    children,
    column,
    row = 'span 3',
    primary,
    title,
    headerOptions,
    minHeight = 200
}) => {
    return (
        <S.CardWrapper
            gridColumn={column}
            className={primary && 'primary'}
            gridRow={row}
            minHeight={minHeight}>
            <S.CardHeader className={primary && 'primary'}>
                <Typography className="card__header__title">{title}</Typography>
                <div>{headerOptions}</div>
            </S.CardHeader>
            {children}
        </S.CardWrapper>
    );
};

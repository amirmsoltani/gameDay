import LayoutHeader from '@/layout/app-layout/layout-header';
import { Grid } from '@mui/material';
import React, { FC } from 'react';
import * as S from './users-style';

type PropsType = {
    active?: boolean;
    onClick: () => void;
    onChange: (checked: boolean) => void;
    children?: undefined;
};

const Users: FC<PropsType> = ({ active, data, onClick }) => {
    return (
        <S.ListHeader container gridRow={'span 1'}>
            <Grid lg={0.5} xs={12} item />
            <Grid lg={2.5} xs={12} className={'list-header__item no-center'} item>
                Sort by
            </Grid>
            <Grid lg={2.5} xs={12} className={'list-header__item'} item>
                User Email
            </Grid>
            <Grid lg={3} xs={12} className={'list-header__item'} item>
                User Phone number
            </Grid>
            <Grid lg={2.5} xs={12} className={'list-header__item'} item>
                situation
            </Grid>
            <Grid lg={0.5} xs={12} className={'list-header__item'} item></Grid>
        </S.ListHeader>
    );
};

export default Users;

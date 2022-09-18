import { Divider, Grid } from '@mui/material';
import React, { FC } from 'react';
import * as S from './users-style';
import MoreMenu from './user-more-menu';
import { MImage } from '../base/image/MImage';

type PropsType = {
    active?: boolean;
    onClick: () => void;
    children?: undefined;
    data: {
        pictureUrl: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        activeStatus: string;
    };
};

const UserList: FC<PropsType> = ({ data, active, onClick }) => {
    return (
        <Grid>
            <S.ListBodyUser container gridRow={'span 1'} className={'active'} onClick={onClick}>
                <Grid lg={0.5} xs={12} item />
                <Grid lg={2.5} xs={12} className={'list-header__item no-center'} item>
                    <Grid className="User-info">
                        <MImage
                            resources={{ src: data?.pictureUrl, fallback: '/images/user.jpg' }}
                            className="user-card__logo"></MImage>
                        <span>
                            {data.firstName}
                            {data.lastName}
                        </span>
                    </Grid>
                </Grid>
                <Grid lg={2.5} xs={12} className={'list-header__item'} item>
                    {data.email}
                </Grid>
                <Grid lg={3} xs={12} className={'list-header__item'} item>
                    {data?.phoneNumber}
                </Grid>
                <Grid lg={2.5} xs={12} className={'list-header__item'} item>
                    {data.activeStatus}
                </Grid>
                <Grid lg={0.5} xs={12} className={'list-header__item'} item>
                    <MoreMenu />
                </Grid>
            </S.ListBodyUser>
            <Divider orientation="vertical" flexItem />
        </Grid>
    );
};
export default UserList;

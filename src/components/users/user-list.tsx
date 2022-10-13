import { Divider, Grid } from '@mui/material';
import React from 'react';
import * as S from './users-style';
import MoreMenu from './user-more-menu';
import { MImage } from '../base/image/MImage';

export const UserList = () => {
    return (
        <Grid>
            <S.ListBodyUser container gridRow={'span 1'}>
                <Grid lg={0.5} xs={12} item />
                <Grid lg={2.5} xs={12} className={'list-header__item no-center'} item>
                    <Grid container className="User-info" item>
                        {/* <MImage resources={{ fallback: '/images/user.jpg' }} /> */}
                        <span>
                            Tolu Arowoselu
                            {/* {data.firstName}
                            {data.lastName} */}
                        </span>
                    </Grid>
                </Grid>
                <Grid lg={2.5} xs={12} className={'list-header__item'} item>
                    sampleemail@gmail.com
                    {/* {data.email} */}
                </Grid>
                <Grid lg={3} xs={12} className={'list-header__item'} item>
                    +4498979883
                    {/* {data?.phoneNumber} */}
                </Grid>
                <Grid lg={2.5} xs={12} className={'list-header__item'} item>
                    Normal
                    {/* {data.activeStatus} */}
                </Grid>
                <Grid lg={0.5} xs={12} className={'list-header__item'} item>
                    <MoreMenu />
                </Grid>
            </S.ListBodyUser>
            <Divider orientation="vertical" flexItem />
        </Grid>
    );
};

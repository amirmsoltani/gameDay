import { Divider, Grid } from '@mui/material';
import React, { FC } from 'react';
import * as S from './users-style';
import MoreMenu from './user-more-menu';
import { MImage } from '../base/image/MImage';
import {
    ActiveStatus,
    useChangeUserActiveStatusMutation,
    useUnSuspendUserMutation
} from 'src/graphql/generated';

type PropsType = {
    data: {
        id: number;
        firstName?: string;
        lastName?: string;
        pictureUrl?: string;
        phoneNumber?: string;
        email?: string;
        activeStatus?: ActiveStatus;
    };
    onChange: (status: ActiveStatus) => void;
    self?: boolean;
};

export const UserList: FC<PropsType> = ({ data, onChange, self = false }) => {
    const updateUserActiveStatus = useChangeUserActiveStatusMutation({
        onSuccess: () => {
            onChange(ActiveStatus.Suspend);
        }
    });

    const unSuspend = useUnSuspendUserMutation({
        onSuccess: () => {
            onChange(ActiveStatus.Accepted);
        }
    });
    return (
        <Grid>
            <S.ListBodyUser container gridRow={'span 1'}>
                <Grid lg={0.5} xs={12} item />
                <Grid lg={2.5} xs={12} className={'list-header__item no-center'} item>
                    <Grid container className="User-info" item>
                        <MImage
                            resources={{ fallback: '/images/user.jpg', src: data.pictureUrl }}
                            className="user__avatar"
                        />
                        <span>
                            {data?.firstName}
                            {data?.lastName}
                        </span>
                    </Grid>
                </Grid>
                <Grid lg={2.5} xs={12} className={'list-header__item'} item>
                    {data?.email}
                </Grid>
                <Grid lg={3} xs={12} className={'list-header__item'} item>
                    {data?.phoneNumber}
                </Grid>
                <Grid lg={2.5} xs={12} className={'list-header__item'} item>
                    {data?.activeStatus === ActiveStatus.Accepted ? (
                        'Normal'
                    ) : (
                        <>
                            <div
                                style={{
                                    width: 15,
                                    height: 15,
                                    backgroundColor: 'red',
                                    borderRadius: '50%',
                                    marginRight: 15
                                }}
                            />{' '}
                            suspended
                        </>
                    )}
                </Grid>
                <Grid lg={0.5} xs={12} className={'list-header__item'} item>
                    {!self && (
                        <MoreMenu
                            OnClick={() => {
                                data.activeStatus === ActiveStatus.Accepted
                                    ? updateUserActiveStatus.mutate({ id: data.id })
                                    : unSuspend.mutate({ id: data.id });
                            }}
                            status={data.activeStatus}
                        />
                    )}
                </Grid>
            </S.ListBodyUser>
            <Divider orientation="vertical" flexItem />
        </Grid>
    );
};

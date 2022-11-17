import { Divider, Grid } from '@mui/material';
import React, { FC } from 'react';
import * as S from './admin-style';

import { MImage } from '../base/image/MImage';
import MoreMenu from '../users/user-more-menu';
import { OutlineDashboardIcon } from 'src/assets/icons/outline-dashboard';
import { PeopleIcon } from 'src/assets/icons/people';
import { ViewListIcon } from 'src/assets/icons/view-list';
import {
    ActiveStatus,
    useChangeUserActiveStatusMutation,
    User,
    useUnSuspendUserMutation
} from 'src/graphql/generated';
import DashboardIcon from 'src/assets/icons/dashboard-icon';
import CatalogIcon from 'src/assets/icons/catalog-icon';
import JobIcon from 'src/assets/icons/job-icon';
import CheckResumeIcon from 'src/assets/icons/check-resume-icon';
import InterviewIcon from 'src/assets/icons/interview-icon';
import CareerCoachIcon from 'src/assets/icons/career-coach-icon';
import UserIcon from 'src/assets/icons/user-icon';
import ManagementIcon from 'src/assets/icons/management-icon';

const MapTextToIcon = {
    Dashboard: <DashboardIcon key={1} />,
    Catalogs: <CatalogIcon key={2} />,
    Jobs: <JobIcon key={3} />,
    'Check resume': <CheckResumeIcon key={4} />,
    'Interview Practice': <InterviewIcon key={5} />,
    'Career Coach': <CareerCoachIcon key={6} />,
    Users: <UserIcon key={7} />,
    "Admin Management": <ManagementIcon key={8} />
};

type PropsType = { data: Partial<User>; onSuspended: (status: ActiveStatus) => void };

const AdminManagementList: FC<PropsType> = ({ data, onSuspended }) => {
    const updateUserActiveStatus = useChangeUserActiveStatusMutation({
        onSuccess: () => {
            onSuspended(ActiveStatus.Suspend);
        }
    });

    const unSuspend = useUnSuspendUserMutation({
        onSuccess: () => {
            onSuspended(ActiveStatus.Accepted);
        }
    });

    return (
        <Grid>
            <S.ListBodyUser container gridRow={'span 1'}>
                <Grid lg={0.5} xs={12} item />
                <Grid lg={2.5} xs={12} className={'list-header__item no-center'} item>
                    <Grid className="User-info">
                        <span>
                            <MImage
                                resources={{ fallback: '/images/user.jpg', src: data.pictureUrl }}
                                className="user__avatar"
                            />
                            {data.firstName + ' '}
                            {data.lastName}
                        </span>
                    </Grid>
                </Grid>
                <Grid lg={2.5} xs={12} className={'list-header__item'} item>
                    {data.email || '-'}
                </Grid>
                <Grid lg={3} xs={12} className={'list-header__item'} item>
                    {data?.phoneNumber || '-'}
                </Grid>
                <Grid lg={2.5} xs={12} className={'list-header__item'} item>
                    {data.userRoles.map((role) => MapTextToIcon[role.role.title])}
                </Grid>
                <Grid lg={0.5} xs={12} className={'list-header__item'} item>
                    <MoreMenu
                        status={data.activeStatus}
                        OnClick={() => {
                            data.activeStatus === ActiveStatus.Accepted
                                ? updateUserActiveStatus.mutate({ id: data.id })
                                : unSuspend.mutate({ id: data.id });
                        }}
                    />
                </Grid>
            </S.ListBodyUser>
            <Divider orientation="vertical" flexItem />
        </Grid>
    );
};
export default AdminManagementList;

import { Grid } from '@mui/material';
import React, { FC, useState } from 'react';
import SaveIcon from 'src/assets/icons/save-icon';
import {
    JobRequestGetJobRequestsQuery,
    useInfiniteJobRequestGetJobRequestsQuery
} from 'src/graphql/generated';
import { MImage } from '../base/image/MImage';
import { PrimarySpinner } from '../base/loader/spinner';
import { MButton } from '../base/MButton';
import * as S from './jobs-style';

type PropsType = {
    id: number;
};

type ListType = JobRequestGetJobRequestsQuery['jobrequest_getJobRequests']['result']['items'];
const ApplicantList: FC<PropsType> = ({ id }) => {
    const [itemList, setItemList] = useState<ListType>([]);

    const [end, setEnd] = useState(false);

    const { isFetching, isFetchingNextPage, fetchNextPage } =
        useInfiniteJobRequestGetJobRequestsQuery(
            { take: 10, skip: 0, where: { skillCategoryId: { eq: id } } },
            {
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                keepPreviousData: true,
                onSuccess: ({ pages }) => {
                    const length = pages.length;
                    if (length === 1) {
                        setItemList([...pages[0]?.jobrequest_getJobRequests.result.items]);
                    } else {
                        setItemList([
                            ...itemList,
                            ...(pages[length - 1]?.jobrequest_getJobRequests.result.items || [])
                        ]);
                    }
                    if (
                        pages[length - 1].jobrequest_getJobRequests.result.pageInfo.hasNextPage ===
                        false
                    ) {
                        setEnd(true);
                    }
                },
                getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
            }
        );

    if (isFetching && !isFetchingNextPage)
        return (
            <S.Content display={'flex'} justifyContent="center" alignItems="center">
                <PrimarySpinner />
            </S.Content>
        );

    return (
        <S.JobLearn>
            <div className="job__box-header">
                <Grid container className="job__box-title">
                    <Grid md={3.5} xs={3.5} item>
                        applicant
                    </Grid>
                    <Grid md={3.5} xs={3.5} item className="list-header__center">
                        apply Date
                    </Grid>
                    <Grid md={3.5} xs={3.5} item className="list-header__center">
                        Applicant Email
                    </Grid>
                    <Grid md={3.5} xs={3.5} item className="list-header__center">
                        Applicant CV
                    </Grid>
                    <Grid md={3.5} xs={3.5} item className="list-header__center">
                        situation
                    </Grid>
                </Grid>
                <div className="box-btn__btn">
                    <MButton>
                        <SaveIcon />
                    </MButton>
                </div>
            </div>

            <div
                className="catalog-skill__list-body"
                onScroll={(event: any) => {
                    const { scrollTop, scrollHeight, clientHeight } = event.target;
                    if (
                        scrollTop + clientHeight >= scrollHeight * 0.5 &&
                        !end &&
                        !isFetchingNextPage
                    ) {
                        fetchNextPage();
                    }
                }}>
                <Grid container className="catalog-skill__card-body">
                    <Grid md={1} xs={1} className="card-body__item card-body__index " item></Grid>
                    <Grid md={4} xs={4} className="card-body__item card-body__title" item>
                        <MImage
                            className="title__icon"
                            resources={{
                                // src: user.user.pictureUrl,
                                fallback: '/images/user.jpg'
                            }}
                        />
                        <div className="title__text-box">
                            <span>
                                bardia bastami
                                {/* {user.user.firstName} {user.user.lastName} */}
                            </span>
                        </div>
                    </Grid>
                    <Grid md={3.5} xs={3.5} className="card-body__item" item>
                        bardia bastami
                    </Grid>
                    <Grid md={3.5} xs={3.5} className="card-body__item" item>
                        bardia bastami
                    </Grid>
                    <Grid md={3.5} xs={3.5} className="card-body__item" item>
                        bardia bastami
                    </Grid>
                    <Grid md={3.5} xs={3.5} className="card-body__item" item>
                        bardia bastami
                    </Grid>
                </Grid>
            </div>
        </S.JobLearn>
    );
};

export default ApplicantList;

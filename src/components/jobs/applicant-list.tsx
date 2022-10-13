import { Grid, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import SaveIcon from 'src/assets/icons/save-icon';
import {
    JobRequestGetJobRequestsQuery,
    useInfiniteJobRequestGetJobRequestsQuery
} from 'src/graphql/generated';
import { MImage } from '../base/image/MImage';
import { PrimarySpinner } from '../base/loader/spinner';
import { MButton } from '../base/MButton';
import * as S from './applicant-style';
import Situation from './situation';

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
                    <Grid md={2.4} xs={2.4} className="detail__item" item>
                        applicant
                    </Grid>
                    <Grid md={2} xs={2.4} item>
                        apply Date
                    </Grid>
                    <Grid md={3.1} xs={2.4} item>
                        Applicant Email
                    </Grid>

                    <Grid md={2} xs={2.4} item>
                        Applicant CV
                    </Grid>
                    <Grid md={2.4} xs={2.4} item>
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
                <div className="jobs__card-body">
                    <Grid container className="card-body__item">
                        <Grid md={2.4} xs={2.4} item className="user-icon">
                            <MImage
                                className="title__icon"
                                resources={{
                                    // src: user.user.pictureUrl,
                                    fallback: '/images/user.jpg'
                                }}
                            />
                            <div className="card-body__item">
                                <span>
                                    bardia bastami
                                    {/* {user.user.firstName} {user.user.lastName} */}
                                </span>
                            </div>
                        </Grid>
                        <Grid md={2} xs={2.4} className="detail__item card-body__item" item>
                            20/03/2020
                        </Grid>
                        <Grid md={3.1} xs={2.4} className=" detail__item card-body__item" item>
                            <S.EmailLink>sampleemail@gmail.com</S.EmailLink>
                        </Grid>

                        <Grid md={2} xs={2.4} className="detail__item" item>
                            <S.CvButton>Download CV</S.CvButton>
                        </Grid>

                        <Grid md={2.4} xs={2.4} className="detail__item" item>
                            <Situation />
                        </Grid>
                    </Grid>
                    <div className="box-btn__btn">
                        <MButton>
                            <Grid sx={{ width: 30 }} />
                        </MButton>
                    </div>
                </div>
            </div>
        </S.JobLearn>
    );
};

export default ApplicantList;

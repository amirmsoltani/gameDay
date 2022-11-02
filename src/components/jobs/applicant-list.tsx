import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import SaveIcon from 'src/assets/icons/save-icon';
import {
    JobRequestGetJobRequestsQuery,
    JobRequestSortInput,
    SortEnumType,
    useInfiniteJobRequestGetJobRequestsQuery,
    useUpdateJobRequestStatusMutation
} from 'src/graphql/generated';
import { MImage } from '../base/image/MImage';
import { PrimarySpinner } from '../base/loader/spinner';
import { MButton } from '../base/MButton';
import Loading from '../loading';
import Sort from '../sort';
import * as S from './applicant-style';
import Situation from './situation';

type PropsType = {
    id: number;
};

type ListType = JobRequestGetJobRequestsQuery['jobRequest_getJobRequests']['result']['items'];
const ApplicantList: FC<PropsType> = ({ id }) => {
    const [sort, setSort] = useState<JobRequestSortInput>({
        user: { firstName: SortEnumType.Asc, lastName: SortEnumType.Asc }
    });
    const sorting = (name: keyof JobRequestSortInput | { [key: string]: object }) => () => {
        if (typeof name === 'object') {
            setSort(name);
            return;
        }
        if (sort[name] === SortEnumType.Asc) {
            setSort({ [name]: SortEnumType.Desc });
        } else {
            setSort({ [name]: SortEnumType.Asc });
        }
    };
    const [itemList, setItemList] = useState<ListType>([]);

    const [end, setEnd] = useState(false);

    const { isFetching, isFetchingNextPage, fetchNextPage } =
        useInfiniteJobRequestGetJobRequestsQuery(
            { take: 10, skip: 0, where: { jobId: { eq: id } }, order: sort },
            {
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                keepPreviousData: true,
                onSuccess: ({ pages }) => {
                    const length = pages.length;
                    if (length === 1) {
                        setItemList([...pages[0]?.jobRequest_getJobRequests.result.items]);
                    } else {
                        setItemList([
                            ...itemList,
                            ...(pages[length - 1]?.jobRequest_getJobRequests.result.items || [])
                        ]);
                    }
                    if (
                        pages[length - 1].jobRequest_getJobRequests.result.pageInfo.hasNextPage ===
                        false
                    ) {
                        setEnd(true);
                    }
                },
                getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
            }
        );

    const updateJobRequestStatus = useUpdateJobRequestStatusMutation();

    if (isFetching && !isFetchingNextPage) return <Loading />;

    return (
        <S.JobLearn>
            <div className="job__box-header">
                <Grid container className="job__box-title">
                    <Grid
                        md={2.4}
                        xs={2.4}
                        className="detail__item"
                        item
                        onClick={sorting({
                            user:
                                sort.user?.firstName === SortEnumType.Asc
                                    ? { firstName: SortEnumType.Desc, lastName: SortEnumType.Desc }
                                    : { firstName: SortEnumType.Asc, lastName: SortEnumType.Asc }
                        })}>
                        applicant
                        <Sort name="firstName" sortObject={sort.user} />
                    </Grid>
                    <Grid md={2} xs={2.4} item onClick={sorting('createdDate')}>
                        apply Date
                        <Sort name="createDate" sortObject={sort} />
                    </Grid>
                    <Grid
                        md={3.1}
                        xs={2.4}
                        item
                        onClick={sorting({
                            user:
                                sort.user?.email === SortEnumType.Asc
                                    ? { email: SortEnumType.Desc }
                                    : { email: SortEnumType.Asc }
                        })}>
                        Applicant Email
                        <Sort name="email" sortObject={sort.user} />
                    </Grid>

                    <Grid md={2} xs={2.4} item onClick={sorting('cVFileUrl')}>
                        Applicant CV
                        <Sort name="cVFileUrl" sortObject={sort} />
                    </Grid>
                    <Grid md={2.4} xs={2.4} item onClick={sorting('status')}>
                        situation
                        <Sort name="status" sortObject={sort} />
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
                }}
                className="table__wrapper"
                >
                {itemList.map((request) => (
                    <div className="jobs__card-body" key={request.id}>
                        <Grid container className="card-body__item">
                            <Grid md={2.4} xs={2.4} item className="user-icon">
                                <MImage
                                    className="title__icon"
                                    resources={{
                                        src: request.user.pictureUrl,
                                        fallback: '/images/user.jpg'
                                    }}
                                />
                                <div className="card-body__item">
                                    <span>
                                        {request.user.firstName} {request.user.lastName}
                                    </span>
                                </div>
                            </Grid>
                            <Grid md={2} xs={2.4} className="detail__item card-body__item" item>
                                {dayjs(request.createdDate).format('DD/MM/YYYY')}
                            </Grid>
                            <Grid md={3.1} xs={2.4} className=" detail__item card-body__item" item>
                                <S.EmailLink>{request.user.email}</S.EmailLink>
                            </Grid>

                            <Grid md={2} xs={2.4} className="detail__item" item>
                                <Link href={request.cVFileUrl || ''} target="_blank">
                                    <S.CvButton>Download CV</S.CvButton>
                                </Link>
                            </Grid>

                            <Grid md={2.5} xs={2.4} className="detail__item" item >
                                <Situation
                                    value={request.status}
                                    onChange={(status) => {
                                        updateJobRequestStatus.mutate({
                                            input: { id: request.id, status }
                                        });
                                    }}
                                />
                            </Grid>
                        </Grid>
                        
                    </div>
                ))}
            </div>
        </S.JobLearn>
    );
};

export default ApplicantList;

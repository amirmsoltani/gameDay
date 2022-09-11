import React, { FC, Fragment, useState } from 'react';
import CommentIcon from 'src/assets/icons/comment-icon';
import PlayIcon from 'src/assets/icons/play-icon';
import SaveIcon from 'src/assets/icons/save-icon';
import {
    JobRequestGetJobRequestsQuery,
    useInfiniteJobRequestGetJobRequestsQuery
} from 'src/graphql/generated';
import { MImage } from '../base/image/MImage';
import { PrimarySpinner } from '../base/loader/spinner';
import { MButton } from '../base/MButton';
import * as S from './jobs-style';
import UserCv from './user-cv';

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
        <S.JobLearn
            onScroll={(event: any) => {
                const { scrollTop, scrollHeight, clientHeight } = event.target;
                if (scrollTop + clientHeight >= scrollHeight * 0.5 && !end && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }}>
            <div className="job__box-header">
                <div className="job__box-title">
                    <span className="job__title">applicant</span>
                    <span className="job__title">apply Date</span>
                    <span className="job__title">Applicant Email</span>
                    <span className="job__title">Applicant CV</span>
                    <span className="job__title">situation</span>
                </div>
                <div className="box-btn__btn">
                    <MButton>
                        <SaveIcon />
                    </MButton>
                </div>
            </div>

            {/* <div className="">
                {itemList.map((item) => (
                    <UserCv key={item.user.pictureUrl} data={{}} />
                ))}
            </div> */}
        </S.JobLearn>
    );
};

export default ApplicantList;

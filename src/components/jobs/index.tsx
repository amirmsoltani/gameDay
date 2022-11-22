import LayoutHeader from '@/layout/app-layout/layout-header';
import keyGenerator from '@/utils/key-generator';
import { Grid } from '@mui/material';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import { GetJobsQuery, useInfiniteGetJobsQuery } from 'src/graphql/generated';
import useDebounce from 'src/hooks/useDebounce';
import SearchInput from '../base/input/search-input';
import { PrimarySpinner } from '../base/loader/spinner';
import ApplicantList from './applicant-list';
import JobsCard from './jobs-card';
import * as S from './jobs-style';

function JobsPage() {
    const [itemList, setItemList] = useState<GetJobsQuery['job_getJobs']['result']['items']>([]);
    const [searchText, setSearchText] = useState<string>('');
    const finalSearchText = useDebounce(searchText, 500);
    const totalItems = useRef<number | null>(null);
    const [end, setEnd] = useState(false);
    const [state, setState] = useState<{ activeCategory?: number } | null>(null);
    const { isLoading, isFetchingNextPage, fetchNextPage } = useInfiniteGetJobsQuery(
        { take: 10, skip: 0, where: { title: { contains: finalSearchText } } },

        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    totalItems.current = pages[0].job_getJobs!.result!.totalCount;
                    setItemList(keyGenerator([...pages[0].job_getJobs.result.items]));
                    setState({
                        activeCategory: pages[0].job_getJobs.result.items[0]?.id
                    });
                } else {
                    setItemList(keyGenerator([
                        ...itemList,
                        ...(pages[length - 1].job_getJobs.result.items || [])
                    ]));
                }
                if (pages[length - 1].job_getJobs.result.pageInfo.hasNextPage === false) {
                    setEnd(true);
                }else if (end) {
                    setEnd(false);
                }
            },
            getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
        }
    );

    if (isLoading)
        return (
            <S.Content display={'flex'} justifyContent="center" alignItems="center">
                <PrimarySpinner />
            </S.Content>
        );

    return (
        <S.Content container>
            <LayoutHeader>
                <S.Header>
                    <div className="header__info-box">Jobs list</div>
                    <span>{totalItems.current} items Listed</span>
                    <SearchInput
                        onChange={(event: any) => {
                            setSearchText(event.target.value);
                        }}
                        wrapperClassName="header__search-input"
                    />
                    <Link href={'/jobs/add-jobs'}>
                        <a className="header__link-button">
                            <PlusIcon className="link-button__plus" /> Add New Job
                        </a>
                    </Link>
                </S.Header>
            </LayoutHeader>
            <S.LeftSide
                item
                container
                md={3}
                xs={12}
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
                <Grid item xs={12} md={11} className="left-side__cards">
                    {itemList.map((item) => (
                        <JobsCard
                            key={item.key}
                            onClick={() => {
                                if (item.id !== state.activeCategory)
                                    setState({
                                        activeCategory: item.id
                                    });
                            }}
                            onChange={(checked) => {}}
                            active={item.id === state.activeCategory}
                            data={{
                                id: item.id,
                                status: item.status,
                                title: item.title,
                                jobType: item.jobType,
                                city: item.city,
                                experienceLevel: item.experienceLevel,
                                createdDate: item.createdDate,
                                company: item.company
                            }}
                        />
                    ))}
                </Grid>
                <Grid item xs={0} md={1} />
            </S.LeftSide>
            <S.RightSide container item md={9} xs={12}>
                <ApplicantList id={state?.activeCategory} />
            </S.RightSide>
        </S.Content>
    );
}

export default JobsPage;

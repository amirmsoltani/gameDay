import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { GetJobsQuery, useInfiniteGetJobsQuery } from 'src/graphql/generated';
import useDebounce from 'src/hooks/useDebounce';
import { PrimarySpinner } from '../base/loader/spinner';
import ApplicantList from './applicant-list';
import JobsCard from './jobs-card';
import * as S from './jobs-style';

function JobsPage() {
    const [itemList, setItemList] = useState<GetJobsQuery['job_getJobs']['result']['items']>([]);
    const [searchText, setSearchText] = useState<string>('');
    const finalSearchText = useDebounce(searchText, 500);

    const [end, setEnd] = useState(false);
    const [state, setState] = useState<{ tab: 'skills' | 'learn'; activeCategory?: number } | null>(
        null
    );
    const { isLoading, isFetchingNextPage, fetchNextPage } = useInfiniteGetJobsQuery(
        { take: 5, skip: 0, where: { title: { contains: finalSearchText } } },

        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    setItemList([...pages[0].job_getJobs.result.items]);
                    setState({
                        tab: 'learn',
                        activeCategory: pages[0].job_getJobs.result.items[0]?.id
                    });
                } else {
                    setItemList([
                        ...itemList,
                        ...(pages[length - 1].job_getJobs.result.items || [])
                    ]);
                }
                if (pages[length - 1].job_getJobs.result.pageInfo.hasNextPage === false) {
                    setEnd(true);
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
                <Grid item xs={11} className="left-side__cards">
                    {itemList.map((item) => (
                        <JobsCard
                            key={item.title}
                            onClick={() => {
                                if (item.id !== state.activeCategory)
                                    setState({
                                        tab: 'learn',
                                        activeCategory: item.id
                                    });
                            }}
                            active={item.id === state.activeCategory}
                            data={{
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
                <Grid item xs={1} className="left-side__column" />
            </S.LeftSide>
            <S.RightSide container item md={7.5}>
                {state.tab === 'learn' ? <ApplicantList id={state?.activeCategory} /> : null}
            </S.RightSide>
        </S.Content>
    );
}

export default JobsPage;

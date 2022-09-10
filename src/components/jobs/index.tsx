import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { CommentStatus, GetJobsQuery, useInfiniteGetJobsQuery } from 'src/graphql/generated';
import useDebounce from 'src/hooks/useDebounce';
import { PrimarySpinner } from '../base/loader/spinner';
import CatalogLearnSection from './applicant-list';
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
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    setItemList([...pages[0].job_getJobs.result.items]);
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
            getNextPageParam: (_, pages) => ({ skip: pages.length * 5 })
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
                md={3.5}
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
                <Grid item lg={11} className="left-side__cards">
                    {itemList.map((item) => (
                        <JobsCard
                            key={item.title}
                            onChangeTab={() => {
                                setState({ ...state, tab });
                            }}
                            onClick={() => {}}
                            active={item?.id === state?.activeCategory}
                            data={{
                                title: item.title
                            }}
                        />
                    ))}
                </Grid>
                <Grid item lg={1} className="left-side__column" />
            </S.LeftSide>
            <S.RightSide container item md={7.5}>
                <CatalogLearnSection id={state?.activeCategory} />
            </S.RightSide>
        </S.Content>
    );
}

export default JobsPage;

// import { Box, Grid, Typography } from '@mui/material';
// import React, { useState } from 'react';
// import { ApplicantList } from './applicant-list';
// import * as S from './jobs-styled';
// import { JobCard } from './jods-card';

// export const JobsPage = () => {
//     // const [activeJobId, setActiveJobId] = useState();
//     // const data = [
//     //     {
//     //         id: 1,
//     //         title: 'UI UX Designer',
//     //         city: 'Amsterdam',
//     //         time: 'Full time',
//     //         level: ' xp. level: Senior',
//     //         publish: '10 days ago'
//     //     },
//     //     {
//     //         id: 2,
//     //         title: 'UI UX Designer',
//     //         city: 'Amsterdam',
//     //         time: 'Full time',
//     //         level: ' xp. level: Senior',
//     //         publish: '10 days ago'
//     //     },
//     //     {
//     //         id: 3,
//     //         title: 'UI UX Designer',
//     //         city: 'Amsterdam',
//     //         time: 'Full time',
//     //         level: ' xp. level: Senior',
//     //         publish: '10 days ago'
//     //     },
//     //     {
//     //         id: 4,
//     //         title: 'UI UX Designer',
//     //         city: 'Amsterdam',
//     //         time: 'Full time',
//     //         level: ' xp. level: Senior',
//     //         publish: '10 days ago'
//     //     },
//     //     {
//     //         id: 5,
//     //         title: 'UI UX Designer',
//     //         city: 'Amsterdam',
//     //         time: 'Full time',
//     //         level: ' xp. level: Senior',
//     //         publish: '10 days ago'
//     //     },
//     //     {
//     //         id: 6,
//     //         title: 'UI UX Designer',
//     //         city: 'Amsterdam',
//     //         time: 'Full time',
//     //         level: ' xp. level: Senior',
//     //         publish: '10 days ago'
//     //     }
//     // ];
//     return (
//         // <Grid container>
//         //     <Grid item xs={12} md={5} lg={3}>
//         //         <S.ScrollBarJobs>
//         //             {data?.map((dt) => {
//         //                 return (
//         //                     <JobCard
//         //                         id={dt.id}
//         //                         key={dt.id}
//         //                         title={dt.title}
//         //                         city={dt.city}
//         //                         time={dt.time}
//         //                         level={dt.level}
//         //                         publish={dt.publish}
//         //                     />
//         //                 );
//         //             })}
//         //         </S.ScrollBarJobs>
//         //     </Grid>
//         //     <Grid item xs={12} md={7} lg={9}>
//         //         {/* <ApplicantList /> */}
//         //     </Grid>
//         // </Grid>
//     );
// };

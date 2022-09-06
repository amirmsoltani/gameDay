import { Grid } from '@mui/material';
import React, { useState } from 'react';
import {
    CommentStatus,
    GetCategoriesQuery,
    useInfiniteGetCategoriesQuery
} from 'src/graphql/generated';
import useDebounce from 'src/hooks/useDebounce';
import { PrimarySpinner } from '../base/loader/spinner';
import CatalogCard from './catalog-card';
import * as S from './catalog-style';

function CatalogPage() {
    const [itemList, setItemList] = useState<
        GetCategoriesQuery['skillcategory_getSkillCategories']['result']['items']
    >([]);
    const [searchText, setSearchText] = useState<string>('');
    const finalSearchText = useDebounce(searchText, 500);

    const [end, setEnd] = useState(false);
    const [state, setState] = useState<{ tab: 'skills' | 'learn'; activeCategory?: number } | null>(
        null
    );
    const { isLoading, isFetchingNextPage, fetchNextPage } = useInfiniteGetCategoriesQuery(
        { take: 5, skip: 0, where: { title: { contains: finalSearchText } } },
        {
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    setItemList([...pages[0].skillcategory_getSkillCategories.result.items]);
                    setState({
                        tab: 'learn',
                        activeCategory:
                            pages[0].skillcategory_getSkillCategories.result.items[0]?.id
                    });
                } else {
                    setItemList([
                        ...itemList,
                        ...(pages[length - 1].skillcategory_getSkillCategories.result.items || [])
                    ]);
                }
                if (
                    pages[length - 1].skillcategory_getSkillCategories.result.pageInfo
                        .hasNextPage === false
                ) {
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
                xl={4.5}
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
                        <CatalogCard
                            key={item.title}
                            onChangeTab={(tab) => {
                                setState({ ...state, tab });
                            }}
                            onClick={() => {
                                if (item.id !== state.activeCategory)
                                    setState({
                                        tab: 'learn',
                                        activeCategory: item.id
                                    });
                            }}
                            active={item.id === state.activeCategory}
                            data={{
                                image: item.iconUrl,
                                lesson: item.lessons.length,
                                star: item.rate,
                                title: item.title,
                                notification: !!item.comments.find(
                                    (comment) => comment.status !== CommentStatus.Accepted
                                )
                            }}
                        />
                    ))}
                </Grid>
                <Grid item lg={1} className="left-side__column" />
            </S.LeftSide>
            <S.RightSide></S.RightSide>
        </S.Content>
    );
}

export default CatalogPage;

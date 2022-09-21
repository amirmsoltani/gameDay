import LayoutHeader from '@/layout/app-layout/layout-header';
import { Grid } from '@mui/material';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import {
    CommentStatus,
    GetCategoriesQuery,
    useInfiniteGetCategoriesQuery
} from 'src/graphql/generated';
import useDebounce from 'src/hooks/useDebounce';
import PersonCard from '../base/card/person-card';
import SearchInput from '../base/input/search-input';
import { PrimarySpinner } from '../base/loader/spinner';
import * as S from './interview-practice-style';

function InterViewPracticePage() {
    const totalItems = useRef<number | null>(null);
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
        { take: 10, skip: 0, where: { title: { contains: finalSearchText } } },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    totalItems.current =
                        pages[0].skillcategory_getSkillCategories!.result!.totalCount;
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
            getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
        }
    );

    if (isLoading || !state)
        return (
            <S.Content display={'flex'} justifyContent="center" alignItems="center">
                <PrimarySpinner />
            </S.Content>
        );

    return (
        <S.Content container>
            <LayoutHeader>
                <S.Header>
                    <div className="header__info-box">Interview practice/Message</div>
                    <SearchInput
                        onChange={(event: any) => {
                            setSearchText(event.target.value);
                        }}
                        wrapperClassName="header__search-input"
                    />
                    <Link href="/dashboard">
                        <a className="header__link-button">
                            <PlusIcon className="link-button__plus" /> question preview
                        </a>
                    </Link>
                    <Link href="/dashboard">
                        <a className="header__link-button">
                            <PlusIcon className="link-button__plus" /> Add New question
                        </a>
                    </Link>
                </S.Header>
            </LayoutHeader>
            <S.LeftSide
                item
                container
                md={4.5}
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
                        <PersonCard
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
                                attachments: 1,
                                date: '2022/10/12',
                                fullName: 'amir soltani',
                                description: 'im programmer',
                                image: 'ss',
                                title: 'developer'
                            }}
                        />
                    ))}
                </Grid>
                <Grid item xs={0} md={1} className="left-side__column" />
            </S.LeftSide>
            <S.RightSide container item md={7.5} xs={12}>
                aa
            </S.RightSide>
        </S.Content>
    );
}

export default InterViewPracticePage;

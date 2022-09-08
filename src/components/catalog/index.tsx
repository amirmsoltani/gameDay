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
import SearchInput from '../base/input/search-input';
import { PrimarySpinner } from '../base/loader/spinner';
import CatalogCard from './catalog-card';
import CatalogLearnSection from './catalog-learn';
import CatalogSkillSection from './catalog-skills';
import * as S from './catalog-style';

function CatalogPage() {
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
                    <div className="header__info-box">Catalog</div>
                    <span>{totalItems.current} items Listed</span>
                    <SearchInput
                        onChange={(event: any) => {
                            setSearchText(event.target.value);
                        }}
                        wrapperClassName="header__search-input"
                    />
                    <Link href="/dashboard">
                        <a className="header__link-button">
                            <PlusIcon className="link-button__plus" /> Add New catalog
                        </a>
                    </Link>
                    <Link href="/dashboard">
                        <a className="header__link-button">
                            <PlusIcon className="link-button__plus" /> Add New course
                        </a>
                    </Link>
                    <Link href="/dashboard">
                        <a className="header__link-button">
                            <PlusIcon className="link-button__plus" /> Add New skill
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
                <Grid item xs={0} md={1} className="left-side__column" />
            </S.LeftSide>
            <S.RightSide container item md={7.5} xs={12}>
                {state.tab === 'learn' ? (
                    <CatalogLearnSection id={state.activeCategory} />
                ) : (
                    <CatalogSkillSection id={state.activeCategory} />
                )}
            </S.RightSide>
        </S.Content>
    );
}

export default CatalogPage;

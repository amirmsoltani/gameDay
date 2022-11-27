import LayoutHeader from '@/layout/app-layout/layout-header';
import keyGenerator from '@/utils/key-generator';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { CloseIcon } from 'src/assets/common/CloseIcon';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import {
    CommentStatus,
    GetCategoriesQuery,
    SortEnumType,
    useAddCatalogMutation,
    useInfiniteGetCategoriesQuery
} from 'src/graphql/generated';
import useDebounce from 'src/hooks/useDebounce';
import SearchInput from '../base/input/search-input';
import { PrimarySpinner } from '../base/loader/spinner';
import UploadComponent from '../upload/upload';
import CatalogCard from './catalog-card';
import CatalogCommentsSection from './catalog-comments';
import CatalogLearnSection from './catalog-learn';
import CatalogSkillSection from './catalog-skills';
import * as S from './catalog-style';

const tab = {
    learn: CatalogLearnSection,
    skills: CatalogSkillSection,
    comments: CatalogCommentsSection
};

function CatalogPage() {
    const router = useRouter();
    const totalItems = useRef<number | null>(null);
    const [itemList, setItemList] = useState<
        GetCategoriesQuery['skillcategory_getSkillCategories']['result']['items']
    >([]);
    const [searchText, setSearchText] = useState<string>('');
    const finalSearchText = useDebounce(searchText, 500);

    const [end, setEnd] = useState(false);
    const [state, setState] = useState<{
        tab: 'skills' | 'learn' | 'comments';
        index?: number;
        activeCategory?: number;
    } | null>(null);
    const [isShow, setIsShow] = useState(false);
    const [newCatalog, setNewCatalog] = useState<{
        image?: string;
        title?: string;
        submit: boolean;
    }>({ submit: false });

    const { isLoading, isFetchingNextPage, fetchNextPage } = useInfiniteGetCategoriesQuery(
        {
            take: 10,
            skip: 0,
            where: { title: { contains: finalSearchText } },
            order: { createdDate: SortEnumType.Desc }
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    totalItems.current =
                        pages[0].skillcategory_getSkillCategories!.result!.totalCount;
                    setItemList(
                        keyGenerator([...pages[0].skillcategory_getSkillCategories.result.items])
                    );
                    setState({
                        tab: 'learn',
                        activeCategory:
                            pages[0].skillcategory_getSkillCategories.result.items[0]?.id
                    });
                } else {
                    setItemList(
                        keyGenerator([
                            ...itemList,
                            ...(pages[length - 1].skillcategory_getSkillCategories.result.items ||
                                [])
                        ])
                    );
                }
                if (
                    pages[length - 1].skillcategory_getSkillCategories.result.pageInfo
                        .hasNextPage === false
                ) {
                    setEnd(true);
                } else if (end) {
                    setEnd(false);
                }
            },
            getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
        }
    );

    const addCategory = useAddCatalogMutation({
        onSuccess: (data) => {
            setItemList([data.skillCategory_addSkillCategory.result, ...itemList]);
            setIsShow(false);
            setNewCatalog({ submit: false });
        }
    });

    useEffect(() => {
        if (state && router.query.comment) {
            setState({ tab: 'comments', activeCategory: state.activeCategory });
            router.back();
        }
    }, [router.query.comment]);

    if (isLoading || !state)
        return (
            <S.Content display={'flex'} justifyContent="center" alignItems="center">
                <PrimarySpinner />
            </S.Content>
        );

    const Tab = tab[state.tab];

    return (
        <S.Content container>
            <LayoutHeader>
                <S.Header>
                    <div className="header__info-box">Catalogs</div>
                    <span>{totalItems.current} items Listed</span>
                    <SearchInput
                        onChange={(event: any) => {
                            setSearchText(event.target.value);
                        }}
                        wrapperClassName="header__search-input"
                    />
                    <button
                        className="header__link-button"
                        onClick={() => {
                            setIsShow(true);
                        }}>
                        <PlusIcon className="link-button__plus" /> Add New catalog
                    </button>
                    <Link href={`/catalog/course/?id=${state.activeCategory}`}>
                        <a
                            className={`header__link-button ${
                                !state.activeCategory ? 'disabled' : ''
                            }`}>
                            <PlusIcon className="link-button__plus" /> Add New course
                        </a>
                    </Link>
                    <Link href={`/catalog/add-skill/?id=${state.activeCategory}`}>
                        <a
                            className={`header__link-button ${
                                !state.activeCategory ? 'disabled' : ''
                            }`}>
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
                    {itemList.map((item, index) => (
                        <CatalogCard
                            key={item.key + index}
                            onChangeTab={(tab) => {
                                setState({ ...state, tab, index });
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
                                lesson: item.lessons?.length || 0,
                                star: item.rate,
                                title: item.title,
                                notification: !!item.comments?.find(
                                    (comment) => comment.status !== CommentStatus.Accepted
                                )
                            }}
                        />
                    ))}
                </Grid>
                <Grid item xs={0} md={1} className="left-side__column" />
            </S.LeftSide>
            <S.RightSide container item md={7.5} xs={12}>
                {
                    <Tab
                        id={state.activeCategory}
                        onDelete={() => {
                            const newItems = [...itemList];
                            newItems.splice(state.index, 1);
                            setItemList(newItems);
                            setState({ tab: 'learn', index: 0, activeCategory: newItems[0]?.id });
                        }}
                    />
                }
            </S.RightSide>
            {isShow && (
                <Grid
                    container
                    className="catalog__add"
                    onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            setIsShow(false);
                        }
                    }}>
                    <Grid item className="add__modal" md={8}>
                        <CloseIcon
                            className="modal__close-icon"
                            onClick={() => {
                                setIsShow(false);
                            }}
                        />
                        <div
                            className={`modal__upload-wrapper ${
                                newCatalog.submit && !newCatalog.image ? 'error' : ''
                            }`}>
                            <UploadComponent
                                type="image"
                                onUpload={(_, fileUrl) => {
                                    setNewCatalog((newCatalog) => ({
                                        ...newCatalog,
                                        image: fileUrl
                                    }));
                                }}
                            />
                        </div>
                        <label htmlFor="title">catalog Title</label>
                        <input
                            id="title"
                            name="title"
                            className={`title__input ${
                                newCatalog.submit && !newCatalog.title ? 'error' : ''
                            }`}
                            placeholder="ex. John"
                            onChange={(event) => {
                                setNewCatalog({ ...newCatalog, title: event.target.value });
                            }}
                        />

                        <button
                            className="add__btn"
                            disabled={addCategory.isLoading}
                            onClick={() => {
                                setNewCatalog({ ...newCatalog, submit: true });
                                if (newCatalog.title && newCatalog.image) {
                                    addCategory.mutate({
                                        input: {
                                            iconUrl: newCatalog.image,
                                            title: newCatalog.title
                                        }
                                    });
                                }
                            }}>
                            {addCategory.isLoading ? <PrimarySpinner /> : 'Add'}
                        </button>
                    </Grid>
                </Grid>
            )}
        </S.Content>
    );
}

export default CatalogPage;

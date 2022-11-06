import React, { useEffect, useRef, useState } from 'react';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import { HeaderWrapper, NewCourseWrapper } from './new-course-style';
import LessonCard from './lesson-card';
import Loading from '../loading';
import { Lesson, useInfiniteGetLessonQuery } from 'src/graphql/generated';
import { useRouter } from 'next/router';
import LayoutHeader from '@/layout/app-layout/layout-header';
import { LeftArrowIcon } from 'src/assets/common/LeftArrowIcon';
import SearchInput from '../base/input/search-input';
import Link from 'next/link';
import useDebounce from 'src/hooks/useDebounce';
import VideoPlayer from '../vide-player';

const NewCoursePage = () => {
    const totalItems = useRef<number | null>(null);
    const router = useRouter();
    const [play, setPlay] = useState<string | null>(null);
    const onPlay = (url) => {
        setPlay(url);
    };
    useEffect(()=>{
        if (!router.query.id) router.replace('/catalog');

    },[])
    const [itemList, setItemList] = useState<Array<Partial<Lesson> & { key?: string }>>([]);

    const [searchText, setSearchText] = useState<string>('');
    const finalSearchText = useDebounce(searchText, 500);

    const [end, setEnd] = useState(false);

    const { isFetching, isFetchingNextPage, fetchNextPage } = useInfiniteGetLessonQuery(
        {
            take: 10,
            skip: 0,
            where: {
                skillCategoryId: { eq: +router.query.id },
                title: { contains: finalSearchText },
                isDeleted: { eq: false }
            }
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    totalItems.current = pages[0].lesson_getLessons!.result!.totalCount;
                    setItemList([...pages[0].lesson_getLessons.result.items]);
                } else {
                    setItemList([
                        ...itemList,
                        ...(pages[length - 1].lesson_getLessons.result.items || [])
                    ]);
                }
                if (pages[length - 1].lesson_getLessons.result.pageInfo.hasNextPage === false) {
                    setEnd(true);
                }
            },
            getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
        }
    );

    const deleteLesson = (index: number) => {
        const newLessons = [...itemList];
        newLessons.splice(index, 1);
        setItemList(newLessons);
    };

    if (isFetching && !isFetchingNextPage) return <Loading />;

    return (
        <NewCourseWrapper
            onScroll={(event: any) => {
                const { scrollTop, scrollHeight, clientHeight } = event.target;
                if (scrollTop + clientHeight >= scrollHeight * 0.5 && !end && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }}>
            <LayoutHeader>
                <HeaderWrapper>
                    <Link href={'/catalog'}>
                        <a className="back-btn">
                            <LeftArrowIcon />
                        </a>
                    </Link>
                    <span className="header__info-box">Learn/New course</span>
                    <span>
                        {totalItems.current < itemList.length
                            ? itemList.length
                            : totalItems.current}{' '}
                        items Listed
                    </span>
                    <SearchInput
                        onChange={(event: any) => {
                            setSearchText(event.target.value);
                        }}
                        wrapperClassName="header__search-input"
                    />
                    <Link href="/catalog">
                        <a className="header__link-button">Publish</a>
                    </Link>
                </HeaderWrapper>
            </LayoutHeader>

            <VideoPlayer
                url={play}
                onClose={() => {
                    setPlay(null);
                }}
            />
            <div className="add__lesson__section">
                <button
                    className="add-lesson__btn"
                    onClick={() => {
                        setItemList([
                            ...itemList,
                            {
                                time: 0,
                                topics: [],
                                key: (Math.floor(Math.random() * 0xeeeeee) + 0x111111).toString(16),
                                title: `lesson ${
                                    (totalItems.current < itemList.length
                                        ? itemList.length
                                        : totalItems.current) + 1
                                }`,
                                description: ''
                            }
                        ]);
                    }}>
                    <PlusIcon />
                    Add new lesson
                </button>
            </div>
            {itemList.map((lesson, index) => (
                <LessonCard
                    lesson={{
                        categoryId:+router.query.id,
                        topics: lesson.topics,
                        title: lesson.title,
                        description: lesson.description,
                        id: lesson.id
                    }}
                    index={index}
                    key={lesson.key || lesson.id}
                    onPlay={onPlay}
                    onDelete={deleteLesson}
                />
            ))}
        </NewCourseWrapper>
    );
};

export default NewCoursePage;

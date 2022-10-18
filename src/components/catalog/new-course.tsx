import React, { useState } from 'react';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import { NewCourseWrapper } from './new-course-style';
import LessonCard, { LessonType } from './lesson-card';
import Loading from '../loading';
import { GetLessonQuery, useInfiniteGetLessonQuery } from 'src/graphql/generated';
import { useRouter } from 'next/router';

type ListType = GetLessonQuery['lesson_getLessons']['result']['items'];
const NewCoursePage = () => {
    const {
        query: { id }
    } = useRouter();
    const [lessons, setLessons] = useState<Array<LessonType>>([{ categoryId: 1 }]);
    const [play, setPlay] = useState<string | null>(null);
    const onPlay = (url) => {
        setPlay(url);
    };

    const deleteLesson = (index) => {
        const newLessons = [...lessons];
        newLessons.splice(index, 1);
        setLessons(newLessons);
    };

    const [itemList, setItemList] = useState<ListType>([]);

    const [end, setEnd] = useState(false);

    const { isFetching, isFetchingNextPage, fetchNextPage } = useInfiniteGetLessonQuery(
        { take: 10, skip: 0, where: { skillCategoryId: { eq: id } } },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
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

    if (isFetching && !isFetchingNextPage) return <Loading />;

    return (
        <NewCourseWrapper>
            {play && (
                <div
                    className="video__player"
                    onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            setPlay(null);
                        }
                    }}>
                    <video controls>
                        <source src={play} />
                    </video>
                </div>
            )}
            <div className="add__lesson__section">
                <button
                    className="add-lesson__btn"
                    onClick={() => {
                        setLessons([...lessons, { categoryId: 1 }]);
                    }}>
                    <PlusIcon />
                    Add new lesson
                </button>
            </div>
            {itemList.map((lesson, index) => (
                <LessonCard
                    lesson={{
                        categoryId: +id,
                        description: lesson.description,
                        title: lesson.title,
                        id: lesson.id
                    }}
                    index={index}
                    key={index}
                    onPlay={onPlay}
                    onDelete={deleteLesson}
                />
            ))}
        </NewCourseWrapper>
    );
};

export default NewCoursePage;

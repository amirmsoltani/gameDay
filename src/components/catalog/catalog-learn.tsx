import React, { FC, Fragment, useState } from 'react';
import CommentIcon from 'src/assets/icons/comment-icon';
import PlayIcon from 'src/assets/icons/play-icon';
import SaveIcon from 'src/assets/icons/save-icon';
import { GetLessonQuery, useInfiniteGetLessonQuery } from 'src/graphql/generated';
import { PrimarySpinner } from '../base/loader/spinner';
import { MButton } from '../base/MButton';
import * as S from './catalog-style';

type PropsType = {
    id: number;
};

type ListType = GetLessonQuery['lesson_getLessons']['result']['items'];
const CatalogLearnSection: FC<PropsType> = ({ id }) => {
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

    if (isFetching && !isFetchingNextPage)
        return (
            <S.Content display={'flex'} justifyContent="center" alignItems="center">
                <PrimarySpinner />
            </S.Content>
        );

    return (
        <S.CatalogLearn
            onScroll={(event: any) => {
                const { scrollTop, scrollHeight, clientHeight } = event.target;
                if (scrollTop + clientHeight >= scrollHeight * 0.5 && !end && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }}>
            <div className="catalog-learn__box-btn">
                <MButton className="box-btn__btn">
                    <CommentIcon />
                </MButton>
                <MButton className="box-btn__btn">
                    <SaveIcon />
                </MButton>
            </div>
            <span className="catalog-learn__description-title">Description</span>
            <p className="catalog-learn__description-text">lorem ipsome</p>
            {itemList.map((lesson, index) => (
                <Fragment key={lesson.title}>
                    <div className="catalog-learn__card-header">
                        <span className="card-header__index">{index + 1}</span>{' '}
                        <span>{lesson.title}</span>
                    </div>
                    {lesson.topics.map((topic) => (
                        <div className="catalog-learn__card-lesson" key={topic.title}>
                            <div className="card-lesson__box-left">
                                <PlayIcon />
                                <span className="box-left__file-name">{topic.fileUrl}</span>
                            </div>
                            <div>
                                <span>{lesson.time}:00</span>
                            </div>
                        </div>
                    ))}
                </Fragment>
            ))}
        </S.CatalogLearn>
    );
};

export default CatalogLearnSection;

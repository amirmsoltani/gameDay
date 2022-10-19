import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { FC, Fragment, useState } from 'react';
import CommentIcon from 'src/assets/icons/comment-icon';
import PlayIcon from 'src/assets/icons/play-icon';
import SaveIcon from 'src/assets/icons/save-icon';
import { GetLessonQuery, useInfiniteGetLessonQuery } from 'src/graphql/generated';
import { PrimarySpinner } from '../base/loader/spinner';
import { MButton } from '../base/MButton';
import VideoPlayer from '../vide-player';
import * as S from './catalog-style';

dayjs.extend(duration);

type PropsType = {
    id: number;
};

type ListType = GetLessonQuery['lesson_getLessons']['result']['items'];
const CatalogLearnSection: FC<PropsType> = ({ id }) => {
    const [play, setPlay] = useState<string | null>(null);
    const onPlay = (url) => {
        setPlay(url);
    };

    const [itemList, setItemList] = useState<ListType>([]);

    const [end, setEnd] = useState(false);

    const { isFetching, isFetchingNextPage, fetchNextPage } = useInfiniteGetLessonQuery(
        { take: 10, skip: 0, where: { skillCategoryId: { eq: id }, isDeleted: { eq: false } } },
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
                        <div className="header__item">
                            <span className="card-header__index">{index + 1}</span>{' '}
                            <span>{lesson.title}</span>
                        </div>
                        <div>
                            <span>{dayjs.duration(lesson.time * 1000).format('mm:ss')}</span>
                        </div>
                    </div>
                    {lesson.topics
                        .filter((topic) => !topic.isDeleted)
                        .map((topic) => (
                            <button
                                className="catalog-learn__card-lesson"
                                key={topic.title}
                                onClick={() => {
                                    setPlay(topic.fileUrl);
                                }}>
                                <div className="card-lesson__box-left">
                                    <PlayIcon />
                                    <span className="box-left__file-name">
                                        {topic.description?.split('~')[0]}
                                    </span>
                                </div>
                            </button>
                        ))}
                </Fragment>
            ))}
            <VideoPlayer
                url={play}
                onClose={() => {
                    setPlay(null);
                }}
            />
        </S.CatalogLearn>
    );
};

export default CatalogLearnSection;

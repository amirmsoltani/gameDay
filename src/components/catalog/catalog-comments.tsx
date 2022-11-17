import React, { FC, useState } from 'react';
import { GetCommentsQuery, SortEnumType, useInfiniteGetCommentsQuery } from 'src/graphql/generated';
import Loading from '../loading';
import VideoPlayer from '../vide-player';
import { CatalogComment } from './catalog-style';
import CommentCard from './comment-card';
type PropsType = {
    id: number;
};

type ListType = GetCommentsQuery['comment_getComments']['result']['items'];

const CatalogCommentsSection: FC<PropsType> = ({ id }) => {
    const [play, setPlay] = useState<string | null>(null);
    const [itemList, setItemList] = useState<ListType>([]);
    const [end, setEnd] = useState(false);
    const comments = useInfiniteGetCommentsQuery(
        {
            take: 10,
            skip: 0,
            where: { skillCategoryId: { eq: id } },
            order: { createdDate: SortEnumType.Desc }
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    setItemList([...pages[0].comment_getComments.result.items]);
                } else {
                    setItemList([
                        ...itemList,
                        ...(pages[length - 1].comment_getComments.result.items || [])
                    ]);
                }
                if (pages[length - 1].comment_getComments.result.pageInfo.hasNextPage === false) {
                    setEnd(true);
                }
            },
            getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
        }
    );

    const onDelete = (index: number) => {
        const newList = [...itemList];
        newList.splice(index, 1);
        setItemList(newList);
    };

    if (comments.isLoading) <Loading />;
    return (
        <CatalogComment
            onScroll={(event: any) => {
                const { scrollTop, scrollHeight, clientHeight } = event.target;
                if (
                    scrollTop + clientHeight >= scrollHeight * 0.5 &&
                    !end &&
                    !comments.isFetchingNextPage
                ) {
                    comments.fetchNextPage();
                }
            }}>
            <div className="comment__title">Comments</div>
            {itemList.map((comment, index) => (
                <CommentCard
                    key={comment.id}
                    comment={comment as any}
                    setPlay={setPlay}
                    index={index}
                    onDelete={onDelete}
                />
            ))}
            <VideoPlayer
                url={play}
                onClose={() => {
                    setPlay(null);
                }}
            />
        </CatalogComment>
    );
};

export default CatalogCommentsSection;

import LayoutHeader from '@/layout/app-layout/layout-header';
import { Grid, Input, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { Fragment, useCallback, useState } from 'react';
import {
    DragDropContext,
    Droppable,
    DroppableProvided,
    DropResult,
    Draggable
} from 'react-beautiful-dnd';
import { LeftArrowIcon } from 'src/assets/common/LeftArrowIcon';
import CloseIcon from 'src/assets/icons/close-icon';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import {
    GetSkillsQuery,
    useAddSkillOfDayMutation,
    useInfiniteGetSkillsQuery,
    useRemoveSkillOfDayMutation
} from 'src/graphql/generated';
import { MImage } from '../base/image/MImage';
import { MButton } from '../base/MButton';
import * as S from './skill-style';

const SkillPage = () => {
    const [itemList, setItemList] = useState<GetSkillsQuery['skill_getSkills']['result']['items']>(
        []
    );
    const [end, setEnd] = useState(false);

    const { data, isFetchingNextPage, fetchNextPage } = useInfiniteGetSkillsQuery(
        {
            take: 10,
            skip: 0,
            where: { title: { contains: '' } }
        },
        {
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    setItemList([...pages[0].skill_getSkills.result.items]);
                } else {
                    setItemList([
                        ...itemList,
                        ...(pages[length - 1].skill_getSkills.result.items || [])
                    ]);
                }
                if (pages[length - 1].skill_getSkills.result.pageInfo.hasNextPage === false) {
                    setEnd(true);
                }
            },
            getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
        }
    );

    const {
        mutate: addMutate,
        variables: addVar,
        isLoading: addLoading
    } = useAddSkillOfDayMutation({
        onSuccess: (_, { id }) => {
            const newList = [...itemList];
            const index = itemList.findIndex((item) => item.id === id);
            newList[index] = { ...newList[index], isToday: true };
            setItemList(newList);
        }
    });

    const {
        mutate: removeMutate,
        variables: removeVar,
        isLoading: removeLoading
    } = useRemoveSkillOfDayMutation({
        onSuccess: (_, { id }) => {
            const newList = [...itemList];
            const index = itemList.findIndex((item) => item.id === id);
            newList[index] = { ...newList[index], isToday: false };
            setItemList(newList);
        }
    });

    const handleDrop = (droppedItem: DropResult) => {
        if (!droppedItem.destination) return;
        var updatedList = [...itemList];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        setItemList(updatedList);
    };

    const DroppableChild = useCallback(
        (provided: DroppableProvided) => {
            return (
                <S.ListWarpper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    display={'grid'}
                    gridTemplateRows="repeat(12, 1fr)">
                    <S.ListHeader container gridRow={'span 1'}>
                        <Grid lg={1} xs={12} item />
                        <Grid lg={2.9} xs={12} className={'list-header__item no-center'} item>
                            Skill Title
                        </Grid>
                        <Grid lg={4} xs={12} className={'list-header__item'} item>
                            Added to the list on
                        </Grid>
                        <Grid lg={1.5} xs={12} className={'list-header__item'} item>
                            Number of times added
                        </Grid>
                        <Grid lg={2.5} xs={12} className={'list-header__item'} item>
                            situation
                        </Grid>
                    </S.ListHeader>
                    <S.ListBody
                        gridRow={'span 11'}
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
                        {itemList.map((item, index) => (
                            <Draggable
                                key={item.id.toString()}
                                draggableId={item.id.toString()}
                                index={index}>
                                {(provided) => (
                                    <S.ListItem
                                        className={item.isToday && 'primary'}
                                        container
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}>
                                        <Grid
                                            lg={1}
                                            xs={12}
                                            className="list-item__item no-border no-center"
                                            item
                                            justifyContent={'flex-start'}>
                                            {item.id}
                                        </Grid>
                                        <Grid
                                            lg={2.9}
                                            xs={12}
                                            className="list-item__item list-item__title"
                                            item>
                                            <MImage
                                                className="list-item__image"
                                                resources={{
                                                    src: item.iconUrl,
                                                    fallback: '/images/user.jpg'
                                                }}
                                            />
                                            <Grid className="list-item__text-box">
                                                <Typography>{item.title}</Typography>
                                                <Typography>{item.skillCategory.title}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid lg={4} xs={12} className="list-item__item" item>
                                            {dayjs(item.createdDate).format('MM/DD/YY')}
                                        </Grid>
                                        <Grid lg={1.5} xs={12} className="list-item__item" item>
                                            -
                                        </Grid>
                                        <Grid
                                            lg={2.5}
                                            xs={12}
                                            className="list-item__item no-border"
                                            item>
                                            <MButton
                                                loading={
                                                    (addVar?.id === item.id && addLoading) ||
                                                    (removeVar?.id === item.id && removeLoading)
                                                }
                                                className="list-item__of-day"
                                                onClick={() => {
                                                    item.isToday
                                                        ? removeMutate({ id: item.id })
                                                        : addMutate({ id: item.id });
                                                }}>
                                                {item.isToday ? (
                                                    <>
                                                        <CloseIcon /> Remove from skill of the day
                                                    </>
                                                ) : (
                                                    <>
                                                        <PlusIcon /> Add to skill of the day
                                                    </>
                                                )}
                                            </MButton>
                                        </Grid>
                                        <Grid
                                            lg={0.08}
                                            xs={0}
                                            className="list-item__last-border"
                                            item
                                        />
                                    </S.ListItem>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </S.ListBody>
                </S.ListWarpper>
            );
        },
        [itemList, addLoading, removeLoading, isFetchingNextPage, fetchNextPage, end]
    );

    return (
        <Fragment>
            <LayoutHeader>
                <S.Header>
                    <div className="header__info-box">
                        <Link href="/dashboard">
                            <a className="header__back-btn">
                                <LeftArrowIcon />
                            </a>
                        </Link>
                        skill of the day
                    </div>
                    <Typography>
                        {data?.pages?.[0].skill_getSkills.result.totalCount} items Listed
                    </Typography>
                    <div style={{ width: 250 }}>
                        <Input className="headerd__search-input" />
                    </div>
                </S.Header>
            </LayoutHeader>
            <DragDropContext onDragEnd={handleDrop}>
                <Droppable children={DroppableChild} droppableId="list-droppable" />
            </DragDropContext>
        </Fragment>
    );
};

export default SkillPage;

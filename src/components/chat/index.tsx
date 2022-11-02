import LayoutHeader from '@/layout/app-layout/layout-header';
import { Grid } from '@mui/material';
import Link from 'next/link';
import React, { FC, useRef, useState } from 'react';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import {
    MessageType,
    Message_GetUserMessagesQuery,
    SortEnumType,
    useInfiniteMessage_GetUserMessagesQuery,
    User
} from 'src/graphql/generated';
import useDebounce from 'src/hooks/useDebounce';
import PersonCard from '../base/card/person-card';
import SearchInput from '../base/input/search-input';
import ChatSection from './chat-section';
import Loading from '../loading';
import * as S from './chat-style';

const dataSwitch = {
    Practice: 'Interview practice',
    Problem: 'Career coach',
    'Resume check': 'Check resume'
};

type propsType = { name: 'Practice' | 'Problem' | 'Resume check' };
const ChatPage: FC<propsType> = ({ name }) => {
    const totalItems = useRef<number | null>(null);
    const [itemList, setItemList] = useState<
        Message_GetUserMessagesQuery['message_getAllMessages']['result']['items']
    >([]);
    const [searchText, setSearchText] = useState<string>('');
    const finalSearchText = useDebounce(searchText, 500);

    const [end, setEnd] = useState(false);
    const [state, setState] = useState<{
        activeChat?: number;
        user?: Partial<User>;
        date?: string;
    } | null>(null);

    const { isLoading, isFetchingNextPage, fetchNextPage } =
        useInfiniteMessage_GetUserMessagesQuery(
            {
                take: 10,
                skip: 0,
                where: {
                    firstUser: { email: { contains: finalSearchText } },
                    subject: { contains: name }
                },
                order: { createdDate: SortEnumType.Desc }
            },
            {
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                keepPreviousData: true,
                onSuccess: ({ pages }) => {
                    const length = pages.length;
                    if (length === 1) {
                        totalItems.current = pages[0].message_getAllMessages!.result!.totalCount;
                        setItemList([...pages[0].message_getAllMessages.result.items]);
                        setState({
                            activeChat: pages[0].message_getAllMessages.result.items[0]?.id,
                            user: pages[0].message_getAllMessages.result.items[0]?.firstUser,
                            date: pages[0].message_getAllMessages.result.items[0]?.latestMessageDate
                        });
                    } else {
                        setItemList([
                            ...itemList,
                            ...(pages[length - 1].message_getAllMessages.result.items || [])
                        ]);
                    }
                    if (
                        pages[length - 1].message_getAllMessages.result.pageInfo.hasNextPage ===
                        false
                    ) {
                        setEnd(true);
                    }
                },
                getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
            }
        );

    if (isLoading || !state) return <Loading />;

    return (
        <S.Content container>
            <LayoutHeader>
                <S.Header>
                    <div className="header__info-box">{dataSwitch[name]}/Message</div>
                    <SearchInput
                        onChange={(event: any) => {
                            setSearchText(event.target.value);
                        }}
                        wrapperClassName="header__search-input"
                    />
                    {name === 'Practice' ? (
                        <>
                            <Link href="/interview-practice/question-preview">
                                <a className="header__link-button">question preview</a>
                            </Link>
                            <Link href="/interview-practice/question-preview/?add=true">
                                <a className="header__link-button">
                                    <PlusIcon className="link-button__plus" /> Add New question
                                </a>
                            </Link>
                        </>
                    ) : null}
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
                            key={item.id}
                            onClick={() => {
                                if (item.id !== state.activeChat)
                                    setState({
                                        activeChat: item.id,
                                        user: item.firstUser,
                                        date: item.latestMessageDate
                                    });
                            }}
                            active={item.id === state.activeChat}
                            data={{
                                attachments: item.messages.filter(
                                    (message) => message.messageType !== MessageType.Text
                                ).length,
                                date: item.latestMessageDate,
                                fullName:
                                    item.firstUser!.firstName + ' ' + item.firstUser!.lastName,
                                image: item.firstUser.pictureUrl,
                                title: item.messages[
                                    item.messages.length - 1
                                ].messageType.toLowerCase(),
                                description: item.messages[item.messages.length - 1]?.text?.slice(
                                    0,
                                    250
                                )
                            }}
                        />
                    ))}
                </Grid>
                <Grid item xs={0} md={1} className="left-side__column" />
            </S.LeftSide>
            <S.RightSide container item md={7.5} xs={12}>
                {state.activeChat ? (
                    <ChatSection
                        name={name}
                        conversationId={state.activeChat}
                        user={state.user}
                        date={state.date}
                    />
                ) : (
                    <Loading />
                )}
            </S.RightSide>
        </S.Content>
    );
};

export default ChatPage;

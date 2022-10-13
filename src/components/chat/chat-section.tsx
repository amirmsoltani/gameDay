import { TextareaAutosize } from '@mui/material';
import dayjs from 'dayjs';
import React, { FC, Fragment, useRef, useState } from 'react'
import AttachmentIcon from 'src/assets/icons/attachment.icon';
import SendIcon from 'src/assets/icons/send-icon';
import { MessageType, Message_GetConversationQuery, SortEnumType, useGetInterviewVideoQuery, useInfiniteMessage_GetConversationQuery, useMessage_CreateMessageMutation, User } from 'src/graphql/generated';
import { MImage } from '../base/image/MImage';
import { PrimarySpinner } from '../base/loader/spinner';
import * as S from './chat-style-section';
import VideoMessage from './video-message';

type PropsType = {
    conversationId: number;
    user: Partial<User>;
    date: string;
    name:'Practice' | 'Problem' | 'Resume check';
};



type ListType = Message_GetConversationQuery['message_getConversation']['result']['items'];
const ChatSection: FC<PropsType> = ({ conversationId, user, date, name }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [itemList, setItemList] = useState<ListType>([]);
    const [end, setEnd] = useState(false);
    const chatDate = dayjs(date);

    const { data } = useGetInterviewVideoQuery(
        { userId: user.id },
        {
            enabled: name === 'Practice',
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true
        }
    );
    const attachments = data?.userInterviewQuestion_getAllByUserId?.result;

    const { isFetching, isFetchingNextPage, fetchNextPage } =
        useInfiniteMessage_GetConversationQuery(
            { take: 10, skip: 0, conversationId, order: { createdAt: SortEnumType.Desc } },
            {
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                keepPreviousData: true,
                onSuccess: ({ pages }) => {
                    const length = pages.length;
                    if (length === 1) {
                        setItemList([...pages[0].message_getConversation.result.items]);
                    } else {
                        setItemList([
                            ...itemList,
                            ...(pages[length - 1].message_getConversation.result.items || [])
                        ]);
                    }
                    if (
                        pages[length - 1].message_getConversation.result.pageInfo.hasNextPage ===
                        false
                    ) {
                        setEnd(true);
                    }
                },
                getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
            }
        );

    const { mutate, variables, isLoading } = useMessage_CreateMessageMutation({
        onSuccess: ({ message_createMessage: { result } }) => {
            const list = [result, ...itemList];
            setItemList(list);
        }
    });

    if (isFetching && !isFetchingNextPage)
        return (
            <S.Content display={'flex'} justifyContent="center" alignItems="center">
                <PrimarySpinner />
            </S.Content>
        );

    return (
        <>
            <S.ChatWrapper
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
                <MImage
                    resources={{ src: user.pictureUrl, fallback: '/images/user.jpg' }}
                    className="chat-avatar"
                />

                <div className="chat-info">
                    <div className="info__user">
                        <span className="user__name">
                            {user.firstName} {user.lastName}
                        </span>
                        <span className="user__status">lorem ipsum</span>
                        <span className="user__email">{user.email}</span>

                        <span className="user__update">
                            {chatDate.isToday() ? 'Today' : chatDate.format('YY/DD/MM')}
                            &nbsp; &nbsp;
                            {chatDate.format('HH:mm A')}
                        </span>
                    </div>

                    <span className="info__title">Hi Bardia</span>
                    <p className="info__text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but also
                        the leap into electronic
                    </p>
                    {(attachments?.totalCount || user.cVFileUrl) &&
                    ['Practice', 'Resume check'].includes(name) ? (
                        <div className="info__attachment">
                            <AttachmentIcon />
                            {attachments?.totalCount} Attachments
                        </div>
                    ) : null}
                    {name === 'Practice' && attachments
                        ? attachments.items?.map((attachment) => (
                              <VideoMessage
                                  key={attachment.createdDate}
                                  videoUrl={attachment.videoUrl}
                              />
                          ))
                        : null}
                    {name === 'Resume check' && user.cVFileUrl ? (
                        <VideoMessage videoUrl={user.cVFileUrl} messageType={MessageType.File} />
                    ) : null}
                    <div className="info__message-box">
                        {isLoading ? (
                            <div className={'message-box__message another'}>
                                <text>{variables.messageInput.text}</text>
                                <PrimarySpinner />
                            </div>
                        ) : null}
                        {itemList.map((message) => (
                            <Fragment key={message.createdAt}>
                                <div
                                    className={
                                        'message-box__message ' +
                                        (message.senderId !== user.id && 'another')
                                    }>
                                    <span>{message.text}</span>
                                </div>
                                {message.messageType !== MessageType.Text && message.photoUrl && (
                                    <VideoMessage
                                        videoUrl={message.photoUrl}
                                        messageType={message.messageType}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </S.ChatWrapper>

            <S.InputWrapper>
                <S.ChatInput className="chat-input">
                    <TextareaAutosize
                        placeholder="Type Message"
                        className="chat-input__input"
                        ref={textareaRef}
                        maxRows={4}
                    />
                    <SendIcon
                        className="chat-input__send-button"
                        onClick={() => {
                            mutate({
                                messageInput: {
                                    messageType: MessageType.Text,
                                    conversationId,
                                    receiverId: user.id,
                                    subject: name,
                                    text: textareaRef.current.value
                                }
                            });
                            textareaRef.current.value = '';
                        }}
                    />
                </S.ChatInput>
            </S.InputWrapper>
        </>
    );
};

export default ChatSection
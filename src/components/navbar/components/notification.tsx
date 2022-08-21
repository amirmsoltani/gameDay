import {
    Box,
    CircularProgress,
    Divider,
    IconButton,
    styled,
    Typography,
    useTheme
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import NotificationIcon from 'src/assets/common/notification';
import DeleteNotifIcon from 'src/assets/icons/navbar/delete-notif';
import {
    SortEnumType
    // useInfiniteNotification_GetNotificationsQuery,
    // useNotification_ReadNotificationMutation
} from 'src/graphql/generated';
import { newModal } from 'src/redux/actions/actions';
import { useGetObservedNotifications } from 'src/subscription/notification_observer';
import { MuiButton } from '@/components/base/Button';
import { useQueryClient } from 'react-query';

const LoadBtn = styled(MuiButton)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: 14,
    width: 90,
    marginRight: 'auto'
}));

const Notification = ({ modals }) => {
    const dispatch = useDispatch();
    const notifRef = useRef<any>();
    const [openNotifBar, setOpenNotifBar] = useState(false);

    const { messages, clearMessages } = useGetObservedNotifications();
    const newNotificationExist = messages?.length > 0;
    console.log(messages);

    useEffect(() => {
        window.addEventListener('click', handleClickOutside, true);

        function handleClickOutside(event) {
            if (!notifRef.current?.contains?.(event.target) && openNotifBar) {
                setOpenNotifBar(false);
            } else setOpenNotifBar(true);
        }

        return () => window.removeEventListener('click', handleClickOutside, true);
    }, [openNotifBar]);

    return (
        <Box
            ref={notifRef}
            onClick={notificationOnclickHandler}
            sx={{
                cursor: 'pointer',
                fontFamily: 'Helvetica',
                marginRight: '20px',
                position: 'relative',
                padding: '10px',
                borderRadius: '9px',
                paddingBottom: '2px',
                backgroundColor: modals.find((item) => item.id === 'notif') ? '#6FCBDF6e' : 'unset'
            }}>
            <NotificationIcon />
            {newNotificationExist && (
                <Box
                    style={{
                        background: '#D5623D',
                        position: 'absolute',
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        top: -2,
                        right: -4
                    }}></Box>
            )}
        </Box>
    );

    function notificationOnclickHandler() {
        setOpenNotifBar(!openNotifBar);
        if (openNotifBar) {
            dispatch(
                newModal({
                    id: 'notif',
                    Container: ModalContainer,
                    Body: ModalBody,
                    sideBarSearch: true
                })
            );
        }
        clearMessages();
    }
};

const mapStateToProps = ({ modals }) => ({ modals });

export default connect(mapStateToProps)(Notification);

const ModalBody = () => {
    const theme = useTheme();
    // const { mutate } = useNotification_ReadNotificationMutation();
    const queryClient = useQueryClient();

    const lastWeek = dayjs(new Date().setHours(0, 0, 0, 0)).add(-7, 'day').toISOString();
    // const { fetchNextPage, hasNextPage, isLoading, data, isFetchingNextPage } =
    //     useInfiniteNotification_GetNotificationsQuery(
    //         {
    //             order: { createdDate: SortEnumType.Desc },
    //             take: 6,
    //             skip: 0,
    //             where: {
    //                 and: [
    //                     { createdDate: { gt: lastWeek } },
    //                     { isReaded: { eq: false } },
    //                     { isDeleted: { eq: false } }
    //                 ]
    //             }
    //         },
    //         {
    //             keepPreviousData: true,
    //             getNextPageParam: (_, pages) => ({ skip: pages.length * 6 })
    //         }
    //     );

    // const mustShowLoadMore =
    //     data?.pages?.[data?.pages?.length - 1]?.notification_getNotifications?.result?.pageInfo
    //         ?.hasNextPage;

    // const notifs = data?.pages
    //     ?.map?.((items) => items?.notification_getNotifications?.result?.items)
    //     .reduce((acc, i) => [...(acc || []), ...i]);

    const notifs = [];
    return (
        <Box width="100%" height="100%">
            <Box>
                {/* {isLoading && (
                    <Box width="100%" display="flex" justifyContent="center">
                        <CircularProgress size="2rem" sx={{ color: theme.palette.primary.main }} />
                    </Box>
                )} */}
                {notifs?.map((notif, index) => {
                    return (
                        <>
                            {(notifs
                                .slice(0, index)
                                .some((item) => notif.createdDate !== item.createdDate) ||
                                index === 0) && (
                                <>
                                    {index !== 0 && (
                                        <Divider sx={{ width: '100%', marginBottom: '10px' }} />
                                    )}
                                    <Typography
                                        fontSize={17}
                                        fontWeight="bold"
                                        color="black"
                                        mb="10px">
                                        {getDate(notif.createdDate)}
                                    </Typography>
                                </>
                            )}
                            {
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    mb="10px">
                                    <Typography fontSize={13} maxWidth="90%" color="black">
                                        {getNotifString(notif.notificationType)}
                                    </Typography>
                                    <IconButton
                                    // onClick={() =>
                                    //     mutate(
                                    //         { notificationId: notif.id },
                                    //         {
                                    //             onSuccess: () =>
                                    //                 queryClient.refetchQueries(
                                    //                     'notification_getNotifications'
                                    //                 )
                                    //         }
                                    //     )
                                    // }
                                    >
                                        <DeleteNotifIcon />
                                    </IconButton>
                                </Box>
                            }
                        </>
                    );
                })}
                {notifs?.length < 1 && (
                    <Typography color="gray">There are no notifications yet!</Typography>
                )}
                {/* {mustShowLoadMore && (
                    <LoadBtn
                    // onClick={() => fetchNextPage()}
                    //  disabled={isFetchingNextPage}
                    >
                        Load more
                    </LoadBtn>
                )} */}
            </Box>
        </Box>
    );

    function getNotifString(key) {
        switch (key) {
            case 'ACCEPT_USER_BY_ADMIN':
                return 'The admin accepted your account';
            case 'REJECT_USER_BY_ADMIN':
                return 'The admin rejected your account';
            case 'REJECT_BOOKING_BY_HEALER ':
                return 'The healer rejected your booking';
            case 'ACCEPT_BOOKING_BY_HEALER ':
                return 'The healer accepted your booking';
            default:
                return 'New notification recived!';
        }
    }

    function getDate(dayString) {
        const date = dayjs(dayString).format('dddd DD MMMM YYYY');
        const today = dayjs(new Date()).format('dddd DD MMMM YYYY');
        const yesterday = dayjs(new Date()).add(-1, 'day').format('dddd DD MMMM YYYY');

        switch (date) {
            case today:
                return 'Today';
            case yesterday:
                return 'Yesterday';
            default:
                return date;
        }
    }
};

const ModalContainer = ({ children }) => {
    return (
        <Box
            sx={{
                width: 350,
                maxHeight: '50%',
                overflow: 'auto',
                background: 'white',
                borderRadius: '0 0 12px 12px',
                border: '0.1px solid #70707033',
                boxShadow: '1px 2px 8px #4D6F761f',
                borderTop: 'unset',
                padding: '18px 15px',
                position: 'absolute',
                top: 80,
                right: 145
            }}>
            {children}
        </Box>
    );
};

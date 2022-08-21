import React from 'react'
import CloseIconMain from 'src/assets/icons/Close'
import Tick from 'src/assets/icons/Tick'
import { CircularProgress, styled } from '@mui/material';
import { useBooking_AcceptBookingMutation, useBooking_RejectBookingMutation } from 'src/graphql/generated';
import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query';

const CustomDiv = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '70px'
});

export const Custom = styled('div')({
    cursor: 'pointer'
})

const TickClose = (value) => {
    const bookingId = value?.row?.bookingId;
    const status = value?.row?.status;
    const { mutate, isLoading } = useBooking_AcceptBookingMutation();
    const { mutate: RejectUser, isLoading: loadingReject } = useBooking_RejectBookingMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();


    const handleApprove = () => {
        mutate({
            id: Number(bookingId)
        }, {
            onSuccess: () => { enqueueSnackbar('Operation was successful!', { variant: 'success' }), queryClient.refetchQueries('booking_getAllBookings') },
            onError: () => { enqueueSnackbar('Operation Failed!', { variant: 'error' }) }
        })
    }

    const handleReject = () => {
        RejectUser({
            id: Number(bookingId),
        }, {
            onSuccess: () => { enqueueSnackbar('Operation was successful!', { variant: 'success' }), queryClient.refetchQueries('booking_getAllBookings') },
            onError: () => { enqueueSnackbar('Operation Failed!', { variant: 'error' }) }
        })
    }

    return (
        status === "ACCEPTED" ? null :
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '15px' }} onClick={() => console.log('bookingId',)}>
                <CustomDiv>
                    {isLoading ? <CircularProgress size={20} /> : <Custom onClick={(isLoading || loadingReject) ? null : handleApprove}><Tick /></Custom>}
                    {loadingReject ? <CircularProgress size={20} /> : <Custom onClick={(isLoading || loadingReject) ? null : handleReject}><CloseIconMain /></Custom>}
                </CustomDiv>
            </div>
    )
}

export default TickClose
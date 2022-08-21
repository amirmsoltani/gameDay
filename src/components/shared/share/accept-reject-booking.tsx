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
    minWidth:'70px'
});

export const Custom = styled('div')({
    cursor: 'pointer'
})

const AcceptRejectBooking = ({id}) => {
    const { mutate, isLoading } = useBooking_AcceptBookingMutation();
    const { mutate: RejectUser, isLoading: loadingReject } = useBooking_RejectBookingMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();


    const handleApprove = () => {
        mutate({
            id: Number(id)
        }, {
            onSuccess: () => { enqueueSnackbar('Operation was successful!', { variant: 'success' }), queryClient.refetchQueries('booking_getAllBookings') },
            onError: () => { enqueueSnackbar('Operation Failed!', { variant: 'error' }) }
        })
    }

    const handleReject = () => {
        RejectUser({
            id: Number(id),
        }, {
            onSuccess: () => { enqueueSnackbar('Operation was successful!', { variant: 'success' }), queryClient.refetchQueries('booking_getAllBookings') },
            onError: () => { enqueueSnackbar('Operation Failed!', { variant: 'error' }) }
        })
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} onClick={()=>console.log('bookingId',)}>
            <CustomDiv>
                {isLoading ? <CircularProgress size={20} /> : <Custom onClick={(isLoading || loadingReject) ? null:handleApprove}><Tick /></Custom>}
                {loadingReject ? <CircularProgress size={20} />:<Custom onClick={(isLoading || loadingReject) ? null:handleReject}><CloseIconMain /></Custom>}
            </CustomDiv>
        </div>
    )
}

export default AcceptRejectBooking
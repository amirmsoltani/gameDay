import { Button, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModal, newModal } from 'src/redux/actions/actions'
import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query';
import { LoadingButton } from '@mui/lab';
import { useBooking_AcceptBookingMutation, useBooking_RejectBookingMutation, useBooking_GetTimeRequestQuery } from 'src/graphql/generated';


const ComponentTime = (value) => {
    const dispatch = useDispatch()
    const bookingId = value?.row?.bookingId;
    const { data, isLoading:dataLoadiung } = useBooking_GetTimeRequestQuery({ id: Number(bookingId) },{enabled : !!Number(bookingId)});
    const items = data?.booking_getTimeRequest?.result?.items

    const handleModalTime = () => {
        dispatch(
            newModal({
                closeButton: true,
                Body: BodyModals,
                title: 'Time request',
                id: '1',
                topBar:true
            })
        )
    }

    function BodyModals() {
        const { mutate, isLoading } = useBooking_AcceptBookingMutation();
        const { mutate: RejectUser, isLoading: loadingReject } = useBooking_RejectBookingMutation();
        const { enqueueSnackbar } = useSnackbar();
        const queryClient = useQueryClient();

        const acceptBooking = () => {
            mutate({
                id: Number(bookingId)
            }, {
                onSuccess: () => { enqueueSnackbar('Operation was successful!', { variant: 'success' }), queryClient.refetchQueries('booking_getAllBookings'), dispatch(closeModal('1')) },
                onError: () => { enqueueSnackbar('Operation Failed!', { variant: 'error' }) }
            })
        }

        const rejectBooking = () => {
            RejectUser({
                id: Number(bookingId),
            }, {
                onSuccess: () => { enqueueSnackbar('Operation was successful!', { variant: 'success' }), queryClient.refetchQueries('booking_getAllBookings'), dispatch(closeModal('1')) },
                onError: () => { enqueueSnackbar('Operation Failed!', { variant: 'error' }) }
            })
        }

        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', padding: '20px 0px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        dataLoadiung ? <CircularProgress /> :
                            items?.map((item, index) => {
                                return (
                                    <Typography key={index} sx={{ color: '#58636E' }}>{item?.date}</Typography>
                                )
                            })
                    }
                </div>
                <div style={{ display: 'flex', marginTop: '30px' }}>
                    <LoadingButton loading={isLoading} variant="contained" sx={{ textTransform: 'none', width: '200px', height: '35px', marginRight: '28px', backgroundColor: '#A587C2', borderRadius: '18px', color: '#fff', ':hover': { backgroundColor: '#A587C2' } }} onClick={acceptBooking}><Typography sx={{ fontSize: '18px', color: '#fff' }} >Accept</Typography></LoadingButton>
                    <LoadingButton loading={loadingReject} sx={{ textTransform: 'none', width: '200px', height: '35px', backgroundColor: '#fff', borderRadius: '18px', color: '#A587C2', border: '1px solid #A587C2', ':hover': { backgroundColor: '#fff' } }} onClick={rejectBooking}><Typography sx={{ fontSize: '18px', color: '#3E205A' }}>Reject</Typography></LoadingButton>
                </div>
            </div>
        )
    }

    return (
        <Typography onClick={handleModalTime} sx={{ textDecoration: 'underline', color: '#5293D3', fontSize: '14px', cursor: 'pointer' }}>Time request</Typography>
    )
}

export default ComponentTime
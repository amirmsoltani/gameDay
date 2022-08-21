import React from 'react'
import CloseIconMain from 'src/assets/icons/Close'
import Tick from 'src/assets/icons/Tick'
import { CircularProgress, styled } from '@mui/material';
import { useUser_AcceptUserMutation, useUser_RejectUserMutation } from 'src/graphql/generated';
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

const TickCloseAdmin = ({ value }) => {
    const { mutate, isLoading } = useUser_AcceptUserMutation();
    const { mutate: RejectUser, isLoading: loadingReject } = useUser_RejectUserMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();


    const handleApprove = () => {
        mutate({
            userId: Number(value)
        }, {
            onSuccess: () => { enqueueSnackbar('Operation was successful!', { variant: 'success' }), queryClient.refetchQueries('user_getUsers') },
            onError: () => { enqueueSnackbar('Operation Failed!', { variant: 'error' }) }
        })
    }

    const handleReject = () => {
        RejectUser({
            userId: Number(value),
            rejectReason: ''
        }, {
            onSuccess: () => { enqueueSnackbar('Operation was successful!', { variant: 'success' }), queryClient.refetchQueries('user_getUsers') },
            onError: () => { enqueueSnackbar('Operation Failed!', { variant: 'error' }) }
        })
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <CustomDiv>
                {isLoading ? <CircularProgress size={20} /> : <Custom onClick={(isLoading || loadingReject) ? null:handleApprove}><Tick /></Custom>}
                {loadingReject ? <CircularProgress size={20} />:<Custom onClick={(isLoading || loadingReject) ? null:handleReject}><CloseIconMain /></Custom>}
            </CustomDiv>
        </div>
    )
}

export default TickCloseAdmin;
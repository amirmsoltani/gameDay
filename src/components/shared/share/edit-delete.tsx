import React from 'react'
import Delete from 'src/assets/icons/Delete'
import Edit from 'src/assets/icons/Edit'
import { Button, styled, Typography } from '@mui/material';
import { Custom } from './tick-close';
import { useDispatch } from 'react-redux';
import { closeModal, newModal } from 'src/redux/actions/actions';
import {  useUser_DeactivateUserMutation } from 'src/graphql/generated';
import { useSnackbar } from 'notistack';
import {  useQueryClient } from 'react-query';
import { LoadingButton } from '@mui/lab';

const CustomDiv = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '70px'
})

const EditDelete = ({value}) => {
    const dispatch = useDispatch();

    const handleModal = () => {
        dispatch(
            newModal({
                closeButton: true,
                Body: BodyModals,
                title: 'Are you sure you want to delete client?',
                topBar:window.location.pathname === "/admin/" && true,
                id:'1'
            })
        );
    }

    function BodyModals() {
        const {mutate,isLoading} = useUser_DeactivateUserMutation();
        const { enqueueSnackbar } = useSnackbar();
        const queryClient = useQueryClient();

        const handleDectiveUser = ()=>{
            mutate({
                userId:Number(value)
            },{
                onSuccess:()=>{enqueueSnackbar('Operation was successful!', { variant: 'success' }),queryClient.refetchQueries('user_getUsers'),dispatch(closeModal('1'))},
                onError : ()=>{enqueueSnackbar('Operation Failed!', { variant: 'error' })}
            })
        }

        const handleCancel = ()=>{
            dispatch(closeModal('1'))
        }
    
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '180px' }}>
                <LoadingButton variant="contained" loading={isLoading} sx={{ textTransform: 'none', width: '200px', height: '35px', marginRight: '28px', backgroundColor: '#A587C2', borderRadius: '18px', color: '#fff', ':hover': { backgroundColor: '#A587C2' } }} onClick={handleDectiveUser}><Typography sx={{ fontSize: '18px' }} >Yes, Delete</Typography></LoadingButton>
                <Button sx={{ textTransform: 'none', width: '200px', height: '35px', backgroundColor: '#fff', borderRadius: '18px', color: '#A587C2', border: '1px solid #A587C2', ':hover': { backgroundColor: '#fff' } }} onClick={handleCancel}><Typography sx={{ fontSize: '18px' }}>No</Typography></Button>
            </div>
        )
    }

    return (
        <CustomDiv>
            <Custom onClick={handleModal}><Delete /></Custom>
        </CustomDiv>
    )
}



export default EditDelete
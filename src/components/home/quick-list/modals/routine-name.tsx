import { MInputFormik } from '@/components/base/input/MInput';
import { Box, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/actions/actions';
import * as S from './../quick.styled';

export const RoutineNameModal = () => {
    const dispatch = useDispatch();

    const closeModalCustom = () => dispatch(closeModal('ModalRoutineName'));

    const handleSubmit = (values: { name: string }) => {
        console.log({ values });
        closeModalCustom();
    };

    return (
        <Box sx={{ width: 300, marginTop: 3 }}>
            <Formik initialValues={{ name: '' }} onSubmit={handleSubmit}>
                <Form>
                    <MInputFormik name="name" fullWidth />
                    <Grid container spacing={3}>
                        <Grid xs={true} item>
                            <S.ButtonSubmitModalBoard type="submit">Save</S.ButtonSubmitModalBoard>
                        </Grid>
                        <Grid xs={true} item>
                            <S.ButtonActionTop type="button" onClick={closeModalCustom}>
                                Cancel
                            </S.ButtonActionTop>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </Box>
    );
};

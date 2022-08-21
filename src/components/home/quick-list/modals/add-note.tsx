import { MInputFormik } from '@/components/base/input/MInput';
import { Box, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/actions/actions';
import * as S from './../quick.styled';

export const AddNoteBoardModal = () => {
    const dispatch = useDispatch();
    const closeModalCustom = () => dispatch(closeModal('ModalNoteBoard'));

    const handleSubmit = (values: { note: string }) => {
        console.log({ values });
        closeModalCustom();
    };

    return (
        <Box sx={{ width: 300, marginTop: 3 }}>
            <Formik initialValues={{ note: '' }} onSubmit={handleSubmit}>
                <Form>
                    <MInputFormik name="note" fullWidth />
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

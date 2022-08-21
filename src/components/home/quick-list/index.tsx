import { Box, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newModal } from 'src/redux/actions/actions';
import { IQuickListExercise } from 'src/redux/reducer/reducer';
import { ListQuickExerciseWrapper } from './list-quick-exercise';
import { AddNoteBoardModal } from './modals/add-note';
import { RoutineNameModal } from './modals/routine-name';
import * as S from './quick.styled';
import ShareButtonExercise from './share-button';

export const QuickListExercise = () => {
    const exercises = useSelector(({ exerciseBoard }: IQuickListExercise) => exerciseBoard);

    const onSubmit = () => {};
    const dispatch = useDispatch();

    const initialValues = {
        exercises: exercises.map(() => ({
            reps: '',
            hold: '',
            perform: '',
            set: '',
            note: '',
            holdType: '',
            performType: ''
        }))
    };

    return (
        <Box>
            <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
                <Form>
                    <Grid container columnSpacing={2}>
                        <Grid item xs={true}>
                            <S.ButtonActionTop
                                onClick={() => {
                                    dispatch(
                                        newModal({
                                            Body: AddNoteBoardModal,
                                            id: 'ModalNoteBoard',
                                            title: 'Note Board',
                                            top: 0,
                                            closeButton: true
                                        })
                                    );
                                }}
                                type="button"
                                variant="outlined"
                                color="inherit">
                                Add note
                            </S.ButtonActionTop>
                        </Grid>
                        <Grid item>
                            <S.ButtonActionTop
                                onClick={() => {
                                    dispatch(
                                        newModal({
                                            Body: RoutineNameModal,
                                            id: 'ModalRoutineName',
                                            title: 'Your routine name',
                                            top: 0,
                                            closeButton: true
                                        })
                                    );
                                }}
                                variant="outlined"
                                type="button"
                                color="inherit">
                                Save as a routine
                            </S.ButtonActionTop>
                        </Grid>
                        <Grid item xs={true}>
                            <Link href="/exercises/board">
                                <S.ButtonActionTop variant="outlined" color="inherit">
                                    See details
                                </S.ButtonActionTop>
                            </Link>
                        </Grid>
                    </Grid>
                    <Typography sx={{ margin: '10px 0' }}>
                        * Drag and drop to add exercise
                    </Typography>
                    <ListQuickExerciseWrapper exerciseBoard={exercises} />
                    <ShareButtonExercise />
                </Form>
            </Formik>
        </Box>
    );
};

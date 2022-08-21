import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { RemoveIconSvgBold } from 'src/assets/exercise/action';
import {
    ExerciseProducts,
    GetAllExercisesQuery,
    HoldType,
    PerformType
} from 'src/graphql/generated';
import { EquipmentRadioExercise, QuickInputExercise, QuickRadioExercise } from './input-exercise';
import * as S from './quick.styled';
import { useDispatch } from 'react-redux';
import { closeModal, newModal, removeBoardExercise } from 'src/redux/actions/actions';
import { Form, Formik } from 'formik';
import { CounterProduct } from '@/components/products/counter-product';
import { Draggable } from 'react-beautiful-dnd';
import { IQuickListExercise } from 'src/redux/reducer/reducer';

interface IQuickItemExercise {
    exercise: IQuickListExercise['exerciseBoard'][number];
    index: number;
}

interface IProductItemEquipmentProps {
    item: ExerciseProducts;
    count: number;
    setCount: (e: number) => void;
    name: string;
}

export const holdOptions = [
    {
        option: <S.LabelOption>Min</S.LabelOption>,
        value: HoldType.Min
    },
    {
        option: <S.LabelOption>Sec</S.LabelOption>,
        value: HoldType.Sec
    }
];

export const performOptions = [
    {
        option: <S.LabelOption>Hour</S.LabelOption>,
        value: PerformType.Hour
    },
    {
        option: <S.LabelOption>Day</S.LabelOption>,
        value: PerformType.Day
    },
    {
        option: <S.LabelOption>Week</S.LabelOption>,
        value: PerformType.Week
    }
];

const ProductItemEquipment = ({ item, count, setCount, name }: IProductItemEquipmentProps) => {
    const { product } = item;

    return (
        <S.ProductWrapper>
            <Box>
                <img src={product.photoUrl} alt={product.name} />
            </Box>
            <Box sx={{ paddingLeft: 2 }} flex="1">
                <Typography sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop={2}>
                    <Typography sx={{ fontWeight: 'bold' }}>$ {product.price}</Typography>
                    <Box flex="1" display="flex" alignItems="center" justifyContent="center">
                        {product.colors?.map((color, index) => (
                            <Box
                                sx={{
                                    width: 16,
                                    height: 16,
                                    backgroundColor: color,
                                    borderRadius: '50%',
                                    margin: '0 5px',
                                    cursor: 'pointer'
                                }}
                                key={index}></Box>
                        ))}
                    </Box>
                    <Box>
                        <CounterProduct setCounter={setCount} count={count} name={name} />
                    </Box>
                </Box>
            </Box>
        </S.ProductWrapper>
    );
};

export const QuickItemExercise = ({ exercise, index }: IQuickItemExercise) => {
    const dispatch = useDispatch();

    const SelectEquipment = ({ exerciseProducts }) => {
        // console.log('Exercise: ', exerciseProducts);

        const handleSubmit = (values) => {
            console.log('Values: ', values);
            dispatch(closeModal('ModalSelectEquipment'));
        };

        return (
            <Box width={450} paddingX={1}>
                <Formik
                    initialValues={{
                        equipment: '',
                        count: exerciseProducts.map(() => 0)
                    }}
                    onSubmit={handleSubmit}>
                    {({ setFieldValue, values }) => (
                        <Form>
                            <Grid container flexDirection="column" columnSpacing={2}>
                                <EquipmentRadioExercise
                                    name="equipment"
                                    options={exerciseProducts.map((item, index) => ({
                                        value: item.id,
                                        option: (
                                            <ProductItemEquipment
                                                item={item}
                                                name={`count.${index}`}
                                                count={values.count[index]}
                                                setCount={(e: number) =>
                                                    setFieldValue(`count.${index}`, e)
                                                }
                                            />
                                        )
                                    }))}
                                />
                                <S.ButtonSubmitEquipment type="submit">Add</S.ButtonSubmitEquipment>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        );
    };

    const handleOpenModal = () => {
        dispatch(
            newModal({
                id: 'ModalSelectEquipment',
                Body: SelectEquipment,
                top: 0,
                closeButton: true,
                title: 'Select equipment',
                exerciseProducts: exercise.products
            })
        );
    };

    return (
        <Draggable
            isDragDisabled
            draggableId={'exercise-drop-' + exercise.exercise.id.toString()}
            index={index}>
            {(provided) => (
                <S.ExerciseItemWrapper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <S.WrapperExercise>
                        <S.ImageWrapper>
                            <S.ImageExercise
                                src="/images/temp/exercise-mock-item1.png"
                                // src={exercise.exercise.photoUrl}
                                alt={exercise.exercise.name}
                            />
                        </S.ImageWrapper>
                        <Box>
                            <Box display="flex" justifyContent="space-between">
                                <S.TitleExercise>{exercise.exercise?.name}</S.TitleExercise>
                                <S.ButtonEquipment onClick={handleOpenModal} variant="text">
                                    Add equipment
                                </S.ButtonEquipment>
                            </Box>
                            <Box sx={{ marginTop: '10px' }}>
                                <Grid container columnSpacing={2}>
                                    <Grid item xs={4}>
                                        <QuickInputExercise
                                            labelCustom="Reps"
                                            name={`exercises.${index}.reps`}
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={8} container columnSpacing={1}>
                                        <Grid item xs={6}>
                                            <QuickInputExercise
                                                labelCustom="Hold"
                                                name={`exercises.${index}.hold`}
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <QuickRadioExercise
                                                name={`exercises.${index}.holdType`}
                                                options={holdOptions}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ marginTop: '10px' }}>
                                <Grid container columnSpacing={2}>
                                    <Grid item xs={4}>
                                        <QuickInputExercise
                                            labelCustom="Set"
                                            name={`exercises.${index}.set`}
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={8} container columnSpacing={1}>
                                        <Grid item xs={6}>
                                            <QuickInputExercise
                                                labelCustom="Perform"
                                                name={`exercises.${index}.perform`}
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <QuickRadioExercise
                                                name={`exercises.${index}.performType`}
                                                options={performOptions}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <Box>
                            <S.RemoveButton
                                onClick={() => dispatch(removeBoardExercise(exercise.exercise.id))}>
                                <RemoveIconSvgBold />
                            </S.RemoveButton>
                        </Box>
                    </S.WrapperExercise>
                    <Box>
                        <S.InputTextAreaExerciseNote
                            // InputComponent={S.NoteInputExercise}
                            // rows={4}
                            InputRoot={S.TextAreaWrapperExercise}
                            name={`exercises.${index}.note`}
                            errorSpaceOn
                            placeholder="Note: "
                        />
                        <Typography sx={{ marginTop: '5px' }}>2 equipment added</Typography>
                    </Box>
                </S.ExerciseItemWrapper>
            )}
        </Draggable>
    );
};

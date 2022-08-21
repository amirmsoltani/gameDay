import { MRadioFormik } from '@/components/base/input/m-radio';
import { MInputFormik } from '@/components/base/input/MInput';
import { Box, RadioGroup, styled } from '@mui/material';
import * as S from './quick.styled';
import React from 'react';

export const QuickInputExercise = styled(
    (props: React.ComponentProps<typeof MInputFormik> & { labelCustom?: string }) => (
        <Box>
            {props.labelCustom && <label>{props.labelCustom}</label>}
            <MInputFormik
                {...props}
                InputRoot={S.InputWrapperExercise}
                InputComponent={S.InputExercise}
                inputProps={{
                    height: 35,
                    padding: '0 5px'
                }}
                errorSpaceOn
            />
        </Box>
    )
)(({ theme }) => ({}));

export const QuickRadioExercise = styled((props: React.ComponentProps<typeof MRadioFormik>) => (
    <MRadioFormik
        {...props}
        InputComponent={S.RadioWrapperExercise}
        vertical
        errorSpaceOn
        InputOption={S.InputRadioOptionFormControl}
        CustomOption={S.CustomExerciseOption}
    />
))(({ theme }) => ({
    width: '42px'
}));

export const RadioWrapperQquipment = styled(RadioGroup)({
    width: '100%'
});

export const EquipmentRadioExercise = styled(
    (props: React.ComponentProps<typeof QuickRadioExercise>) => (
        <QuickRadioExercise
            {...props}
            InputComponent={RadioWrapperQquipment}
            vertical
            errorSpaceOn
            InputOption={S.InputRadioOptionFormControl}
            CustomOption={S.CustomExerciseOption}
        />
    )
)(({ theme }) => ({
    width: '42px'
}));

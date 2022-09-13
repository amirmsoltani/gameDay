import React, { FC, useCallback, useState } from 'react';
import { Alert, Box, InputLabel, Typography } from '@mui/material';
import * as S from './login-styles';
import { MImage } from '@/components/base/image/MImage';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { InferType } from 'yup';
import { MInputFormik } from '@/components/base/input/formik';
import { Spacer } from '@/components/base/spacer';
import { useAuthPage } from '@/components/auth/services/useAuth';

import { InputAdornment, IconButton } from '@material-ui/core';
import { ShowPasswordEyeSvgIcon } from 'src/assets/icons/show-password-visibility';

// Form Schema
const schema = Yup.object({
    email: Yup.string().email('Must be a valid email').required('Email is required')
});

// Form Value Type
type ValueType = InferType<typeof schema>;

// form initial Value
const initialValues: ValueType = {
    email: ''
};

const CreateNewPassWord: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const { state, changePassword } = useAuthPage();

    const onSubmit = useCallback((value: ValueType) => {
        changePassword(value.email);
    }, []);

    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={0}>
            <S.LeftSide gridColumn="span 8">
                <MImage resources={{ src: '/images/auth/login-logo.png' }} />
            </S.LeftSide>
            <S.RightSide gridColumn="span 4">
                <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
                    <Form>
                        <S.FormCard>
                            <S.ForgetTitle>Create a new password</S.ForgetTitle>
                            <S.ForgetText>Choose a strong password.</S.ForgetText>
                            {state.error !== '' && <Alert severity="error">{state.error}</Alert>}
                            <InputLabel shrink htmlFor="bootstrap-input">
                                New Password
                            </InputLabel>
                            <MInputFormik
                                name="email"
                                fullWidth
                                label=""
                                type={showPassword ? 'text' : 'password'}
                                // onChange={someChangeHandler}
                                InputProps={{
                                    // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}>
                                                {showPassword ? <ShowPasswordEyeSvgIcon /> : null}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Repeat Password
                            </InputLabel>
                            <MInputFormik name="email" fullWidth label="" />
                            <Spacer space={5} />
                            <S.SubmitButton loading={state.loading} type={'submit'}>
                                sign in
                            </S.SubmitButton>
                        </S.FormCard>
                    </Form>
                </Formik>
            </S.RightSide>
        </Box>
    );
};

export default CreateNewPassWord;

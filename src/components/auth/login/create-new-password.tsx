import React, { FC, useCallback, useState } from 'react';
import { Alert, Box, Button, InputLabel, Typography } from '@mui/material';
import * as S from './login-styles';
import { MImage } from '@/components/base/image/MImage';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { InferType } from 'yup';
import { MInputPasswordFormik } from '@/components/base/input/formik';
import { Spacer } from '@/components/base/spacer';
import { useAuthPage } from '@/components/auth/services/useAuth';
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
    const [toggleType, setIsToggle] = useState(false);
    const toggleShow = () => setIsToggle((toggleType) => !toggleType);

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

                            <InputLabel shrink>New Password</InputLabel>
                            <S.ForgetPasswordBox>
                                <MInputPasswordFormik
                                    name="password"
                                    fullWidth
                                    type={toggleType ? 'text' : 'password'}
                                />
                                <S.ForgetPasswordIcon>
                                    <Button variant="text" onClick={toggleShow}>
                                        <ShowPasswordEyeSvgIcon />
                                    </Button>
                                </S.ForgetPasswordIcon>
                            </S.ForgetPasswordBox>

                            <InputLabel shrink>Repeat Password</InputLabel>
                            <S.ForgetPasswordBox>
                                <MInputPasswordFormik
                                    name="repeatPassword"
                                    fullWidth
                                    type={toggleType ? 'text' : 'password'}
                                />
                                <S.ForgetPasswordIcon>
                                    <Button variant="text" onClick={toggleShow}>
                                        <ShowPasswordEyeSvgIcon />
                                    </Button>
                                </S.ForgetPasswordIcon>
                            </S.ForgetPasswordBox>

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

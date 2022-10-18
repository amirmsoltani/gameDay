import React, { FC, useCallback } from 'react';
import { Alert, Box, Typography } from '@mui/material';
import * as S from './login-styles';
import { MImage } from '@/components/base/image/MImage';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { InferType } from 'yup';
import { MInputFormik, MInputPasswordFormik } from '@/components/base/input/formik';
import { Spacer } from '@/components/base/spacer';
import { MCheckboxFormik } from '@/components/base/toggle/Checkbox';
import { useAuthPage } from '@/components/auth/services/useAuth';
import Link from 'next/link';

// Form Schema
const schema = Yup.object({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    remember: Yup.boolean()
});

// Form Value Type
type ValueType = InferType<typeof schema>;

// form initial Value
const initialValues: ValueType = {
    email: '',
    password: '',
    remember: false
};

const LoginComponent: FC = () => {
    const { login, state } = useAuthPage();

    const onSubmit = useCallback((value: ValueType) => {
        login(value.email, value.password);
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
                            {state.error !== '' && <Alert severity="error">{state.error}</Alert>}
                            <MInputFormik name="email" fullWidth label="Username" />
                            <Spacer space={40} />
                            <MInputPasswordFormik
                                name="password"
                                fullWidth
                                label="Password"
                                errorSpaceOn={true}
                            />
                            <Spacer space={10} />
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <MCheckboxFormik name="remember" optionName="Remember Me" />
                                <S.ForgetButton>
                                    <Link href={'/forget-password'}>
                                        <a className="link-color">Forget Password?</a>
                                    </Link>
                                </S.ForgetButton>
                            </Box>
                            <Spacer space={57} />
                            <S.SubmitButton loading={state.loading} type={'submit'}>
                                Login
                            </S.SubmitButton>
                        </S.FormCard>
                    </Form>
                </Formik>
            </S.RightSide>
        </Box>
    );
};

export default LoginComponent;

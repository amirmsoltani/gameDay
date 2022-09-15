import React, { FC, useCallback } from 'react';
import { Alert, Box, Typography } from '@mui/material';
import * as S from './login-styles';
import { MImage } from '@/components/base/image/MImage';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { InferType } from 'yup';
import { MInputFormik } from '@/components/base/input/formik';
import { Spacer } from '@/components/base/spacer';
import { useAuthPage } from '@/components/auth/services/useAuth';
import Link from 'next/link';

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

const ForgetPassword: FC = () => {
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
                            <S.ForgetTitle>Forgot password?</S.ForgetTitle>
                            <S.ForgetText>
                                Enter your email below and we will send you a reset email.
                            </S.ForgetText>
                            {state.error !== '' && <Alert severity="error">{state.error}</Alert>}
                            <MInputFormik name="email" fullWidth label="" />
                            <Spacer space={5} />
                            <Link href="/create-new-password">
                                <a className="link-color">
                                    <S.SubmitButton loading={state.loading} type={'submit'}>
                                        Submit
                                    </S.SubmitButton>
                                </a>
                            </Link>
                        </S.FormCard>
                    </Form>
                </Formik>
            </S.RightSide>
        </Box>
    );
};

export default ForgetPassword;

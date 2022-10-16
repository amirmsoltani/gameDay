import React, { FC, useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, InputLabel, Typography } from '@mui/material';
import * as S from './login-styles';
import { MImage } from '@/components/base/image/MImage';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { InferType } from 'yup';
import { MInputFormikPasswords, MInputPasswordFormik } from '@/components/base/input/formik';
import { Spacer } from '@/components/base/spacer';
import { useAuthPage } from '@/components/auth/services/useAuth';
import { ShowPasswordEyeSvgIcon } from 'src/assets/icons/show-password-visibility';

// Form Schema
const schema = Yup.object({
    firstPassword: Yup.string().required('New Password is required'),
    secondPassword: Yup.string().required('Repeat Password is required')
});

// Form Value Type
type ValueType = InferType<typeof schema>;

// form initial Value
const initialValues: ValueType = {
    firstPassword: '',
    secondPassword: ''
};

const CreateNewPassWord: FC = () => {
    const [password, setPassword] = useState({
        firstPassword: '',
        secondPassword: ''
    });

    // handleSubmit = () => {
    //     const { firstPassword, secondPassword } = this.state;

    //     if (firstPassword !== secondPassword) {
    //         alert("Passwords don't match");
    //     } else {
    //         // make API call
    //     }
    // };

    const [toggleType, setIsToggle] = useState(false);
    const toggleShow = () => setIsToggle((toggleType) => !toggleType);

    const { state, changePassword } = useAuthPage();

    const onSubmit = useCallback((value: ValueType) => {
        changePassword(value.firstPassword);
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

                            <InputLabel htmlFor="firstPassword">New Password</InputLabel>
                            <S.ForgetPasswordBox>
                                <MInputFormikPasswords name="firstPassword" fullWidth />
                            </S.ForgetPasswordBox>

                            <InputLabel htmlFor="secondPassword">Repeat Password</InputLabel>
                            <S.ForgetPasswordBox>
                                <MInputFormikPasswords
                                    name="secondPassword"
                                    type={toggleType ? 'text' : 'password'}
                                    fullWidth
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

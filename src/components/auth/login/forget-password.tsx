import React, { FC, useCallback, useState } from 'react';
import { Alert, Box, Typography } from '@mui/material';
import * as S from './login-styles';
import { MImage } from '@/components/base/image/MImage';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { InferType } from 'yup';
import { MInputFormik } from '@/components/base/input/formik';
import { Spacer } from '@/components/base/spacer';
import { useAuthPage } from '@/components/auth/services/useAuth';
import { fbPasswordReset } from 'src/auth/firebase';
import { useDispatch } from 'react-redux';
import { closeModal, newModal } from 'src/redux/actions/actions';
import SuccessEmailModal, { SUCCESS_MAIL_ID } from './succeed-email';
import { useTheme } from '@emotion/react';

// Form Schema
const schema = Yup.object({
    email: Yup.string().email('This field should be an email').required('This field is required')
});

// Form Value Type
type ValueType = InferType<typeof schema>;

// form initial Value
const initialValues: ValueType = {
    email: ''
};

const ForgetPassword: FC = () => {
    const initialValues = React.useMemo(() => {
        return {
            email: ``
        };
    }, []);
    const { state, changePassword } = useAuthPage();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // const onSubmit = useCallback((value: ValueType) => {
    //     changePassword(value.email);
    // }, []);

    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={0}>
            <S.LeftSide gridColumn="span 8">
                <MImage resources={{ src: '/images/auth/login-logo.png' }} />
            </S.LeftSide>
            <S.RightSide gridColumn="span 4">
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={(v) =>
                        changePassword(v.email).then(() => {
                            dispatch(closeModal('Forgot_Pass'));
                            dispatch(
                                newModal({
                                    id: 'ChangePassEmailSent',
                                    Body: EmailSentSuccessfully,
                                    closeButton: true,
                                    top: 0
                                })
                            );
                        })
                    }

                    // onSubmit={async (v) => {
                    //     setErrors(null);
                    //     setLoading(true);
                    //     try {
                    //         console.log(v.email);
                    //         const res = await fbPasswordReset(v.email);
                    //         setLoading(false);
                    //         dispatch(
                    //             newModal({
                    //                 id: SUCCESS_MAIL_ID,
                    //                 closeButton: false,
                    //                 Body: SuccessEmailModal
                    //             })
                    //         );
                    //     } catch (err) {
                    //         if (err.toString().includes('user-not-found')) {
                    //             setErrors('Email Not Found');
                    //         }
                    //         console.error(err);
                    //     }
                    // }}
                >
                    <Form>
                        <S.FormCard>
                            <S.ForgetTitle>Forgot password?</S.ForgetTitle>
                            <S.ForgetText>
                                Enter your email below and we will send you a reset email.
                            </S.ForgetText>
                            {state.error !== '' && <Alert severity="error">{state.error}</Alert>}
                            <MInputFormik name="email" fullWidth label="" />
                            <Spacer space={5} />
                            <S.SubmitButton loading={loading} type={'submit'}>
                                Submit
                            </S.SubmitButton>
                            <Spacer space={5} />
                            {errors && (
                                <Typography variant="subtitle1" color="green">
                                    {errors}
                                </Typography>
                            )}
                        </S.FormCard>
                    </Form>
                </Formik>
            </S.RightSide>
        </Box>
    );
};

export default ForgetPassword;

export const EmailSentSuccessfully = () => {
    const theme = useTheme();

    return (
        <Box display="flex" alignItems="center" sx={{ minWidth: '320px', width: '400px' }}>
            <Box paddingX="20px">
                <Typography color={theme.palette.primary.dark} fontSize={22}>
                    You’ve Got Mail!
                </Typography>
                <Spacer space={15} />
                <Typography color={theme.palette.primary.dark} fontSize={16}>
                    Please check your emails! We just sent you an email with a temporary password
                    recovery link.
                </Typography>
            </Box>
        </Box>
    );
};

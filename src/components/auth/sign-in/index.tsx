import * as Yup from 'yup';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AddEmail } from './forgot-password';
import { Spacer } from '@/components/base/spacer';
import { useAuthPage } from '../services/useAuth';
import { user_signInFetcher } from 'src/auth/gql';
import { saveCookie } from '@/utils/storage/cookie';
import { newModal } from 'src/redux/actions/actions';
import CommonLayout from '../components/common-layout';
import { ACCESS_TOKEN_KEY } from 'src/constants/storage';
import FacebookIcon from 'src/assets/icons/auth/facebook';
import { GoogleIcon } from 'src/assets/common/GoogleIcon';
import React, { useEffect, useMemo, useState } from 'react';
import { setAuthHeader } from '@/utils/http/graphql.client';
import { MInputFormik } from '@/components/base/input/MInput';
import { FullScreenLoading } from '@/components/base/loader/LoadingPage';
import { Box, Typography, useTheme, Divider, CircularProgress } from '@mui/material';
import { clearLocalStorage, getLocalStorage, saveLocalStorage } from '@/utils/storage/localStorage';
import { MImage } from '@/components/base/image/MImage';
import { EmailSvg } from 'src/assets/icons/auth/email';
import { KeySvg } from 'src/assets/icons/auth/key';
import * as S from './signin.styled';
import { SubmitButton } from '../sign-up/signup.styled';
import { IconContainer } from '../sign-up/sign-up-card';

interface Props {
    setLoading: (arg: string) => void;
    loading: 'GOOGLE' | 'FACE_BOOK' | 'isRedirectedFromFB' | string;
}
const SignInCard = ({ loading, setLoading }: Props) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { login, state, onAuthenticateFacebook, onAuthenticateGoogle, getFbRedirectResult } =
        useAuthPage();
    const router = useRouter();

    useEffect(() => {
        const isRedirectedFromFB = getLocalStorage('isRedirectedFromFB');
        if (isRedirectedFromFB) setLoading('isRedirectedFromFB');

        getFbRedirectResult()
            .then(async (res: any) => {
                if (!res) return setLoading('');
                if (Object.keys(res?.user || {}).length > 0) {
                    setAuthHeader(res?._tokenResponse?.idToken);
                    saveCookie(ACCESS_TOKEN_KEY, res?._tokenResponse?.idToken);

                    await user_signInFetcher()
                        .then((res) => {
                            router.push('/');
                        })
                        .catch((err) => {
                            if (err?.user_signIn?.status?.value?.includes('USER_NOT_FOUND')) {
                                router.push('/signup');
                            }
                        });
                }
            })
            .finally(() => {
                setLoading('');
                clearLocalStorage('isRedirectedFromFB');
            });
    }, [state]);

    const forgotPassHandler = () => {
        dispatch(
            newModal({
                id: 'Forgot_Pass',
                title: 'Forgot password',
                closeButton: true,
                Body: AddEmail,
                top: 0
            })
        );
    };
    const disabled = useMemo(() => state.loading || loading.length != 0, [state, loading]);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MImage
                resources={{
                    src: '/images/icons/logo_auth.png'
                }}
            />
            <Typography
                sx={{ fontSize: 26, color: theme.palette.secondary.darker, fontWeight: 'bold' }}>
                Sign In
            </Typography>
            <Spacer space={20} />
            <Formik
                initialValues={{
                    email: ``,
                    password: ``
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Must be a valid email')
                        .required('Email is required'),
                    password: Yup.string().required('Password is required')
                })}
                onSubmit={(values) => {
                    login(values.email, values.password);
                }}>
                <Form>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <MInputFormik
                            iconComponent={<EmailSvg />}
                            name="email"
                            placeholder="Email Address"
                            fullWidth
                        />
                        <MInputFormik
                            iconComponent={<KeySvg />}
                            name="password"
                            placeholder="Password"
                            type="password"
                            fullWidth
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <S.ForgetButton disableRipple onClick={forgotPassHandler}>
                                <Typography sx={{ color: theme.palette.common.info }}>
                                    Forget password
                                </Typography>
                            </S.ForgetButton>
                        </Box>
                        <Spacer space={15} />
                        <SubmitButton type="submit" disabled={disabled} loading={state.loading}>
                            Sign In
                        </SubmitButton>
                        {state.error && (
                            <Typography variant="subtitle1" color={theme.palette.error.main}>
                                {state.error}
                            </Typography>
                        )}
                    </Box>
                </Form>
            </Formik>
            <Spacer space={23} />
            <Divider sx={{ width: '100%' }}>
                <Typography sx={{ fontSize: 14, color: '#121212 ', margin: '0 7px' }}>
                    Or
                </Typography>
            </Divider>
            <Spacer space={15} />
            <Box
                display="flex"
                width={90}
                margin="auto"
                justifyContent="center"
                alignItems="center">
                <IconContainer
                    type="submit"
                    disabled={disabled}
                    loading={loading == 'GOOGLE'}
                    onClick={() => {
                        if (disabled) return;
                        setLoading('GOOGLE');
                        onAuthenticateGoogle();
                        saveLocalStorage('isRedirectedFromFB', 'true');
                    }}>
                    <GoogleIcon />
                </IconContainer>
                <Spacer space={10} />
                <IconContainer
                    type="submit"
                    disabled={disabled}
                    loading={loading == 'FACE_BOOK'}
                    onClick={() => {
                        if (disabled) return;
                        setLoading('FACE_BOOK');
                        onAuthenticateFacebook();
                        saveLocalStorage('isRedirectedFromFB', 'true');
                    }}>
                    <FacebookIcon />
                </IconContainer>
            </Box>
            <Spacer space={15} />
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center'
                }}>
                <Typography sx={{ fontSize: { xs: 12, sm: 14 }, color: '#121212' }}>
                    Don't have an account
                </Typography>
                <Spacer space={5} />
                <Link href="/signup">
                    <Typography
                        sx={{
                            fontSize: { xs: 12, sm: 14 },
                            textDecoration: 'underline',
                            color: theme.palette.common.info,
                            cursor: 'pointer'
                        }}>
                        Create an account
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
};

export const SocialLoader = () => <CircularProgress size={24} />;

const SignIn = () => {
    const [loading, setLoading] = useState('');

    return (
        <>
            {loading == 'isRedirectedFromFB' && <FullScreenLoading />}
            <CommonLayout
                imageSrc="/images/auth/signin.png"
                mobileSrc="/images/auth/signin-m.png"
                form={<SignInCard loading={loading} setLoading={setLoading} />}
            />
        </>
    );
};

export default SignIn;

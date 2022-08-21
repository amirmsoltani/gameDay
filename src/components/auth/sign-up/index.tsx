import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { UserTypes } from 'src/@types/user.type';
import { useAuthPage } from '../services/useAuth';
import { user_signInFetcher, user_signUpFetcher } from 'src/auth/gql';
import { clearCookie, saveCookie } from '@/utils/storage/cookie';
import { useEffect, useMemo, useState } from 'react';
import CommonLayout from '../components/common-layout';
import { ACCESS_TOKEN_KEY } from 'src/constants/storage';

import { setAuthHeader } from '@/utils/http/graphql.client';
import { FullScreenLoading } from '@/components/base/loader/LoadingPage';
import { clearLocalStorage, getLocalStorage, saveLocalStorage } from '@/utils/storage/localStorage';

import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from 'src/redux/actions/actions';
import { fbSignIn } from 'src/auth/firebase';

import { SignUpInfo } from './sign-up-info';
import { SignUpCard } from './sign-up-card';
import { Gender, UserInput } from 'src/graphql/generated';

interface IInitailValuesProps extends UserInput {
    email: string;
    password: string;
    confirm_password: string;
    gender: Gender;
    photoUrl: string;
    years: string;
}

const initialValues: IInitailValuesProps = {
    email: ``,
    language: 'en',
    password: ``,
    confirm_password: ``,
    gender: Gender.Female,
    photoUrl: '',
    fullName: '',
    occupation: '',
    address: '',
    years: '',
    phoneNumber: '',
    zipCode: '',
    state: '',
    city: ''
};

export type ILoginType = 'NONE' | 'GOOGLE' | 'FACE_BOOK';

const SignupComponent = () => {
    const [page, setPage] = useState('first-page');
    const [loading, setLoading] = useState('');

    const {
        signUp,
        state,
        onAuthenticateFacebook,
        onAuthenticateGoogle,
        getFbRedirectResult,
        createError,
        login
    } = useAuthPage();
    const router = useRouter();
    const [userType, setUserType] = useState<UserTypes>('NORMAL_USER');
    const [loginType, setLoginType] = useState<ILoginType>('NONE');
    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);

    useEffect(() => {
        const isRedirectedFromFB = getLocalStorage('isRedirectedFromFB');
        if (isRedirectedFromFB) setLoading('isRedirectedFromFB');

        getFbRedirectResult()
            .then(async (res: any) => {
                if (Object.keys(res?.user || {}).length > 0) {
                    setAuthHeader(res?._tokenResponse?.idToken);
                    saveCookie(ACCESS_TOKEN_KEY, res?._tokenResponse.idToken);

                    await user_signUpFetcher({
                        input: {}
                    })
                        .then((res) => {
                            // setPage(userType);
                        })
                        .catch((err) => {
                            createError('already exist');
                        });
                }
            })
            .finally(() => {
                setLoading('');
                clearLocalStorage('isRedirectedFromFB');
            });
    }, [state, userType]);

    const disabled = useMemo(() => state.loading || loading.length != 0, [state, loading]);

    const getValidation = () => {
        if (page === 'first-page') {
            if (loginType === 'NONE') {
                return {
                    language: Yup.string().required('Language is required'),
                    password: Yup.string()
                        .required('The Password is required!')
                        .min(6, 'Your password is too short.'),
                    email: Yup.string()
                        .email('Must be a valid email')
                        .required('Email is required'),
                    confirm_password: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('This field is required!')
                };
            } else return {};
        } else {
            return {
                fullName: Yup.string().required('Full Name is required'),
                occupation: Yup.string().required('Occupation is required')
            };
        }
    };

    const handleSubmit = async (values: IInitailValuesProps, { setTouched, setSubmitting }) => {
        setTouched({});
        setSubmitting(false);

        if (page === 'first-page') {
            if (loginType === 'NONE') {
                setLoading('isRedirectedFromFB');
                dispatch(
                    setPageData({
                        ...pageData,
                        infoSignup: {
                            email: values?.email,
                            password: values?.password,
                            loading: true
                        }
                    })
                );
                setLoading('');
                await fbSignIn(values?.email).then((res) => {
                    if (res?.length > 0) {
                        login(values.email, values.password);
                        localStorage.setItem('loginType', 'NONE');
                        setPageData({
                            ...pageData,
                            infoSignup: { loading: false, error: true }
                        });
                    } else {
                        setPage('info');
                        localStorage.setItem('loginType', 'NONE');
                    }
                });
            } else if (loginType === 'FACE_BOOK') {
                setLoading('FACE_BOOK');
                onAuthenticateFacebook();
            } else if (loginType === 'GOOGLE') {
                setLoading('GOOGLE');
                onAuthenticateGoogle();
            }
            saveLocalStorage('isRedirectedFromFB', 'true');
        } else {
            await signUp(
                {
                    address: values.address,
                    city: values.city,
                    state: values.state,
                    fullName: values.fullName,
                    language: values.language,
                    occupation: values.occupation,
                    yearsOfExperience: +values.years,
                    phoneNumber: values.phoneNumber,
                    zipCode: values.zipCode,
                    gender: values.gender,
                    photoUrl: values.photoUrl
                },
                values.email,
                values.password
            );
        }
    };

    return (
        <>
            {loading == 'isRedirectedFromFB' && <FullScreenLoading />}
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(getValidation())}
                enableReinitialize
                onSubmit={handleSubmit}>
                {({ setFieldValue }) => (
                    <Form>
                        <>
                            {page === 'first-page' ? (
                                <CommonLayout
                                    tallMode
                                    imageSrc="/images/auth/signup-1.png"
                                    mobileSrc="/images/auth/signup-m1.png"
                                    form={
                                        <SignUpCard
                                            disabled={disabled}
                                            setPage={setPage}
                                            loading={loading}
                                            setLoginType={setLoginType}
                                            state={state}
                                        />
                                    }
                                />
                            ) : (
                                <SignUpInfo setFieldValue={setFieldValue} />
                            )}
                        </>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default SignupComponent;

import { Button, Grid, InputLabel } from '@mui/material';
import React, { useCallback, useState } from 'react';
import * as S from './add-admin-style';
import LayoutHeader from '@/layout/app-layout/layout-header';
import Link from 'next/link';
import { LeftArrowIcon } from 'src/assets/common/LeftArrowIcon';
import { SearchIconExercise } from 'src/assets/exercise/search-icon';
import useDebounce from 'src/hooks/useDebounce';
import { Form, Formik } from 'formik';
import { MInputFormik, MInputFormikPasswords } from '../base/input/formik';
import { Spacer } from '../base/spacer';
import * as Yup from 'yup';
import { InferType } from 'yup';
import { useGetUser } from 'src/auth/UserProvider';
import { useAuthPage } from '../auth/services/useAuth';
import { ShowPasswordEyeSvgIcon } from 'src/assets/icons/show-password-visibility';

interface InitailValuesProps {
    name: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = Yup.object({
    name: Yup.object().required('name is required'),
    lastName: Yup.object().required('last name is required'),
    email: Yup.string().email('....').required('Email is required'),
    phone: Yup.string()
        .max(11)
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('This field is required'),
    password: Yup.object().required('password is required')
});

type ValueType = InferType<typeof schema>;

// form initial Value
const initialValues: ValueType = {
    name: '',
    LastName: '',
    email: '',
    phoneNumber: '',
    password: ''
};

function AddAdmin() {
    const [searchText, setSearchText] = useState<string>('');
    const finalSearchText = useDebounce(searchText, 500);

    const [toggleType, setIsToggle] = useState(false);
    const toggleShow = () => setIsToggle((toggleType) => !toggleType);

    const user = useGetUser();
    const { login, state } = useAuthPage();

    const onSubmit = useCallback((value: ValueType) => {
        login(value.email, value.name);
    }, []);

    return (
        <S.Content>
            <LayoutHeader>
                <S.Header>
                    <div className="header__info-box">
                        <Link href="/jobs">
                            <a className="header__back-btn">
                                <LeftArrowIcon />
                            </a>
                        </Link>
                        <span className="title-back">Jobs/Add new</span>
                    </div>
                    <div className="input-box">
                        <SearchIconExercise />
                        <span className="input-box__search-text">search |</span>
                        <input
                            className="input-box__input"
                            onChange={(event) => {
                                setSearchText(event.target.value || '');
                            }}
                        />
                    </div>
                    <Link href="/dashboard">
                        <a className="header__publish-button">Publish</a>
                    </Link>
                </S.Header>
            </LayoutHeader>

            <S.ListWrapper>
                <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
                    <Form>
                        <Grid container>
                            <Grid item lg={3}>
                                <MInputFormik
                                    name="Name"
                                    fullWidth
                                    label="Name"
                                    placeholder="ex. John"
                                    errorSpaceOn={true}
                                />
                            </Grid>
                            <Spacer space={5} />
                            <Grid item lg={3}>
                                <MInputFormik
                                    name="last name"
                                    fullWidth
                                    label="last name"
                                    placeholder="ex. Doe"
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item lg={3}></Grid>

                            <Grid item lg={3}>
                                <MInputFormik
                                    name="email>"
                                    fullWidth
                                    label="Email"
                                    placeholder="ex. Doe"
                                    errorSpaceOn={true}
                                />
                            </Grid>
                            <Spacer space={5} />
                            <Grid item lg={3}>
                                <MInputFormik
                                    name="phone number"
                                    fullWidth
                                    label="phone number"
                                    placeholder="Management skills"
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item lg={3} sx={{ marginTop: '20px' }}>
                                <InputLabel htmlFor="Password">Password</InputLabel>
                                <S.ForgetPasswordBox>
                                    <MInputFormikPasswords
                                        name="Passwords"
                                        type={toggleType ? 'text' : 'password'}
                                        fullWidth
                                    />
                                    <S.ForgetPasswordIcon>
                                        <Button variant="text" onClick={toggleShow}>
                                            <ShowPasswordEyeSvgIcon />
                                        </Button>
                                    </S.ForgetPasswordIcon>
                                </S.ForgetPasswordBox>
                            </Grid>
                            <Spacer space={3} />

                            <Grid item lg={13}></Grid>
                            <Spacer space={3} />
                            <Grid item lg={13}></Grid>
                        </Grid>
                    </Form>
                </Formik>
            </S.ListWrapper>
        </S.Content>
    );
}
export default AddAdmin;

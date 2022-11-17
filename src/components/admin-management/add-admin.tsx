import { Button, Checkbox, FormControlLabel, Grid, InputLabel } from '@mui/material';
import React, { useRef, useState } from 'react';
import * as S from './add-admin-style';
import LayoutHeader from '@/layout/app-layout/layout-header';
import Link from 'next/link';
import { LeftArrowIcon } from 'src/assets/common/LeftArrowIcon';
import { SearchIconExercise } from 'src/assets/exercise/search-icon';
import { Form, Formik, FormikProps } from 'formik';
import { MInputFormik, MInputFormikPasswords } from '../base/input/formik';
import { Spacer } from '../base/spacer';
import * as Yup from 'yup';
import { InferType } from 'yup';
import { ShowPasswordEyeSvgIcon } from 'src/assets/icons/show-password-visibility';
import DashboardIcon from 'src/assets/icons/dashboard-icon';
import LearnIcon from 'src/assets/icons/learn-icon';
import FlagIcon from 'src/assets/icons/flag-icon';
import CatalogIcon from 'src/assets/icons/catalog-icon';
import CheckResumeIcon from 'src/assets/icons/check-resume-icon';
import InterviewIcon from 'src/assets/icons/interview-icon';
import UserIcon from 'src/assets/icons/user-icon';
import ManagementIcon from 'src/assets/icons/management-icon';
import CareerCoachIcon from 'src/assets/icons/career-coach-icon';
import JobIcon from 'src/assets/icons/job-icon';
import { useCreateAdminMutation } from 'src/graphql/generated';
import { useRouter } from 'next/router';
import { fbSignUpToken } from 'src/auth/firebase';
import { PrimarySpinner } from '../base/loader/spinner';
import { access } from 'fs';

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
    name: Yup.string().required('name is required'),
    lastName: Yup.string().required('last name is required'),
    email: Yup.string().email('email is not valid').required('Email is required'),
    phone: Yup.string()
        .max(11)
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('This field is required'),
    password: Yup.string().required('password is required'),
    access: Yup.array(Yup.object({ value: Yup.boolean(), id: Yup.number(), name: Yup.string() }))
});

type ValueType = InferType<typeof schema>;

// form initial Value
const initialValues: ValueType = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    access: [
        { name: 'Dashboard', id: 1, value: false },
        { name: 'catalog', id: 2, value: false },
        { name: 'Job', id: 3, value: false },
        { name: 'Check resume', id: 4, value: false },
        { name: 'Interview practice', id: 5, value: false },
        { name: 'Career coach', id: 6, value: false },
        { name: 'User', id: 7, value: false },
        { name: 'Admin', id: 8, value: false }
    ]
};

const accessList = [
    { name: 'Dashboard', icon: DashboardIcon },
    { name: 'catalog', icon: CatalogIcon },
    { name: 'Job', icon: JobIcon },
    { name: 'Check resume', icon: CheckResumeIcon },
    { name: 'Interview practice', icon: InterviewIcon },
    { name: 'Career coach', icon: CareerCoachIcon },
    { name: 'User', icon: UserIcon },
    { name: 'Admin', icon: ManagementIcon }
];

function AddAdmin() {
    const [toggleType, setIsToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleShow = () => setIsToggle((toggleType) => !toggleType);
    const formik = useRef<FormikProps<ValueType>>();
    const router = useRouter();
    const createAdmin = useCreateAdminMutation({
        onSuccess: () => {
            router.replace('admin-management');
        }
    });
    return (
        <S.Content>
            <LayoutHeader>
                <S.Header>
                    <div className="header__info-box">
                        <Link href="/admin-management">
                            <a className="header__back-btn">
                                <LeftArrowIcon />
                            </a>
                        </Link>
                        <span className="title-back">Add Admin</span>
                    </div>
                    <div className="input-box">
                        <SearchIconExercise />
                        <span className="input-box__search-text">search |</span>
                        <input className="input-box__input" onChange={(event) => {}} />
                    </div>
                    <button
                        className="header__publish-button"
                        onClick={() => {
                            formik.current.handleSubmit();
                        }}>
                        {loading || createAdmin.isLoading ? <PrimarySpinner /> : 'Publish'}
                    </button>
                </S.Header>
            </LayoutHeader>

            <S.ListWrapper>
                <Formik
                    innerRef={formik}
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={(values) => {
                        setLoading(true);
                        fbSignUpToken(values.email, values.password)
                            .then((response) => {
                                setLoading(false);
                                createAdmin.mutate({
                                    input: {
                                        email: values.email,
                                        phoneNumber: values.phone,
                                        firstName: values.name,
                                        lastName: values.lastName,
                                        roleIds: values.access
                                            .filter((access) => access.value)
                                            .map((access) => access.id),
                                        firebaseToken: response as string
                                    }
                                });
                            })
                            .catch(() => {
                                setLoading(false);
                            });
                    }}>
                    <Form>
                        <Grid container>
                            <Grid item md={3}>
                                <MInputFormik
                                    name="name"
                                    fullWidth
                                    label="Name"
                                    placeholder="ex. John"
                                    errorSpaceOn={true}
                                />
                            </Grid>
                            <Spacer space={5} />
                            <Grid item md={3}>
                                <MInputFormik
                                    name="lastName"
                                    fullWidth
                                    label="Last name"
                                    placeholder="ex. Doe"
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item md={3}></Grid>

                            <Grid item md={3}>
                                <MInputFormik
                                    name="email"
                                    fullWidth
                                    label="Email"
                                    placeholder="ex. Doe"
                                    errorSpaceOn={true}
                                />
                            </Grid>
                            <Spacer space={5} />
                            <Grid item md={3}>
                                <MInputFormik
                                    name="phone"
                                    fullWidth
                                    label="phone number"
                                    placeholder="Management skills"
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item md={3} sx={{ marginTop: '20px' }}>
                                <InputLabel htmlFor="Password">Password</InputLabel>
                                <S.ForgetPasswordBox>
                                    <MInputFormikPasswords
                                        name="password"
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
                            <Grid item md={6}>
                                <span>Access</span>
                                <div className="admin__access">
                                    {accessList.map((Access, index) => (
                                        <FormControlLabel
                                            key={Access.name}
                                            className="access__input"
                                            label={
                                                <>
                                                    <Access.icon />
                                                    <span>{Access.name}</span>
                                                </>
                                            }
                                            control={
                                                <Checkbox
                                                    checked={
                                                        formik.current?.values.access[index].value
                                                    }
                                                    onChange={(event) => {
                                                        formik.current.setFieldValue(
                                                            'access.' + index,
                                                            {
                                                                name: Access.name,
                                                                id: index + 1,
                                                                value: event.target.checked
                                                            }
                                                        );
                                                    }}
                                                />
                                            }
                                        />
                                    ))}
                                </div>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </S.ListWrapper>
        </S.Content>
    );
}
export default AddAdmin;

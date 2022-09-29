import LayoutHeader from '@/layout/app-layout/layout-header';
import { GetUsersQuery } from 'src/graphql/generated';
import { Grid, Typography, Alert, Box } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import * as S from './add-jobs-style';
import * as Yup from 'yup';
import { InferType } from 'yup';
import { InputTextarea } from './input-textarea';
import { MInputFormik } from '@/components/base/input/formik';
import { Spacer } from '@/components/base/spacer';
import { useAuthPage } from '@/components/auth/services/useAuth';
import Link from 'next/link';
import useDebounce from 'src/hooks/useDebounce';
import SearchInput from '../base/input/search-input';
import { LeftArrowIcon } from 'src/assets/common/LeftArrowIcon';
import { SearchIconExercise } from 'src/assets/exercise/search-icon';
import { MButton } from '../base/MButton';
import { Form, Formik } from 'formik';
import { TestIcon } from 'src/assets/icons/test-add-jobs';
import { NumberInput } from '../base/input/number-input';

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

function AddJobs() {
    const { login, state } = useAuthPage();

    const onSubmit = useCallback((value: ValueType) => {
        login(value.email, value.password);
    }, []);
    const [itemList, setItemList] = useState<GetUsersQuery['user_getUsers']['result']['items']>([]);
    const totalItems = useRef<number | null>(null);

    const [searchText, setSearchText] = useState<string>('');
    const finalSearchText = useDebounce(searchText, 500);

    return (
        <S.Content>
            <LayoutHeader>
                <S.Header>
                    <div className="header__info-box">
                        <Link href="/dashboard">
                            <a className="header__back-btn">
                                <LeftArrowIcon />
                            </a>
                        </Link>
                        <span className="title-back"> Jobs/Add new</span>
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

            <S.ListWrapper display={'grid'} gridTemplateRows="repeat(12, 1fr)">
                <S.ListHeader container gridRow={'span 1'}>
                    <Grid lg={3} xs={12} className={'list-header__item no-center'} item>
                        <TestIcon />
                    </Grid>

                    <Grid lg={9} xs={12} className={'box-align'} item>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={onSubmit}>
                            <Form>
                                <S.FormCard>
                                    {state.error !== '' && (
                                        <Alert severity="error">{state.error}</Alert>
                                    )}

                                    <MInputFormik
                                        name="Company Name"
                                        fullWidth
                                        label="Company Name"
                                        placeholder="ex. John"
                                        errorSpaceOn={true}
                                    />
                                    <Spacer space={10} />
                                    <MInputFormik
                                        name="Email Address"
                                        fullWidth
                                        label="Email Address"
                                        placeholder="Management skills"
                                    />
                                    <Spacer space={10} />
                                    <MInputFormik
                                        name="Phone Number"
                                        fullWidth
                                        label="Phone Number"
                                        placeholder="Management skills"
                                    />
                                </S.FormCard>
                            </Form>
                        </Formik>
                    </Grid>

                    <Grid lg={12} xs={12} className={'box-align'} item>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={onSubmit}>
                            <Form>
                                <S.FormCard>
                                    {state.error !== '' && (
                                        <Alert severity="error">{state.error}</Alert>
                                    )}

                                    <MInputFormik
                                        name="Company Job"
                                        fullWidth
                                        label="Company Job"
                                        placeholder="Media, Art & Design"
                                        errorSpaceOn={true}
                                    />
                                    <Spacer space={10} />
                                    <MInputFormik
                                        name="Company Location"
                                        fullWidth
                                        label="Amsterdam"
                                        placeholder="Management skills"
                                    />
                                    <Spacer space={10} />
                                    <MInputFormik
                                        name="applicant Job"
                                        fullWidth
                                        label="UI UX Designer"
                                        placeholder="Management skills"
                                    />
                                    <Spacer space={10} />
                                    <MInputFormik
                                        name="Experience level"
                                        fullWidth
                                        label="Experience level"
                                        placeholder="Senior - 7 years of experience"
                                    />
                                </S.FormCard>
                            </Form>
                        </Formik>
                    </Grid>

                    <Grid lg={9.2} xs={12} className={'box-align'} item>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={onSubmit}>
                            <Form>
                                <S.FormCard>
                                    {state.error !== '' && (
                                        <Alert severity="error">{state.error}</Alert>
                                    )}

                                    <MInputFormik
                                        name="Job type"
                                        fullWidth
                                        label="Job type"
                                        placeholder="Full time / 8:00am - 5:00pm"
                                        errorSpaceOn={true}
                                    />
                                    <Spacer space={10} />
                                    <MInputFormik
                                        name="Education"
                                        fullWidth
                                        label="Education"
                                        placeholder="Industrial design - Graphic design"
                                    />
                                    <Spacer space={10} />
                                    <MInputFormik
                                        name="Salary"
                                        fullWidth
                                        label="Salary"
                                        placeholder="$2000"
                                    />
                                    <Spacer space={10} />
                                </S.FormCard>
                            </Form>
                        </Formik>
                    </Grid>

                    <Grid lg={12} xs={12} className={'box-align'} item>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={onSubmit}>
                            <Form>
                                <S.FormCard>
                                    {state.error !== '' && (
                                        <Alert severity="error">{state.error}</Alert>
                                    )}
                                    <NumberInput min={0} max={100} sign="%" defaultValue={60} />
                                    <MInputFormik
                                        name="Soft skills required"
                                        fullWidth
                                        label="Job type"
                                        placeholder="Full time / 8:00am - 5:00pm"
                                        errorSpaceOn={true}
                                    />
                                </S.FormCard>
                            </Form>
                        </Formik>
                    </Grid>

                    <Grid lg={12} xs={12} className={'box-align'} item>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={onSubmit}>
                            <Form>
                                <S.FormCard>
                                    {state.error !== '' && (
                                        <Alert severity="error">{state.error}</Alert>
                                    )}
                                    <InputTextarea />
                                    <MInputFormik
                                        name="Job Description"
                                        fullWidth
                                        label="Job Description"
                                        placeholder="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est eopksio laborum. Sed ut perspiciatis unde omnis istpoe natus error sit voluptatem accusantium doloremque"
                                        errorSpaceOn={true}
                                    />
                                </S.FormCard>
                            </Form>
                        </Formik>
                    </Grid>
                </S.ListHeader>
                <S.ListBody gridRow={'span 11'}></S.ListBody>
            </S.ListWrapper>
        </S.Content>
    );
}

export default AddJobs;

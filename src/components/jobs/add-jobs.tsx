import LayoutHeader from '@/layout/app-layout/layout-header';
import { GetUsersQuery } from 'src/graphql/generated';
import { Grid, Typography, Alert, Box } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import * as S from './add-jobs-style';
import * as Yup from 'yup';
import { InferType } from 'yup';

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
import { InputTextarea } from '../base/input/input-textarea';

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

            {/* <S.ListWrapper display={'grid'} gridTemplateRows="repeat(12, 1fr)"> */}
            <S.ListWrapper>
                <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
                    <Form>
                        <Grid container>
                            <Grid item lg={2.7}></Grid>

                            <Grid item lg={3}>
                                <MInputFormik
                                    name="Company Name"
                                    fullWidth
                                    label="Company Name"
                                    placeholder="ex. John"
                                    errorSpaceOn={true}
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item lg={3}>
                                <MInputFormik
                                    name="Email Address"
                                    fullWidth
                                    label="Email Address"
                                    placeholder="Management skills"
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item lg={3}>
                                <MInputFormik
                                    name="Phone Number"
                                    fullWidth
                                    label="Phone Number"
                                    placeholder="Management skills"
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item lg={2.7}>
                                <MInputFormik
                                    name="Company Job"
                                    fullWidth
                                    label="Company Job"
                                    placeholder="Media, Art & Design"
                                    errorSpaceOn={true}
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item lg={3}>
                                <MInputFormik
                                    name="Company Location"
                                    fullWidth
                                    label="Company Location"
                                    placeholder="Industrial design - Graphic design"
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item lg={3}>
                                <MInputFormik
                                    name="applicant Job"
                                    fullWidth
                                    label="applicant Job"
                                    placeholder="UI UX Designer"
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item lg={3}>
                                <MInputFormik
                                    name="Experience level"
                                    fullWidth
                                    label="Experience level"
                                    placeholder="Senior - 7 years of experience"
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item lg={2.7}>
                                <MInputFormik
                                    name="Job type"
                                    fullWidth
                                    label="Job type"
                                    placeholder="Full time / 8:00am - 5:00pm"
                                    errorSpaceOn={true}
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item lg={3}>
                                <MInputFormik
                                    name="Education"
                                    fullWidth
                                    label="Education"
                                    placeholder="Industrial design - Graphic design"
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item lg={3}>
                                <MInputFormik
                                    name="Salary"
                                    fullWidth
                                    label="Salary"
                                    placeholder="$2000"
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item lg={13}>
                                <label>Job Description</label>
                                <InputTextarea
                                    label="Job Description"
                                    errorSpaceOn={true}
                                    name="Job Description"
                                    rows="5"
                                    placeholder="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est eopksio laborum. Sed ut perspiciatis unde omnis istpoe natus error sit voluptatem accusantium doloremque"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </S.ListWrapper>
        </S.Content>
    );
}

export default AddJobs;

import LayoutHeader from '@/layout/app-layout/layout-header';
import {
    GetUsersQuery,
    Topic,
    useCreateTopicMutation,
    useUpdateTopicMutation
} from 'src/graphql/generated';
import { Grid, Typography, Alert, Box } from '@mui/material';
import React, { useCallback, useRef, useState, FC } from 'react';
import * as S from './add-jobs-style';
import * as Yup from 'yup';
import { InferType } from 'yup';
import { MInputFormik } from '@/components/base/input/formik';
import { Spacer } from '@/components/base/spacer';
import Link from 'next/link';
import { LeftArrowIcon } from 'src/assets/common/LeftArrowIcon';
import { SearchIconExercise } from 'src/assets/exercise/search-icon';
import { Form, Formik, FormikProps } from 'formik';
import { InputTextarea } from '../base/input/input-textarea';
import UploadComponent from '../upload/upload';

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = Yup.object({
    company: Yup.string().required('Company name is required'),
    email: Yup.string().email('Email is not valid').required('Email is required'),
    phone: Yup.string()
        .max(11)
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone number is required'),
    job: Yup.string(),
    location: Yup.string(),
    applicant: Yup.string(),
    experience: Yup.string(),
    jobType: Yup.string(),
    education: Yup.string(),
    skills: Yup.string(),
    salary: Yup.string(),
    jobDescription: Yup.string()
});
// Form Value Type
type ValueType = InferType<typeof schema>;

export type LessonType = {
    id?: number;
    time?: number;
    title?: string;
    description?: string;
    categoryId: number;
    topics: Array<{
        title?: string;
        fileUrl?: string;
        id?: number;
        description?: string;
        __typename?: string;
    }>;
};

type PropsType = {
    lesson: LessonType;
    index: number;
    onDelete: (index: number) => void;
    onPlay: (url: string) => void;
};

// form initial Value
const initialValues: ValueType = {
    company: '',
    email: '',
    phone: '',
    job: '',
    location: '',
    applicant: '',
    experience: '',
    jobType: '',
    education: '',
    salary: '',
    skills: '',
    jobDescription: ''
};

const AddJobs: FC<PropsType> = () => {
    const formik = useRef<FormikProps<ValueType>>();
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
                        <input className="input-box__input" onChange={(event) => {}} />
                    </div>

                    <Link href="/dashboard">
                        <a className="header__publish-button">Publish</a>
                    </Link>
                </S.Header>
            </LayoutHeader>

            <S.ListWrapper>
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={() => {}}
                    innerRef={formik}>
                    <Form>
                        <Grid container>
                            <Grid item lg={2.8} display={'flex'} alignItems={'center'}>
                                <UploadComponent
                                    onSelect={(name, duration) => {}}
                                    onUpload={(name, url) => {}}
                                    type={'image'}
                                    size="small"
                                />
                            </Grid>
                            <Spacer space={3} />
                            <Grid item lg={3} sx={{ marginTop: '70px' }}>
                                <MInputFormik
                                    name="Company Name"
                                    fullWidth
                                    label="Company Name"
                                    placeholder="ex. John"
                                    errorSpaceOn={true}
                                />
                            </Grid>
                            <Spacer space={3} />

                            <Grid item lg={3} sx={{ marginTop: '70px' }}>
                                <MInputFormik
                                    name="Email Address"
                                    fullWidth
                                    label="Email Address"
                                    placeholder="Management skills"
                                />
                            </Grid>
                            <Spacer space={3} />

                            <Grid item lg={3} sx={{ marginTop: '70px' }}>
                                <MInputFormik
                                    name="Phone Number"
                                    fullWidth
                                    label="Phone Number"
                                    placeholder="Management skills"
                                />
                            </Grid>
                            <Spacer space={3} />

                            <Grid item lg={2.8}>
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
                            <Grid item lg={2.8}>
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
                                <MInputFormik
                                    name="Soft skills required"
                                    fullWidth
                                    label="Soft skills required"
                                    placeholder=""
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
};

export default AddJobs;

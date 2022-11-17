import LayoutHeader from '@/layout/app-layout/layout-header';
import {
    Education,
    ExperienceLevel,
    JobType,
    useAddJobMutation,
    useAddJobSkillMutation,
    useBeforeCreateJobMutation,
    useGetJobQuery,
    useGetSkillsQuery,
    useUpdateJobMutation
} from 'src/graphql/generated';
import { Grid, Autocomplete, TextField } from '@mui/material';
import React, { useRef, useState, FC } from 'react';
import * as S from './add-jobs-style';
import * as Yup from 'yup';
import { InferType } from 'yup';
import { MInputFormik } from '@/components/base/input/formik';
import Link from 'next/link';
import { LeftArrowIcon } from 'src/assets/common/LeftArrowIcon';
import { SearchIconExercise } from 'src/assets/exercise/search-icon';
import { Form, Formik, FormikProps } from 'formik';
import { InputTextarea } from '../base/input/input-textarea';
import UploadComponent from '../upload/upload';
import { MSelectFormik } from '../base/input/MSelect';
import useDebounce from 'src/hooks/useDebounce';
import { useRouter } from 'next/router';
import { PrimarySpinner } from '../base/loader/spinner';

const schema = Yup.object({
    company: Yup.string().required('Company name is required'),
    image: Yup.string(),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    category: Yup.string().required('Company job is required'),
    title: Yup.string().required('Applicant job is required'),
    jobType: Yup.number().required('Applicant job is required'),
    experience: Yup.number().required('Experience level is required'),
    education: Yup.number().required('Education is required'),
    skills: Yup.array(Yup.object({ value: Yup.number(), title: Yup.string() })),
    salary: Yup.string().required('Salary is required'),
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
    image: '',
    city: '',
    country: '',
    category: '',
    title: '',
    experience: 0,
    jobType: 0,
    education: 0,
    salary: '',
    skills: [],
    jobDescription: ''
};

const experience = [
    { option: ExperienceLevel.All, value: 0 },
    { option: ExperienceLevel.Entry, value: 1 },
    { option: ExperienceLevel.Junior, value: 2 },
    { option: ExperienceLevel.Mid, value: 3 },
    { option: ExperienceLevel.NoExperience, value: 4 },
    { option: ExperienceLevel.Senior, value: 5 }
];

const jobTypes = [
    { option: JobType.All, value: 0 },
    { option: JobType.Contract, value: 1 },
    { option: JobType.Freelance, value: 2 },
    { option: JobType.FullTime, value: 3 },
    { option: JobType.Intership, value: 4 },
    { option: JobType.PartTime, value: 5 },
    { option: JobType.Temporary, value: 6 }
];

const educations = [
    { option: Education.All, value: 0 },
    { option: Education.Associate, value: 1 },
    { option: Education.Bachelor, value: 2 },
    { option: Education.Doctoral, value: 3 },
    { option: Education.HighSchool, value: 4 },
    { option: Education.Master, value: 5 }
];
const renderInput = (props) => <TextField {...props} />;

const AddJobs: FC<PropsType> = () => {
    const formik = useRef<FormikProps<ValueType>>();
    const [skill, setSkill] = useState('');
    const skillSearch = useDebounce(skill);
    const router = useRouter();
    const [options, setOptions] = useState<Array<{ value: number; title: string }>>([]);
    const skillPointer = useRef(0);

    const job = useGetJobQuery(
        { id: +(router.query.id as string) },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            enabled: router.query.id !== undefined,
            onSuccess: (data) => {
                const {
                    jobCategory,
                    education,
                    experienceLevel,
                    jobType,
                    salary,
                    city,
                    company,
                    country,
                    description,
                    title
                } = data.job_getJob.result;
                const skills = data.jobSkill_getJobSkills.result.items.map((skill) => ({
                    value: skill.skill?.id,
                    title: skill.skill?.title
                }));
                const educationIndex = educations.findIndex((item) => education === item.option);
                const experienceIndex = experience.findIndex(
                    (item) => experienceLevel === item.option
                );
                const jobTypeIndex = jobTypes.findIndex((item) => jobType === item.option);
                const values = {
                    category: jobCategory.title,
                    image: company?.iconUrl || '',
                    company: company?.title || '',
                    salary: salary.toString(),
                    jobDescription: description,
                    education: educationIndex,
                    experience: experienceIndex,
                    jobType: jobTypeIndex,
                    city,
                    country,
                    title,
                    skills
                };
                formik.current.setValues(values);
                skillPointer.current = (data.jobSkill_getJobSkills.result.items.length || 1) - 1;
            }
        }
    );

    const skills = useGetSkillsQuery(
        { take: 20, where: { title: { contains: skillSearch } } },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: (data) => {
                const newOptions = data.skill_getSkills.result.items.map((skill) => ({
                    title: skill.title,
                    value: skill.id,
                    key: skill.title
                }));
                setOptions(newOptions);
            }
        }
    );

    const createJobSkill = useAddJobSkillMutation({
        onSuccess: (_, variables) => {
            if (skillPointer.current < formik.current.values.skills.length) {
                createJobSkill.mutate({
                    input: {
                        jobId: variables.input.jobId,
                        skillId: formik.current.values.skills[skillPointer.current].value
                    }
                });
                skillPointer.current += 1;
            } else {
                router.push('/jobs');
            }
        }
    });
    const createJob = useAddJobMutation({
        onSuccess: (data) => {
            if (formik.current.values.skills.length) {
                createJobSkill.mutate({
                    input: {
                        jobId: data.job_addJob.result.id,
                        skillId: formik.current.values.skills[0].value
                    }
                });
                skillPointer.current += 1;
            } else {
                router.push('/jobs');
            }
        }
    });
    const updateJob = useUpdateJobMutation({
        onSuccess: (_, variables) => {
            if (skillPointer.current < formik.current.values.skills.length) {
                createJobSkill.mutate({
                    input: {
                        jobId: variables.jobId,
                        skillId: formik.current.values.skills[skillPointer.current].value
                    }
                });
                skillPointer.current += 1;
            } else {
                router.push('/jobs');
            }
        }
    });
    const beforeCreateJob = useBeforeCreateJobMutation({
        onSuccess: (data) => {
            const { city, country, education, experience, jobDescription, jobType, salary, title } =
                formik.current.values;
            createJob.mutate({
                input: {
                    city,
                    country,
                    companyId: data.company_addCompany.result.id,
                    description: jobDescription,
                    education,
                    experienceLevel: experience,
                    jobCategoryId: data.jobCategory_addJobCategory.result.id,
                    jobType,
                    salary: +salary,
                    title
                }
            });
        }
    });
    console.log(formik.current?.errors);

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

                    <button
                        className="header__publish-button"
                        onClick={() => {
                            formik.current.submitForm();
                        }}
                        disabled={
                            updateJob.isLoading ||
                            createJob.isLoading ||
                            beforeCreateJob.isLoading ||
                            createJobSkill.isLoading
                        }
                        type="button">
                        {updateJob.isLoading ||
                        createJob.isLoading ||
                        beforeCreateJob.isLoading ||
                        createJobSkill.isLoading ? (
                            <PrimarySpinner />
                        ) : (
                            'Publish'
                        )}
                    </button>
                </S.Header>
            </LayoutHeader>

            <S.ListWrapper>
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={(values: ValueType) => {
                        if (router.query.id) {
                            const {
                                city,
                                country,
                                education,
                                experience,
                                jobDescription,
                                jobType,
                                salary,
                                title,
                                category,
                                company,
                                image
                            } = values;
                            const companyId = job.data.job_getJob.result.company.id;
                            const categoryId = job.data.job_getJob.result.jobCategory.id;
                            updateJob.mutate({
                                jobId: +router.query.id,
                                jobInput: {
                                    city,
                                    country,
                                    companyId,
                                    jobCategoryId: categoryId,
                                    description: jobDescription,
                                    education,
                                    experienceLevel: experience,
                                    jobType,
                                    salary: +salary,
                                    title
                                },
                                categoryId,
                                categoryInput: { title: category },
                                companyId,
                                companyInput: { iconUrl: image, title: company }
                            });
                        } else {
                            beforeCreateJob.mutate({
                                categoryInput: { title: values.category },
                                companyInput: { iconUrl: values.image, title: values.title }
                            });
                        }
                    }}
                    innerRef={formik}>
                    <Form>
                        <Grid container className="form__container">
                            <Grid
                                item
                                lg={3}
                                display={'flex'}
                                alignItems={'center'}
                                className="form__control">
                                <UploadComponent
                                    onUpload={(_, url) => {
                                        formik.current.setFieldValue('image', url);
                                    }}
                                    defaultImage={formik.current?.values.image}
                                    type={'image'}
                                    size="small"
                                />
                            </Grid>
                            <Grid item lg={3} sx={{ marginTop: '70px' }} className="form__control">
                                <MInputFormik
                                    name="company"
                                    fullWidth
                                    label="Company Name"
                                    placeholder="ex. John"
                                    errorSpaceOn={true}
                                />
                            </Grid>

                            <Grid item lg={3} sx={{ marginTop: '70px' }} className="form__control">
                                <MInputFormik
                                    name="country"
                                    fullWidth
                                    label="Company Country"
                                    placeholder="Company Country"
                                />
                            </Grid>

                            <Grid item lg={3} sx={{ marginTop: '70px' }} className="form__control">
                                <MInputFormik
                                    name="city"
                                    fullWidth
                                    label="Company City"
                                    placeholder="Company City"
                                />
                            </Grid>
                            <Grid item lg={3} className="form__control">
                                <MInputFormik
                                    name="category"
                                    fullWidth
                                    label="Company Job"
                                    placeholder="Media, Art & Design"
                                />
                            </Grid>
                            <Grid item lg={3} className="form__control">
                                <MInputFormik
                                    name="title"
                                    fullWidth
                                    label="Applicant Job"
                                    placeholder="UI UX Designer"
                                />
                            </Grid>
                            <Grid item lg={3} className="form__control">
                                <MSelectFormik
                                    name="experience"
                                    label="Experience level"
                                    placeholder="Senior - 7 years of experience"
                                    options={experience}
                                />
                            </Grid>
                            <Grid item lg={3} className="form__control">
                                <MSelectFormik
                                    name="jobType"
                                    label="Job type"
                                    placeholder="Full time"
                                    options={jobTypes}
                                />
                            </Grid>
                            <Grid item lg={3} className="form__control">
                                <MSelectFormik
                                    name="education"
                                    label="Education"
                                    placeholder="Industrial design - Graphic design"
                                    options={educations}
                                />
                            </Grid>
                            <Grid item lg={3} className="form__control">
                                <MInputFormik
                                    type={'number'}
                                    name="salary"
                                    fullWidth
                                    label="Salary"
                                    placeholder="$2000"
                                />
                            </Grid>
                            <Grid item lg={13} marginBottom={5} className="form__control">
                                <label>Soft skills required</label>
                                {(router.query.id !== undefined && job.status === 'success') ||
                                router.query.id === undefined ? (
                                    <Autocomplete
                                        isOptionEqualToValue={(option, value) =>
                                            option.value === value.value
                                        }
                                        value={formik.current.values.skills}
                                        multiple
                                        id="skills"
                                        className="category__input"
                                        loading={skills.isLoading}
                                        options={options}
                                        getOptionLabel={(option) => (option as any).title}
                                        disableClearable
                                        renderInput={renderInput}
                                        inputMode={'search'}
                                        onBlur={(event) => {
                                            formik.current.handleBlur(event);
                                        }}
                                        onInputChange={(event: any) => setSkill(event.target.value)}
                                        onChange={(_, value) => {
                                            formik.current.setFieldValue('skills', value);
                                        }}
                                        filterOptions={() => options || []}
                                    />
                                ) : null}
                            </Grid>
                            <Grid item lg={13} className="form__control">
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

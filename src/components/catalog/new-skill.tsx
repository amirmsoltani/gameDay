import { Autocomplete, Grid, TextField } from '@mui/material';
import { Field, Form, Formik, FormikProps } from 'formik';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import {
    useGetCategoriesQuery,
    useGetSkillWithQuestionsQuery,
    useUpdateCatalogSkillMutation
} from 'src/graphql/generated';
import useDebounce from 'src/hooks/useDebounce';
import Loading from '../loading';
import SkillQuestionFrom, { NewSkillQuestion } from '../question/skill-question';
import UploadComponent from '../upload/upload';
import { NewSkillWrapper } from './new-skill-style';
import LayoutHeader from '@/layout/app-layout/layout-header';
import { LeftArrowIcon } from 'src/assets/common/LeftArrowIcon';
import SearchInput from '../base/input/search-input';
import { HeaderWrapper } from './new-course-style';
import Link from 'next/link';

// Form Schema
const schema = Yup.object({
    name: Yup.string(),
    iconUrl: Yup.string(),
    skillCategoryId: Yup.string()
});

// Form Value Type
type ValueType = Yup.InferType<typeof schema>;

const NewSkillPage = () => {
    const [search, setSearch] = useState<string>('');
    const formik = useRef<FormikProps<ValueType>>(null);
    const title = useDebounce(search, 1000);
    const { query, replace } = useRouter();

    useEffect(() => {
        if (!query.id) replace('/catalog');
    }, []);

    const skill = useGetSkillWithQuestionsQuery(
        { id: +query.id },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: (data) => {
                setQuestions(
                    data!.skill_getSkill!.result!.skillQuestions.map((question) => ({
                        ...question,
                        key: (Math.floor(Math.random() * 0xeeeeee) + 0x111111).toString(16)
                    }))
                );
            }
        }
    );
    const catalogs = useGetCategoriesQuery(
        {
            where:
                title === '' &&
                skill.status === 'success' &&
                formik.current?.values.skillCategoryId === ''
                    ? { id: { eq: skill.data.skill_getSkill.result.skillCategoryId } }
                    : { title: { contains: title } }
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: ({ skillcategory_getSkillCategories }) => {
                if (
                    title === '' &&
                    skill.status === 'success' &&
                    skillcategory_getSkillCategories.result.items.length === 1
                ) {
                    const category = skillcategory_getSkillCategories.result.items[0].title;
                    formik.current.setFieldValue('skillCategoryId', category);
                    setSearch(category);
                }
            }
        }
    );

    const renderInput = useCallback((props) => <TextField {...props} />, []);
    const [questions, setQuestions] = useState<Partial<NewSkillQuestion & { key: string }>[]>([]);
    const timeOut = useRef<NodeJS.Timeout>(null);

    const options = catalogs.data?.skillcategory_getSkillCategories?.result.items.map(
        (catalog) => catalog.title
    );

    const updateSkill = useUpdateCatalogSkillMutation();

    const onDelete = (index: number) => {
        const newQuestion = [...questions];
        newQuestion.splice(index, 1);
        setQuestions(newQuestion);
    };

    if (skill.isLoading) return <Loading />;

    const {
        data: {
            skill_getSkill: {
                result: { iconUrl, title: name }
            }
        }
    } = skill;

    return (
        <NewSkillWrapper>
            <LayoutHeader>
                <HeaderWrapper>
                    <Link href={'/catalog'}>
                        <a className="back-btn">
                            <LeftArrowIcon />
                        </a>
                    </Link>
                    <span className="header__info-box">skill/Add new question</span>
                    <span>
                        {skill.data?.skill_getSkill.result.skillQuestions.length}
                        items Listed
                    </span>
                    <SearchInput wrapperClassName="header__search-input" />
                    <Link href="/catalog">
                        <a className="header__link-button">Publish</a>
                    </Link>
                </HeaderWrapper>
            </LayoutHeader>
            <Formik
                initialValues={{ name: name || '', skillCategoryId: '', iconUrl: iconUrl || '' }}
                validationSchema={schema}
                onSubmit={(value) => {
                    if (timeOut.current) {
                        clearTimeout(timeOut.current);
                    }
                    timeOut.current = setTimeout(() => {
                        updateSkill.mutate({
                            id: +query.id,
                            input: {
                                skillCategoryId:
                                    catalogs.data?.skillcategory_getSkillCategories?.result.items.find(
                                        (option) => option.title === value.skillCategoryId
                                    ).id,
                                iconUrl: value.iconUrl || '',
                                title: value.name || ''
                            }
                        });
                        timeOut.current = null;
                    }, 1000);
                }}
                innerRef={formik}>
                <Form>
                    <Grid container className="add-section" display="flex" alignItems="flex-end">
                        <Grid item md={3.5} paddingRight="60px">
                            <UploadComponent
                                size="small"
                                type="image"
                                defaultImage={iconUrl}
                                onUpload={(_, url) => {
                                    formik.current.setFieldValue('iconUrl', url);
                                    formik.current.handleSubmit();
                                }}
                            />
                            <Field type="hidden" name="iconUrl" />
                        </Grid>
                        <Grid item md={3.25} paddingRight={'60px'}>
                            <label htmlFor="catalog">choose the catalog related</label>
                            <Autocomplete
                                className="category__input"
                                loading={catalogs.isLoading}
                                options={options || []}
                                freeSolo
                                disableClearable
                                renderInput={renderInput}
                                inputMode={'search'}
                                value={formik.current?.values.skillCategoryId || ''}
                                onInputChange={(_, value) => {
                                    setSearch(value);
                                }}
                                onChange={(_, value) => {
                                    formik.current.setFieldValue('skillCategoryId', value);
                                    formik.current.handleSubmit();
                                }}
                                filterOptions={() => options || []}
                            />
                            <Field type="hidden" name="skillCategoryId" />
                        </Grid>
                        <Grid
                            item
                            md={3.25}
                            display="flex"
                            flexDirection="column"
                            paddingRight={'60px'}>
                            <label htmlFor="catalog">skill title</label>
                            <Field
                                className="title__input"
                                placeholder="ex. John"
                                name="name"
                                onChange={(event) => {
                                    formik.current.setFieldValue('name', event.target.value);
                                    formik.current.handleSubmit();
                                }}
                            />
                        </Grid>
                        <Grid item md={2}>
                            <button
                                className="skill__add-question"
                                onClick={() => {
                                    setQuestions([
                                        ...questions,
                                        { skillQuestionOptions: [{ title: '', isCorrect: true }] }
                                    ]);
                                }}>
                                <PlusIcon />
                                Add new question
                            </button>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>

            {questions.map(({ key, ...question }, index) => (
                <SkillQuestionFrom
                    index={index}
                    question={question}
                    skillId={+query.id}
                    onDelete={onDelete}
                    key={key}
                />
            ))}
        </NewSkillWrapper>
    );
};

export default NewSkillPage;

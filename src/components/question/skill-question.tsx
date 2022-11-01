import React, { FC, useEffect, useRef } from 'react';
import { Grid, TextareaAutosize } from '@mui/material';
import { Field, FieldArray, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { InferType } from 'yup';
import { QuestionWrapper } from './question-style';
import TrashIcon from 'src/assets/icons/trash-icon';
import { PrimarySpinner } from '../base/loader/spinner';
import {
    SkillQuestion,
    SkillQuestionOption,
    useCreateSkillQuestionMutation,
    useDeleteSkillQuestionMutation,
    useUpdateSkillQuestionMutation
} from 'src/graphql/generated';
import { PlusIcon } from 'src/assets/common/PlusIcon';

// Form Schema
const schema = Yup.object({
    question: Yup.string(),
    options: Yup.array(Yup.string()),
    answer: Yup.number()
});

// Form Value Type
type ValueType = InferType<typeof schema>;

export type NewSkillQuestion = Omit<SkillQuestion, 'skillQuestionOptions'> & {
    skillQuestionOptions?: Partial<SkillQuestionOption>[];
};

type PropsType = {
    question: Partial<NewSkillQuestion>;
    onDelete: (index: number) => void;
    index: number;
    skillId: number;
};

const SkillQuestionFrom: FC<PropsType> = ({ question, onDelete, index, skillId }) => {
    const data = useRef<Partial<NewSkillQuestion & { createRequest?: boolean }>>({ ...question });
    const formik = useRef<FormikProps<ValueType>>(null);
    const timeOut = useRef<NodeJS.Timeout>(null);

    const createQuestion = useCreateSkillQuestionMutation({
        onSuccess: (serverData) => {
            console.log(serverData);

            data.current.id = serverData.skillQuestion_addQuestion!.result.id;
        }
    });

    const updateQuestion = useUpdateSkillQuestionMutation();

    const deleteQuestion = useDeleteSkillQuestionMutation({
        onSuccess: () => {
            onDelete(index);
        }
    });

    useEffect(() => {
        if (
            data.current.id === undefined &&
            formik.current &&
            !createQuestion.isLoading &&
            !data.current.createRequest
        ) {
            data.current.createRequest = true;
            formik.current.handleSubmit();
        }
    }, [formik.current]);

    return (
        <Formik
            validateOnChange
            innerRef={formik}
            initialValues={{
                question: data.current?.title,
                options: data.current?.skillQuestionOptions.map((option) => option.title),
                answer: data.current?.skillQuestionOptions.findIndex((option) => option.isCorrect)
            }}
            validationSchema={schema}
            onSubmit={(formData) => {
                const options = formData.options
                    .filter((option, index) => option !== '' || index === 0)
                    .map((option, index) => ({
                        isCorrect: index === formik.current?.values.answer,
                        title: option
                    }));

                if (data.current.id !== undefined) {
                    if (timeOut.current) {
                        clearTimeout(timeOut.current);
                    }
                    timeOut.current = setTimeout(() => {
                        updateQuestion.mutate({
                            id: data.current.id,
                            input: {
                                skillId,
                                title: formData.question,
                                options
                            }
                        });
                        timeOut.current = null;
                    }, 1000);
                } else {
                    createQuestion.mutate({
                        input: { skillId, title: '', options }
                    });
                }
            }}>
            <Form className="question__form">
                <QuestionWrapper>
                    <div className="question__header">
                        <div className="header__counter">{index + 1}</div>
                        <div className="header-right-side">
                            <button
                                className="header__btn save"
                                type="button"
                                disabled={updateQuestion.isLoading || createQuestion.isLoading}
                                onClick={() => {
                                    formik.current.setFieldValue('options', [
                                        ...formik.current?.values.options,
                                        ''
                                    ]);
                                }}>
                                {updateQuestion.isLoading || createQuestion.isLoading ? (
                                    <PrimarySpinner />
                                ) : (
                                    <>
                                        <PlusIcon /> Add new option
                                    </>
                                )}
                            </button>
                            <button
                                className="header__btn"
                                onClick={() => {
                                    deleteQuestion.mutate({ id: data.current.id });
                                }}
                                type="button"
                                disabled={deleteQuestion.isLoading}>
                                {deleteQuestion.isLoading ? (
                                    <PrimarySpinner />
                                ) : (
                                    <TrashIcon className="btn__trash-icon" />
                                )}
                            </button>
                        </div>
                    </div>

                    <label className="question__label" htmlFor="question">
                        Question
                    </label>
                    <div className={`question__text`}>
                        <TextareaAutosize
                            defaultValue={data.current.title}
                            maxRows={5}
                            className={'question__input'}
                            name="question"
                            onBlur={(event) => {
                                formik.current.setFieldValue('question', event.target.value);
                                formik.current.handleSubmit();
                            }}
                        />
                    </div>
                    <label className="question__label" htmlFor="question">
                        Answer
                    </label>
                    <Grid container>
                        <FieldArray name="options">
                            {() =>
                                formik.current?.values.options?.map((option, index) => (
                                    <Grid
                                        key={option + index}
                                        item
                                        md={3}
                                        className={`option-wrapper`}>
                                        <div className="answer__option">
                                            <input
                                                className={'answer__input'}
                                                name={'options.' + index}
                                                id={'options.' + data.current.id + '.' + index}
                                                defaultValue={option || ''}
                                                onBlur={(event) => {
                                                    formik.current.setFieldValue(
                                                        'options.' + index,
                                                        event.target.value
                                                    );
                                                    formik.current.handleSubmit();
                                                }}
                                            />
                                            <div
                                                className={`answer__check ${
                                                    formik.current.values.answer === index
                                                        ? 'checked'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    formik.current.setFieldValue('answer', index);
                                                    formik.current.handleSubmit();
                                                }}>
                                                &#10003;
                                            </div>
                                        </div>
                                    </Grid>
                                )) || <></>
                            }
                        </FieldArray>
                        <Field type="hidden" name="answer" />
                    </Grid>
                </QuestionWrapper>
            </Form>
        </Formik>
    );
};

export default SkillQuestionFrom;

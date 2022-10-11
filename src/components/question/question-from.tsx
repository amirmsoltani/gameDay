import React, { FC } from 'react';
import { MenuItem, Select, TextareaAutosize } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InferType } from 'yup';
import { QuestionWrapper } from './question-style';
import TrashIcon from 'src/assets/icons/trash-icon';
import { PrimarySpinner } from '../base/loader/spinner';


// Form Schema
const schema = Yup.object({
    category: Yup.string().required('Please select industry related'),
    question: Yup.string().required('Enter question')
});

// Form Value Type
type ValueType = InferType<typeof schema>;

// form initial Value
const initialValues: ValueType = {
    category:"",
    question:"",
};

type PropsType = {
    options: Array<{ label: string; value: string }>;
    onSubmit: (values: ValueType) => void;
    onCancel: () => void;
    loading:boolean;
};

const QuestionForm: FC<PropsType> = ({ options, onSubmit, onCancel,loading }) => {


    
    const formik = useFormik({ initialValues, validationSchema: schema, onSubmit });

    return (
        <form className="question__form" onSubmit={formik.handleSubmit}>
            <QuestionWrapper>
                <div className="question__header">
                    <div className="header__counter">1</div>
                    <div className="header-right-side">
                        <button className="header__btn save" type="submit" disabled={loading}>
                            {loading ? <PrimarySpinner /> : 'save'}
                        </button>
                        <button
                            className="header__btn"
                            onClick={onCancel}
                            type="button"
                            disabled={loading}>
                            <TrashIcon className="btn__trash-icon" />
                        </button>
                    </div>
                </div>
                {options && (
                    <>
                        <label className="question__label" htmlFor="category">
                            Choose the industry related
                        </label>

                        <Select
                            className={`question__select ${
                                formik.touched.category && Boolean(formik.errors.category)
                                    ? 'error'
                                    : ''
                            }`}
                            id="category"
                            name="category"
                            value={formik.values.category}
                            onChange={(event) => {
                                formik.setFieldTouched('category');
                                formik.handleChange(event);
                            }}>
                            {options!.map(({ label, value }) => (
                                <MenuItem value={value} key={label}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </>
                )}

                <label className="question__label" htmlFor="question">
                    Question
                </label>
                <div
                    className={`question__text ${
                        formik.touched.question && Boolean(formik.errors.question) ? 'error' : ''
                    }`}>
                    <TextareaAutosize
                        onBlur={() => {
                            formik.setFieldTouched('question');
                        }}
                        className={'question__input'}
                        name="question"
                        id="question"
                        value={formik.values.question}
                        onChange={formik.handleChange}
                    />
                </div>
            </QuestionWrapper>
        </form>
    );
};

export default QuestionForm;
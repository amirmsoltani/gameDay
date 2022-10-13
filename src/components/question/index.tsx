import React, { FC } from 'react';
import TrashIcon from 'src/assets/icons/trash-icon';
import { QuestionWrapper } from './question-style';
import QuestionForm from './question-from';

type PropsType = {
    edit?: boolean;
    counter: number;
    question?: string;
    onSubmit?: (form: { category: number; description: string }) => void;
    onCancel?: () => void;
    options?: Array<{ label: string; value: string }>;
    loading?: boolean;
};



const Question: FC<PropsType> = ({ counter, question, edit,options,onCancel,onSubmit }) => {
    return (
        <QuestionWrapper>
            <div className="question__header">
                <div className="header__counter">{counter}</div>
            </div>

            <label className="question__label">Question</label>
            <span className="question__text">{question}</span>
        </QuestionWrapper>
    );
};

export default Question;

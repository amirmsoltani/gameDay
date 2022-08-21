import { useField } from 'formik';
import React from 'react';
import { TextArea } from './styled';

export const InputTextarea = ({ label, ...props }) => {
    const [field, meta] = useField(props.name);
    return (
        <>
            <TextArea className="text-area" {...field} {...props} />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </>
    );
};

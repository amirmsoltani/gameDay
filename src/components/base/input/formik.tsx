import { FieldProps, useField } from 'formik';
import React, { forwardRef, memo, useMemo, useState } from 'react';
import NumberFormat from 'react-number-format';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';

import { MInput } from '.';
import { MButton } from '../MButton';
import { MInputProps } from './type.input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const MInputFormik = forwardRef((props: MInputProps & { fullWidth?: boolean }, ref) => {
    const [field, meta] = useField(props.name);

    return <MInput {...props} {...field} meta={meta} ref={ref as any} />;
});

export const MInputPasswordFormik = memo(
    forwardRef(
        (
            {
                withToggle,
                ...props
            }: Omit<MInputProps, 'EndAdornment'> & { withToggle?: boolean; fullWidth?: boolean },
            ref
        ) => {
            const [show, setShow] = useState(false);

            const EndAdornment1 = useMemo(() => {
                if (withToggle) {
                    return () => (
                        <MButton type="button" onClick={() => setShow((prevState) => !prevState)}>
                            <HideIcon />
                        </MButton>
                    );
                }
            }, [withToggle]);
            const EndAdornment2 = useMemo(() => {
                if (withToggle) {
                    return () => (
                        <MButton type="button" onClick={() => setShow((prevState) => !prevState)}>
                            <ShowIcon />
                        </MButton>
                    );
                }
            }, [withToggle]);
            return (
                <MInputFormik
                    {...props}
                    ref={ref as any}
                    type={show ? 'text' : 'password'}
                    EndAdornment={show ? EndAdornment1 : EndAdornment2}
                />
            );
        }
    )
);
export const MInputFormikPasswords = memo(
    forwardRef((props: TextFieldProps & MInputProps, ref) => {
        const [field, meta] = useField(props.name);
        const [showPassword, setShowPassword] = useState(false);

        return (
            <MInputFormik
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {' '}
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}{' '}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                {...props}
                {...field}
                meta={meta}
                ref={ref as any}
            />
        );
    })
);
// export const MPhoneNumberFormik = memo(
//     forwardRef(
//         ({ form, field, name, placeholder, label }: FieldProps<string> & MInputProps, ref) => {
//             const meta = useMemo(() => {
//                 return form.getFieldMeta(field.name);
//             }, [form, field]);
//
//             return (
//                 <NumberFormat
//                     ref={ref as any}
//                     customInput={MInput}
//                     format="(+###) ####-#####"
//                     {...field}
//                     name={name}
//                     placeholder={placeholder}
//                     label={label}
//                     meta={meta}
//                     onChange={(e) => {
//                         form.setFieldValue(field.name, e.target.value);
//                     }}
//                 />
//             );
//         }
//     )
// );

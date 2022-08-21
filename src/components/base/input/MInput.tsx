import { TextField, TextFieldProps, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import React, { forwardRef, memo, useMemo } from 'react';
import { InputErrorText } from './error';
import { BSLabel, CommonInputRoot, IconCommonInputRoot } from './styled';
import { MInputProps } from './type.input';
import { memoCompareChanges } from './utils';
import { FieldProps, useField } from 'formik';

import NumberFormat from 'react-number-format';

const CommonTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        boxSizing: 'border-box',
        height: 50
    },
    '& .MuiOutlinedInput-input': {
        borderRadius: 0
    }
});

export const MInput = memo(
    forwardRef(
        (
            {
                label,
                value,
                meta,
                error,
                InputComponent = CommonTextField,
                InputRoot = CommonInputRoot,
                errorSpaceOn = false,
                inputProps,
                minTime,
                iconComponent,
                ...rest
            }: TextFieldProps & MInputProps,
            ref
        ) => {
            const theme = useTheme();

            return (
                <InputRoot>
                    {iconComponent && <IconCommonInputRoot>{iconComponent}</IconCommonInputRoot>}
                    {/* {label && <BSLabel>{label}</BSLabel>} */}
                    <InputComponent
                        ref={ref as any}
                        {...rest}
                        value={value}
                        key={rest.name}
                        label={label}
                        id={rest.name}
                        InputLabelProps={{
                            style: { color: '#213950' }
                        }}
                        autoComplete="off"
                        inputProps={{
                            min: minTime,
                            sx: {
                                paddingLeft: iconComponent ? '60px' : '14px',
                                height: 56,
                                width: '100%',
                                borderRadius: 18,
                                '&::placeholder': {
                                    color: rest.grayPlaceholder === true ? '#585858' : '#213950',
                                    opacity: 1
                                },
                                ...inputProps
                            }
                        }}
                    />

                    {meta && <InputErrorText meta={meta} errorSpaceOn={errorSpaceOn} />}
                </InputRoot>
            );
        }
    ),
    memoCompareChanges
);

export const MInputFormik = memo(
    forwardRef((props: TextFieldProps & MInputProps, ref) => {
        const [field, meta] = useField(props.name);

        return (
            <MInput minTime={props?.minTime} {...props} {...field} meta={meta} ref={ref as any} />
        );
    })
);

export const MPhoneNumberFormik = memo(
    forwardRef(
        ({ form, field, name, placeholder, label }: FieldProps<string> & MInputProps, ref) => {
            const meta = useMemo(() => {
                return form.getFieldMeta(field.name);
            }, [form, field]);

            return (
                <NumberFormat
                    ref={ref as any}
                    customInput={MInput}
                    format="(+###) ####-#####"
                    {...field}
                    name={name}
                    placeholder={placeholder}
                    label={label}
                    meta={meta}
                    onChange={(e) => {
                        form.setFieldValue(field.name, e.target.value);
                    }}
                />
            );
        }
    )
);

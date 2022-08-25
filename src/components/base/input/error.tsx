import { Typography } from '@mui/material';
import { styled } from '@mui/material';
import isPropValid from '@emotion/is-prop-valid';

import { FieldMetaProps } from 'formik';

const BSInputError = styled(Typography, { shouldForwardProp: isPropValid })<{
    show?: boolean;
    errorSpaceOn?: boolean;
}>(({ theme, show, errorSpaceOn }) => ({
    color: show ? theme.palette.error.main : 'transparent',
    margin: '12px 0 0 0',
    fontSize: 12,
    display: errorSpaceOn && !show ? 'none' : 'block'
}));

export const InputErrorText = ({
    meta,
    errorSpaceOn
}: {
    errorSpaceOn?: boolean;
    meta: FieldMetaProps<any>;
}) => {
    return (
        <BSInputError
            variant="caption"
            errorSpaceOn={errorSpaceOn}
            show={Boolean(meta.touched && meta.error)}>
            {meta.error ? meta.error : 'noerror'}
        </BSInputError>
    );
};

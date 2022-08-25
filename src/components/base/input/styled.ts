import styled from '@emotion/styled';
import { getPaletteColor, getTextColor, textWeight } from 'src/utils/theme/helper';
import { MText } from '../MText';
import { InputTextarea } from './input-textarea';

export interface StyledInputValueProps {
    value?: boolean;
    error?: boolean;
    min_w?: number;
}

export const BSInput = styled.input<AppBaseColorType & AppTypographyVariant & AppTypographyWeight>(
    ({
         theme,
         fontWeight: weight = 'medium',
         variant = 'body1',
         palette,
         degree,
         css,
         disabled
     }) => ({
        ...(css && css),
        color: getTextColor({ degree, palette }),
        ...(disabled && { opacity: 0.7 }),
        fontWeight: textWeight[weight],
        '&::placeholder': {
            color: theme.palette.grey.main,
            fontWeight: 400
        },
        padding: 0,
        minWidth: 100,
        flex: 1,
        backgroundColor: 'inherit',
        border: 'none',
        outline: 'none',
        '&:-webkit-autofill': {
            transitionDelay: '9999s',
            transitionProperty: 'background-color, color'
        },
        ...theme.typography[variant]
    })
);

export const BSTextArea = styled.textarea<AppBaseColorType & AppTypographyVariant & AppTypographyWeight>(({
                                                                                                              theme,
                                                                                                              fontWeight: weight = 'medium',
                                                                                                              variant = 'body1',
                                                                                                              palette,
                                                                                                              degree,
                                                                                                              css
                                                                                                          }) => ({
    ...(css && css),
    color: getTextColor({ degree, palette }),
    fontWeight: textWeight[weight],
    '&::placeholder': {
        color: theme.palette.palette.grey.main,
        fontWeight: 400
    },
    padding: 0,
    minWidth: 150,
    flex: 1,
    backgroundColor: 'inherit',
    border: 'none',
    outline: 'none',
    '&:-webkit-autofill': {
        transitionDelay: '9999s',
        transitionProperty: 'background-color, color'
    },
    ...theme.typography[variant]
}));

export const BSInputContainer = styled.div<StyledInputValueProps>(({ theme, css }) => ({
    ...(css && css),
    minWidth: 100,
    position: 'relative',
    width: '100%',
}));

export const CommonInputRoot = styled(BSInputContainer)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 18,
        borderColor: theme.palette.primary.dark,
        '& fieldset': {
            borderColor: theme.palette.primary.dark
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.dark
        }
    }
}));

export const IconCommonInputRoot = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: 20,
    top: 15,
    zIndex: 1
}));

export const CommonSelectRoot = styled(BSInputContainer)<{ rounded: boolean }>(
    ({ theme, rounded }) => ({
        '& .MuiOutlinedInput-root': {
            borderRadius: rounded ? 18 : 12,
            height: rounded ? 50 : 56,
            '& fieldset': {
                borderColor: theme.palette.primary.dark
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.dark
            }
        }
    })
);

export const CommonInputWrapper = styled.div<{ error?: boolean; fullWidth: boolean }>(
    ({ theme, error, css, fullWidth }) => ({
        ...(css && css),

        boxShadow: '0px 2px 4px #1717172E',
        backgroundColor:theme.palette.grey.lighter,
        borderRadius: theme.shape.borderRadius.common,
        display: 'flex',
        minHeight:55,
        alignItems: 'center',
        '& > button': {
            padding: 0
        },
        padding: '5px 10px',
        ...(error && {
            borderColor: 'red'
        }),
        '& .start-adornment': {
            marginRight: 16
        },
        maxWidth: fullWidth ? '' : '230px',
        '@media(max-width:800px)': {
            maxWidth: 'unset'
        }
    })
);

export const ModalSearchInput = styled(BSInput)({
    cursor: 'pointer',
    minWidth: 100
});

export const BSTwoDigitInputContainer = styled.div<StyledInputValueProps>(
    ({ theme, value, css }) => ({
        ...(css && css),
        border: '1px solid',
        borderColor: theme.palette.text.main,
        borderRadius: theme.shape.borderRadius.common,
        cursor: 'text',
        padding: 16,
        // marginRight: 16,
        display: 'inline-block',
        'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
        },
        'input[type=number]': {
            MozAppearance: 'textfield'
        }
    })
);

export const BSLabel = styled(MText)(({ theme }) => ({
    ...theme.typography.body2,
    margin: '12px 0 ',
    // transform: theme.typography.transform.small,
    transformOrigin: 'bottom left'
}));

export const TextArea = styled('textarea')(({}) => ({
    padding: ' 0.65rem 0.5rem',
    width: '100%',
    borderRadius: '16px',
    borderColor: '#06677C',
    resize: 'none',
    fontSize: '1rem',
    '::placeholder': {
        color: 'currentcolor'
    }
}));

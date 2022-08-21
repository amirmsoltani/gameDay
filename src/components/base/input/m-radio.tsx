import {
    CircularProgress,
    MenuItem,
    RadioGroup,
    Typography,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio
} from '@mui/material';
import styled from '@emotion/styled';
import { useField } from 'formik';
import { InputErrorText } from './error';
const CommonRadioField = styled(RadioGroup)({});

export const CommonRadioRoot = styled.div({
    // display: 'flex',
    flexDirection: 'column',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '12px',
            borderColor: '#393939'
        }
    },
    '& .MuiFormControlLabel-root': {
        marginRight: '60px'
    }
});

export const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    padding: '2',
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
        theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))'
}));

export const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#213950',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
        display: 'block',
        width: '30px',
        height: '30px',
        content: '""',
        borderRadius: '50%',
        boxShadow: '0px 0px 1px 2px white inset',
        border: '1px solid #213950'
    },
    'input:hover ~ &': {
        backgroundColor: '#213950'
    }
});

export const MRadioFormik = ({
    options,
    vertical = false,
    label,
    InputComponent = CommonRadioField,
    InputRoot = CommonRadioRoot,
    InputOption = FormControlLabel,
    errorSpaceOn = false,
    error,
    defaultvalue,
    custom = false,
    holder = false,
    labelProps = {},
    CustomOption = Radio,
    ...rest
}: any) => {
    const [field, meta] = useField(rest.name);

    return (
        <InputRoot>
            <FormControl>
                {holder && <FormLabel>{label}</FormLabel>}
                <InputComponent
                    style={{ height: vertical ? null : '50px' }}
                    onChange={(e) => {
                        field?.onChange?.(e);
                        rest?.onChange?.(e);
                    }}
                    defaultValue={defaultvalue}
                    name={field.name}>
                    {options.length > 0 &&
                        options.map((o, i) => (
                            <InputOption
                                control={custom ? <BpRadio /> : <CustomOption />}
                                key={`${i}-${o.option}`}
                                value={o.value}
                                label={o.option}
                                {...labelProps}
                            />
                        ))}
                </InputComponent>
                {meta && <InputErrorText meta={meta} errorSpaceOn={errorSpaceOn} />}
            </FormControl>
        </InputRoot>
    );
};

function BpRadio(props: any) {
    return (
        <Radio
            sx={{
                '&:hover': {
                    bgcolor: 'transparent'
                }
            }}
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
        />
    );
}

import {
    CircularProgress,
    MenuItem,
    Typography,
    FormControl,
    InputLabel,
    useTheme
} from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import styled from '@emotion/styled';
import { useField } from 'formik';
import { BSLabel, CommonSelectRoot, IconCommonInputRoot } from './styled';
import { MSelectProps } from './type.input';
import { InputErrorText } from './error';
import { MuiSelect } from './MuiSelect';
const CommonTextField = styled(MuiSelect)({});
import { useRef } from 'react';

type SelectProps = Omit<SelectInputProps, 'autoWidth' | 'multiple' | 'native'> &
    MSelectProps & {
        autoWidth?: boolean;
        multiple?: boolean;
        native?: boolean;
        name: string;
        options: ArrayOptionLoading;
        holder?: boolean;
        whitoutErr?: boolean;
        Icon?: any;
        rounded?: boolean;
        iconComponent?: JSX.Element;
    };
export const MSelectFormik = ({
    options,
    whitoutErr = false,
    autoWidth = true,
    multiple = false,
    native = false,
    label,
    InputComponent = CommonTextField,
    InputRoot = CommonSelectRoot,
    errorSpaceOn = false,
    error,
    holder = false,
    rounded = false,
    iconComponent,
    ...rest
}: SelectProps) => {
    const [field, meta] = useField(rest.name);
    const theme = useTheme();

    return (
        <InputRoot rounded={rounded}>
            <FormControl fullWidth>
                {holder && (
                    <InputLabel
                        style={{ color: theme.palette.secondary.darker, top: rounded ? -7 : 0 }}>
                        {label}
                    </InputLabel>
                )}
                {label && !holder && <BSLabel>{label}</BSLabel>}
                {iconComponent && <IconCommonInputRoot>{iconComponent}</IconCommonInputRoot>}
                <InputComponent
                    label={holder ? label : undefined}
                    // MenuProps={{ PaperProps: { sx: { maxHeight: 150 },onScroll: handleScroll } }}
                    {...rest}
                    // IconComponent={({ className, ...props }) => (
                    //     <Box style={{position: 'absolute', right: 6, top: 16}}>
                    //         <ArrowDownIcon {...props}  />
                    //     </Box>
                    // )}
                    {...field}
                    style={{
                        paddingLeft: iconComponent ? '45px' : '14px'
                    }}
                    onChange={(e) => {
                        field?.onChange?.(e);
                        // rest?.onChange?.(e);
                    }}>
                    {options === 'loading' ? (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress size="1rem" />
                        </div>
                    ) : options?.length > 0 ? (
                        options?.map((o, i) => (
                            <MenuItem
                                disabled={o.disabled}
                                key={`${i}-${o.option}`}
                                value={o.value}>
                                {o.option}
                            </MenuItem>
                        ))
                    ) : (
                        <Typography>{'no option'}</Typography>
                    )}
                </InputComponent>
                {meta && !whitoutErr && <InputErrorText meta={meta} errorSpaceOn={errorSpaceOn} />}
            </FormControl>
        </InputRoot>
    );
};

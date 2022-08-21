import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseItem from 'src/assets/icons/close-item';
import ClockIcon from 'src/assets/icons/clock';
import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';
import { Box, Button, Grid, InputAdornment, styled, Typography, useTheme } from '@mui/material';
import { isInteger } from '@/components/healers/profile/component/new-session';
import { BSInputContainer } from '@/components/base/input/styled';
import { capitalizeFirstString } from '@/utils/helper/capitalize';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { MInputFormik } from '@/components/base/input/MInput';
import { CloseIcon } from 'src/assets/common/CloseIcon';
import { handleError } from 'src/graphql/handleError';
import { MuiButton } from '@/components/base/Button';
import { Spacer } from '@/components/base/spacer';
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import {
    DayOfWeek,
    useHealingType_GetAllHealingTypesQuery,
    useUser_AddHealingTypePriceMutation,
    useUser_AddVocationMutation,
    useUser_AddWorkingHoursMutation,
    useUser_DeleteHealingTypePriceMutation,
    useUser_DeleteVocationMutation,
    useUser_DeleteWorkingHoursMutation
} from 'src/graphql/generated';

export const AddButton = styled(MuiButton)(({ theme }) => ({
    color: 'white',
    background: theme.palette.primary.main,
    // padding: '10px 20px',
    // borderRadius: 10,
    height: 42,
    width: '100px',
    ':hover': {
        background: theme.palette.primary.main
    }
}));

export const DeleteButton = styled(Button)({
    color: 'black',
    width: 10,
    height: 10,
    background: 'transparent',
    paddingRight: 10,
    minWidth: '30px'
});

const TypePriceItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    background: '#CFB9E3',
    borderRadius: 4,
    paddingLeft: 10,
    margin: '3px 4px',
    minWidth:'290px',
    maxWidth:'256px',
    justifyContent:'space-between'
}));

export const weekDays = [
    { name: DayOfWeek.Monday, value: 'M' },
    { name: DayOfWeek.Tuesday, value: 'T' },
    { name: DayOfWeek.Wednesday, value: 'W' },
    { name: DayOfWeek.Thursday, value: 'T' },
    { name: DayOfWeek.Friday, value: 'F' },
    { name: DayOfWeek.Saturday, value: 'S' },
    { name: DayOfWeek.Sunday, value: 'S' }
];

export const DayContainer = styled(Box)<{ holidays: boolean; selected: boolean }>(
    ({ theme, holidays, selected }) => ({
        width: 41,
        height: 53,
        borderRadius: 30,
        boxShadow: holidays || selected ? undefined : '0px 0px 3px 0px rgba(0,0,0,0.25)',
        border: holidays ? '1px solid black' : undefined,
        background: selected
            ? theme.palette.primary.dark
            : holidays
            ? 'transparent'
            : theme.palette.secondary.light,
        color: selected ? 'white' : 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        cursor: 'pointer'
    })
);

export const WorkDayItem = styled(Box)({
    border: '2px solid #CECCCC',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    maxWidth: '250px',
    minWidth: '200px'
});

export const InputRoot = styled(BSInputContainer)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '3rem',
        width: 150,
        height: '42px',
        '& fieldset': {
            borderColor: theme.palette.secondary.darker
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.darker
        }
    }
}));

export const DateInputRoot = styled(BSInputContainer)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '3rem',
        width: 350,
        '& fieldset': {
            borderColor: theme.palette.secondary.darker
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.darker
        }
    }
}));

export const VacationInputRoot = styled(BSInputContainer)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '3rem',
        width: 280,
        height: '42px',
        '& fieldset': {
            borderColor: theme.palette.secondary.darker
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.darker
        }
    }
}));

export const TimeInputRoot = styled(BSInputContainer)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 5,
        width: 47,
        height: 40,
        '& fieldset': {
            borderColor: theme.palette.secondary.darker
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.darker
        }
    }
}));

export const SelectRoot = styled(BSInputContainer)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 5,
        height: 40,
        '& fieldset': {
            borderColor: theme.palette.secondary.darker
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.darker
        }
    }
}));

let times = ['start_hour', 'end_hour', 'start_min', 'end_min'];
function hasNumber(item) {
    return /\d/.test(item);
}

const BusinessInfo = ({ value, setValue, formikValue, marginItemTime = false }) => {
    dayjs.extend(duration);
    const { mutate: addVocations, isLoading: loadingVocation } = useUser_AddVocationMutation();
    const { mutate: deleteVocation } = useUser_DeleteVocationMutation();
    const { mutate: addHealingTypePrice, isLoading: loadingTypePrice } =
        useUser_AddHealingTypePriceMutation();
    const { mutate: deleteHelingTypePrice } = useUser_DeleteHealingTypePriceMutation();
    const { mutate: addWorking, isLoading: loadingWorkingHours } =
        useUser_AddWorkingHoursMutation();
    const { mutate: deletWorking } = useUser_DeleteWorkingHoursMutation();
    const { data: dataHealing } = useHealingType_GetAllHealingTypesQuery();
    const theme = useTheme();
    const [err, setErr] = useState(false);
    const [selectedDay, setSelectedDay] = useState('MONDAY');
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    function addzero(item) {
        const firstitem = String(item)[0];
        const seconditem = String(item)[1];
        return Number(firstitem) === 0 && seconditem === undefined
            ? '00'
            : Number(firstitem) === 0 && Number(seconditem) === 0
            ? '00'
            : Number(firstitem) === 0
            ? item
            : parseInt(item) >= 0 && parseInt(item) <= 9
            ? `0${item}`
            : item;
    }

    function checkValues(formikValue) {
        const match = `${selectedDay}${addzero(formikValue?.start_hour)}:${addzero(
            formikValue?.start_min
        )} ${formikValue?.start_time_format}-${addzero(formikValue?.end_hour)}:${addzero(
            formikValue?.end_min
        )} ${formikValue?.end_time_format}`;
        if (
            !formikValue?.start_hour ||
            !formikValue?.end_hour ||
            !formikValue?.start_min ||
            !formikValue?.end_min ||
            !formikValue?.start_time_format ||
            !formikValue?.end_time_format ||
            value.workDays
                ?.map((item) => `${item?.day}${item?.startTime}-${item?.endTime}`)
                .some((item) => item === match)
        ) {
            return;
        } else if (
            times
                ?.slice(0, 2)
                ?.some((item) => Number(formikValue[item]) < 0 || Number(formikValue[item]) > 12)
        ) {
            enqueueSnackbar('Please enter a time between 0 and 12(hour)', { variant: 'error' });
        } else if (
            times
                ?.slice(2, 4)
                ?.some((item) => Number(formikValue[item] < 0 || formikValue[item] > 60))
        ) {
            enqueueSnackbar('Please enter a time between 0 and 60(minute)', { variant: 'error' });
        } else if (
            times?.some((item) => !hasNumber(formikValue[item]) || !isInteger(formikValue[item]))
        ) {
            enqueueSnackbar('Please enter a valid number', { variant: 'error' });
        } else {
            addWorking(
                {
                    workingHoursInput: {
                        dayOfWeek: selectedDay as any,
                        startTime: `${
                            formikValue?.start_time_format === 'AM'
                                ? addzero(formikValue?.start_hour)
                                : Number(formikValue?.start_hour) + 12 >= 24
                                ? '00'
                                : addzero(Number(formikValue?.start_hour) + 12)
                        }:${addzero(formikValue?.start_min)}:00`,
                        endTime: `${
                            formikValue?.end_time_format === 'AM'
                                ? addzero(formikValue?.end_hour)
                                : Number(formikValue?.end_hour) + 12 >= 24
                                ? '00'
                                : addzero(Number(formikValue?.end_hour) + 12)
                        }:${addzero(formikValue?.end_min)}:00`
                    }
                },
                {
                    onSuccess: () => queryClient.refetchQueries('user_workingHours'),
                    onError: (err: any, _, context: any) => {
                        enqueueSnackbar(handleError(err), { variant: 'error' });
                    }
                }
            );
        }
    }

    return (
        <>
            <Typography
                style={{
                    fontSize: 24,
                    color: theme.palette.secondary.darker,
                    fontWeight: 'bold'
                }}>
                Business Info
            </Typography>
            <Spacer space={30} />
            <Grid container>
                <Grid item display="flex">
                    <MSelectFormik
                        rounded
                        name="type"
                        options={dataHealing?.healingType_getAllHealingTypes?.result?.items?.map(
                            (item) => ({ option:  item?.title?.length > 20 ? `${item?.title?.substring(0,23)}...` : item?.title, value: item?.id })
                        )}
                        placeholder="healing type"
                        Icon={KeyboardArrowDownIcon as any}
                        label="healing type"
                        holder={true}
                    />
                    <Spacer space={6} />
                    <MInputFormik
                        name="price"
                        placeholder="Price"
                        style={{ width: 150, height: '42px' }}
                        autoComplete="off"
                        grayPlaceholder={true}
                        InputRoot={InputRoot}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">$</InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item paddingLeft="10px">
                    <AddButton
                        loading={loadingTypePrice}
                        onClick={() => {
                            if (
                                !formikValue?.type ||
                                !formikValue?.price ||
                                !hasNumber(formikValue?.price)
                            ) {
                                setErr(true);
                                return;
                            } else setErr(false);
                            addHealingTypePrice(
                                {
                                    addHealingTypePriceInput: {
                                        healingTypeId: Number(formikValue?.type),
                                        price: Number(formikValue?.price)
                                    }
                                },
                                {
                                    onSuccess: () =>
                                        queryClient.refetchQueries('user_getBusinessInfo')
                                }
                            );
                        }}>
                        Add
                    </AddButton>
                </Grid>
            </Grid>
            {err && (
                <Typography style={{ fontSize: 12, color: theme.palette.error.main }}>
                    Please select a type and enter a price for it!
                </Typography>
            )}
            <Grid container>
                {value?.typeAndPrice?.map((item, index) => {
                    return (
                    <TypePriceItem key={index}>
                        <Typography>
                            {item?.type?.length > 20 ? `${item?.type?.substring(0,23)}...` : item?.type} - ${item?.price}
                        </Typography>
                        <DeleteButton onClick={() => deleteTypePrice(item?.id)}>
                            <CloseItem />
                        </DeleteButton>
                    </TypePriceItem>
                    )
})}
            </Grid>
            <Spacer space={30} />

            <div style={{display:'flex',alignItems: 'center'}}>
            <div>
            <Typography style={{ color: theme.palette.secondary.darker, fontSize: 18 }}>
                Daily Working Hours
            </Typography>
            <Spacer space={20} />
            <Box display="flex" sx={{ marginLeft: marginItemTime ? '20px' : 0 }}>
                {weekDays.map((day, index) => (
                    <DayContainer
                        key={index}
                        onClick={() => setSelectedDay(day.name)}
                        selected={selectedDay === day.name}
                        holidays={day.value === 'S'}>
                        <Typography style={{ fontSize: 24,color:selectedDay === day.name ? '#fff':'#000' }}>{day.value}</Typography>
                    </DayContainer>
                ))}
            </Box>
            {['Start', 'End'].map((item, index) => (
                <Box
                    key={index}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        maxWidth: 268,
                        margin: `20px ${marginItemTime === true ? '20px' : 0}`
                    }}>
                    <Typography fontSize="20px" sx={{ marginRight: item === 'End' ? '9px' : null }}>
                        {item}
                    </Typography>
                    <ClockIcon />
                    <Typography style={{ fontSize: 18, color: '#8B8B8B' }}>Time</Typography>
                    <Box maxWidth="44px">
                        <MInputFormik
                            name={item === 'Start' ? 'start_hour' : 'end_hour'}
                            InputRoot={TimeInputRoot}
                        />
                    </Box>
                    <Typography>:</Typography>
                    <Box maxWidth="44px">
                        <MInputFormik
                            name={item === 'Start' ? 'start_min' : 'end_min'}
                            InputRoot={TimeInputRoot}
                        />
                    </Box>
                    <Box maxWidth="20px">
                        <MSelectFormik
                            whitoutErr
                            name={item === 'Start' ? 'start_time_format' : 'end_time_format'}
                            InputRoot={SelectRoot}
                            Icon={KeyboardArrowDownIcon as any}
                            options={[
                                { option: 'AM', value: 'AM' },
                                { option: 'PM', value: 'PM' }
                            ]}
                        />
                    </Box>
                </Box>
            ))}
            </div>
            <Box display="flex" justifyContent="center" maxWidth="345px" mt={9}>
                <AddButton
                    loading={loadingWorkingHours}
                    onClick={() => {
                        checkValues(formikValue);
                    }}
                    style={{ width: 100, marginLeft: marginItemTime ? '25px' : 0 }}>
                    Add
                </AddButton>
            </Box>
            </div>
            <Spacer space={20} />
            <Grid container>
                {value.workDays.map((item, index) => {
                    return (
                        <WorkDayItem
                            paddingY="5px"
                            marginRight="10px"
                            marginBottom="7px"
                            key={index}>
                            <Typography fontSize={10}>
                                {`${capitalizeFirstString(item?.day)} ${subtractTimePM(
                                    item?.startTime
                                )} ${spicifyAmOrPm(item?.startTime)} - ${subtractTimePM(
                                    item?.endTime
                                )} ${spicifyAmOrPm(item?.endTime)}`}
                            </Typography>
                            <DeleteButton onClick={() => deleteWorkDay(item?.id)}>
                                <CloseIcon stroke="#000" />
                            </DeleteButton>
                        </WorkDayItem>
                    );
                })}
            </Grid>
            {value.workDays.length > 0 && <Spacer space={10} />}
            <Typography fontSize={18}>Vacation</Typography>
            <Spacer space={10} />
            <Box display="flex" maxWidth="min-content">
                <MInputFormik
                    name="vacation"
                    type="date"
                    placeholder="vacation"
                    InputRoot={VacationInputRoot}
                    fullWidth
                />
                <AddButton
                    loading={loadingVocation}
                    onClick={() => {
                        if (
                            value.vacation
                                ?.map((item) => item?.date?.date)
                                .some((item) => item === new Date(formikValue?.vacation).toJSON())
                        ) {
                            return;
                        } else {
                            addVocations(
                                {
                                    vocationDate: formikValue?.vacation
                                },
                                {
                                    onSuccess: () => queryClient.refetchQueries('user_getVocations')
                                }
                            );
                        }
                    }}
                    style={{ width: 100 }}>
                    Add
                </AddButton>
            </Box>
            <Grid container>
                {value.vacation.map((item, index) => (
                    <WorkDayItem paddingY="5px" marginRight="10px" marginBottom="7px" key={index}>
                        <Typography fontSize={10}>
                            {dayjs(item?.date?.date).format('dddd D MMMM')}
                        </Typography>
                        <DeleteButton onClick={() => deleteVacationDay(item?.date?.id)}>
                            <CloseIcon />
                        </DeleteButton>
                    </WorkDayItem>
                ))}
            </Grid>
        </>
    );

    function deleteTypePrice(id) {
        deleteHelingTypePrice(
            {
                healingTypePriceId: Number(id)
            },
            {
                onSuccess: () => queryClient.refetchQueries('user_getBusinessInfo')
            }
        );
    }

    function deleteWorkDay(id) {
        deletWorking(
            {
                workingHourId: Number(id)
            },
            {
                onSuccess: () => queryClient.refetchQueries('user_workingHours')
            }
        );
    }

    function deleteVacationDay(id) {
        deleteVocation(
            {
                vocationId: Number(id)
            },
            {
                onSuccess: () => queryClient.refetchQueries('user_getVocations')
            }
        );
    }

    function subtractTimePM(time) {
        return dayjs.duration(time).get('hours') <= 12
            ? dayjs.duration(time).format('HH:mm')
            : dayjs.duration(time).subtract(12, 'hour').format('HH:mm');
    }

    function spicifyAmOrPm(time) {
        return dayjs.duration(time).get('hours') <= 12 ? 'AM' : 'PM';
    }
};

export default BusinessInfo;

import { Box, Container, Divider, Stack, styled, Typography, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import StepCircleIcon from 'src/assets/icons/auth/step-circle';
import HealerStepOne from './step-one';
import HealerStepTwo from './step-two';
import { useSnackbar } from 'notistack';
import {
    useUser_GetBusinessInfoQuery,
    useUser_GetVocationsQuery,
    useUser_UpdateProfileMutation,
    useUser_WorkingHoursQuery
} from 'src/graphql/generated';
import { useRouter } from 'next/router';

const Logo = styled('img')({
    width: 71,
    height: 67,
    borderRadius: '50%',
    objectFit: 'cover'
});

const CustomDivider = styled(Divider)({
    borderColor: '#707070',
    borderBottomWidth: 3
});

const PhotoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 99,
    height: 99,
    borderRadius: '50%',
    border: `1px solid ${theme.palette.secondary.darker}`
}));

const Healer = () => {
    const theme = useTheme();
    const [formPage, setFormPage] = React.useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const { mutate, isLoading } = useUser_UpdateProfileMutation();
    const router = useRouter();

    const [value, setValue] = React.useState({
        workDays: [],
        typeAndPrice: [],
        vacation: [],
        files: {
            diplomas: [],
            licenses: [],
            certificates: [],
            driversLicense: [],
            refrences: []
        },
        profilePhoto: {} as any
    });

    const {
        data: dataHealingType,
        isLoading: loadingBussines,
        isFetching: fetchingBussines
    } = useUser_GetBusinessInfoQuery({ skip: 0, take: 50 });
    const {
        data: dataVocations,
        isLoading: loadingVocation,
        isFetching: fetchVocation
    } = useUser_GetVocationsQuery({ skip: 0, take: 50 });
    const {
        data: dataWorking,
        isLoading: loadingWorking,
        isFetching: fetchWorking
    } = useUser_WorkingHoursQuery({ skip: 0, take: 50 });
    const itemsBussiness = dataHealingType?.user_getBusinessInfo?.result?.items;
    const itemsVacations = dataVocations?.user_getVocations?.result?.items;
    const itemsWorkings = dataWorking?.user_workingHours?.result?.items;

    useEffect(() => {
        if (loadingBussines === false)
            setValue((prev) => ({
                ...prev,
                typeAndPrice: [
                    itemsBussiness?.map((item) => ({
                        type: item?.healingType?.title,
                        price: item?.price,
                        id: item?.id
                    }))
                ].flat()
            }));
        if (loadingVocation === false)
            setValue((prev) => ({
                ...prev,
                vacation: [itemsVacations?.map((item) => ({ date: item, id: item?.id }))].flat()
            }));
        if (loadingWorking === false)
            setValue((prev) => ({
                ...prev,
                workDays: [
                    itemsWorkings?.map((item) => ({
                        day: item?.dayOfWeek,
                        startTime: item?.startTime,
                        endTime: item?.endTime,
                        id: item?.id
                    }))
                ].flat()
            }));
    }, [
        loadingBussines,
        loadingVocation,
        fetchVocation,
        fetchingBussines,
        fetchWorking,
        loadingWorking,
        isLoading
    ]);

    const apiFieldCreator = (key) => {
        let data = [];
        if (key === 'diplomasFileAddress') data = value.files.diplomas;
        else if (key === 'licensesFileAddress') data = value.files.licenses;
        else if (key === 'certificatesFileAddress') data = value.files.certificates;
        else if (key === 'driversLicenseFileAddress') data = value.files.driversLicense;

        let fields = data.map((item, index) => ({ [`${key + (index + 1)}`]: item.url }));

        return fields;
    };

    let [firstStepValues, setFirstStepValues] = useState({});
    const formOnSubmit = (v = {} as any) => {
        if (formPage === 0) {
            setFirstStepValues({
                name: v.name,
                genders: v.gender,
                bio: v.bio,
                phoneNumber: v.phone,
                address: v.address
            });
            if (value.workDays.length > 0 && value.typeAndPrice.length > 0) {
                setFormPage(1);
            } else if (value.workDays.length < 1 && value.typeAndPrice.length < 1) {
                enqueueSnackbar(
                    'Please complete your business info! Only vacation field is optional.',
                    { variant: 'error' }
                );
            }
        } else {
            const apiFieldsTemp = [
                'diplomasFileAddress',
                'licensesFileAddress',
                'certificatesFileAddress',
                'driversLicenseFileAddress'
            ]
                .map((item) => apiFieldCreator(item))
                .flat();

            const apiFields =
                apiFieldsTemp.length > 0
                    ? apiFieldsTemp.reduce((acc = {}, item) => ({ ...acc, ...item }))
                    : {};

            mutate(
                {
                    userInput: {
                        ...firstStepValues,
                        imageAddress:
                            value?.profilePhoto?.file?.name ||
                            value?.profilePhoto?.file?.url ||
                            null,
                        ...apiFields
                    }
                },
                {
                    onSuccess: () => router.push('/'),
                    onError: () => {
                        enqueueSnackbar('Operation failed!', { variant: 'error' });
                    }
                }
            );
        }
    };

    const getValidationSchema = () => {
        if (formPage === 0) {
            return Yup.object({
                name: Yup.string().required('Please enter your name!'),
                phone: Yup.string()
                    .matches(
                        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                        'Phone number is not valid'
                    )
                    .required('Please enter your phone number!'),
                gender: Yup.string().required('Please enter your gender!'),
                address: Yup.string().required('Please enter your address!'),
                bio: Yup.string().required('Please enter your bio!')
            });
        } else return Yup.object({});
    };

    return (
        <Container style={{ padding: '36px 73px', margin: 0 }} maxWidth="xl">
            <Box display="flex" alignItems="center">
                <Logo src="/images/Subtraction6.png" />
                <CustomDivider sx={{ width: { xs: 50, sm: 100, md: 145 } }} />
                <Stack
                    width={40}
                    height={70}
                    direction="column"
                    position="relative"
                    alignItems="center"
                    justifyContent="center">
                    <StepCircleIcon
                        stroke={theme.palette.primary.main}
                        fill={formPage === 0 ? undefined : theme.palette.primary.main}
                    />
                    <Typography bottom={0} align="center" variant="caption" position="absolute">
                        Step 1
                    </Typography>
                </Stack>
                <CustomDivider sx={{ width: { xs: 50, sm: 100, md: 145 } }} />
                <Stack
                    width={40}
                    height={70}
                    direction="column"
                    position="relative"
                    alignItems="center"
                    justifyContent="center">
                    <StepCircleIcon
                        stroke={formPage === 0 ? undefined : theme.palette.primary.main}
                    />
                    <Typography bottom={0} align="center" variant="caption" position="absolute">
                        Step 2
                    </Typography>
                </Stack>
                <CustomDivider sx={{ width: { xs: 30, sm: 70, md: 100 } }} />
            </Box>
            <Formik
                initialValues={{ name: ``, bio: ``, phone: ``, gender: ``, address: `` }}
                validationSchema={getValidationSchema()}
                onSubmit={formOnSubmit}>
                {({ values: formikValue }) => (
                    <Form>
                        {formPage === 0 ? (
                            <HealerStepOne
                                value={value}
                                setValue={setValue}
                                formikValue={formikValue}
                            />
                        ) : (
                            <HealerStepTwo
                                value={value}
                                setValue={setValue}
                                formikValue={formikValue}
                                isLoading={isLoading}
                            />
                        )}
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default Healer;

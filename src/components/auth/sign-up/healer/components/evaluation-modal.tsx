import * as Yup from 'yup';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Spacer } from '@/components/base/spacer';
import { MuiButton } from '@/components/base/Button';
import { useFileUpload } from 'src/hooks/useUploadFile';
import UploadFileIcon from 'src/assets/icons/upload-file';
import { MInputFormik } from '@/components/base/input/MInput';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { Box, Grid, styled, TextField, Typography, useTheme } from '@mui/material';
import { FilePickerContent as FilePicker, removeItemFromState, UploadedFile } from './../step-two';

const EmailAddressRequestText = styled(Typography)({
    fontSize: 14,
    maxWidth: 342,
    textAlign: 'justify'
});

const SendBtn = styled(MuiButton)(({ theme }) => ({
    color: 'white',
    background: theme.palette.primary.main,
    ':hover': {
        background: theme.palette.primary.main
    }
}));

const CancleBtn = styled(MuiButton)(({ theme }) => ({
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`
}));

export const EvaluationModal = ({ variables, callback }) => {
    const { value, setValue } = variables;
    const dispatch = useDispatch();

    console.log(value);

    return (
        <Formik
            initialValues={{ email: `` }}
            onSubmit={(v) => {
                // changePassword(v.email).then(() => {
                //     dispatch(closeModal('Evaluation'));
                // });
            }}
            validationSchema={Yup.object({
                email: Yup.string().email('Must be a valid email').required('Email is required')
            })}>
            <Form>
                <Box>
                    <Grid container justifyContent="center" display="flex">
                        <Grid item xs={12} lg={5}>
                            <FilePicker
                                text="Upload diplomas"
                                disableTextUpload={true}
                                onChange={(data) =>
                                    setValue((prevState) => ({
                                        ...prevState,
                                        files: {
                                            ...prevState.files,
                                            diplomas: [...prevState.files.diplomas, data]
                                        }
                                    }))
                                }
                            />
                            {value.files.diplomas?.map((item, index) => (
                                <UploadedFile
                                    key={index}
                                    file={item.file}
                                    onRemove={() => {
                                        removeItemFromState(index, 'diplomas', value, setValue);
                                    }}
                                    progress={item.progress}
                                />
                            ))}
                            <FilePicker
                                text="Upload licenses"
                                disableTextUpload={true}
                                onChange={(data) =>
                                    setValue((prevState) => ({
                                        ...prevState,
                                        files: {
                                            ...prevState.files,
                                            licenses: [...prevState.files.licenses, data]
                                        }
                                    }))
                                }
                            />
                            {value.files.licenses?.map((item, index) => (
                                <UploadedFile
                                    key={index}
                                    file={item.file}
                                    onRemove={() => {
                                        removeItemFromState(index, 'licenses', value, setValue);
                                    }}
                                    progress={item.progress}
                                />
                            ))}
                            <FilePicker
                                text="Upload certificates"
                                disableTextUpload={true}
                                onChange={(data) =>
                                    setValue((prevState) => ({
                                        ...prevState,
                                        files: {
                                            ...prevState.files,
                                            certificates: [...prevState.files.certificates, data]
                                        }
                                    }))
                                }
                            />
                            {value.files.certificates?.map((item, index) => (
                                <UploadedFile
                                    key={index}
                                    file={item.file}
                                    onRemove={() => {
                                        removeItemFromState(index, 'certificates', value, setValue);
                                    }}
                                    progress={item.progress}
                                />
                            ))}
                            <FilePicker
                                text="Upload drivers license"
                                disableTextUpload={true}
                                onChange={(data) =>
                                    setValue((prevState) => ({
                                        ...prevState,
                                        files: {
                                            ...prevState.files,
                                            ['drivers license']: [
                                                ...prevState.files['drivers license'],
                                                data
                                            ]
                                        }
                                    }))
                                }
                            />
                            {value.files?.['drivers license'] &&
                                value.files['drivers license'].map((item, index) => (
                                    <UploadedFile
                                        key={index}
                                        file={item.file}
                                        onRemove={() => {
                                            removeItemFromState(
                                                index,
                                                'drivers license',
                                                value,
                                                setValue
                                            );
                                        }}
                                        progress={item.progress}
                                    />
                                ))}
                        </Grid>
                        {false && (
                            <>
                                <Spacer space={32} />
                                <Grid item xs={12} lg={5}>
                                    <FilePicker
                                        text="evaluation"
                                        // initialData={formikValue.diplomas}
                                        disableTextUpload={true}
                                        onChange={(data) =>
                                            setValue((prevState) => ({
                                                ...prevState,
                                                files: {
                                                    ...prevState.files,
                                                    diplomas: [...prevState.files.diplomas, data]
                                                }
                                            }))
                                        }
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Box>
            </Form>
        </Formik>
    );
};

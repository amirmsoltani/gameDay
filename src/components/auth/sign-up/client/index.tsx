import ImageUploadIcon from 'src/assets/icons/auth/image-upload';
import CommonLayout from '../../components/common-layout';
import * as Yup from 'yup';
import { useUser_UpdateProfileMutation, Genders } from 'src/graphql/generated';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { MInputFormik } from '@/components/base/input/MInput';
import { useFileUpload } from 'src/hooks/useUploadFile';
import {
    Box,
    CircularProgress,
    CircularProgressProps,
    styled,
    Typography,
    useTheme
} from '@mui/material';
import { MuiButton } from '@/components/base/Button';
import { getFullImageUrl } from '@/utils/helper/ui';
import { Spacer } from '@/components/base/spacer';
import { useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';

const ProfilePhoto = styled('img')({
    width: 99,
    height: 99,
    objectFit: 'cover',
    borderRadius: 60
});

const SubmitButton = styled(MuiButton)(({ theme }) => ({
    background: theme.palette.primary.main,
    color: 'white',
    width: 300,
    ':hover': {
        background: theme.palette.primary.main
    }
}));

const CustomParent = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0'
});

const initialValues = {
    name: ``,
    phone: ``,
    gender: ``,
    address: ``
};

const PhotoContainer = styled(Box)<{ showVacation?: String }>(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 99,
    height: 99,
    borderRadius: '50%',
    border: `1px solid ${theme.palette.secondary.darker}`
}));

export function FilePickerContent({
    initialData,
    onChange,
    value,
    showVacation = false,
    loading,
    setLoading
}) {
    const inputRef = useRef(null);
    const { file, upload, reset, progress } = useFileUpload(initialData, onChange);
    const theme = useTheme();

    useEffect(() => {
        if (file === undefined) setLoading(false);
        else setLoading(true);
        if (file && progress !== 100) setLoading(true);
        if (file && progress === 100) setLoading(false);
    }, [progress, file, value]);

    return (
        <>
            <CustomParent>
                <PhotoContainer
                    style={{ border: 'none' }}
                    onClick={() => inputRef?.current?.click()}
                    onDragOver={dragHandler}
                    onDrop={dropHandler}
                    onDrag={dragMainHandler}>
                    {loading ? (
                        <CircularProgress
                            sx={{ width: '2rem', color: theme.palette.primary.main }}
                        />
                    ) : !loading && !file && !value?.url ? (
                        <ImageUploadIcon />
                    ) : (
                        <ProfilePhoto
                            src={
                                getFullImageUrl(file?.name) ||
                                getFullImageUrl(value?.url) ||
                                getFullImageUrl(value?.objectUrl)
                            }
                        />
                    )}
                </PhotoContainer>
                {!loading && (
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => readImage(e.target.files[0])}
                    />
                )}
            </CustomParent>

            {/* {file && progress !== 100 && (
                <UploadedFile file={file} onRemove={reset} progress={progress} />
            )} */}
        </>
    );
    function resetHandler() {
        reset();
    }

    function dragHandler(e) {
        e.preventDefault();
    }

    function dragMainHandler(e) {
        e.preventDefault();
    }

    function dropHandler(e) {
        e.preventDefault();

        readImage(e?.dataTransfer?.files?.[0]);
    }

    function readImage(file) {
        if (!file) {
            setLoading(false);
            return;
        }
        setLoading(true);
        upload(file);
    }
}

const ClientSignUpCard = () => {
    const theme = useTheme();
    const [value, setValue] = useState({ profilePhoto: null });
    const { mutate, isLoading } = useUser_UpdateProfileMutation();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const setProfilePic = (data) =>
        setValue({
            profilePhoto: data
        });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                name: Yup.string().required('Please enter your name!'),
                phone: Yup.string()
                    .matches(
                        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                        'Phone number is not valid'
                    )
                    .required('Please enter your phone number!'),
                gender: Yup.string().required('Please enter your gender!'),
                address: Yup.string().required('Please enter your address!')
            })}
            onSubmit={(v) =>
                mutate(
                    {
                        userInput: {
                            name: v.name,
                            genders: v.gender as Genders,
                            phoneNumber: v.phone,
                            address: v.address,
                            imageAddress: value?.profilePhoto?.file?.name || null
                        }
                    },
                    {
                        onSuccess: () => router.push('/'),
                        onError: () => {
                            enqueueSnackbar('Operation failed!', { variant: 'error' });
                        }
                    }
                )
            }>
            <Form>
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Spacer space={20} />
                    <PhotoContainer>
                        <FilePickerContent
                            loading={loading}
                            setLoading={setLoading}
                            initialData={{}}
                            onChange={setProfilePic}
                            value={value.profilePhoto}
                        />

                        {/* {value.profilePhoto !== {} && (
                            <ProfilePhoto src={getFullImageUrl(value?.profilePhoto?.url) || getFullImageUrl(value?.profilePhoto?.objectUrl)} />
                        )} */}
                    </PhotoContainer>
                    <Spacer space={10} />
                    <MInputFormik name="name" placeholder="Name" fullWidth />
                    <MInputFormik name="phone" placeholder="Phone Number" fullWidth />
                    <MSelectFormik
                        name="gender"
                        placeholder="Gender"
                        rounded
                        label="Gender"
                        holder
                        options={[
                            { option: 'Male', value: Genders.Male },
                            { option: 'Female', value: Genders.Female },
                            { option: 'Other', value: Genders.Other },
                            { option: 'Prefer not to disclose', value: Genders.Prefer }
                        ]}
                    />
                    <MInputFormik name="address" placeholder="Address" fullWidth />
                    <Spacer space={10} />
                    <SubmitButton loading={isLoading} type="submit">
                        Sign in
                    </SubmitButton>
                    <Spacer space={15} />
                </Box>
            </Form>
        </Formik>
    );
};

const ClientSignIn = () => {
    return (
        <CommonLayout
            form={<ClientSignUpCard />}
            imageSrc="/images/auth/signup-2.png"
            mobileSrc="/images/auth/signup-2.png"
        />
    );
};

export default ClientSignIn;

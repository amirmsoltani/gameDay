import { MInputFormik } from '@/components/base/input/MInput';
import { Spacer } from '@/components/base/spacer';
import { Box, Grid, LinearProgress, styled, Typography, useTheme } from '@mui/material';
import LinearProgressWithLabel from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import ImageUploadIcon from 'src/assets/icons/auth/image-upload';
import { BSInputContainer } from '@/components/base/input/styled';
import { useGetUser } from 'src/auth/UserProvider';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { Genders, useUser_GetMyProfileQuery, useUser_GetUsersQuery, useUser_UpdateProfileMutation } from 'src/graphql/generated';
import { useImageUploader, useUploadInput } from 'src/hooks/useMediaUploader';
import { useEffect,useState,useMemo } from 'react';
import { getFullImageUrl } from '@/utils/helper/ui';
import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query';
import { LoadingButton } from '@mui/lab';


const SubmitButton = styled(LoadingButton)(({ theme }) => ({
    background: theme.palette.primary.main,
    color: 'white',
    width: 300,
    borderRadius:'30px',
    ':hover': {
        background: theme.palette.primary.main
    }
}));

const PhotoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 99,
    height: 99,
    borderRadius: '50%',
    border: `1px solid ${theme.palette.secondary.darker}`
}));

export const CommonInputRoot = styled(BSInputContainer)(({ theme }) => ({
    width: 370,
    "& .MuiFormControl-root":{
        width:'100%'
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: 30,
        '& fieldset': {
            borderColor: theme.palette.secondary.darker
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.darker
        }
    }
}));

export const CommonSelectRoot = styled(BSInputContainer)(({ theme }) => ({
    width: 370,
    marginBottom:'10px',
    '& .MuiOutlinedInput-root': {
        borderRadius: 30,
        '& fieldset': {
            borderColor: theme.palette.secondary.darker
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.darker
        }
    },
    [theme.breakpoints.down("sm")]:{
        marginLeft:'-15px',
    }
}));

const Setting = () => {
    const theme = useTheme();
    const user = useGetUser();
    const { uploadOnFile, state } = useImageUploader();
    const { InputComponent, onFilePick } = useUploadInput(uploadOnFile);
    const [profilePic, setProfilePic] = useState(null);
    const {data:dataUser,isLoading} = useUser_GetMyProfileQuery({userId:Number(user?.id)});
    const profileData = dataUser?.user_getMyProfile?.result;
    const {mutate,isLoading:loadingUpdateProfile} = useUser_UpdateProfileMutation()
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    useEffect(() => {
        try {
            if (state?.items[state?.items?.length - 1].progress === "100") {
                setProfilePic(state?.items[state?.items?.length - 1]?.url);
            }
        } catch (e) {
            console.log(e)
        }
    }, [state]);

    useEffect(() => {
        setProfilePic(profileData?.imageAddress)
    }, [profileData]);


    
const initialValues = {
            name: profileData?.name || '',
            phone: profileData?.phoneNumber || '',
            gender: profileData?.genders || '',
            address: profileData?.address || ''
    }


   
    return (
        <Formik
            enableReinitialize
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
            onSubmit={(v) => {
                mutate({
                    userInput:{
                        genders:v?.gender as Genders,
                        phoneNumber:v?.phone,
                        name:v?.name,
                        address : v?.address,
                        imageAddress:profilePic
                    }
                }, {
                    onSuccess: () => { enqueueSnackbar('Operation was successful!', { variant: 'success' }), queryClient.refetchQueries('user_getMyProfile') },
                    onError: () => { enqueueSnackbar('Operation Failed!', { variant: 'error' }) }
                })
            }}>
            <Form>
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <PhotoContainer onClick={onFilePick}>
                        {InputComponent}
                        {
                           (profilePic !== null && !isLoading) ?<img alt="image" style={{width:'100%',height:'100%',borderRadius:'50%'}} src={getFullImageUrl(profilePic)}  /> :<ImageUploadIcon />
                        }
                    </PhotoContainer>
                    <Spacer space={10} />
                    <Spacer space={10} />
                    <Grid container justifyContent="center" width="100%">
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: { xs: 'center', md: 'end' }
                            }}>
                            <MInputFormik
                                name="name"
                                placeholder="Name"
                                InputRoot={CommonInputRoot}
                            />
                            <Spacer space={10} />
                            <MInputFormik
                                name="phone"
                                placeholder="Phone Number"
                                InputRoot={CommonInputRoot}
                            />
                            <Spacer space={10} />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{
                                paddingLeft: { xs: 0, md: '30px' },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: { xs: 'center', md: 'start' }
                            }}>  
                            <MSelectFormik
                                name="gender"
                                placeholder="Gender"
                                rounded
                                label="Gender"
                                holder
                                InputRoot={CommonSelectRoot}
                                options={[
                                    { option: 'Male', value: Genders.Male },
                                    { option: 'Female', value: Genders.Female },
                                    { option: 'Other', value: Genders.Other },
                                    { option: 'Prefer not to disclose', value: Genders.Prefer }
                                ]}
                            />
                            <Spacer space={10} />
                            <MInputFormik
                                name="address"
                                placeholder="Address"
                                InputRoot={CommonInputRoot}
                            />
                            <Spacer space={10} />
                        </Grid>
                    </Grid>
                    <Spacer space={10} />
                    <SubmitButton type="submit" loading={loadingUpdateProfile}>Confirm</SubmitButton>
                    <Spacer space={15} />
                </Box>
            </Form>
        </Formik>
    );
};

export default Setting;

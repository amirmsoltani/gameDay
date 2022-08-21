import { MInputFormik } from '@/components/base/input/MInput';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { getFullImageUrl } from '@/utils/helper/ui';
import { Box, CircularProgress, Grid, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { UploadIconSvgAvatar } from 'src/assets/authentication/upload_icon_avatar';
import { Gender } from 'src/graphql/generated';
import { useImageUploader, useUploadInput } from 'src/hooks/useMediaUploader';
import * as S from './../signup.styled';

export const SignUpInfo = ({ setFieldValue }) => {
    const { uploadOnFile, state } = useImageUploader();
    const { InputComponent, onFilePick } = useUploadInput(uploadOnFile);

    console.log('New State: ', state);

    useEffect(() => {
        if (state.items.length > 0 && !state.items[0].uploading) {
            setFieldValue('photoUrl', getFullImageUrl(state.items[0].url));
        }
    }, [state]);

    const theme = useTheme();

    return (
        <Box padding={4} alignItems="center" justifyContent="center" minHeight="100vh">
            <S.BoxWrapperForm container flexDirection="column">
                <Grid item>
                    <Box>
                        <S.UploadBox sx={{ border: 'none' }} onClick={onFilePick}>
                            {state.items.length && state.items[0].uploading ? (
                                <CircularProgress
                                    sx={{
                                        width: '2rem',
                                        color: theme.palette.primary.main
                                    }}
                                />
                            ) : (
                                !state.items.length && <UploadIconSvgAvatar />
                            )}
                            {state.items.length > 0 && !state.items[0].uploading && (
                                <S.ProfilePhoto src={state.items[0].localUrl} />
                            )}
                            <S.ButtonAddImage type="button" />
                        </S.UploadBox>
                        {InputComponent}
                    </Box>
                </Grid>
                <Grid sx={{ textAlign: 'left' }} item container marginTop={5} columnSpacing={3.75}>
                    <Grid item sm={6} xs={12}>
                        <MInputFormik name="fullName" placeholder="Full Name" fullWidth />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <MSelectFormik
                            rounded
                            options={Object.entries(Gender).map((item) => ({
                                value: item[0],
                                option: item[0]
                            }))}
                            name="gender"
                            placeholder="Gender"
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <MInputFormik name="occupation" placeholder="Occupation" fullWidth />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <MInputFormik name="address" placeholder="Street Address" fullWidth />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <MInputFormik
                            name="years"
                            placeholder="Years Of Expereince"
                            fullWidth
                            type="number"
                        />
                    </Grid>
                    <Grid item container sm={6} xs={12} spacing={3.75}>
                        <Grid xs={6} item>
                            <MInputFormik name="city" placeholder="City" fullWidth />
                        </Grid>
                        <Grid xs={6} item>
                            <MInputFormik name="state" placeholder="State" fullWidth />
                        </Grid>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <MInputFormik name="phoneNumber" placeholder="Phone Number" fullWidth />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <MInputFormik name="zipCode" placeholder="Zip Code" fullWidth />
                    </Grid>
                </Grid>

                <S.SubmitFormButton type="submit">Submit</S.SubmitFormButton>
            </S.BoxWrapperForm>
        </Box>
    );
};

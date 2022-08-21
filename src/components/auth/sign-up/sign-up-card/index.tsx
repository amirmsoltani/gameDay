import React, { useEffect } from 'react';
import Link from 'next/link';
import { Spacer } from '@/components/base/spacer';
import FacebookIcon from 'src/assets/icons/auth/facebook';
import { GoogleIcon } from 'src/assets/common/GoogleIcon';
import { MInputFormik } from '@/components/base/input/MInput';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { ErthSvg } from 'src/assets/icons/auth/erth';
import { EmailSvg } from 'src/assets/icons/auth/email';
import { KeySvg } from 'src/assets/icons/auth/key';
import { MImage } from '@/components/base/image/MImage';
import { Box, Typography, useTheme, Divider, styled } from '@mui/material';
import * as S from './../signup.styled';
import { MuiButton } from '@/components/base/Button';
import { SocialLoader } from '../../sign-in';
import { useField } from 'formik';
import { State } from '../../services/useAuth';
import { ILoginType } from '..';

export const IconContainer = styled(
    (props: React.ComponentProps<typeof MuiButton> & { loading: boolean }) => (
        <MuiButton {...props} loading={false}>
            {props.loading ? <SocialLoader /> : props.children}
        </MuiButton>
    )
)<{ disabled: boolean; loading: boolean }>(({ disabled }) => ({
    display: 'flex',
    borderRadius: 30,
    alignItems: 'center',
    cursor: !disabled && 'pointer'
}));

const FormFields = ({ state }) => {
    const theme = useTheme();
    const [field, meta, helpers] = useField('accept_terms');

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MSelectFormik
                rounded
                iconComponent={<ErthSvg />}
                name="language"
                placeholder="Language"
                options={[
                    {
                        option: 'Engilsh',
                        value: 'en'
                    }
                ]}
            />
            <MInputFormik
                iconComponent={<EmailSvg />}
                name="email"
                placeholder="Email Address"
                fullWidth
            />
            <MInputFormik
                iconComponent={<KeySvg />}
                name="password"
                placeholder="Password"
                type="password"
                fullWidth
            />
            <MInputFormik
                iconComponent={<KeySvg />}
                name="confirm_password"
                placeholder="Confirm Password"
                type="password"
                fullWidth
            />
            <Typography
                style={{
                    fontSize: 11,
                    color:
                        meta.error && Boolean(meta.touched && meta.error)
                            ? theme.palette.error.main
                            : 'transparent'
                }}>
                {meta.error && Boolean(meta.touched && meta.error) ? meta.error : 'noerror'}
            </Typography>
            <Spacer space={10} />
            <S.SubmitButton type="submit" loading={state.loading}>
                Sign Up
            </S.SubmitButton>
            {state.error && (
                <Typography variant="subtitle1" color={theme.palette.error.main}>
                    {state.error}
                </Typography>
            )}
        </Box>
    );
};

interface Props {
    setPage: (arg: any) => void;
    setLoginType: React.Dispatch<React.SetStateAction<ILoginType>>;
    loading: 'GOOGLE' | 'FACE_BOOK' | 'isRedirectedFromFB' | string;
    state: State;
    disabled: boolean;
}
export const SignUpCard = ({ setPage, loading, disabled, state, setLoginType }: Props) => {
    const theme = useTheme();

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px'
            }}>
            <MImage
                resources={{
                    src: '/images/icons/logo_auth.png'
                }}
            />
            <Typography
                style={{ fontSize: 26, color: theme.palette.secondary.darker, fontWeight: 'bold' }}>
                Sign up
            </Typography>
            <Spacer space={12} />

            <FormFields state={state} />

            <Spacer space={15} />

            <Divider style={{ width: '100%', borderColor: '#707070' }}>
                <Typography style={{ fontSize: 14, color: '#121212 ', margin: '0 7px' }}>
                    Or
                </Typography>
            </Divider>

            <Spacer space={15} />
            <Box
                display="flex"
                width={90}
                margin="auto"
                justifyContent="center"
                alignItems="center">
                <IconContainer
                    type="submit"
                    disabled={disabled}
                    loading={loading == 'GOOGLE'}
                    onClick={() => {
                        if (disabled) return;
                        setLoginType('GOOGLE');
                    }}>
                    <GoogleIcon />
                </IconContainer>
                <Spacer space={10} />
                <IconContainer
                    type="submit"
                    disabled={disabled}
                    loading={loading == 'FACE_BOOK'}
                    onClick={() => {
                        if (disabled) return;
                        setLoginType('FACE_BOOK');
                    }}>
                    <FacebookIcon />
                </IconContainer>
            </Box>
            <Spacer space={15} />
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center'
                }}>
                <Typography sx={{ fontSize: { xs: 12, sm: 14 }, color: '#121212' }}>
                    Already have an account?
                </Typography>
                <Spacer space={5} />
                <Link href="/signin" passHref>
                    <Typography
                        sx={{ fontSize: { xs: 12, sm: 14 } }}
                        style={{
                            textDecoration: 'underline',
                            color: theme.palette.common.info,
                            cursor: 'pointer'
                        }}>
                        Sign in
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
};

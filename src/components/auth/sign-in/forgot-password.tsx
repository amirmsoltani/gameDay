import { MInputFormik } from '@/components/base/input/MInput';
import { Spacer } from '@/components/base/spacer';
import { Box, Typography, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import BlueTickIcon from 'src/assets/icons/blue-tick';
import { closeModal, newModal } from 'src/redux/actions/actions';
import * as Yup from 'yup';
import { useAuthPage } from '../services/useAuth';
import * as S from './signin.styled';

export const AddEmail = () => {
    const dispatch = useDispatch();
    const { state, changePassword } = useAuthPage();

    return (
        <Box sx={{ paddingX: '10px' }}>
            <Spacer space={30} />
            <S.EmailAddressRequestText>
                please write your email address that send a link for changing your password
            </S.EmailAddressRequestText>
            <Spacer space={30} />
            <Formik
                initialValues={{ email: `` }}
                onSubmit={(v) =>
                    changePassword(v.email).then(() => {
                        dispatch(closeModal('Forgot_Pass'));
                        dispatch(
                            newModal({
                                id: 'ChangePassEmailSent',
                                Body: EmailSentSuccessfully,
                                closeButton: true,
                                top: 0
                            })
                        );
                    })
                }
                validationSchema={Yup.object({
                    email: Yup.string().email('Must be a valid email').required('Email is required')
                })}>
                <Form>
                    <Box>
                        <MInputFormik
                            name="email"
                            type="email"
                            fullWidth
                            placeholder="Enter your email address"
                        />
                    </Box>
                    <Spacer space={20} />
                    <Box display="flex">
                        <S.SendBtn type="submit" loading={state.loading}>
                            Send
                        </S.SendBtn>
                        <Spacer space={10} />
                        <S.CancleBtn onClick={() => dispatch(closeModal('Forgot_Pass'))}>
                            Cancel
                        </S.CancleBtn>
                    </Box>
                    {state.error && (
                        <Typography fontSize={12} color="red">
                            {state.error}
                        </Typography>
                    )}
                </Form>
            </Formik>
        </Box>
    );
};

export const EmailSentSuccessfully = () => {
    const theme = useTheme();

    return (
        <Box display="flex" alignItems="center">
            <BlueTickIcon />
            <Box paddingX="20px">
                <Typography color={theme.palette.primary.dark} fontSize={22}>
                    You’ve Got Mail!
                </Typography>
                <Spacer space={15} />
                <Typography color={theme.palette.primary.dark} fontSize={16}>
                    Please check your emails! We just sent you an email with a temporary password
                    recovery link.
                </Typography>
            </Box>
        </Box>
    );
};

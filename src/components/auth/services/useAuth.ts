import { useModalState } from '@/components/shared/modal/useModal';
import { onErrorMessage } from 'src/graphql/useHandleCommonError';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ACCESS_TOKEN_KEY } from '@/utils/storage/constant';
import { useRedirectOnEnterOnRole } from 'src/routes/index';
import { useAuthMutation } from 'src/auth/useAuthMutation';
import { getAuth, getRedirectResult } from 'firebase/auth';
import { useCallback, useReducer, useState } from 'react';
import { AuthWithPassword } from 'src/auth/auth.type';
import { clearCookie } from '@/utils/storage/cookie';
import { useSetUser } from 'src/auth/UserProvider';
import {
    fbPasswordReset,
    fbSignInToken,
    fbSignOut,
} from 'src/auth/firebase';
import { useSnackbar } from 'notistack';

export const authFormInitialValues = {
    email: '',
    password: ''
};
export type State = {
    loading: boolean;
    error: string;
};
const initialState: State = {
    loading: false,
    error: ''
};
const slice = createSlice({
    name: 'ImageReducerSlice',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.error = '';
        },
        setError: (state, { payload }: PayloadAction<string>) => {
            state.loading = false;
            if (payload.includes('auth/email-already-in-use')) {
                state.error = 'Email exists!';
            } else if (
                payload.includes('auth/user-not-found') ||
                payload.includes('auth/wrong-password')
            ) {
                state.error = 'Wrong Email or password!';
            } else if (payload.includes('auth/network-request-failed')) {
                state.error = 'Connection Failed! Check you connection.';
            } else if (payload.includes('USER_NOT_FOUND')) {
                state.error = 'Not Invited yet!';
            } else if (payload.includes('already exist')) {
                state.error = 'User already exist!';
            } else {
                state.error = 'Unknown error!';
            }
        },
        setLoadingOff: (state) => {
            state.loading = false;
        }
    }
});

export function useAuthPage() {
    const [state, dispatch] = useReducer(slice.reducer, initialState);
    const { onIdTokenFailed, onIdToken } = useAuthMutation();
    const {  redirectUserOnLogin, redirectUserOnEnter } =
        useRedirectOnEnterOnRole();

    const setUser = useSetUser();
    const { showLoading } = useModalState();
    const { enqueueSnackbar } = useSnackbar();

    const onAuthenticatePassword = async (values: typeof authFormInitialValues) => {
        try {
            // handleModal(true);
            let idToken;
            // if (isLogin) {
            //     idToken = await fbSignInToken(values.email, values.password);
            // } else {
            //     idToken = await fbSignUpToken(values.email, values.password);
            // }handleShowModal

            const user = await onIdToken(idToken);

            if (user) redirectUserOnLogin(user);

            // handleModal(false);
        } catch (err) {
            dispatch(slice.actions.setError(onErrorMessage(err)));
            // handleModal(false);
            onIdTokenFailed();
        } finally {
            // handleModal(false);
        }
    };

    const login: AuthWithPassword = async (email, password) => {
        try {
            dispatch(slice.actions.setLoading());

            const idToken = await fbSignInToken(email, password);

            const user = await onIdToken(idToken);
            if (user) {
                redirectUserOnEnter(user);
            } else {
                dispatch(slice.actions.setError(onErrorMessage('')));
            }
        } catch (err) {
            dispatch(slice.actions.setError(onErrorMessage(err)));

            onIdTokenFailed();
        } finally {
            dispatch(slice.actions.setLoadingOff());
        }
    };


    const onAuthenticate = async (token) => {
        try {
            const user = await onIdToken(token);
            if (user) {
                redirectUserOnLogin(user);
            }
        } catch (err) {
            dispatch(slice.actions.setError(onErrorMessage(err)));
        }
    };

    const [isSignOutLoading, setIsSignOutLoading] = useState(false);
    const signOut = useCallback(async () => {
        setIsSignOutLoading(true);
        try {
            // setLoading(SIGNOUT_KEY);
            await fbSignOut();
            clearCookie(ACCESS_TOKEN_KEY);
            setUser && setUser('NO_USER');
            window.location.href = '/login';
            // redirectUserOnLogin();
        } catch (err) {
            // authSnack('AUTHENTICATION_FAILED', onErrorMessage(err));
            console.error(err);
        } finally {
            // finishLoadingState(SIGNOUT_KEY);
            setIsSignOutLoading(false);
        }
    }, []);


    const getFbRedirectResult = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                await getRedirectResult(getAuth())
                    .then((res) => {
                        resolve(res);
                        console.log('getFbRedirectResult / first resolve', res);
                    })
                    .catch((err) => {
                        enqueueSnackbar('Operation faild! Please try again.', {
                            variant: 'warning'
                        });
                        console.log(err, 'first catch in getFbRedirectResult');
                    });
            } catch (err) {
                enqueueSnackbar('Operation faild! Please try again.', { variant: 'warning' });
                dispatch(slice.actions.setError(onErrorMessage(err)));
                console.log(err, 'useAuth/line:203/getFbRedirectResult');
                reject(err);
            }
        });
    };

    const createError = (err: string | Error) => {
        dispatch(slice.actions.setError(onErrorMessage(err)));
    };

    const changePassword = async (email: string) => {
        dispatch(slice.actions.setLoading());
        try {
            await fbPasswordReset(email);
        } catch (err) {
            dispatch(slice.actions.setError(onErrorMessage(err)));
        } finally {
            dispatch(slice.actions.setLoadingOff());
        }
    };

    return {
        onAuthenticatePassword,
        state,
        login,
        onAuthenticate,
        signOut,
        isSignOutLoading,
        getFbRedirectResult,
        createError,
        changePassword
    };
}

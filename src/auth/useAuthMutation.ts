import { useRouter } from 'next/router';

import { useCallback, useRef } from 'react';

import { useSetUser } from 'src/auth/UserProvider';
import { user_signInFetcher, user_signInType, user_signUpFetcher, user_signUpType } from './gql';
import { fbGetToken, fbSignOut } from './firebase';
import { UserType } from 'src/@types/user.type';

import { getInitialLocale } from '@/i18n/getInitialLocale';

import { ACCESS_TOKEN_KEY } from '@/utils/storage/constant';
import { useMutation } from 'react-query';
import { clearCookie } from '@/utils/storage/cookie';

import { setAuthHeader } from '@/utils/http/graphql.client';
import { useRedirectOnEnterOnRole, useRedirectToPage } from 'src/routes';
import { UserInput } from 'src/graphql/generated';

export function useAuthMutation() {
    const router = useRouter();
    const setUser = useSetUser();
    const { redirectUserOnSignup } = useRedirectOnEnterOnRole();
    const signIn = useMutation<user_signInType['res']>(user_signInFetcher);
    const signUp = useMutation(user_signUpFetcher);
    const { redirect } = useRedirectToPage();
    const onIdTokenFailed = useCallback(() => {
        setUser('NO_USER');
    }, [setUser]);

    const onIdToken = useCallback((idToken: any): Promise<user_signInType['res'] | any> => {
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof idToken === 'string') {
                    setAuthHeader(idToken);
                    const res = await signIn.mutateAsync();

                    if (res.user_signIn.status.value === 'Success') {
                        let user = res.user_signIn.result;

                        if (!user.userType) {
                            redirect('/signin');
                            setAuthHeader('');
                            clearCookie(ACCESS_TOKEN_KEY);
                            return reject();
                        }

                        setUserIfSuccess(user);
                        resolve(user);
                    }
                }
                // console.error('id token !== string', 'err5');
                reject('FAIL');
            } catch (err) {
                // if (err?.user_signIn?.status === 'USER_NOT_FOUND') {
                //     resolve(onSignupToken(idToken));
                // } else
                if (err?.user_signIn?.status === 'USER_HAS_NOT_JOINED') {
                    resolve(onIdToken(idToken));
                } else if (err?.user_signIn?.status?.value === 'Success') {
                    let user = err.user_signIn.result;
                    if (!user.userType) {
                        redirect('/signin');
                        setAuthHeader('');
                        clearCookie(ACCESS_TOKEN_KEY);
                        return reject();
                    }

                    setUserIfSuccess(user);
                    resolve(user);
                } else {
                    reject(err?.user_signIn?.status);
                }
            }
        });
    }, []);

    const onSignupToken = useCallback(async (idToken, userType: UserInput): Promise<UserType> => {
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof idToken === 'string') {
                    setAuthHeader(idToken);

                    const res = await signUp.mutateAsync({
                        input: userType
                    });

                    if (res.user_signUp.status.value === 'Success') {
                        setUserIfSuccess(res.user_signUp.result);
                        resolve(res.user_signUp.result);
                    }
                }
                reject('Failed');
            } catch (err) {
                if (err?.user_signUp?.status?.value === 'Success') {
                    setUserIfSuccess(err.user_signUp.result);
                    resolve(err.user_signUp.result);
                } else {
                    reject(err);
                }
            }
        });
    }, []);

    const setUserIfSuccess = useCallback((user: UserType) => {
        setUser(user);
    }, []);

    const refreshToken = useCallback(async () => {
        try {
            const idToken = await fbGetToken();

            if (typeof idToken === 'string') {
                onIdToken(idToken);
            } else {
                onIdTokenFailed();
            }
        } catch (err) {
            onIdTokenFailed();
            // authSnack("AUTHENTICATION_FAILED", onErrorMessage(err));
            console.error(err);
        } finally {
        }
    }, []);

    const signOut = useCallback(async () => {
        try {
            const lang = getInitialLocale();
            // setLoading(SIGNOUT_KEY);
            await fbSignOut();
            clearCookie(ACCESS_TOKEN_KEY);
            setUser && setUser('NO_USER');
            router.push(`/${lang}/signin/`, undefined, { shallow: true });
        } catch (err) {
            // authSnack('AUTHENTICATION_FAILED', onErrorMessage(err));
            console.error(err);
        } finally {
            // finishLoadingState(SIGNOUT_KEY);
        }
    }, []);

    return {
        onIdToken,
        onSignupToken,
        onIdTokenFailed,
        refreshToken,
        signOut
    };
}

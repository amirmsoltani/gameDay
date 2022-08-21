import React from 'react';
import { useModalState } from '@/components/modals/use-modal';
import { getAuth, getRedirectResult } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fbGetToken } from 'src/auth/firebase';
import { useAuthPage } from './useAuth';

export function useLoginWithGoogle() {
    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);

    const { login, state, onAuthenticate } = useAuthPage();

    const { open, close } = useModalState();

    const LoginGoogleEffect = React.useEffect(() => {
        async function login() {
            open();
            getRedirectResult(getAuth())
                .then((result) => {
                    if (!result) return close();
                    async function login() {
                        let idToken: string = await fbGetToken();
                        // let method = localStorage.getItem('method');

                        // if (method && typeof setSignUpMethod === 'function') {
                        //     setSignUpMethod(method);
                        // }

                        // let res = await onAuthenticate(idToken);

                        // if (method && res === 'NOT_FOUND' && typeof setPage === 'function') {
                        //     setTimeout(() => setPage(1), 300);
                        // }
                        
                    }

                    login();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    close();
                });
        }

        login();

        return () => {
            close();
        };
    }, [pageData.loading]);

    return {
        LoginGoogleEffect,
        state,
        login
    };
}

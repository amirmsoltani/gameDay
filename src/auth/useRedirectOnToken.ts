import { useGetMaybeUser } from './UserProvider';
import { useAuthMutation } from 'src/auth/useAuthMutation';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { isTokenExpired } from 'src/utils/http/token';
import { getCookieStorage } from 'src/utils/storage/cookie';
import { ACCESS_TOKEN_KEY } from 'src/utils/storage/constant';
import { useRedirectOnEnterOnRole } from 'src/routes';

export function useRedirectOnToken() {
    const { onIdToken, refreshToken } = useAuthMutation();

    const router = useRouter();

    const isAuthUrls = useCallback(() => {
        return router.asPath.includes('/auth/');
    }, [router]);
    const onEnter = useCallback(async () => {
        const idToken = getCookieStorage(ACCESS_TOKEN_KEY);
        try {
            if (idToken) {
                if (isTokenExpired(idToken)) {
                    await refreshToken();
                } else {
                    await onIdToken(idToken);
                }
            } else if (!isAuthUrls()) {
                router.push(`/login/`, undefined, { shallow: true });
            }
        } catch (err) {
            console.error('error', err);
        }
    }, []);

    useEffect(() => {
        onEnter();
    }, [onEnter]);
}

export function useUserLoginOrNot() {
    const { onIdToken, refreshToken } = useAuthMutation();
    const onEnter = useCallback(async () => {
        const idToken = getCookieStorage(ACCESS_TOKEN_KEY);
        try {
            if (idToken) {
                if (isTokenExpired(idToken)) {
                    await refreshToken();
                } else {
                    await onIdToken(idToken);
                }
            }
        } catch (err) {
            console.error('error', err);
        }
    }, []);
    useEffect(() => {
        onEnter();
    }, [onEnter]);
}

export function useOnUserStateChanged() {
    const user = useGetMaybeUser();

    const router = useRouter();

    useEffect(() => {

        if (user === 'NO_USER') {
            router.push(`/login/`, undefined, { shallow: true });
        }
    }, [user]);
}


export function useOnUserEnter() {
    const router = useRouter();
    const { redirectUserOnToken } = useRedirectOnEnterOnRole();

    useEffect(() => {
        const idToken = getCookieStorage(ACCESS_TOKEN_KEY);

        if (idToken) {
            if (!isTokenExpired(idToken)) {
                redirectUserOnToken();
            } else {
                router.push(`/login/`, undefined, { shallow: true });
            }
        } else if (router.asPath === '/') {
            router.push(`/`, undefined, { shallow: true });
        }
    }, []);

}

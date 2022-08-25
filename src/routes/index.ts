import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { NO_QUERY_ID } from './route.constant';
import { UserType } from 'src/@types/user.type';

export function useRedirectOnEnterOnRole() {
    const router = useRouter();
    const tailRoute = '/';

    const checkUserType = (passedUser: UserType) =>
        passedUser.userType === 'NORMAL_USER' ? '' : tailRoute;

    const redirectUserOnSignup = useCallback(() => {
        router.push(`/`, undefined, { shallow: true });
    }, [ router]);

    const redirectUserOnEnter = (passedUser?: UserType) => {
        router.push('/' + checkUserType(passedUser));
    };

    const redirectUserOnToken = () => {
        router.push(`/`, undefined, { shallow: true });
    };
    const redirectUserOnLogin = (passedUser?: UserType) => {
        router.push(`/` + checkUserType(passedUser), undefined, { shallow: true });
    };

    return { redirectUserOnEnter, redirectUserOnLogin, redirectUserOnToken, redirectUserOnSignup };
}

export const useGetIdFromUrl = () => {
    const router = useRouter();
    const id = router.query['id'];
    if (id) return +id;
    return NO_QUERY_ID;
};

export function getRootPath(path) {
    return path.match(/\[lang\]\/(.*?)(\/|$)/)?.[1] || 'dashboard';
}

export function useRedirectToPage() {
    const router = useRouter();
    const dir = getRootPath(router.pathname);
    const rootPath = `/${router.query.lang}/${dir}/`;

    function redirectToRootPage() {
        redirect(rootPath);
    }

    function redirectToAddPage() {
        redirect(`${rootPath}add/`);
    }

    function redirectToEditPage(id: number | string) {
        redirect(`${rootPath}edit/${id ? `?id=${id}` : ''}`);
    }

    function redirectToViewPage(id: number | string) {
        redirect(`${rootPath}view/${id ? `?id=${id}` : ''}`);
    }

    function redirect(path: string) {
        router.push(path, undefined, { shallow: true });
    }

    return {
        redirectToRootPage,
        redirectToAddPage,
        redirectToEditPage,
        redirectToViewPage,
        redirect
    };
}

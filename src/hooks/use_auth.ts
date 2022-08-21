import Cookies from 'js-cookie';
import { useContext } from 'react';
import { ElementalContext } from 'src/provider/elemental_provider';
import { User, AuthInput, SocialProvider } from 'src/@types/auth';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithRedirect,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    sendPasswordResetEmail
} from 'firebase/auth';

export default function useAuth() {
    const { state, setState } = useContext(ElementalContext);

    return {
        user: state.user,
        error: state.authError,
        login,
        logout,
        register,
        resetPassword,
        setUser,
        setError
    };

    function setUser(user?: User) {
        if (JSON.stringify(user || {}) === JSON.stringify(state.user || {})) return;

        setState({ ...state, user });
    }

    function setError(error: any) {
        setState({ ...state, authError: error });
    }

    async function login(input: AuthInput) {
        try {
            const { email, password, provider } = input;

            if (isValidSocialProvider(provider)) {
                authWithRedirect(provider);
            } else {
                const auth = getAuth();

                if (auth?.currentUser?.email === email) {
                    throw new Error("You're already logged in");
                }

                const response = await signInWithEmailAndPassword(auth, email, password);

                if (!response?.user?.email) throw new Error('User Not Found');
            }
        } catch (error) {
            setError(error);

            return error.message;
        }
    }

    async function register<T extends AuthInput>(input: T) {
        try {
            const { email, password, provider, ...rest } = input;

            localStorage.setItem('auth_input', JSON.stringify(rest || {}));

            if (isValidSocialProvider(provider)) {
                authWithRedirect(provider);
            } else {
                const auth = getAuth();

                const response = await createUserWithEmailAndPassword(auth, email, password);

                if (!response?.user?.email) throw new Error('Faild to create user');
            }
        } catch (error) {
            setError(error);

            return error.message;
        }
    }

    async function logout() {
        await getAuth().signOut?.();

        setUser();
        Cookies.remove('firebase_token');
    }

    function authWithRedirect(providerName?: SocialProvider) {
        let provider;

        switch (providerName) {
            case 'facebook':
                provider = new FacebookAuthProvider();
                break;
            case 'github':
                provider = new GithubAuthProvider();
                break;
            default:
                provider = new GoogleAuthProvider();
        }

        signInWithRedirect(getAuth(), provider);
    }

    function isValidSocialProvider(provider?: string): provider is SocialProvider {
        return ['facebook', 'google', 'github'].includes(provider);
    }

    async function resetPassword(email: string) {
        try {
            return await sendPasswordResetEmail(getAuth(), email);
        } catch (error) {
            setError(error);

            return error;
        }
    }
}

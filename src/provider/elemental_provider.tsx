import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ElementalContextProps } from 'src/@types/provider';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { User, getAuth } from 'firebase/auth';
import { GraphQLClient } from 'graphql-request';

type APIOptions = {
    baseURL: string;
    apiURL: string;
    subscriptionURL: string;
};

type ElementalProviderProps = {
    children: any;
    firebase?: FirebaseOptions;
    api?: APIOptions;
};

export const ElementalContext = createContext<ElementalContextProps>(undefined);

export const client = new GraphQLClient('');

export async function graphqlFetcher(GQL: string, args?: any) {
    return await client.request(GQL, args);
}

export default function ElementalProvider({ children, firebase, api }: ElementalProviderProps) {
    const [state, setState] = useState({
        user: undefined,
        auth: undefined,
        api
    });

    const strOptions = JSON.stringify(firebase || {});
    const baseURL = api?.apiURL;

    useEffect(() => {
        client.setEndpoint(baseURL);
    }, [baseURL]);

    useEffect(() => {
        if (!strOptions) return;

        const options = JSON.parse(strOptions);
        const app = initializeApp(options);
        const auth = getAuth(app);

        const unsubscribe = auth.onIdTokenChanged(async (user) => {
            try {
                if (!user) return;

                let registeredUser = await getRegisteredUser(user);

                if (registeredUser instanceof Object) {
                    setState((state) => ({
                        ...state,
                        user: registeredUser,
                        authError: undefined
                    }));
                }
            } catch (error) {
                setState((state) => ({ ...state, user: undefined, authError: error }));
            }
        });

        return () => unsubscribe();
    }, [strOptions]);

    return (
        <ElementalContext.Provider value={{ state, setState }}>
            {children}
        </ElementalContext.Provider>
    );
}

async function getRegisteredUser(firebaseUser: User) {
    const token = await firebaseUser.getIdToken();
    const input = localStorage.getItem('auth_input');

    localStorage.removeItem('auth_input');
    // console.log('token changed', token, input ? 'must register' : 'must login');

    storeToken(token);

    if (input) {
        return await backendRegister(JSON.parse(input));
    } else {
        return await backendLogin();
    }
}

export function storeToken(token: string) {
    Cookies.set('firebase_token', token, { sameSite: 'strict' });

    client.setHeaders({
        Authorization: `Bearer ${token}`
    });
}

async function backendLogin() {
    const query = `
    query user_signIn{
        user_signIn {
            result {
                firstName
                lastName
                email
                id
                projects {
                    id
                    name
                    models {
                        id
                        name
                        screens {
                            body
                            metaData
                            id
                            name
                            screenShot
                        }
                    }
                }
            }
            status
        }
    }
    `;

    const response = await graphqlFetcher(query);

    return response.user_signIn.result;
}

async function backendRegister(input = {}) {
    const query = `
  mutation signup($input:UserInput){
  user_signUp(userInput:$input){
    status
  }
}
  }`;

    await graphqlFetcher(query, { input });

    const auth = getAuth();

    return { email: auth.currentUser.email, ...input };
}

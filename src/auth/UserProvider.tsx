import { useOnUserStateChanged, useRedirectOnToken } from 'src/auth/useRedirectOnToken';
import { createContext, useContext, useState } from 'react';
import { UserType } from 'src/@types/user.type';

type MaybeUser = Partial<UserType> | 'NO_USER' | 'LOADING';

export const UserContext = createContext<MaybeUser>('LOADING');

export const SetUserContext = createContext({} as React.Dispatch<React.SetStateAction<MaybeUser>>);

function UserProvider({ children }: any) {
    const [user, setUser] = useState<MaybeUser>('LOADING');
    console.log(user);
    return (
        <SetUserContext.Provider value={setUser}>
            <UserContext.Provider value={user}>
                 {/*<TokenHandler />*/}
                {children}
            </UserContext.Provider>
        </SetUserContext.Provider>
    );
}

function TokenHandler() {
    useRedirectOnToken();
    useOnUserStateChanged();
    return null;
}

export default UserProvider;

export const useSetUser = () => {
    const setUser = useContext(SetUserContext);
    if (setUser === undefined) {
        throw new Error('use set user inside context');
    }
    return setUser;
};

export const useGetUser = () => {
    const user = useContext(UserContext);

    // if (user === undefined) {
    //   throw new Error("");
    // }

    return user as UserType;
};
export const useGetMaybeUser = () => {
    const user = useContext(UserContext);

    return user;
};

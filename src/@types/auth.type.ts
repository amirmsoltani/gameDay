export type FirebaseToken = {
    aud: string;
    auth_time: number;
    email: string;
    email_verified: boolean;
    exp: number;
    firebase: {
        identities: { email?: Array<string> };
        sign_in_provider: 'password' | string;
    };
    iat: number;
    iss: string;
    sub: string;
    user_id: string;
};
type Roles = 'ADMIN' | 'OPERATOR' | 'PROVIDER';
export type AutorizeTypes = Partial<Record<Roles, boolean>>;

import { CommonResponse } from 'src/@types/graphql.type';
import { UserType } from 'src/@types/user.type';
import * as gql from 'gql-query-builder';
import { graphqlFetcher } from '@/utils/http/graphql.fetcher';
import { UserInput } from 'src/graphql/generated';

export const LOG_IN_USER_KEY = 'user_signIn';
export const user_signIn = gql.query(
    [
        {
            operation: LOG_IN_USER_KEY,
            fields: [
                'status',
                {
                    result: ['email', 'fullName', 'id', 'userType', 'address']
                }
            ]
        }
    ],
    null,
    {
        operationName: LOG_IN_USER_KEY
    }
);
export type user_signInType = {
    args: undefined;
    res: CommonResponse<typeof LOG_IN_USER_KEY, UserType>;
};

export const user_signInFetcher = () => {
    return graphqlFetcher<user_signInType>(user_signIn.query);
};

export const SIGN_UP_USER_KEY = 'user_signUp';
export const user_signUp = gql.mutation({
    operation: SIGN_UP_USER_KEY,
    variables: {
        input: {
            type: 'UserInput',
            require: true
        }
        // loginType: {
        //     type: 'LoginType',
        //     required: true
        // },
        // userTypes: {
        //     type: 'UserTypes',
        //     required: true
        // }
    },
    fields: [
        'status',
        {
            variables: undefined,
            operation: 'result',
            fields: [
                'email',
                'fullName',
                'id',
                'language',
                'gender',
                'occupation',
                'address',
                'yearsOfExperience',
                'city',
                'state',
                'phoneNumber',
                'userType',
                'externalId',
                'isDeleted'
            ]
        }
    ]
});

export type user_signUpType = {
    args: {
        input: UserInput;
    };
    res: CommonResponse<typeof SIGN_UP_USER_KEY, UserType>;
};

export const user_signUpFetcher = (args: user_signUpType['args']) => {
    return graphqlFetcher<user_signUpType>(user_signUp.query, args);
};

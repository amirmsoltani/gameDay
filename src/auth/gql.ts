import { CommonResponse } from 'src/@types/graphql.type';
import { UserType } from 'src/@types/user.type';
import * as gql from 'gql-query-builder';
import { graphqlFetcher } from '@/utils/http/graphql.fetcher';

export const LOG_IN_USER_KEY = 'user_signIn';
export const user_signIn = gql.query(
    [
        {
            operation: LOG_IN_USER_KEY,
            fields: [
                'status',
                {
                    result: ['email', 'firstName', 'lastName', 'id', 'userType', 'address']
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


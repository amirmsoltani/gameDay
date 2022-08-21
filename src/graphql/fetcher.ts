import { graphqlFetcher } from '@/utils/http/graphql.fetcher';

export function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
    return async (): Promise<TData> => {
        return await graphqlFetcher(query, variables);
    };
}

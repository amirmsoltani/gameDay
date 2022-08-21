import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink, gql } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import config from 'config';

// const httpLink = new HttpLink({
//     uri: config.apiUrl
// });

// const isWindow = typeof window !== 'undefined';

// let wsLink = null;

// if (isWindow) {
//     wsLink = new WebSocketLink({
//         uri: config.subscriptionUrl,
//         options: {
//             reconnect: true
//             // connectionParams: {
//             //     authToken: user.authToken
//             // }
//         }
//     });
// }

// const splitLink = isWindow
//     ? split(
//           ({ query }) => {
//               const definition = getMainDefinition(query);

//               return (
//                   definition.kind === 'OperationDefinition' &&
//                   definition.operation === 'subscription'
//               );
//           },
//           wsLink,
//           httpLink
//       )
//     : httpLink;

export const apolloClient = new ApolloClient({
    uri: config.apiUrl,
    cache: new InMemoryCache()
});

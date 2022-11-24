import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';

const { VITE_GRAPHQL_API_KEY } = import.meta.env;

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
  fetch,
});

// using auth link to adjust context to include auth header
const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    // adding api key via auth header
    authorization: `Bearer ${VITE_GRAPHQL_API_KEY}`,
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    // removing default __typename inclusion
    addTypename: false,
  }),
});

export default client;

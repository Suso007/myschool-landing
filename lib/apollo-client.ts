// Apollo Client Configuration for School Management System
import { ApolloClient, InMemoryCache, HttpLink, from, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
        });
    }

    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

// Auth link to add JWT token to requests
const authLink = new ApolloLink((operation, forward) => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;

    // Add auth header if token exists
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }));

    return forward(operation);
});

// HTTP link
const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/admin',
});

// Create Apollo Client
export const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(
        //     {
        //     typePolicies: {
        //         Query: {
        //             fields: {
        //                 tenants: {
        //                     merge(existing, incoming) {
        //                         return incoming;
        //                     },
        //                 },
        //                 organizations: {
        //                     merge(existing, incoming) {
        //                         return incoming;
        //                     },
        //                 },
        //                 branches: {
        //                     merge(existing, incoming) {
        //                         return incoming;
        //                     },
        //                 },
        //                 departments: {
        //                     merge(existing, incoming) {
        //                         return incoming;
        //                     },
        //                 },
        //                 categories: {
        //                     merge(existing, incoming) {
        //                         return incoming;
        //                     },
        //                 },
        //                 staffProfiles: {
        //                     merge(existing, incoming) {
        //                         return incoming;
        //                     },
        //                 },
        //                 students: {
        //                     merge(existing, incoming) {
        //                         return incoming;
        //                     },
        //                 },
        //                 academicYears: {
        //                     merge(existing, incoming) {
        //                         return incoming;
        //                     },
        //                 },
        //                 courses: {
        //                     merge(existing, incoming) {
        //                         return incoming;
        //                     },
        //                 },
        //                 subjects: {
        //                     merge(existing, incoming) {
        //                         return incoming;
        //                     },
        //                 },
        //                 classes: {
        //                     merge(existing, incoming) {
        //                         return incoming;
        //                     },
        //                 },
        //             },
        //         },
        //     },
        // }
    ),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
});

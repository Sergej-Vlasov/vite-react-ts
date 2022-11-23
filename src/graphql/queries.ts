import { gql } from '@apollo/client';

export const getRepositories = gql`
  query getRepositories($query: String!) {
    search(type: REPOSITORY, query: $query, first: 100) {
      repositoryCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      nodes {
        __typename
        ... on Repository {
          id
          name
          url
          stargazerCount
          forkCount
          description
        }
      }
    }
  }
`;

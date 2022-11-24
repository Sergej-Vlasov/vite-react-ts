import { gql } from '@apollo/client';

export const getRepositories = gql`
  query getRepositories($query: String!) {
    search(type: REPOSITORY, query: $query, first: 25) {
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
          nameWithOwner
          url
          stargazerCount
          forkCount
          description
        }
      }
    }
  }
`;

export interface IQueryNodes<T> {
  nodes: T[];
}

export interface IPageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
}

export interface IRepository {
  __typename: 'Repository';
  id: string;
  nameWithOwner: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
}

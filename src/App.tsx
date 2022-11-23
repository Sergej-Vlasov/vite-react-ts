import { useQuery } from '@apollo/client';
import { getRepositories } from './graphql';

function App() {
  const { data, error, loading } = useQuery(getRepositories, {
    variables: { query: 'react' },
  });

  if (error) {
    return <div>{JSON.stringify(error, undefined, 2)}</div>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <h1>Hello World</h1>;
}

export default App;

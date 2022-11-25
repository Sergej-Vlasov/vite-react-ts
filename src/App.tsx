import { useLazyQuery } from '@apollo/client';
import { Alert, Box, Container, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash-es';
import { getRepositories } from './graphql';
import { IGetRepositoriesQuery } from './types';
import { GithubReposTable } from './components';

function App() {
  const [searchQuery, setSearchQuery] = useState('react');
  const [inputError, setInputError] = useState(false);

  // using lazy query to have a more fine grained control over when to fetch data
  const [fetchRepos, { data, error, loading }] =
    useLazyQuery<IGetRepositoriesQuery>(getRepositories);

  // put debounce function into ref to perform clean up afterwards
  const debouncedFetch = useRef(
    debounce(
      (query: string) =>
        fetchRepos({
          variables: { query },
        }),
      300
    )
  ).current;

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchQuery(e.target.value);

      // validation of value
      if (e.target.value.length < 3) {
        setInputError(true);
        /* 
        cancel debounce when validation no longer passes
          useful when deleting with backspace to avoid sending 
          request with the last valid value (e.g. "rea")
        */
        debouncedFetch.cancel();
        return;
      }

      // reset input error when validation passes
      if (inputError) setInputError(false);

      // fetch the new data with debounce function
      debouncedFetch(e.target.value);
    },
    [debouncedFetch, inputError]
  );

  useEffect(() => {
    // initial data fetch on component mount
    if (searchQuery.length >= 3) {
      fetchRepos({
        variables: { query: searchQuery },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      // clean up debounce if component unmounts before it finishes
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  return (
    <Container fixed sx={{ marginInline: 'auto' }}>
      <Typography sx={{ marginBottom: '1rem' }} component="h1" variant="h4">
        Search Github Repositories
      </Typography>
      <Box
        sx={{
          marginBottom: '1rem',
          maxWidth: '20rem',
          marginInline: 'auto',
        }}
      >
        <TextField
          sx={{
            width: '100%',
          }}
          size="small"
          label="Enter value to search"
          value={searchQuery}
          error={inputError}
          helperText={inputError ? 'Enter at least 3 characters' : ''}
          onChange={loading ? undefined : handleInputChange}
        />
      </Box>
      {error ? (
        <Alert sx={{ maxWidth: '30rem', marginInline: 'auto' }} severity="error">
          Something went wrong
        </Alert>
      ) : (
        <GithubReposTable loading={loading} data={data} />
      )}
    </Container>
  );
}

export default App;

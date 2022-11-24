import { useLazyQuery } from '@apollo/client';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash-es';
import { getRepositories } from './graphql';
import { IPageInfo, IQueryNodes, IRepository } from './types';
import { CodeForkSvg, StargazerSvg } from './assets';

interface ISearchResult extends IQueryNodes<IRepository> {
  pageInfo: IPageInfo;
}
interface IGetRepositoriesQuery {
  search: ISearchResult;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('react');
  const [inputError, setInputError] = useState(false);

  const [fetchRepos, { data, error, loading }] =
    useLazyQuery<IGetRepositoriesQuery>(getRepositories);

  // put debounce function into ref to perform clean up afterwards
  const debouncedFetch = useRef(
    debounce(
      (query) =>
        fetchRepos({
          variables: { query },
        }),
      300
    )
  ).current;

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchQuery(e.target.value);
      if (e.target.value.length < 3) {
        setInputError(true);
        debouncedFetch.cancel();
        return;
      }

      if (inputError) setInputError(false);

      debouncedFetch(e.target.value);
    },
    [debouncedFetch, inputError]
  );

  useEffect(() => {
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
          onChange={handleInputChange}
        />
      </Box>
      {error ? (
        <Alert sx={{ maxWidth: '30rem', marginInline: 'auto' }} severity="error">
          Something went wrong
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Repository Name</TableCell>
                <TableCell align="right">
                  <StargazerSvg />{' '}
                  <Typography sx={{ display: 'inline' }}>Stars</Typography>
                </TableCell>
                <TableCell align="right">
                  <CodeForkSvg />{' '}
                  <Typography sx={{ display: 'inline' }}>Forks</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.search.nodes.length
                ? data.search.nodes.map(
                    ({ id, nameWithOwner, url, stargazerCount, forkCount }) => (
                      <TableRow
                        key={id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography
                            component="a"
                            href={url}
                            rel="noopener noreferrer"
                            target="_blank"
                            sx={{
                              textDecoration: 'none',
                              color: 'text.primary',
                              '&:hover': { textDecoration: 'underline' },
                            }}
                          >
                            {nameWithOwner}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <StargazerSvg />{' '}
                          <Typography sx={{ display: 'inline' }}>
                            {stargazerCount}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <CodeForkSvg />{' '}
                          <Typography sx={{ display: 'inline' }}>{forkCount}</Typography>
                        </TableCell>
                      </TableRow>
                    )
                  )
                : null}
            </TableBody>
          </Table>
          {loading ? (
            <Box
              sx={{ display: 'flex', justifyContent: 'center', paddingBlock: '0.5rem' }}
            >
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginRight: '0.5rem' }}
              >
                Fetching data...
              </Typography>
              <CircularProgress size="1.5rem" />
            </Box>
          ) : null}
          {!loading && !data?.search.nodes.length ? (
            <Box
              sx={{ display: 'flex', justifyContent: 'center', paddingBlock: '0.5rem' }}
            >
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginRight: '0.5rem' }}
              >
                Table is empty
              </Typography>
            </Box>
          ) : null}
        </TableContainer>
      )}
    </Container>
  );
}

export default App;

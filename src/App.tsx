import { useLazyQuery } from '@apollo/client';
import {
  Box,
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
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  let htmlToRender = <div>Hello World</div>;

  if (loading) {
    htmlToRender = <div>Loading...</div>;
  }

  if (error) {
    htmlToRender = <div>{JSON.stringify(error, undefined, 2)}</div>;
  }
  if (data) {
    htmlToRender = (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Repository Name</TableCell>
              <TableCell align="right">Stars</TableCell>
              <TableCell align="right">Forks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.search.nodes.map(
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
                    >
                      {nameWithOwner}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{stargazerCount}</TableCell>
                  <TableCell align="right">{forkCount}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Container sx={{ minWidth: '32rem', maxWidth: '50rem', marginInline: 'auto' }}>
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

      {htmlToRender}
    </Container>
  );
}

export default App;

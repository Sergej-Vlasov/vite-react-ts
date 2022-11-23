import { useQuery } from '@apollo/client';
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
import { useState } from 'react';
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
  const { data, error, loading } = useQuery<IGetRepositoriesQuery>(getRepositories, {
    variables: { query: searchQuery },
  });

  let htmlToRender = <h1>Hello World</h1>;

  if (loading) {
    htmlToRender = <h1>Loading...</h1>;
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
          label="Search repos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {htmlToRender}
    </Container>
  );
}

export default App;

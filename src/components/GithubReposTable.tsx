import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
} from '@mui/material';
import { memo } from 'react';
import { StargazerSvg, CodeForkSvg } from '../assets';
import { IGetRepositoriesQuery } from '../types';
import EmptyPlaceholder from './EmptyPlaceholder';
import LoadingPlaceholder from './LoadingPlaceholder';

interface IStaticTableProps {
  loading: boolean;
  data: IGetRepositoriesQuery | undefined;
}

const GithubReposTable = memo(function GithubReposTable({
  loading,
  data,
}: IStaticTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Repository Name</Typography>
            </TableCell>
            <TableCell align="right">
              <StargazerSvg /> <Typography sx={{ display: 'inline' }}>Stars</Typography>
            </TableCell>
            <TableCell align="right">
              <CodeForkSvg /> <Typography sx={{ display: 'inline' }}>Forks</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* render data only when its not empty */}
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
                      <Typography sx={{ display: 'inline' }}>{stargazerCount}</Typography>
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
      {/* loading placeholder */}
      {loading ? <LoadingPlaceholder /> : null}
      {/* if search result is empty inform the user with a message */}
      {!loading && !data?.search.nodes.length ? <EmptyPlaceholder /> : null}
    </TableContainer>
  );
});

export default GithubReposTable;

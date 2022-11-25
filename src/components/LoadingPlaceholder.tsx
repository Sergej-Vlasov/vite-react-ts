import { Box, Typography, CircularProgress } from '@mui/material';

interface ILoadingPlaceholderProps {
  text?: string;
}

function LoadingPlaceholder({ text = 'Fetching data...' }: ILoadingPlaceholderProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', paddingBlock: '0.5rem' }}>
      <Typography variant="body2" color="textSecondary" sx={{ marginRight: '0.5rem' }}>
        {text}
      </Typography>
      <CircularProgress size="1.5rem" />
    </Box>
  );
}

export default LoadingPlaceholder;

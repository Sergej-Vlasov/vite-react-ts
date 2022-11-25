import { Box, Typography } from '@mui/material';

interface IEmptyPlaceholderProps {
  text?: string;
}

function EmptyPlaceholder({ text = ' Table is empty' }: IEmptyPlaceholderProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', paddingBlock: '0.5rem' }}>
      <Typography variant="body2" color="textSecondary" sx={{ marginRight: '0.5rem' }}>
        {text}
      </Typography>
    </Box>
  );
}

export default EmptyPlaceholder;

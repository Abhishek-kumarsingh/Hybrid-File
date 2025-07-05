import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

const Loader = ({ 
  size = 40, 
  thickness = 3.6, 
  message = 'Loading...', 
  fullScreen = false,
  color = 'primary'
}) => {
  const theme = useTheme();

  const loaderContent = (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        gap: 2
      }}
    >
      <CircularProgress 
        size={size} 
        thickness={thickness} 
        color={color} 
      />
      {message && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          align="center"
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Box 
        sx={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          zIndex: theme.zIndex.modal + 1
        }}
      >
        {loaderContent}
      </Box>
    );
  }

  return loaderContent;
};

export default Loader;

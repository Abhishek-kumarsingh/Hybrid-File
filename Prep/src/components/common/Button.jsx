import React from 'react';
import { Button as MuiButton, CircularProgress, useTheme } from '@mui/material';

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  sx = {},
  ...props
}) => {
  const theme = useTheme();

  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      startIcon={loading ? null : startIcon}
      endIcon={loading ? null : endIcon}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      sx={{
        borderRadius: 1.5,
        textTransform: 'none',
        fontWeight: 600,
        boxShadow: variant === 'contained' ? 2 : 'none',
        position: 'relative',
        ...sx
      }}
      {...props}
    >
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            left: '50%',
            marginLeft: '-12px'
          }}
        />
      )}
      <span style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {children}
      </span>
    </MuiButton>
  );
};

export default Button;


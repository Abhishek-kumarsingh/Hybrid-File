import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Button from './Button';

const Modal = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullScreen = false,
  fullWidth = true,
  disableBackdropClick = false,
  hideCloseButton = false,
  contentSx = {}
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // If fullScreen is not explicitly set, use fullScreen on mobile devices
  const useFullScreen = fullScreen || isMobile;

  const handleBackdropClick = (event) => {
    if (disableBackdropClick) {
      event.stopPropagation();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={useFullScreen}
      onClick={handleBackdropClick}
      PaperProps={{
        elevation: 5,
        sx: {
          borderRadius: useFullScreen ? 0 : 2,
          overflow: 'hidden'
        }
      }}
    >
      {/* Dialog Title */}
      <DialogTitle
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography variant="h6" component="div" fontWeight="bold">
          {title}
        </Typography>
        {!hideCloseButton && (
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent sx={{ p: 3, ...contentSx }}>
        {children}
      </DialogContent>

      {/* Dialog Actions */}
      {actions && (
        <DialogActions
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            justifyContent: 'flex-end',
            gap: 1
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
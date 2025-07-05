import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../common/Navbar';
import Sidebar from './Sidebar';
import { ColorModeContext } from '../../context/ThemeContext';

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mode } = useContext(ColorModeContext);
  
  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary',
      transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.standard,
      }),
    }}>
      {!isMobile && <Sidebar />}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
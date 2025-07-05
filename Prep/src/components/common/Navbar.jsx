import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  TrendingUp as ProgressIcon,
  Add as AddIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { ColorModeContext } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Interview History', icon: <HistoryIcon />, path: '/history' },
    { text: 'Progress', icon: <ProgressIcon />, path: '/progress' },
    { text: 'New Interview', icon: <AddIcon />, path: '/interview/setup' },
  ];
  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
        InterviewPro
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => navigate(item.path)}
              sx={{ textAlign: 'left' }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: 'background.paper', 
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {isMobile && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              InterviewPro
            </Typography>
          )}
          
          <Box sx={{ flexGrow: 1 }} />
          
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          
          <IconButton color="inherit">
            <Badge badgeContent={3} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton
            edge="end"
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{ ml: 1 }}
          >
            <Avatar 
              alt={user?.name || 'User'} 
              src={user?.avatar} 
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { width: 280 },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
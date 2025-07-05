import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Avatar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  TrendingUp as ProgressIcon,
  Add as AddIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { ColorModeContext } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 260;

const Sidebar = () => {
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Interview History', icon: <HistoryIcon />, path: '/history' },
    { text: 'Progress', icon: <ProgressIcon />, path: '/progress' },
    { text: 'New Interview', icon: <AddIcon />, path: '/interview/setup' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          InterviewPro
        </Typography>
        <IconButton onClick={toggleColorMode} color="inherit">
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
      
      <Divider />
      
      {user && (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar alt={user.name} src={user.avatar} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      )}
      
      <Divider />
      
      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      
      <List>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/profile')}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
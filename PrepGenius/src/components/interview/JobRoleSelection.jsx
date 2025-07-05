import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Chip,
  InputAdornment,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  Code as DeveloperIcon,
  DataObject as DataIcon,
  DesignServices as DesignerIcon,
  Business as ManagerIcon,
  Psychology as ProductIcon,
  Storage as DevOpsIcon
} from '@mui/icons-material';

const popularRoles = [
  { id: 'frontend', title: 'Frontend Developer', icon: <DeveloperIcon /> },
  { id: 'backend', title: 'Backend Developer', icon: <DeveloperIcon /> },
  { id: 'fullstack', title: 'Full Stack Developer', icon: <DeveloperIcon /> },
  { id: 'data-scientist', title: 'Data Scientist', icon: <DataIcon /> },
  { id: 'ui-ux', title: 'UI/UX Designer', icon: <DesignerIcon /> },
  { id: 'product-manager', title: 'Product Manager', icon: <ProductIcon /> },
  { id: 'project-manager', title: 'Project Manager', icon: <ManagerIcon /> },
  { id: 'devops', title: 'DevOps Engineer', icon: <DevOpsIcon /> }
];

const JobRoleSelection = ({ selectedRole, onSelectRole }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [customRole, setCustomRole] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCustomRoleChange = (event) => {
    setCustomRole(event.target.value);
  };

  const handleCustomRoleSelect = () => {
    if (customRole.trim()) {
      onSelectRole(customRole.trim());
    }
  };

  const filteredRoles = popularRoles.filter(role => 
    role.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight="medium">
        Select Job Role
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Choose the position you're preparing for to get tailored interview questions.
      </Typography>

      <TextField
        fullWidth
        placeholder="Search for a role..."
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>
        Popular Roles
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {filteredRoles.map((role) => (
          <Grid item xs={12} sm={6} md={3} key={role.id}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: '1px solid',
                borderColor: selectedRole === role.title ? 'primary.main' : 'divider',
                bgcolor: selectedRole === role.title ? 'primary.lighter' : 'background.paper',
                cursor: 'pointer',
                transition: 'all 0.2s',
                height: '100%',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
                }
              }}
              onClick={() => onSelectRole(role.title)}
            >
              <CardContent sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                textAlign: 'center',
                p: 2
              }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: 'background.default',
                    color: 'primary.main',
                    mb: 1.5
                  }}
                >
                  {role.icon}
                </Box>
                <Typography variant="subtitle1" fontWeight="medium">
                  {role.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="subtitle2" gutterBottom>
        Custom Role
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Enter a specific job title..."
          variant="outlined"
          value={customRole}
          onChange={handleCustomRoleChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleCustomRoleSelect();
            }
          }}
        />
        <Chip
          label="Add"
          color="primary"
          onClick={handleCustomRoleSelect}
          disabled={!customRole.trim()}
          sx={{ height: 40 }}
        />
      </Box>

      {selectedRole && (
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={{ mr: 1 }}>
            Selected Role:
          </Typography>
          <Chip
            label={selectedRole}
            color="primary"
            onDelete={() => onSelectRole('')}
            sx={{ fontWeight: 'medium' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default JobRoleSelection;




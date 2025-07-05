import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Link,
  useTheme,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import {
  Lightbulb as TipIcon,
  School as CourseIcon,
  MenuBook as BookIcon,
  Link as LinkIcon,
  Assignment as PracticeIcon
} from '@mui/icons-material';

const ImprovementSuggestions = ({ suggestions }) => {
  const theme = useTheme();

  const getResourceIcon = (resource) => {
    if (resource.includes('Course')) return <CourseIcon fontSize="small" />;
    if (resource.includes('Book')) return <BookIcon fontSize="small" />;
    if (resource.includes('http')) return <LinkIcon fontSize="small" />;
    return <PracticeIcon fontSize="small" />;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight="medium">
        Improvement Plan
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Personalized recommendations to help you improve your skills and performance in future interviews.
      </Typography>

      <Grid container spacing={3}>
        {suggestions.map((suggestion, index) => (
          <Grid item xs={12} key={index}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <TipIcon 
                  sx={{ 
                    color: 'primary.main',
                    bgcolor: 'primary.lighter',
                    p: 1,
                    borderRadius: '50%',
                    fontSize: 40
                  }} 
                />
                
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" fontWeight="medium">
                      {suggestion.area}
                    </Typography>
                    <Chip 
                      label="Priority" 
                      size="small" 
                      color="primary" 
                      sx={{ fontWeight: 'medium' }}
                    />
                  </Box>
                  
                  <Typography variant="body1" paragraph>
                    {suggestion.suggestion}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Recommended Resources:
                  </Typography>
                  
                  <List dense>
                    {suggestion.resources.map((resource, i) => (
                      <ListItem key={i} disableGutters>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {getResourceIcon(resource)}
                        </ListItemIcon>
                        <ListItemText 
                          primary={
                            resource.startsWith('http') ? (
                              <Link 
                                href={resource} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                underline="hover"
                                color="primary"
                              >
                                {resource.replace(/^https?:\/\//, '').split('/')[0]}
                              </Link>
                            ) : resource
                          } 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Practice Plan */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mt: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight="medium">
          30-Day Improvement Plan
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card 
              elevation={0}
              sx={{ 
                bgcolor: 'background.default',
                height: '100%',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: -15,
                  left: 'calc(50% - 15px)',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}
              >
                1
              </Box>
              <CardContent sx={{ pt: 3 }}>
                <Typography variant="h6" component="div" align="center" gutterBottom>
                  Week 1-2
                </Typography>
                <Typography variant="body2" paragraph align="center">
                  Focus on learning fundamentals
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Complete online course on weakest skill" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Read documentation and tutorials" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Build small practice projects" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card 
              elevation={0}
              sx={{ 
                bgcolor: 'background.default',
                height: '100%',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: -15,
                  left: 'calc(50% - 15px)',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}
              >
                2
              </Box>
              <CardContent sx={{ pt: 3 }}>
                <Typography variant="h6" component="div" align="center" gutterBottom>
                  Week 3-4
                </Typography>
                <Typography variant="body2" paragraph align="center">
                  Practice and application
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Solve related coding challenges" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Participate in mock interviews" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Join community discussions" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card 
              elevation={0}
              sx={{ 
                bgcolor: 'background.default',
                height: '100%',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: -15,
                  left: 'calc(50% - 15px)',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}
              >
                3
              </Box>
              <CardContent sx={{ pt: 3 }}>
                <Typography variant="h6" component="div" align="center" gutterBottom>
                  After 30 Days
                </Typography>
                <Typography variant="body2" paragraph align="center">
                  Evaluate progress
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Take another practice interview" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Compare results with baseline" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Adjust learning plan as needed" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ImprovementSuggestions;
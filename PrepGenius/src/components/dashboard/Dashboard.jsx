import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  CardActions,
  Divider,
  useTheme,
  LinearProgress,
  Avatar
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Mock data
  const stats = [
    { 
      title: 'Total Interviews', 
      value: 12, 
      icon: <AssignmentIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    { 
      title: 'Hours Practiced', 
      value: 8, 
      icon: <TimeIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
    },
    { 
      title: 'Skill Growth', 
      value: '24%', 
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#4caf50' }} />
    },
    { 
      title: 'Achievements', 
      value: 5, 
      icon: <TrophyIcon sx={{ fontSize: 40, color: '#ff9800' }} />
    }
  ];
  
  const recentInterviews = [
    {
      id: 1,
      title: 'Frontend Developer Interview',
      date: '2023-06-15',
      score: 85,
      company: 'Tech Solutions Inc.'
    },
    {
      id: 2,
      title: 'React Developer Interview',
      date: '2023-06-10',
      score: 78,
      company: 'Digital Innovations'
    },
    {
      id: 3,
      title: 'Full Stack Developer Interview',
      date: '2023-06-05',
      score: 92,
      company: 'WebTech Systems'
    }
  ];
  
  const skillProgress = [
    { name: 'React.js', progress: 85 },
    { name: 'JavaScript', progress: 90 },
    { name: 'CSS/SCSS', progress: 75 },
    { name: 'Node.js', progress: 65 },
    { name: 'System Design', progress: 70 }
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's an overview of your interview preparation progress.
        </Typography>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4]
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Box>
                {stat.icon}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {/* Recent Interviews */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Recent Interviews
              </Typography>
              <Button 
                variant="text" 
                color="primary" 
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/history')}
              >
                View All
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            {recentInterviews.map((interview) => (
              <Box key={interview.id} sx={{ mb: 2 }}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <CardContent sx={{ p: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {interview.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {interview.company} • {interview.date}
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        bgcolor: interview.score >= 80 ? '#4caf50' : interview.score >= 70 ? '#ff9800' : '#f44336',
                        color: 'white',
                        borderRadius: '50%',
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}>
                        {interview.score}
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 1 }}>
                    <Button 
                      size="small" 
                      onClick={() => navigate(`/feedback/${interview.id}`)}
                    >
                      View Feedback
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Paper>
        </Grid>
        
        {/* Skills Progress */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Skills Progress
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {skillProgress.map((skill) => (
              <Box key={skill.name} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">{skill.name}</Typography>
                  <Typography variant="body2" fontWeight="medium">{skill.progress}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={skill.progress} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      bgcolor: skill.progress >= 80 ? '#4caf50' : skill.progress >= 60 ? '#ff9800' : '#f44336',
                    }
                  }}
                />
              </Box>
            ))}
            
            <Box sx={{ mt: 3 }}>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => navigate('/progress')}
              >
                View Detailed Progress
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Quick Actions */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
              size="large"
              onClick={() => navigate('/interview/setup')}
              sx={{ py: 2 }}
            >
              Start New Interview
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth
              size="large"
              onClick={() => navigate('/history')}
              sx={{ py: 2 }}
            >
              View Past Interviews
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;

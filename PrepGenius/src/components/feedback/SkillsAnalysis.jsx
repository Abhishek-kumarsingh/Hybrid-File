import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  LinearProgress,
  Divider,
  useTheme,
  Card,
  CardContent
} from '@mui/material';
import {
  Code as TechnicalIcon,
  Psychology as SoftSkillIcon
} from '@mui/icons-material';

const SkillsAnalysis = ({ skillsData }) => {
  const theme = useTheme();

  const getScoreColor = (score) => {
    if (score >= 80) return 'success.main';
    if (score >= 70) return 'warning.main';
    return 'error.main';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Expert';
    if (score >= 80) return 'Advanced';
    if (score >= 70) return 'Intermediate';
    if (score >= 60) return 'Basic';
    return 'Novice';
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight="medium">
        Skills Assessment
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Detailed analysis of your technical and soft skills based on your interview performance.
      </Typography>

      <Grid container spacing={3}>
        {/* Technical Skills */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              height: '100%'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TechnicalIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="medium">
                Technical Skills
              </Typography>
            </Box>
            
            {skillsData.technical.map((skill, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body1" fontWeight="medium">
                    {skill.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography 
                      variant="body2" 
                      fontWeight="medium" 
                      sx={{
                        color: getScoreColor(skill.score),
                        mr: 1
                      }}
                    >
                      {skill.score}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({getScoreLabel(skill.score)})
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={skill.score}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'background.default',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getScoreColor(skill.score),
                    }
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>
        
        {/* Soft Skills */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              height: '100%'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SoftSkillIcon color="secondary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="medium">
                Soft Skills
              </Typography>
            </Box>
            
            {skillsData.soft.map((skill, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body1" fontWeight="medium">
                    {skill.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography 
                      variant="body2" 
                      fontWeight="medium" 
                      sx={{
                        color: getScoreColor(skill.score),
                        mr: 1
                      }}
                    >
                      {skill.score}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({getScoreLabel(skill.score)})
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={skill.score}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'background.default',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getScoreColor(skill.score),
                    }
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Skills Comparison */}
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
          Skills Comparison
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          How your skills compare to industry standards for this role.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card 
              elevation={0}
              sx={{ 
                bgcolor: 'background.default',
                height: '100%'
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" align="center" gutterBottom>
                  {Math.round(
                    skillsData.technical.reduce((acc, skill) => acc + skill.score, 0) / 
                    skillsData.technical.length
                  )}%
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Your Technical Skills Average
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" align="center">
                  {
                    Math.round(
                      skillsData.technical.reduce((acc, skill) => acc + skill.score, 0) / 
                      skillsData.technical.length
                    ) >= 75 
                      ? 'Strong technical foundation' 
                      : 'Focus on improving technical skills'
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card 
              elevation={0}
              sx={{ 
                bgcolor: 'background.default',
                height: '100%'
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" align="center" gutterBottom>
                  {Math.round(
                    skillsData.soft.reduce((acc, skill) => acc + skill.score, 0) / 
                    skillsData.soft.length
                  )}%
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Your Soft Skills Average
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" align="center">
                  {
                    Math.round(
                      skillsData.soft.reduce((acc, skill) => acc + skill.score, 0) / 
                      skillsData.soft.length
                    ) >= 75 
                      ? 'Excellent communication skills' 
                      : 'Work on improving soft skills'
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card 
              elevation={0}
              sx={{ 
                bgcolor: 'background.default',
                height: '100%'
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" align="center" gutterBottom>
                  80%
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Industry Average
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" align="center">
                  {
                    (Math.round(
                      skillsData.technical.reduce((acc, skill) => acc + skill.score, 0) / 
                      skillsData.technical.length
                    ) +
                    Math.round(
                      skillsData.soft.reduce((acc, skill) => acc + skill.score, 0) / 
                      skillsData.soft.length
                    )) / 2 >= 80
                      ? 'Above industry average' 
                      : 'Below industry average'
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Recommendations */}
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
          Skill Development Recommendations
        </Typography>
        
        <Grid container spacing={3}>
          {/* Find weakest technical skill */}
          {(() => {
            const weakestTech = [...skillsData.technical].sort((a, b) => a.score - b.score)[0];
            return (
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                    Focus on {weakestTech.name}
                  </Typography>
                  <Typography variant="body2">
                    This is your lowest-scoring technical skill. Consider taking online courses or tutorials to strengthen your knowledge in this area.
                  </Typography>
                </Box>
              </Grid>
            );
          })()}
          
          {/* Find weakest soft skill */}
          {(() => {
            const weakestSoft = [...skillsData.soft].sort((a, b) => a.score - b.score)[0];
            return (
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                    Improve {weakestSoft.name}
                  </Typography>
                  <Typography variant="body2">
                    This is your lowest-scoring soft skill. Practice through mock interviews and seek feedback from peers to enhance this area.
                  </Typography>
                </Box>
              </Grid>
            );
          })()}
        </Grid>
      </Paper>
    </Box>
  );
};

export default SkillsAnalysis;

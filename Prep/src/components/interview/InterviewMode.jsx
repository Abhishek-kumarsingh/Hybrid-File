import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Radio,
  useTheme
} from '@mui/material';
import {
  Chat as TextIcon,
  Mic as VoiceIcon,
  VideoCameraFront as VideoIcon
} from '@mui/icons-material';

const interviewModes = [
  {
    id: 'text',
    title: 'Text Interview',
    icon: <TextIcon fontSize="large" />,
    description: 'Type your answers to interview questions',
    benefits: [
      'Take your time to think and respond',
      'Edit your answers before submitting',
      'No microphone required',
      'Quiet environment not necessary'
    ],
    available: true
  },
  {
    id: 'voice',
    title: 'Voice Interview',
    icon: <VoiceIcon fontSize="large" />,
    description: 'Speak your answers using your microphone',
    benefits: [
      'Practice verbal communication skills',
      'Improve speaking clarity and confidence',
      'More realistic interview experience',
      'Develop thinking on your feet'
    ],
    available: true
  },
  {
    id: 'video',
    title: 'Video Interview',
    icon: <VideoIcon fontSize="large" />,
    description: 'Full video interview with camera and microphone',
    benefits: [
      'Practice non-verbal communication',
      'Most realistic interview simulation',
      'Improve body language and eye contact',
      'Complete interview preparation'
    ],
    available: false,
    comingSoon: true
  }
];

const InterviewMode = ({ selectedMode, onSelectMode }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight="medium">
        Select Interview Mode
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Choose how you want to conduct your practice interview.
      </Typography>

      <Grid container spacing={3}>
        {interviewModes.map((mode) => (
          <Grid item xs={12} md={4} key={mode.id}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: '1px solid',
                borderColor: selectedMode === mode.id ? 'primary.main' : 'divider',
                bgcolor: selectedMode === mode.id ? 'primary.lighter' : 'background.paper',
                cursor: mode.available ? 'pointer' : 'default',
                transition: 'all 0.2s',
                height: '100%',
                opacity: mode.available ? 1 : 0.7,
                position: 'relative',
                '&:hover': mode.available ? {
                  borderColor: 'primary.main',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
                } : {}
              }}
              onClick={() => mode.available && onSelectMode(mode.id)}
            >
              {mode.comingSoon && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    bgcolor: 'info.main',
                    color: 'info.contrastText',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    py: 0.5,
                    px: 1,
                    borderRadius: 1,
                    zIndex: 1
                  }}
                >
                  Coming Soon
                </Box>
              )}
              
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Radio
                    checked={selectedMode === mode.id}
                    onChange={() => mode.available && onSelectMode(mode.id)}
                    disabled={!mode.available}
                    size="small"
                    sx={{ p: 0.5, mr: 1 }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'background.default',
                      color: 'primary.main',
                      mr: 1.5
                    }}
                  >
                    {mode.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="medium">
                    {mode.title}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" paragraph sx={{ ml: 7 }}>
                  {mode.description}
                </Typography>
                
                <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Benefits:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {mode.benefits.map((benefit, index) => (
                      <Typography component="li" variant="body2" key={index} sx={{ mb: 0.5 }}>
                        {benefit}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InterviewMode;



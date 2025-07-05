import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Slider,
  Radio,
  useTheme
} from '@mui/material';
import {
  SentimentSatisfied as EasyIcon,
  SentimentNeutral as MediumIcon,
  SentimentVeryDissatisfied as HardIcon
} from '@mui/icons-material';

const difficultyLevels = [
  {
    id: 'easy',
    title: 'Easy',
    icon: <EasyIcon fontSize="large" />,
    description: 'Basic questions for beginners or junior positions',
    details: [
      'Fundamental concepts',
      'Simple problem-solving',
      'Entry-level knowledge'
    ]
  },
  {
    id: 'medium',
    title: 'Medium',
    icon: <MediumIcon fontSize="large" />,
    description: 'Intermediate questions for mid-level positions',
    details: [
      'Practical applications',
      'Moderate complexity',
      'Industry standard practices'
    ]
  },
  {
    id: 'hard',
    title: 'Hard',
    icon: <HardIcon fontSize="large" />,
    description: 'Advanced questions for senior positions',
    details: [
      'Complex problem-solving',
      'Architecture decisions',
      'Deep technical knowledge'
    ]
  }
];

const DifficultySelection = ({ selectedDifficulty, onSelectDifficulty }) => {
  const theme = useTheme();

  const handleSliderChange = (event, newValue) => {
    const levels = ['easy', 'medium', 'hard'];
    onSelectDifficulty(levels[newValue - 1]);
  };

  const getDifficultyValue = () => {
    switch (selectedDifficulty) {
      case 'easy': return 1;
      case 'medium': return 2;
      case 'hard': return 3;
      default: return 2;
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight="medium">
        Select Difficulty Level
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Choose how challenging you want the interview questions to be.
      </Typography>

      <Box sx={{ px: 2, mb: 4 }}>
        <Slider
          value={getDifficultyValue()}
          onChange={handleSliderChange}
          step={1}
          marks={[
            { value: 1, label: 'Easy' },
            { value: 2, label: 'Medium' },
            { value: 3, label: 'Hard' }
          ]}
          min={1}
          max={3}
          sx={{
            '& .MuiSlider-markLabel': {
              fontSize: '0.875rem',
              fontWeight: 'medium'
            }
          }}
        />
      </Box>

      <Grid container spacing={2}>
        {difficultyLevels.map((level) => (
          <Grid item xs={12} md={4} key={level.id}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: '1px solid',
                borderColor: selectedDifficulty === level.id ? 'primary.main' : 'divider',
                bgcolor: selectedDifficulty === level.id ? 'primary.lighter' : 'background.paper',
                cursor: 'pointer',
                transition: 'all 0.2s',
                height: '100%',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
                }
              }}
              onClick={() => onSelectDifficulty(level.id)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Radio
                    checked={selectedDifficulty === level.id}
                    onChange={() => onSelectDifficulty(level.id)}
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
                      color: level.id === 'easy' ? 'success.main' : 
                             level.id === 'medium' ? 'warning.main' : 'error.main',
                      mr: 1.5
                    }}
                  >
                    {level.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="medium">
                    {level.title}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" paragraph sx={{ ml: 7 }}>
                  {level.description}
                </Typography>
                
                <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    What to expect:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {level.details.map((detail, index) => (
                      <Typography component="li" variant="body2" key={index} sx={{ mb: 0.5 }}>
                        {detail}
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

export default DifficultySelection;




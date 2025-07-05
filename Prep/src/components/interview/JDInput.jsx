import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Chip,
  IconButton,
  InputAdornment,
  useTheme
} from '@mui/material';
import {
  ContentPaste as PasteIcon,
  Clear as ClearIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import Button from '../common/Button';

const JDInput = ({ jobDescription, onJobDescriptionChange }) => {
  const theme = useTheme();
  const [showTips, setShowTips] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onJobDescriptionChange(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const handleClear = () => {
    onJobDescriptionChange('');
  };

  const tips = [
    'Include the job title and level',
    'Add required technical skills',
    'Include soft skills and qualifications',
    'Mention specific responsibilities',
    'Add company information for context'
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6" fontWeight="medium">
          Job Description
        </Typography>
        <Chip
          icon={<InfoIcon />}
          label="Tips"
          variant="outlined"
          onClick={() => setShowTips(!showTips)}
          color={showTips ? 'primary' : 'default'}
          sx={{ cursor: 'pointer' }}
        />
      </Box>
      
      <Typography variant="body2" color="text.secondary" paragraph>
        Paste the job description to help us generate more targeted interview questions.
      </Typography>

      {showTips && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 2,
            bgcolor: 'primary.lighter',
            border: '1px solid',
            borderColor: 'primary.light'
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Tips for better results:
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {tips.map((tip, index) => (
              <Typography component="li" variant="body2" key={index} sx={{ mb: 0.5 }}>
                {tip}
              </Typography>
            ))}
          </Box>
        </Paper>
      )}

      <TextField
        fullWidth
        multiline
        rows={8}
        placeholder="Paste the job description here..."
        variant="outlined"
        value={jobDescription}
        onChange={(e) => onJobDescriptionChange(e.target.value)}
        InputProps={{
          endAdornment: jobDescription && (
            <InputAdornment position="end" sx={{ alignSelf: 'flex-start', mt: 1, mr: 1 }}>
              <IconButton
                edge="end"
                onClick={handleClear}
                size="small"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2
          }
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PasteIcon />}
          onClick={handlePaste}
          size="small"
        >
          Paste from Clipboard
        </Button>
      </Box>

      {jobDescription && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {jobDescription.length} characters • approximately {Math.ceil(jobDescription.split(' ').length / 200)} minute read
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default JDInput;

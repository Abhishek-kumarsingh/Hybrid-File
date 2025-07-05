import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  useTheme,
  Divider,
  Alert
} from '@mui/material';
import {
  Download as DownloadIcon,
  Share as ShareIcon,
  FileCopy as CopyIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  Code as JsonIcon
} from '@mui/icons-material';
import Button from '../common/Button';

const FeedbackExport = ({ feedback }) => {
  const theme = useTheme();
  const [selectedSections, setSelectedSections] = useState({
    summary: true,
    strengths: true,
    weaknesses: true,
    questions: true,
    skills: true,
    improvements: true
  });
  const [exportSuccess, setExportSuccess] = useState(null);

  const handleSectionToggle = (section) => {
    setSelectedSections({
      ...selectedSections,
      [section]: !selectedSections[section]
    });
  };

  const handleExport = (format) => {
    // In a real app, this would trigger an API call to generate the export
    console.log(`Exporting feedback in ${format} format with sections:`, selectedSections);
    
    // Simulate export success
    setExportSuccess(`Feedback successfully exported as ${format.toUpperCase()}`);
    setTimeout(() => setExportSuccess(null), 3000);
  };

  const handleCopyToClipboard = () => {
    // Create a text representation of the feedback based on selected sections
    let feedbackText = `Interview Feedback for ${feedback.jobRole} position\n\n`;
    
    if (selectedSections.summary) {
      feedbackText += `Overall Score: ${feedback.overallScore}%\n`;
      feedbackText += `Summary: ${feedback.summary}\n\n`;
    }
    
    if (selectedSections.strengths) {
      feedbackText += "Strengths:\n";
      feedback.strengths.forEach((strength, i) => {
        feedbackText += `${i+1}. ${strength}\n`;
      });
      feedbackText += "\n";
    }
    
    if (selectedSections.weaknesses) {
      feedbackText += "Areas for Improvement:\n";
      feedback.weaknesses.forEach((weakness, i) => {
        feedbackText += `${i+1}. ${weakness}\n`;
      });
      feedbackText += "\n";
    }
    
    // Simulate copying to clipboard
    navigator.clipboard.writeText(feedbackText)
      .then(() => {
        setExportSuccess("Feedback copied to clipboard");
        setTimeout(() => setExportSuccess(null), 3000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight="medium">
        Export Feedback
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Export your interview feedback in various formats or share it with others.
      </Typography>

      {exportSuccess && (
        <Alert 
          severity="success" 
          sx={{ mb: 3 }}
          onClose={() => setExportSuccess(null)}
        >
          {exportSuccess}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
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
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Include Sections
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Select which sections to include in your export.
            </Typography>
            
            <Box>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={selectedSections.summary} 
                    onChange={() => handleSectionToggle('summary')}
                  />
                }
                label="Summary & Overall Score"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={selectedSections.strengths} 
                    onChange={() => handleSectionToggle('strengths')}
                  />
                }
                label="Strengths"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={selectedSections.weaknesses} 
                    onChange={() => handleSectionToggle('weaknesses')}
                  />
                }
                label="Areas for Improvement"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={selectedSections.questions} 
                    onChange={() => handleSectionToggle('questions')}
                  />
                }
                label="Question Responses"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={selectedSections.skills} 
                    onChange={() => handleSectionToggle('skills')}
                  />
                }
                label="Skills Analysis"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={selectedSections.improvements} 
                    onChange={() => handleSectionToggle('improvements')}
                  />
                }
                label="Improvement Suggestions"
              />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Export Options
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Choose how you want to export your feedback.
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    bgcolor: 'background.default',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                  onClick={() => handleExport('pdf')}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PdfIcon color="error" fontSize="large" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        PDF Document
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Export as a professional PDF
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    bgcolor: 'background.default',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                  onClick={() => handleExport('docx')}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <DocIcon color="primary" fontSize="large" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Word Document
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Export as editable DOCX
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    bgcolor: 'background.default',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                  onClick={handleCopyToClipboard}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CopyIcon color="action" fontSize="large" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Copy to Clipboard
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Copy as formatted text
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    bgcolor: 'background.default',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                  onClick={() => handleExport('json')}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <JsonIcon color="success" fontSize="large" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        JSON Data
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Export raw data as JSON
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Share Feedback
            </Typography>
            
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              sx={{ mr: 2 }}
              onClick={() => {
                setExportSuccess("Share link copied to clipboard");
                setTimeout(() => setExportSuccess(null), 3000);
              }}
            >
              Share Link
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={() => handleExport('zip')}
            >
              Download All Formats
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeedbackExport;
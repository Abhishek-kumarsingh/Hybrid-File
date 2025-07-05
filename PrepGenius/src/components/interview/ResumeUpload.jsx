import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button as MuiButton,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
  useTheme,
  Alert
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Description as FileIcon,
  Delete as DeleteIcon,
  CheckCircle as SuccessIcon
} from '@mui/icons-material';
import Button from '../common/Button';

const ResumeUpload = ({ onFileUpload, selectedFile }) => {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    validateAndUploadFile(file);
  };

  const validateAndUploadFile = (file) => {
    setError(null);
    
    if (!file) return;
    
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF or Word document');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }
    
    onFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    validateAndUploadFile(file);
  };

  const handleRemoveFile = () => {
    onFileUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.pdf')) return '📄';
    if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) return '📝';
    return '📄';
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight="medium">
        Upload Your Resume
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Upload your resume to help us generate more relevant interview questions.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!selectedFile ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            border: '2px dashed',
            borderColor: isDragging ? 'primary.main' : 'divider',
            bgcolor: isDragging ? 'primary.lighter' : 'background.paper',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onClick={() => fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept=".pdf,.doc,.docx"
          />
          <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Drag & Drop your resume here
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            or
          </Typography>
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current.click();
            }}
          >
            Browse Files
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 2, color: 'text.secondary' }}>
            Supported formats: PDF, DOC, DOCX (Max 5MB)
          </Typography>
        </Paper>
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SuccessIcon color="success" sx={{ mr: 1 }} />
            <Typography variant="subtitle1" fontWeight="medium">
              Resume Uploaded Successfully
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <List disablePadding>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Typography variant="h5">{getFileIcon(selectedFile.name)}</Typography>
              </ListItemIcon>
              <ListItemText
                primary={selectedFile.name}
                secondary={`${getFileSize(selectedFile.size)} • ${new Date().toLocaleDateString()}`}
                primaryTypographyProps={{ fontWeight: 'medium' }}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={handleRemoveFile} color="error">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              We'll analyze your resume to tailor the interview questions to your experience.
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ResumeUpload;


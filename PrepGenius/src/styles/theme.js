import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#3a86ff',
            dark: '#0056b3',
            light: '#6ea8fe',
          },
          secondary: {
            main: '#6c757d',
          },
          background: {
            default: '#f8f9fa',
            paper: '#ffffff',
          },
          text: {
            primary: '#212529',
            secondary: '#6c757d',
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#3a86ff',
            dark: '#0056b3',
            light: '#6ea8fe',
          },
          secondary: {
            main: '#6c757d',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#e9ecef',
            secondary: '#adb5bd',
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  shape: {
    borderRadius: 8,
  },
  // ...other customizations
});

// Create a theme instance
const theme = createTheme(getDesignTokens('light'));

export default theme;
import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens } from '../styles/theme';
import { STORAGE_KEYS } from '../utils/constants';

// Create the color mode context
const ColorModeContext = createContext({ 
  toggleColorMode: () => {},
  mode: 'light'
});

// Custom hook to use the color mode context
export const useColorMode = () => {
  return useContext(ColorModeContext);
};

export const ThemeProvider = ({ children }) => {
  // Get the initial mode from localStorage or default to 'light'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem(STORAGE_KEYS.THEME);
    return savedMode || 'light';
  });

  // Save mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, mode);
  }, [mode]);

  // Color mode context value
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  // Create theme based on current mode
  const theme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { ColorModeContext };


import { createContext, useCallback, useMemo, useState, useContext } from 'react';
import { Box, ThemeProvider} from '@mui/material';
import { DarkTheme, LightTheme } from '../themes';

interface IThemeContextProps {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

interface IThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext({} as IThemeContextProps);

export const AppThemeProvider = ({ children }: IThemeProviderProps) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setThemeName(oldthemeName => oldthemeName === 'light' ? 'dark' : 'light');
  }, []);

  const theme = useMemo(() => {
    if(themeName === 'light') {
      return LightTheme;
    } else {
      return DarkTheme;
    }
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName , toggleTheme}}>
      <ThemeProvider theme={theme}>
        <Box height='100vh' width='100vw' bgcolor={theme.palette.background.default} >
          { children }
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
}
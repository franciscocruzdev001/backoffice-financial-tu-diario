import { createTheme } from '@mui/material/styles';

const customTheme = {
  palette: {
    primary: {
      main: '#1e3c72',
    },
    secondary: {
      main: '#2a5298',
    },
  },
};

const theme = createTheme(customTheme);

export default theme;

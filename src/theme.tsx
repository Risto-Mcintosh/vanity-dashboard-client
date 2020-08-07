import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#b49da6',
      main: '#683b4d'
    },
    secondary: {
      main: '#2d7a8a'
    },
    success: {
      main: '#2a976d'
    }
  }
});
theme = responsiveFontSizes(theme);

export default theme;

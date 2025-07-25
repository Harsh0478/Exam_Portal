import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  logoimg: {
    height: 50,
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#07cfda',
    fontWeight: 700,
    fontSize: '1.5rem',
    userSelect: 'none',
  },
  appBar: {
    backgroundColor: '#000000dd', // Slightly transparent black for style
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000dd',
    },
  },
});

export const HomepageHeader = ({ img, title }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" className={classes.appBar} elevation={4}>
        <Toolbar>
          <img src={img} alt="Logo" className={classes.logoimg} />
          <Typography variant="h6" className={classes.title} noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

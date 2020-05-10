import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router';

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '200px',
    },
  },
}));

const ApplicationBar = ({ location }: RouteComponentProps) => {
  const classes = useStyles();
  const pageName = location.pathname;
  console.log(location);
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5">
          {pageName === '/'
            ? 'Dashboard'
            : pageName
                .substring(1)
                .replace(/^\w/, (c) => c.toUpperCase())
                .replace(/\//, ' #')}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(ApplicationBar);

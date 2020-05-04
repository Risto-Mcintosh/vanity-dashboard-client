import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router';

const ApplicationBar = ({ location }: RouteComponentProps) => {
  const pageName = location.pathname;
  return (
    <AppBar style={{ paddingLeft: '200px' }}>
      <Toolbar>
        <Typography variant="h5">
          {pageName === '/'
            ? 'Dashboard'
            : pageName.substring(1).replace(/^\w/, c => c.toUpperCase())}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(ApplicationBar);

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  IconButton,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewListIcon from '@material-ui/icons/ViewList';
import TableChartIcon from '@material-ui/icons/TableChart';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(theme => ({
  root: {
    width: '200px'
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px'
  }
}));

const Nav: React.FC = () => {
  const classes = useStyle();
  return (
    <Drawer
      classes={{
        paper: classes.root
      }}
      variant="permanent"
      open={true}
    >
      <div className={classes.toolbarIcon}>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <div>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/orders">
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button component={Link} to="kanban">
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <ListItemText primary="Kanban" />
        </ListItem>
        <ListItem button component={Link} to="/reports">
          <ListItemIcon>
            <ShowChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </div>
    </Drawer>
  );
};

export default Nav;

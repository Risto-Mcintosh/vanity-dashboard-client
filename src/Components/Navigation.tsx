import React from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewListIcon from '@material-ui/icons/ViewList';
import TableChartIcon from '@material-ui/icons/TableChart';

const useStyle = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar
}));

type props = {
  setMobileClose?: React.Dispatch<React.SetStateAction<boolean>>;
};

type NavItemProps = {
  href: string;
  name: string;
  icon: React.ReactNode;
};

function Navigation({ setMobileClose }: props) {
  const classes = useStyle();

  function handleMenuClose() {
    if (!setMobileClose) return;
    setMobileClose(false);
  }

  const NavItem = ({ href, name, icon }: NavItemProps) => (
    <ListItem button onClick={handleMenuClose} component={Link} to={href}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );

  return (
    <div>
      <div className={classes.toolbar}></div>
      <NavItem href="/" name="Dashboard" icon={<DashboardIcon />} />
      <NavItem href="/orders" name="Orders" icon={<ViewListIcon />} />
      <NavItem href="/products" name="Products" icon={<ViewListIcon />} />
      <NavItem href="/kanban" name="Kanban" icon={<TableChartIcon />} />
    </div>
  );
}

export default Navigation;

import React from 'react';
import Navigation from './Navigation';
import pageName from '../utils/pageName';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Drawer,
  Hidden,
  Container,
  styled,
  Theme,
  ContainerProps,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useLocation } from 'react-router-dom';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

type props = {
  children: React.ReactNode;
};

type containerProps = {
  theme: Theme;
};

const KanbanPage = styled('main')(({ theme }: containerProps) => ({
  maxWidth: '850px',
  paddingTop: theme.spacing(4),
}));

function Layout({ children }: props) {
  const { pathname } = useLocation();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  function MainSection(page: string) {
    if (page === 'Kanban') {
      return <KanbanPage>{children}</KanbanPage>;
    }

    return <Container className={classes.container}>{children}</Container>;
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {pageName(pathname)}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Navigation setMobileClose={setMobileOpen} />
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Navigation />
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        {MainSection(pageName(pathname))}
      </div>
    </div>
  );
}
export default Layout;

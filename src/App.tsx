import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Dashboard from './Pages/dashboard';
import AppBar from './Components/AppBar';
import { makeStyles, Container, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import Orders from './Pages/orders';
import OrderDetail from './Components/order-detail';

const Kanban = () => <h1 style={{ marginTop: '64px' }}>Kanban</h1>;
const Reports = () => <h1 style={{ marginTop: '64px' }}>Reports</h1>;

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    display: 'grid',
    [theme.breakpoints.up('md')]: {
      gridTemplateRows: `min-content 1fr`,
      marginLeft: '200px',
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const App: React.FC = () => {
  const classes = useStyle();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router>
          <CssBaseline />
          <Nav />
          <AppBar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container className={classes.container} maxWidth="lg">
              <Route path="/" exact component={Dashboard} />
              <Route exact path="/orders" component={Orders} />
              <Route path="/orders/:orderId" component={OrderDetail} />
              <Route path="/kanban" component={Kanban} />
              <Route path="/reports" component={Reports} />
            </Container>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;

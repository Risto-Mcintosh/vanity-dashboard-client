import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Dashboard from './Pages/dashboard';
import AppBar from './Components/AppBar';
import { makeStyles, Container, createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Orders from './Pages/orders';
import OrderDetail from './Components/OrderDetail';

const Kanban = () => <h1 style={{ marginTop: '64px' }}>Kanban</h1>;
const Reports = () => <h1 style={{ marginTop: '64px' }}>Reports</h1>;

// const theme = createMuiTheme({
//   overrides: {
//     html:{
//       height: '100%'
//     }
//   }
// })

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    marginLeft: '200px',
    display: 'grid',
    gridTemplateRows: `min-content 1fr`,
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
            <Route path="/orders/:id" component={OrderDetail} />
            <Route path="/kanban" component={Kanban} />
            <Route path="/reports" component={Reports} />
          </Container>
        </main>
      </Router>
    </div>
  );
};

export default App;

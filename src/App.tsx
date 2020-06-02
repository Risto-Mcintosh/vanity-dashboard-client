import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Dashboard from './Pages/dashboard';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import Orders from './Pages/orders';
import Products from './Pages/products';
import Kanban from './Pages/kanban';
import OrderDetail from './Components/order-detail';
import './app.css';

const Reports = () => <h1 style={{ marginTop: '64px' }}>Reports</h1>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Route path="/" exact component={Dashboard} />
          <Route exact path="/orders" component={Orders} />
          <Route path="/orders/:orderId" component={OrderDetail} />
          <Route path="/products" component={Products} />
          <Route path="/kanban" component={Kanban} />
          <Route path="/reports" component={Reports} />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

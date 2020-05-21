import React from 'react';
import WeeklyOrders from '../../Components/weekly-orders';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import OrdersTable from '../../Components/order-table';
import { useListOrders } from '../../utils/orders';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
});

function Dashboard() {
  const classes = useStyles();
  const { orders } = useListOrders('recent');
  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="space-evenly"
    >
      <WeeklyOrders />
      <OrdersTable tableTitle="Recent Orders" orders={orders} />
    </Grid>
  );
}

export default Dashboard;

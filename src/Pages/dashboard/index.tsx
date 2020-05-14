import React from 'react';
import WeeklyOrders from '../../Components/weekly-orders';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import OrdersTable from '../../Components/order-table/OrderTable';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
});

const DashboardIndex: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="space-evenly"
    >
      <WeeklyOrders />
      <OrdersTable tableTitle="Recent Orders" orders={[]} />
    </Grid>
  );
};

export default DashboardIndex;

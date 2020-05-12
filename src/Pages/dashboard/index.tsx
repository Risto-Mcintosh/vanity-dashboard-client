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

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  number: string,
  email: string,
  color: string,
  total: number
) {
  return { id, date, name, number, email, color, total };
}

const orders = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'Presley@gmail.com',
    'Red, Large, Small',
    312.44
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'McCartney@gmail.com',
    'Red, Large, Small',
    866.99
  ),
  createData(
    2,
    '16 Mar, 2019',
    'Tom Scholz',
    'Boston, MA',
    'Scholz@gmail.com',
    'Red, Large, Small',
    100.81
  ),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'Jackson@gmail.com',
    'Red, Large, Small',
    654.39
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'Springsteen@gmail.com',
    'Red, Large, Small',
    212.79
  ),
];

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
      <OrdersTable tableTitle="Recent Orders" orders={orders} />
    </Grid>
  );
};

export default DashboardIndex;

import React from 'react';
import { Card, Typography, makeStyles, Box, Divider } from '@material-ui/core';
import { Order } from '../../types';
import formatDate from '../../utils/formatDate';
import { MutationOptions } from 'react-query';
import OrderStatusIcon from './OrderStatusIcon';
import DatePicker from '../../Components/DatePicker';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px 0`,
    marginTop: theme.spacing(4)
  },
  orderStatus: {
    marginLeft: theme.spacing(1)
  },
  orderTotal: {
    fontSize: '1.3em'
  },
  space: {
    padding: '9px 0'
  }
}));

type props = {
  order: Order;
  mutateOrder: (
    variables: Order,
    options?: MutationOptions<Order, Order>
  ) => Promise<Order>;
};

function Status({ order, mutateOrder }: props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Box px={2} display="flex" alignItems="center">
        <OrderStatusIcon orderStatus={order.orderStatus} />
        <Typography
          data-testid="orderStatus"
          className={classes.orderStatus}
          variant="h6"
        >
          {`Order Status - ${order.orderStatus}`}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" px={2} py={3}>
        <DatePicker order={order} mutateOrder={mutateOrder} />
      </Box>

      <Divider />
      <Box p={2} pb={0} display="flex" justifyContent="space-evenly">
        <Typography>Due: {formatDate(order.meta.dueOn)}</Typography>
        <Typography>Completed: {formatDate(order.meta.completedOn)}</Typography>
      </Box>
    </Card>
  );
}

export default Status;

import React from 'react';
import { Card, Typography, makeStyles, Box, Divider } from '@material-ui/core';
import { Order } from '../../types';
import formatDate from '../../utils/formatDate';
import { MutationOptions } from 'react-query';
import OrderStatusIcon from './OrderStatusIcon';
import DatePicker from '../../Components/DatePicker';
import useContrastText from '../../utils/useContrastText';
import { useHistory } from 'react-router-dom';

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

type BuildStatusProps = {
  status: { color: string; name: string };
};

function BuildStatus({ status }: BuildStatusProps) {
  const bgColor = status.color ?? '#fff';
  const history = useHistory();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      pb={2}
    >
      <Typography variant="h6"> Build Status </Typography>
      <Box
        onClick={() => history.push('/kanban')}
        bgcolor={bgColor}
        py={2}
        px={5}
        borderRadius={2}
        boxShadow={2}
        fontSize="1.2rem"
        fontWeight="bold"
        fontStyle="italic"
        letterSpacing={2}
        color={useContrastText(bgColor)}
        style={{ cursor: 'pointer' }}
      >
        {status.name}
      </Box>
    </Box>
  );
}

type props = {
  order: Order;
  mutateOrder: (
    variables: Order,
    options?: MutationOptions<Order, Order>
  ) => Promise<Order>;
};

function Status({ order, mutateOrder }: props) {
  const classes = useStyles();
  const hasDueDate = !!order.meta.dueOn;
  return (
    <Card className={classes.root}>
      <Box px={2} display="flex" alignItems="center">
        <OrderStatusIcon orderStatus={order.orderStatus} />
        <Typography
          data-testid="orderStatus"
          className={classes.orderStatus}
          variant="h6"
        >
          {order.orderStatus === 'Paid'
            ? 'Need to set set due date!'
            : order.orderStatus}
        </Typography>
      </Box>
      {hasDueDate ? (
        <BuildStatus status={order.meta.buildStatus} />
      ) : (
        <Box display="flex" justifyContent="center" px={2} py={3}>
          <DatePicker order={order} mutateOrder={mutateOrder} />
        </Box>
      )}

      <Divider />
      <Box p={2} pb={0} display="flex" justifyContent="space-evenly">
        <Typography>Due: {formatDate(order.meta.dueOn)}</Typography>
        <Typography>Completed: {formatDate(order.meta.completedOn)}</Typography>
      </Box>
    </Card>
  );
}

export default Status;

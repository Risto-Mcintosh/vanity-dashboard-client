import React from 'react';
import {
  Card,
  Typography,
  makeStyles,
  Button,
  Box,
  Divider,
} from '@material-ui/core';
import { Meta, OrderStatus } from '../../types';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import BuildIcon from '@material-ui/icons/Build';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import formatDate from '../../utils/formatDate';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px 0`,
    marginTop: theme.spacing(4),
  },
  paidLabel: {
    marginLeft: theme.spacing(1),
  },
  orderTotal: {
    fontSize: '1.3em',
  },
  space: {
    padding: '9px 0',
  },
}));

type props = {
  orderStatus: OrderStatus;
  orderMetaData: Meta;
};

function Status({ orderStatus, orderMetaData }: props) {
  const classes = useStyles();
  const isOrderNew = orderStatus === 'New';
  const isOrderPending = orderStatus === 'Pending';
  const isOrderComplete = orderStatus === 'Complete';
  return (
    <Card className={classes.root}>
      <Box px={2} display="flex" alignItems="center">
        {isOrderNew && <FiberNewIcon color="secondary" />}
        {isOrderPending && <BuildIcon color="secondary" />}
        {isOrderComplete && <CheckCircleOutlineIcon color="secondary" />}
        <Typography
          data-testid="orderStatus"
          className={classes.paidLabel}
          variant="h6"
        >
          {`Order Status - ${orderStatus}`}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" px={2} py={3}>
        <Button
          data-testid="setDueDate"
          variant="contained"
          disabled={isOrderNew ? true : false}
        >
          Set Due Date
        </Button>
      </Box>
      <Divider />
      <Box p={2} pb={0} display="flex" justifyContent="space-evenly">
        <Typography>Due: {formatDate(orderMetaData.dueOn)}</Typography>
        <Typography>
          Completed: {formatDate(orderMetaData.completedOn)}
        </Typography>
      </Box>
    </Card>
  );
}

export default Status;

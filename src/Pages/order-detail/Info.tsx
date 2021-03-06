import React from 'react';
import {
  Card,
  Typography,
  Grid,
  makeStyles,
  Button,
  Box,
  Divider
} from '@material-ui/core';
import { Order } from '../../types';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LineItem from './LineItem';
import formatDate from '../../utils/formatDate';
import { MutationOptions } from 'react-query';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px 0`
  },
  success: {
    color: theme.palette.success.main
  },
  paidLabel: {
    marginLeft: theme.spacing(1)
  },
  orderTotal: {
    fontSize: '1.3em'
  },
  space: {
    padding: `${theme.spacing(1.5)}px 0`
  },
  button: {
    marginLeft: theme.spacing(1)
  }
}));

type props = {
  order: Order;
  mutateOrder: (
    variables: Order,
    options?: MutationOptions<Order, Order>
  ) => Promise<Order>;
};

function OrderInfo({ order, mutateOrder }: props) {
  const classes = useStyles();
  const { vanity, total } = order;
  const isNewOrder = order.orderStatus === 'New';
  return (
    <Card className={classes.root}>
      <Box px={2} display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          {isNewOrder ? (
            <HighlightOffIcon color="error" />
          ) : (
            <CheckCircleOutlineIcon className={classes.success} />
          )}
          <Typography className={classes.paidLabel} variant="h6">
            {isNewOrder ? 'Not Paid' : 'Paid'}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography>Paid: {formatDate(order.meta.paidOn)}</Typography>
        </Box>
      </Box>
      <Grid container justify="space-between" className={classes.space}>
        <Grid item xs={9}>
          <LineItem name="Color" size={vanity.color} />
          <LineItem
            name="Mirror"
            size={vanity.mirror.size}
            price={vanity.mirror.price}
          />
          <LineItem
            name="Table"
            size={vanity.table.size}
            price={vanity.table.price}
          />
          <LineItem name="Base Material" price={vanity.baseMaterial.price} />
        </Grid>
        <Grid item container xs={3} alignItems="center" justify="flex-end">
          <Box display="flex" pr={2}>
            <Typography className={classes.orderTotal}>
              ${total.toFixed(2)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Box p={2} pb={0} display="flex" justifyContent="flex-end">
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
          disabled={order.orderStatus !== 'New' ? true : false}
          onClick={() =>
            mutateOrder({
              ...order,
              orderStatus: 'Paid',
              meta: { ...order.meta, paidOn: new Date() }
            })
          }
        >
          Mark As Paid
        </Button>
      </Box>
    </Card>
  );
}

export default OrderInfo;

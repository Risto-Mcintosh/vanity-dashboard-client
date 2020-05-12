import React from 'react';
import {
  Card,
  Typography,
  Grid,
  makeStyles,
  Button,
  Box,
  Divider,
} from '@material-ui/core';
import { Order, OrderStatus } from '../../types';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import LineItem from './LineItem';
import { useUpdateOrderStatus } from '../../utils/orders';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px 0`,
  },
  paidLabel: {
    marginLeft: theme.spacing(1),
  },
  orderTotal: {
    fontSize: '1.3em',
  },
  space: {
    padding: `${theme.spacing(1.5)}px 0`,
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

type props = {
  order: Order;
  updateStatus: React.Dispatch<React.SetStateAction<OrderStatus>>;
};

function OrderInfo({ order, updateStatus }: props) {
  const [mutate] = useUpdateOrderStatus();
  const classes = useStyles();
  const { vanity, total } = order;
  return (
    <Card className={classes.root}>
      <Box px={2} display="flex" alignItems="center">
        <HighlightOffIcon color="error" />
        <Typography className={classes.paidLabel} variant="h6">
          Not Paid
        </Typography>
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
          <LineItem
            name="Base Material"
            size={vanity.baseMaterial.size}
            price={vanity.baseMaterial.price}
          />
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
        <Button color="default" variant="contained">
          Send Invoice
        </Button>
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
          disabled={order.orderStatus !== 'New' ? true : false}
          onClick={() => {
            mutate(
              { ...order, orderStatus: 'Pending' },
              {
                onSuccess: () => updateStatus('Pending'),
              }
            );
          }}
        >
          Mark As Paid
        </Button>
      </Box>
    </Card>
  );
}

export default OrderInfo;

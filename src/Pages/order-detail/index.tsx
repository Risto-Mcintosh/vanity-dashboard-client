import React from 'react';
import { Grid, Container } from '@material-ui/core';
import OrderInfo from './Info';
import CustomerInfo from './CustomerInfo';
import OrderStatus from './Status';
import { useOrder, useOrderUpdate } from '../../utils/orders';
import { useParams } from 'react-router-dom';
import DeleteOrder from './DeleteOrder';

export default function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const { order } = useOrder(parseInt(orderId));
  const [mutate] = useOrderUpdate();

  const childProps = {
    order,
    mutateOrder: mutate
  };

  return (
    <Container maxWidth={'md'}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          <OrderInfo {...childProps} />
          <OrderStatus {...childProps} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          container
          direction="column"
          justify="space-between"
        >
          <CustomerInfo customer={order.customer} />
          {order.orderStatus !== 'Complete' && (
            <DeleteOrder orderId={order.id as string} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

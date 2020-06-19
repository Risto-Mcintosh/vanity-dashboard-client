import React from 'react';
import { Grid, Container } from '@material-ui/core';
import OrderInfo from './Info';
import CustomerInfo from './CustomerInfo';
import OrderStatus from './Status';
import { useOrder, useUpdateOrder } from '../../utils/orders';
import { useParams } from 'react-router-dom';

export default function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const { order } = useOrder(orderId);
  const [mutate] = useUpdateOrder();

  const childProps = {
    order,
    mutateOrder: mutate,
  };

  return (
    <Container maxWidth={'md'}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          <OrderInfo {...childProps} />
          <OrderStatus {...childProps} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomerInfo customer={order.customer} />
        </Grid>
      </Grid>
    </Container>
  );
}
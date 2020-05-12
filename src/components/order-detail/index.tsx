import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { OrderStatus as TypeOrderStatus } from '../../types';
import OrderInfo from './Info';
import CustomerInfo from './CustomerInfo';
import OrderStatus from './Status';
import { useOrder, useUpdateOrderStatus } from '../../utils/orders';
import { useParams } from 'react-router-dom';

export default function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const { order, error } = useOrder(orderId);
  const [orderStatus, updateStatus] = React.useState(order.orderStatus);
  // const [mutate, { status }] = useUpdateOrderStatus();

  //function handleOrderUpdate(update: { orderStatus: TypeOrderStatus }) {
  //   const newOrder = { ...order, ...update };
  //   mutate(newOrder, {
  //     onSuccess(data) {
  //       updateStatus(data.orderStatus);
  //     },
  //   });
  // }

  return (
    <Container maxWidth={'md'}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          <OrderInfo order={order} updateStatus={updateStatus} />
          <OrderStatus orderStatus={orderStatus} orderMetaData={order.meta} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomerInfo customer={order.customer} />
        </Grid>
      </Grid>
    </Container>
  );
}

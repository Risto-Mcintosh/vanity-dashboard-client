import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { Order } from '../../types';
import OrderInfo from './Info';
import CustomerInfo from './CustomerInfo';
import OrderStatus from './Status';

const order1: Order = {
  id: 1,
  total: 600,
  orderedOn: new Date(),
  orderStatus: 'New',
  meta: {},
  customer: {
    id: 2,
    name: 'Someone Name',
    email: 'someone@gmail.com',
    phone: '214-333-333',
  },
  vanity: {
    color: 'Black',
    mirror: {
      size: 'Large',
      price: 200,
    },
    table: {
      size: 'Large',
      price: 200,
    },
    baseMaterial: {
      size: 'Large',
      price: 200,
    },
  },
};

export default function OrderDetail() {
  const [orderStatus, updateStatus] = React.useState(order1.orderStatus);
  return (
    <Container maxWidth={'md'}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          <OrderInfo
            vanity={order1.vanity}
            total={order1.total}
            handleMarkAsPaid={updateStatus}
          />
          <OrderStatus orderStatus={orderStatus} orderMetaData={order1.meta} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomerInfo customer={order1.customer} />
        </Grid>
      </Grid>
    </Container>
  );
}

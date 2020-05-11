import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { OrderStatus as TypeOrderStatus } from '../../types';
import OrderInfo from './Info';
import CustomerInfo from './CustomerInfo';
import OrderStatus from './Status';
import { useOrder } from '../../utils/getOrderbyId';

export default function OrderDetail() {
  const [orderStatus, updateStatus] = React.useState<TypeOrderStatus>('New');
  const { order, error } = useOrder(orderStatus);
  // if (status === 'loading') {
  //   return <span>Loading...</span>;
  // }

  return (
    <Container maxWidth={'md'}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          <OrderInfo
            vanity={order.vanity}
            total={order.total}
            handleMarkAsPaid={updateStatus}
          />
          <OrderStatus orderStatus={orderStatus} orderMetaData={order.meta} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomerInfo customer={order.customer} />
        </Grid>
      </Grid>
    </Container>
  );
}

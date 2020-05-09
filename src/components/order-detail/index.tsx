import React from 'react';
import {
  Card,
  Typography,
  Grid,
  Container,
  makeStyles,
  CardHeader,
  CardContent,
  CardActionArea,
  Button,
  Box,
  Divider,
} from '@material-ui/core';
import { Order, VanityColor, Sizes, OrderStatus } from '../../types';
import { OrderInfo } from './info';

const order1: Order = {
  id: 1,
  total: 600,
  orderedOn: new Date(),
  orderStatus: OrderStatus.New,
  meta: {},
  customer: {
    id: 2,
    name: 'Someone',
    email: 'someone@gmail.com',
    phone: '214-333-333',
  },
  vanity: {
    color: VanityColor.Black,
    mirror: {
      size: Sizes.Large,
      price: 200,
    },
    table: {
      size: Sizes.Large,
      price: 200,
    },
    baseMaterial: {
      size: Sizes.Large,
      price: 200,
    },
  },
};

const useStyles = makeStyles({
  root: {
    padding: '15px 0',
  },
});

export default function OrderDetail() {
  const classes = useStyles();
  return (
    <Container maxWidth={'md'}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          <OrderInfo vanity={order1.vanity} total={order1.total} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.root}>
            <p>oooook</p>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

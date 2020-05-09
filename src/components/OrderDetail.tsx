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
import { IOrder, VanityColor, Sizes, OrderStatus } from '../types';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const order1: IOrder = {
  id: 1,
  total: 540,
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
    mirrorSize: Sizes.Large,
    tableSize: Sizes.Large,
  },
};

const useStyles = makeStyles({
  root: {
    padding: '15px 0',
  },
  orderInfo: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  orderTotal: {
    fontSize: '1.3em',
  },
});

export default function OrderDetail() {
  const classes = useStyles();
  return (
    <Container maxWidth={'md'}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          <Card className={classes.root}>
            <Box px={2} display="flex">
              <HighlightOffIcon color="error" />
              <Typography variant="h6">Not Paid</Typography>
            </Box>
            <CardContent className={classes.orderInfo}>
              <div>
                <Typography>
                  Color: {order1.vanity.color.toUpperCase()}
                </Typography>
                <Typography>
                  Mirror: {order1.vanity.mirrorSize.toUpperCase()}
                </Typography>
                <Typography>
                  Table: {order1.vanity.tableSize.toUpperCase()}
                </Typography>
              </div>
              <Box display="flex" alignItems="center">
                <Typography className={classes.orderTotal}>
                  ${order1.total}
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <Box px={2} mt={1} display="flex" justifyContent="flex-end">
              <Button color="primary" variant="contained">
                Mark As Paid
              </Button>
            </Box>
          </Card>
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

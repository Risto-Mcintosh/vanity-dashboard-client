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
import { Vanity } from '../../types';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import LineItem from './lineItem';

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

type props = {
  vanity: Vanity;
  total: number;
};

export function OrderInfo({ vanity, total }: props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Box px={2} display="flex">
        <HighlightOffIcon color="error" />
        <Typography variant="h6">Not Paid</Typography>
      </Box>
      <Grid container justify="space-between">
        <Grid item xs={9}>
          <LineItem size={vanity.color} />
          <LineItem size={vanity.mirror.size} price={vanity.mirror.price} />
          <LineItem size={vanity.table.size} price={vanity.table.price} />
          <LineItem
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
      <Box px={2} mt={1} display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained">
          Mark As Paid
        </Button>
      </Box>
    </Card>
  );
}

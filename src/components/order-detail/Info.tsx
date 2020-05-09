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
import LineItem from './LineItem';

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
  vanity: Vanity;
  total: number;
};

export function OrderInfo({ vanity, total }: props) {
  const classes = useStyles();
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
        <Button color="primary" variant="contained" className={classes.button}>
          Mark As Paid
        </Button>
      </Box>
    </Card>
  );
}

import React from 'react';
import {
  Card,
  Typography,
  makeStyles,
  Button,
  Box,
  Divider,
} from '@material-ui/core';
import { Meta } from '../../types';
import FiberNewIcon from '@material-ui/icons/FiberNew';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px 0`,
    marginTop: theme.spacing(4),
  },
  paidLabel: {
    marginLeft: theme.spacing(1),
  },
  orderTotal: {
    fontSize: '1.3em',
  },
  space: {
    padding: '9px 0',
  },
}));

type props = {
  orderStatus: string | undefined;
  orderMetaData: Meta;
};

function Status({ orderStatus, orderMetaData }: props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Box px={2} display="flex" alignItems="center">
        <FiberNewIcon color="secondary" />
        <Typography
          data-testid="orderStatus"
          className={classes.paidLabel}
          variant="h6"
        >
          {`Order Status - ${orderStatus}`}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" px={2} py={3}>
        <Button
          data-testid="setDueDate"
          variant="contained"
          disabled={orderStatus === 'New' ? true : false}
        >
          Set Due Date
        </Button>
      </Box>
      <Divider />
      <Box p={2} pb={0} display="flex" justifyContent="space-evenly">
        <Typography>Due: {orderMetaData.dueOn || 'n/a'}</Typography>
        <Typography>Completed: {orderMetaData.completedOn || 'n/a'}</Typography>
      </Box>
    </Card>
  );
}

export default Status;

import React from 'react';
import { Card, makeStyles, Box, Divider, Typography } from '@material-ui/core';
import { Customer } from '../../types';

const useStyles = makeStyles({
  root: {
    padding: '15px 0',
  },
  subtitle: {
    fontWeight: 700,
    marginBottom: '7px',
  },
});

type props = {
  customer: Customer;
};
const CustomerInfo = ({ customer }: props) => {
  const classes = useStyles();
  return (
    <Card>
      <Box py={1} px={2}>
        <Typography className={classes.subtitle}>Customer</Typography>
        <Typography variant="subtitle1">{customer.name}</Typography>
      </Box>
      <Divider />
      <Box py={1} px={2}>
        <Typography className={classes.subtitle}>
          Contact Information
        </Typography>
        <Typography variant="subtitle1">{customer.email}</Typography>
        <Typography variant="subtitle1">{customer.phone}</Typography>
      </Box>
    </Card>
  );
};

export default CustomerInfo;

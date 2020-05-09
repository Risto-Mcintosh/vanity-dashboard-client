import React from 'react';
import { Box, Typography } from '@material-ui/core';

type props = {
  size: string;
  price?: number;
};
const LineItem = ({ size, price = 0 }: props) => (
  <Box display="flex" justifyContent="space-between" px={2}>
    <Typography>{size.toUpperCase()}</Typography>
    <Typography>${price.toFixed(2)}</Typography>
  </Box>
);

export default LineItem;

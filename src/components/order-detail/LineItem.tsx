import React from 'react';
import { Box, Typography } from '@material-ui/core';

type props = {
  name: string;
  size?: string;
  price?: number;
};
const LineItem = ({ size, name, price = 0 }: props) => (
  <Box display="flex" justifyContent="space-between" px={2}>
    <Typography>
      {name}
      {size && ` - ${size}`}
    </Typography>
    <Typography>${price.toFixed(2)}</Typography>
  </Box>
);

export default LineItem;

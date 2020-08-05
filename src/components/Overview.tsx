import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { red, blue, green } from '@material-ui/core/colors';

type OverviewItemProps = {
  title: string;
  count: number;
  circleColor: string;
  countColor?: string;
};

const OverviewItem = ({
  title,
  count,
  circleColor,
  countColor = 'white'
}: OverviewItemProps) => (
  <Box
    display="flex"
    justifyContent="space-around"
    alignItems="center"
    bgcolor="white"
    p={2}
    width="25%"
    boxShadow={2}
    borderRadius={3}
  >
    <Box width="50%" textAlign="center" fontSize={16}>
      {title}
    </Box>
    <Box
      width="50px"
      height="50px"
      borderRadius="40px"
      bgcolor={circleColor}
      display="flex"
      justifyContent="center"
      alignItems="center"
      boxShadow={2}
      color={countColor}
      fontSize={16}
    >
      {count}
    </Box>
  </Box>
);

export default function Overview() {
  return (
    <Box display="flex" justifyContent="space-between" mb={3}>
      <OverviewItem title="New Orders" circleColor={green[500]} count={10} />
      <OverviewItem title="Pending Orders" circleColor={blue[500]} count={10} />
      <OverviewItem title="Overdue Orders" circleColor={red[500]} count={10} />
    </Box>
  );
}

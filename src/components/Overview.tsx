import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { red, blue, green } from '@material-ui/core/colors';
import { useQuery } from 'react-query';
import { client } from '../utils/api-client';
import { OrderOverview } from '../types';
import { useHistory } from 'react-router-dom';

type OverviewItemProps = {
  title: string;
  count: number;
  circleColor: string;
  countColor?: string;
  orderType: string;
};

const OverviewItem = ({
  title,
  count,
  circleColor,
  orderType,
  countColor = 'white'
}: OverviewItemProps) => {
  const history = useHistory();

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      bgcolor="white"
      p={2}
      width="25%"
      boxShadow={2}
      borderRadius={3}
      style={{ cursor: 'pointer' }}
      onClick={() =>
        history.push('/orders', {
          listType: orderType
        })
      }
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
};

export default function Overview() {
  const { data } = useQuery({
    queryKey: 'overview',
    queryFn: () => client<OrderOverview>('/overview'),
    config: {
      refetchOnWindowFocus: false
    }
  });
  return (
    <Box display="flex" justifyContent="space-between" mb={3}>
      <OverviewItem
        title="New Orders"
        circleColor={green[500]}
        count={!data ? 0 : data.newOrders}
        orderType="new"
      />
      <OverviewItem
        title="Pending Orders"
        circleColor={blue[500]}
        count={!data ? 0 : data.pendingOrders}
        orderType="pending"
      />
      <OverviewItem
        title="Overdue Orders"
        circleColor={red[500]}
        count={!data ? 0 : data.overDueOrders}
        orderType="overdue"
      />
    </Box>
  );
}

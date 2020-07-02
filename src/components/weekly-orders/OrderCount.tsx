import React from 'react';
import { useOrderList } from '../../utils/orders';
import weeklyOrders, { daysOfTheWeek } from './mapWeeklyOrders';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Order } from '../../types';
import { makeStyles } from '@material-ui/core';

type props = {
  setSelected: React.Dispatch<React.SetStateAction<Order[] | null>>;
};

const useStyles = makeStyles((theme) => ({
  cell: {
    transition: theme.transitions.create('all'),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    }
  }
}));

function OrderCount({ setSelected }: props) {
  const mappedOrders = weeklyOrders.map(useOrderList('ordersDue').orders);
  const classes = useStyles();
  return (
    <TableRow>
      {daysOfTheWeek.map((day) => {
        const orderCount = mappedOrders[day] ? mappedOrders[day].length : 0;
        return (
          <TableCell
            key={day}
            onClick={() => setSelected(mappedOrders[day])}
            align="center"
            className={classes.cell}
          >
            {orderCount}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export default OrderCount;

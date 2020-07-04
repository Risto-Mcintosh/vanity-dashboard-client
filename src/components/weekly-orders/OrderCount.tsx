import React from 'react';
import { daysOfTheWeek, ordersMapByDayOfTheWeek } from './mapWeeklyOrders';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Order } from '../../types';
import { makeStyles } from '@material-ui/core';

type props = {
  setSelected: React.Dispatch<React.SetStateAction<Order[] | null>>;
  mappedOrders: ordersMapByDayOfTheWeek;
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

function OrderCount({ setSelected, mappedOrders }: props) {
  const classes = useStyles();
  return (
    <TableRow>
      {daysOfTheWeek.map((day, i) => {
        const orderCount = mappedOrders[day] ? mappedOrders[day].length : 0;
        return (
          <TableCell
            key={i}
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

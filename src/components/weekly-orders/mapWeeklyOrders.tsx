import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { Order } from '../../types';
import moment from 'moment';

export const daysOfTheWeek: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

type ordersMapByDayOfTheWeek = {
  [name: string]: Order[];
};

function map(orders: Order[]) {
  const result: ordersMapByDayOfTheWeek = {};

  for (const order of orders) {
    const day = moment(order.meta.dueOn).format('dddd');

    if (result[day]) {
      result[day].push(order);
    } else {
      result[day] = [order];
    }
  }

  return result;
}

function byOrderCount(orders: ordersMapByDayOfTheWeek) {
  return daysOfTheWeek.map((day) => {
    const orderCount = orders[day] ? orders[day].length : 0;
    return (
      <TableCell key={day} align="center">
        {orderCount}
      </TableCell>
    );
  });
}

export default { map, byOrderCount };

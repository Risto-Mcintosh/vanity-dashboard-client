import { Order } from '../../types';
import moment from 'moment';

export const daysOfTheWeek: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export type ordersMapByDayOfTheWeek = {
  [name: string]: Order[];
};

function mapOrdersByDay(orders: Order[]) {
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

export default mapOrdersByDay;

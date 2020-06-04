import orderData from '../test/order-data.json';
import { Order } from '../types';

async function read(id: number | string) {
  return (orderData.find((order) => order.id === id) as unknown) as Order;
}

async function list(query: string) {
  if (!query) return (orderData as unknown) as Order[];

  if (query === 'ordersDue') {
    return (orderData.filter(
      (order) => order.meta.dueOn !== null
    ) as unknown) as Order[];
  }

  if (query === 'recent') {
    return (orderData.sort((o, x) => {
      const date1 = new Date(o.orderedOn);
      const date2 = new Date(x.orderedOn);
      if (date1 > date2) return -1;
      if (date1 < date2) return 1;
      return 0;
    }) as unknown) as Order[];
  }
}

async function update(newOrder: Order) {
  const old = (orderData.find(
    (order) => order.id === newOrder.id
  ) as unknown) as Order;
  return { ...old, newOrder };
}

export { read, list, update };

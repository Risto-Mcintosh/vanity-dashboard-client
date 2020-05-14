import orderData from '../test/order-data.json';
import { Order } from '../types';

async function read(id: number | string) {
  return (orderData.find((order) => order.id == id) as unknown) as Order;
}

async function list() {
  return (orderData as unknown) as Order[];
}

async function update(newOrder: Order) {
  const old = (orderData.find(
    (order) => order.id == newOrder.id
  ) as unknown) as Order;
  return { ...old, newOrder };
}

export { read, list, update };

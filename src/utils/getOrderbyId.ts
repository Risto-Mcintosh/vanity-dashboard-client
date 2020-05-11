import { Order, OrderStatus } from '../types';
import { useQuery } from 'react-query';
import { loadingOrder } from './order-placeholder';

const order1: Order = {
  id: 1,
  total: 600,
  orderedOn: new Date(),
  orderStatus: 'New',
  meta: {},
  customer: {
    id: 2,
    name: 'Someone Name',
    email: 'someone@gmail.com',
    phone: '214-333-333',
  },
  vanity: {
    color: 'Black',
    mirror: {
      size: 'Large',
      price: 200,
    },
    table: {
      size: 'Large',
      price: 200,
    },
    baseMaterial: {
      size: 'Large',
      price: 200,
    },
  },
};

function getOrder(key: string, orderId: { orderId: string }) {
  console.log(orderId);
  return Promise.resolve(order1);
}

function useOrder(orderId: string) {
  const results = useQuery(['getOrder', { orderId }], getOrder);
  return { ...results, order: results.data ?? loadingOrder };
}

function updateOrderStatus(status: OrderStatus) {
  const updatedOrder = order1;
  updatedOrder.orderStatus = status;
  return Promise.resolve(updatedOrder);
}

export { useOrder, updateOrderStatus };

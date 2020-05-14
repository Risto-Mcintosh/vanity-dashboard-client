import { Order, OrderStatus } from '../types';
import { useQuery, useMutation, queryCache } from 'react-query';
import { loadingOrder } from './order-placeholder';
import * as orderClient from './client';

let order1: Order = {
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

type orderId = {
  orderId: string;
};

function getOrder(key: string, { orderId }: orderId) {
  return orderClient.read(orderId).then((data) => data);
}

function useOrder(orderId: string) {
  const { data, ...results } = useQuery(['order', { orderId }], getOrder);
  return { ...results, order: data ?? loadingOrder };
}

function updateOrder(newOrder: Order) {
  order1 = { ...order1, ...newOrder };
  return orderClient.update(newOrder).then((data) => data);
}

function useUpdateOrderStatus() {
  return useMutation(updateOrder, {
    onMutate: (data) => {
      queryCache.removeQueries(['order', { orderId: data.id.toString() }]);
      return queryCache.setQueryData(
        ['order', { orderId: data.id.toString() }],
        data
      );
    },
  });
}

function getOrders() {
  return orderClient.list();
}

function useListOrders() {
  return useQuery(['orders'], getOrders);
}

export { useOrder, useUpdateOrderStatus, useListOrders };

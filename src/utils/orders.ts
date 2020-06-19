import { Order } from '../types';
import { useQuery, useMutation, queryCache } from 'react-query';
import { loadingOrder } from './order-placeholder';
import * as orderClient from './order-client';

type orderId = {
  orderId: number;
};

function getOrder(key: string, { orderId }: orderId) {
  return orderClient.read(orderId).then((data) => data);
}
// TODO try to get data from cache first otherwise get from DB
function useOrder(orderId: number) {
  const { data, ...results } = useQuery(['order', { orderId }], getOrder);
  return { ...results, order: data ?? loadingOrder };
}

function updateOrder(newOrder: Order) {
  return orderClient.update(newOrder).then((data) => data);
}

function useUpdateOrder() {
  return useMutation(updateOrder, {
    onMutate: (data) => {
      return queryCache.setQueryData(
        ['order', { orderId: data.id.toString() }],
        data
      );
    }
  });
}

function getOrders(key: string, { query }: { query: string }) {
  return orderClient.list(query);
}

function useListOrders(query = '') {
  const { data, ...results } = useQuery(['orders', { query }], getOrders);
  return { ...results, orders: data ?? [loadingOrder] };
}

export { useOrder, useUpdateOrder, useListOrders };

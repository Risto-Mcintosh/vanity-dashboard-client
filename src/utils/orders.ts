import { Order } from '../types';
import { useQuery, useMutation, queryCache } from 'react-query';
import { loadingOrder } from './order-placeholder';
import * as orderClient from './order-client';
import * as queryKey from './queryKeys';

type orderId = {
  orderId: number;
};

function getOrder(key: string, { orderId }: orderId) {
  return orderClient.read(orderId).then((data) => data);
}

function useOrder(orderId: number) {
  const { data, ...results } = useQuery(
    [queryKey.ORDER, { orderId }],
    getOrder
  );
  return { ...results, order: data ?? loadingOrder };
}

function updateOrder(newOrder: Order) {
  return orderClient.update(newOrder).then((data) => data);
}

function useUpdateOrder() {
  return useMutation(updateOrder, {
    onMutate: (order) => {
      const previousData = queryCache.getQueryData<Order>([
        queryKey.ORDER,
        { orderId: order.id.toString() }
      ]);
      if (previousData) {
        queryCache.setQueryData(
          [queryKey.ORDER, { orderId: order.id.toString() }],
          order
        );
      }
      return previousData;
    },
    onError: (error, order, snapshotValue) => {
      queryCache.setQueryData(
        [queryKey.ORDER, { orderId: order.id.toString() }],
        snapshotValue
      );
    }
  });
}

function getOrders(key: string, { query }: { query: string }) {
  return orderClient.list(query);
}

function useListOrders(query = '') {
  const { data, ...results } = useQuery(
    [queryKey.ORDERS, { query }],
    getOrders
  );
  return { ...results, orders: data ?? [loadingOrder] };
}

export { useOrder, useUpdateOrder, useListOrders };

import { Order } from '../types';
import { useQuery, useMutation, queryCache } from 'react-query';
import { loadingOrder } from './order-placeholder';
import * as queryKey from './queryKeys';
import { client } from './api-client';

function getOrder(orderId: number) {
  const inCache = queryCache.getQueryData<Order[]>(queryKey.ORDERS);

  const orderInCache = inCache?.find((order) => order.id === orderId);

  if (orderInCache) {
    return Promise.resolve(orderInCache);
  }
  return client<Order>(`/orders/${orderId}`);
}

function useOrder(orderId: number) {
  const { data, ...results } = useQuery({
    queryKey: queryKey.ORDER,
    queryFn: () => getOrder(orderId)
  });
  return { ...results, order: data ?? loadingOrder };
}

function onUpdateMutate(order: Order) {
  const previousData = queryCache.getQueryData<Order>(queryKey.ORDER);
  if (previousData) {
    queryCache.setQueryData(queryKey.ORDER, { ...previousData, ...order });
  }
  return previousData;
}

function useOrderUpdate() {
  return useMutation(
    (newOrder: Order) =>
      client<Order>(`/orders/${newOrder.id}`, {
        method: 'Put',
        data: newOrder
      }),
    {
      onMutate: onUpdateMutate,
      onError: (error, order, snapshotValue) => {
        queryCache.setQueryData(queryKey.ORDER, snapshotValue);
      },
      onSettled: (newOrder) => {
        console.log('useOrderUpdate: ', newOrder);
        queryCache.setQueryData(queryKey.ORDER, newOrder);
      }
    }
  );
}

function useOrderList(query = '') {
  const { data, ...results } = useQuery({
    queryKey: queryKey.ORDERS,
    queryFn: () => client<Order[]>('/orders')
  });
  return { ...results, orders: data ?? [loadingOrder] };
}

function useOrderCreate() {
  return useMutation(
    (newOrder: Partial<Order>) => client<Order>('/orders', { data: newOrder }),
    {
      onSuccess: () => queryCache.refetchQueries(queryKey.ORDERS)
    }
  );
}

export { useOrder, useOrderUpdate, useOrderList, useOrderCreate };

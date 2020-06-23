import { Order } from '../types';
import { useQuery, useMutation, queryCache } from 'react-query';
import { loadingOrder } from './order-placeholder';
import * as orderClient from './order-client';
import * as queryKey from './queryKeys';

function useOrder(orderId: number) {
  const { data, ...results } = useQuery({
    queryKey: queryKey.ORDER,
    queryFn: () => orderClient.read(orderId).then((data) => data)
  });
  return { ...results, order: data ?? loadingOrder };
}

function onUpdateMutate(order: Order) {
  const previousData = queryCache.getQueryData<Order>(queryKey.ORDER);
  if (previousData) {
    queryCache.setQueryData(queryKey.ORDER, order);
  }
  return previousData;
}

function useUpdateOrder() {
  return useMutation(
    (newOrder: Order) => orderClient.update(newOrder).then((data) => data),
    {
      onMutate: onUpdateMutate,
      onError: (error, order, snapshotValue) => {
        queryCache.setQueryData(queryKey.ORDER, snapshotValue);
      }
    }
  );
}

function useListOrders(query = '') {
  const { data, ...results } = useQuery({
    queryKey: queryKey.ORDERS,
    queryFn: () => orderClient.list(query)
  });
  return { ...results, orders: data ?? [loadingOrder] };
}

export { useOrder, useUpdateOrder, useListOrders };

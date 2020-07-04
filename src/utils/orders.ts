import { Order } from '../types';
import { useQuery, useMutation, queryCache, QueryOptions } from 'react-query';
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

type OrderQueryParams = Record<string, string> | '';

function setQueryParam(queries: OrderQueryParams) {
  if (!queries) return '';
  Object.keys(queries).forEach((key) =>
    queries[key] === '' ? delete queries[key] : {}
  );
  console.log(new URLSearchParams(queries).toString());
  return `?${new URLSearchParams(queries).toString()}`;
}

function useOrderList(
  query: OrderQueryParams = '',
  queryConfig: QueryOptions<Order[]> = {}
) {
  console.log('called with:', [queryKey.ORDERS, query]);
  const { data, ...results } = useQuery({
    queryKey: [queryKey.ORDERS, query],
    queryFn: () => client<Order[]>(`/orders${setQueryParam(query)}`),
    config: {
      ...queryConfig
    }
  });
  return { ...results, orders: data ?? [loadingOrder] };
}

function useOrderCreate() {
  return useMutation(
    (newOrder: Partial<Order>) => client<Order>('/orders', { data: newOrder }),
    {
      onSuccess: () => queryCache.invalidateQueries(queryKey.ORDERS)
    }
  );
}

export { useOrder, useOrderUpdate, useOrderList, useOrderCreate };

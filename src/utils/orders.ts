import { Order } from '../types';
import {
  useQuery,
  useMutation,
  queryCache,
  QueryOptions,
  usePaginatedQuery
} from 'react-query';
import { loadingOrder, loadingPageData } from './order-placeholder';
import * as queryKey from './queryKeys';
import { client, PaginationData } from './api-client';

function getOrder(orderId: number) {
  const inCache = queryCache.getQueryData<Order[] | { data: Order[] }>(
    queryKey.ORDERS
  );

  let orderInCache;
  if (!inCache) {
    orderInCache = null;
  } else if (Array.isArray(inCache)) {
    orderInCache = inCache.find((order) => order.id === orderId);
  } else {
    orderInCache = inCache.data.find((order) => order.id === orderId);
  }

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

function useOrderListPaginated(query: OrderQueryParams = '') {
  const { resolvedData, ...rest } = usePaginatedQuery({
    queryKey: [queryKey.ORDERS, query],
    queryFn: () =>
      client<{ data: Order[]; pageData: PaginationData }>(
        `/orders${setQueryParam(query)}`,
        {
          includePageData: true
        }
      ),
    config: {
      refetchOnWindowFocus: false
    }
  });

  return {
    ...rest,
    resolvedData: resolvedData ?? {
      data: [loadingOrder],
      pageData: loadingPageData
    }
  };
}

export {
  useOrder,
  useOrderUpdate,
  useOrderList,
  useOrderCreate,
  useOrderListPaginated
};

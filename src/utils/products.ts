import * as productClient from './product-client';
import { useQuery, useMutation, queryCache } from 'react-query';
import { loadingProduct } from './order-placeholder';
import { VanityComponent } from '../types';
import * as queryKey from './queryKeys';

function useListProducts() {
  const { data, ...results } = useQuery({
    queryKey: queryKey.PRODUCTS,
    queryFn: () => productClient.list().then((data) => data)
  });
  return { ...results, products: data ?? [loadingProduct] };
}

function useUpdateProduct() {
  return useMutation(
    (newProduct: VanityComponent) =>
      productClient.update(newProduct).then((data) => data),
    {
      onSuccess: (data) => {
        return queryCache.setQueryData(queryKey.PRODUCTS, data);
      }
    }
  );
}

export { useListProducts, useUpdateProduct };

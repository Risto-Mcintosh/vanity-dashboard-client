import { useQuery, useMutation, queryCache } from 'react-query';
import { loadingProduct } from './order-placeholder';
import { VanityComponent } from '../types';
import * as queryKey from './queryKeys';
import { client } from './api-client';

function useListProducts() {
  const { data, ...results } = useQuery({
    queryKey: queryKey.PRODUCTS,
    queryFn: () => client<VanityComponent[]>('/products'),
    config: {
      refetchOnWindowFocus: false
    }
  });
  return { ...results, products: data ?? [loadingProduct] };
}

function onProductUpdate(newProduct: VanityComponent) {
  const previousData = queryCache.getQueryData<VanityComponent[]>(
    queryKey.PRODUCTS
  );

  if (previousData) {
    const newData = previousData.map((product) => {
      if (product.type === newProduct.type && product.id === newProduct.id) {
        return { ...product, ...newProduct };
      }
      return product;
    });

    queryCache.setQueryData(queryKey.PRODUCTS, newData);
  }

  return previousData;
}

function useUpdateProduct() {
  return useMutation(
    (newProduct: VanityComponent) =>
      client<VanityComponent[]>(
        `/products/${newProduct.type}s/${newProduct.id}`,
        {
          method: 'PUT',
          data: newProduct
        }
      ),
    {
      onMutate: onProductUpdate,
      onError: (error, newProduct, snapshotValue) =>
        queryCache.setQueryData(queryKey.PRODUCTS, snapshotValue),
      onSettled: () => queryCache.refetchQueries(queryKey.PRODUCTS)
    }
  );
}

export { useListProducts, useUpdateProduct };

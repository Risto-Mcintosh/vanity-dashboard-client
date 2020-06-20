import * as productClient from './product-client';
import { useQuery, useMutation, queryCache } from 'react-query';
import { loadingProduct } from './order-placeholder';
import { VanityComponent } from '../types';
import * as queryKey from './queryKeys';

function getProducts() {
  return productClient.list().then((data) => data);
}

function useListProducts() {
  const { data, ...results } = useQuery(queryKey.PRODUCTS, getProducts);
  return { ...results, products: data ?? [loadingProduct] };
}

// TODO remove "type" from params
function updateProduct(newProduct: VanityComponent) {
  return productClient.update(newProduct).then((data) => data);
}

function useUpdateProduct() {
  return useMutation(updateProduct, {
    onSuccess: (data) => {
      return queryCache.setQueryData(queryKey.PRODUCTS, data);
    }
  });
}

export { useListProducts, useUpdateProduct };

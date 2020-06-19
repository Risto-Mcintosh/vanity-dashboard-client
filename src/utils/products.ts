import * as productClient from './product-client';
import { useQuery, useMutation, queryCache } from 'react-query';
import { loadingProduct } from './order-placeholder';
import { VanityComponent } from '../types';

function getProducts() {
  return productClient.list().then((data) => data);
}

function useListProducts() {
  const { data, ...results } = useQuery('products', getProducts);
  return { ...results, products: data ?? [loadingProduct] };
}

// TODO remove "type" from params
function updateProduct({
  type,
  newProduct
}: {
  type: string;
  newProduct: VanityComponent;
}) {
  return productClient.update(type, newProduct).then((data) => data);
}

function useUpdateProduct() {
  return useMutation(updateProduct, {
    onSuccess: (data) => {
      return queryCache.setQueryData('products', data);
    }
  });
}

export { useListProducts, useUpdateProduct };

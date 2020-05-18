import React from 'react';
import ProductCard from './ProductCard';
import { Grid } from '@material-ui/core';
import { useListProducts } from '../../utils/products';

function Products() {
  const { products } = useListProducts();
  return (
    <Grid container spacing={4}>
      {products.map((p, i) => (
        <Grid item key={i} xs={6} sm={4}>
          <ProductCard product={p} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Products;

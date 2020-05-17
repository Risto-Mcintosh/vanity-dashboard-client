import React from 'react';
import ProductCard from './ProductCard';
import { Grid } from '@material-ui/core';

const productList = [
  {
    type: 'Mirror',
    size: 'Large',
    price: 200,
  },
  {
    type: 'Mirror',
    size: 'Small',
    price: 100,
  },
  {
    type: 'Mirror',
    size: 'Medium',
    price: 150,
  },
  {
    type: 'Table',
    size: 'Large',
    price: 200,
  },
  {
    type: 'Table',
    size: 'Medium',
    price: 150,
  },
  {
    type: 'Table',
    size: 'Small',
    price: 100,
  },
];

function Products() {
  return (
    <Grid container spacing={4}>
      {productList.map((p, i) => (
        <Grid item key={i} xs={6} sm={4}>
          <ProductCard product={p} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Products;

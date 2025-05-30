import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../constants';

export default function ProductList() {
  return (
    <div className='flex flex-wrap'>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

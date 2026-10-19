import React from 'react';
import ProductCard from './productCard';

const ProductList = ({ products, onUpdate, onDelete }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;

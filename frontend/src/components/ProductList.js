// ProductList.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';

const ProductList = ({ category, priceRange }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Category:', category);
    console.log('Price Range:', priceRange);
    apiService.getProducts(category, priceRange)
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [category, priceRange]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="product-list-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

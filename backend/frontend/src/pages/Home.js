import React from 'react';
import ProductList from '../components/ProductList';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to My E-Commerce Store</h1>
      <h2 className='category-heading'>Smartphones</h2>
      <ProductList category="smartphones" />
      <h2 className='category-heading'>Laptops</h2>
      <ProductList category="laptops" />
    </div>
  );
};

export default Home;

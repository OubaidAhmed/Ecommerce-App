import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import '../styles/Shop.css';

const Shop = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPriceRange, setSelectedPriceRange] = useState('all');

    const handleCategoryChange = async (category) => {
        setSelectedCategory(category);
    };

    const handlePriceRangeChange = (priceRange) => {
        setSelectedPriceRange(priceRange);
        
    };

    return (
        <div className="shop-container">
            <h1 className="shop-heading">Shop</h1>

            <div className="filters-container">
                <div className="filter-section">
                    <h2 className="filter-heading">Category</h2>
                    <div className="filter-options">
                        <button
                            className={`filter-button ${selectedCategory === 'all' ? 'active' : ''}`}
                            onClick={() => handleCategoryChange('all')}
                        >
                            All
                        </button>
                        <button
                            className={`filter-button ${selectedCategory === 'smartphones' ? 'active' : ''}`}
                            onClick={() => handleCategoryChange('smartphones')}
                        >
                            Smartphones
                        </button>
                        <button
                            className={`filter-button ${selectedCategory === 'laptops' ? 'active' : ''}`}
                            onClick={() => handleCategoryChange('laptops')}
                        >
                            Laptops
                        </button>
                        
                    </div>
                </div>

                <div className="filter-section">
                    <h2 className="filter-heading">Price Range</h2>
                    <div className="filter-options">
                        <button
                            className={`filter-button ${selectedPriceRange === 'all' ? 'active' : ''}`}
                            onClick={() => handlePriceRangeChange('all')}
                        >
                            All
                        </button>
                        <button
                            className={`filter-button ${selectedPriceRange === 'low' ? 'active' : ''}`}
                            onClick={() => handlePriceRangeChange('low')}
                        >
                            Low
                        </button>
                        <button
                            className={`filter-button ${selectedPriceRange === 'medium' ? 'active' : ''}`}
                            onClick={() => handlePriceRangeChange('medium')}
                        >
                            Medium
                        </button>
                        <button
                            className={`filter-button ${selectedPriceRange === 'high' ? 'active' : ''}`}
                            onClick={() => handlePriceRangeChange('high')}
                        >
                            High
                        </button>
                    </div>
                </div>
            </div>

            {selectedCategory === 'all' && (
                <>
                    <ProductList category="smartphones" priceRange={selectedPriceRange} />
                    <ProductList category="laptops" priceRange={selectedPriceRange} />
                </>
            )}

            {selectedCategory !== 'all' && (
                <ProductList category={selectedCategory} priceRange={selectedPriceRange} />
            )}
        </div>
    );
};

export default Shop;

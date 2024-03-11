import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import apiService from '../services/apiService';
import '../styles/SingleProduct.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SingleProduct = () => {
    const { cart } = useCart();
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { dispatch } = useCart();

    useEffect(() => {
        apiService.getProductById(productId)
            .then((data) => setProduct(data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [productId]);

    const handleAddToCart = () => {
        if (product) {
            const existingProduct = cart.find(item => item.id === product.id);

            if (existingProduct) {
                // Product is already in the cart
                toast.info('Product is already in the cart', { autoClose: 2000 });
            } else {
                // Product is not in the cart, add it
                dispatch({
                    type: 'ADD_TO_CART',
                    payload: {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                    },
                });
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!product) {
        return <p>No product found.</p>;
    }

    const productName = product.title || 'Product Name Not Available';

    return (
        <div className="product-container">
            <div className="product-image-container">
                <img src={product.thumbnail} alt={productName} />
            </div>
            <div className="product-details">
                <h1 className="product-title">{productName}</h1>
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description || 'No description available.'}</p>
                <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
                <ToastContainer />
            </div>
        </div>

    );
};

export default SingleProduct;

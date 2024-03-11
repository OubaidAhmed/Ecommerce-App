import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Cart.css';
import { Link } from "react-router-dom";
import axios from 'axios';

const Cart = () => {
    const { cart, dispatch } = useCart();
    const { token } = useAuth();

    useEffect(() => {
        const fetchUserCart = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/api/users/cart`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch({ type: 'SET_CART', payload: response.data.cart });
            } catch (error) {
                console.error('Error fetching user cart:', error);
            }
        };

        fetchUserCart();
    }, [token, dispatch]);

    const updateServerCart = async (updatedCart) => {
        try {
            // Ensure token is defined before making the request
            if (token) {
                await axios.post('http://localhost:5000/api/users/update-cart', { cart: updatedCart }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        } catch (error) {
            console.error('Error updating server cart:', error);
        }
    };

    const handleIncreaseQuantity = (id) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: { id } });
        updateServerCart(cart);
    };

    const handleDecreaseQuantity = (id) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: { id } });
        updateServerCart(cart);
    };

    const handleRemoveItem = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
        updateServerCart(cart);
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="cart-container">
            <h1>Your Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>
                                        <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                        {item.quantity}
                                        <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                    </td>
                                    <td>${item.price}</td>
                                    <td>${item.price * item.quantity}</td>
                                    <td>
                                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="cart-total">
                        <p>Total: ${calculateTotalPrice()}</p>
                        <Link to="/checkout">
                            <button className="proceed-to-checkout-button">Proceed to Checkout</button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;

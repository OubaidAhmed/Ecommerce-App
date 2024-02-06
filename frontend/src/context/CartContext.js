// CartContext.js
import React, { createContext, useReducer, useContext } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingProduct = state.find(item => item.id === action.payload.id);

            if (existingProduct) {
                // If the product is already in the cart, increase the quantity by 1
                const updatedCart = state.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                );
                return updatedCart;
            } else {
                // If it's not in the cart, add it with quantity 1
                return [...state, { ...action.payload, quantity: 1 }];
            }

        case 'REMOVE_FROM_CART':
            // Remove the product from the cart
            return state.filter(item => item.id !== action.payload.id);

        case 'INCREASE_QUANTITY':
            // Increase the quantity of the specified product by 1
            return state.map(item =>
                item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            );

        case 'DECREASE_QUANTITY':
            // Decrease the quantity of the specified product by 1
            return state.map(item =>
                item.id === action.payload.id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            );

        default:
            return state;
    }
};


const CartProvider = ({ children }) => {
    const { token, user } = useAuth();

    const [cart, dispatchCart] = useReducer(cartReducer, []);

    const updateServerCart = async (updatedCart) => {
        try {
            // Ensure token and user are defined before making the request
            if (token && user) {
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

    const handleDispatch = (action) => {
        dispatchCart(action);
        updateServerCart(cart); // Update server cart on each change
    };

    return (
        <CartContext.Provider value={{ cart, dispatch: handleDispatch }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
};

export { CartProvider, useCart };

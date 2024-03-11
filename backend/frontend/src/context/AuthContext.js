// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                userId: action.payload.userId,
                user: action.payload.user,
            };
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                userId: null,
                token: null,
            };

        case 'SET_USER':
            return {
                ...state,
                user: action.payload.user,
            };

        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token');
    const initialState = {
        isAuthenticated: !!token,
        userId: null,
        user: null, // Add user field to store user information
    };

    const [authState, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const checkToken = async () => {
            if (token) {
                try {
                    const response = await axios.post('http://localhost:5000/api/users/verify', { token }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.data.valid) {
                        dispatch({ type: 'LOGIN', payload: { userId: response.data.userId, token } });

                        // Fetch user profile after login
                        const userProfileResponse = await axios.get('http://localhost:5000/api/users/profile', {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        dispatch({ type: 'SET_USER', payload: { user: userProfileResponse.data.user } });
                    } else {
                        dispatch({ type: 'LOGOUT' });
                    }
                } catch (error) {
                    console.error('Error verifying token:', error);
                }
            }
        };

        checkToken();
    }, [token]);

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

    const handleDispatch = (action) => {
        dispatch(action);
        updateServerCart(authState.cart); // Use authState.cart instead of undefined cart
    };

    return <AuthContext.Provider value={{ ...authState, dispatch: handleDispatch }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
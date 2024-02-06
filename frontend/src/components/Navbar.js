// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { cart } = useCart();
    const { isAuthenticated, dispatch } = useAuth();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        dispatch({ type: 'SET_USER', payload: { user: null } });
    };

    const renderAuthLinks = () => {
        return (
            <div className="avatar-dropdown">
                <span role="img" aria-label="avatar" style={{ fontSize: '24px' }}>
                    🧑
                </span>
                <div className="dropdown-content">
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" className="dropdown-link">
                                Profile Dashboard
                            </Link>
                            <Link to="/order-tracking" className="dropdown-link">
                                Order Tracking
                            </Link>
                            <Link to="/" onClick={handleLogout} className="dropdown-link">
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="dropdown-link">
                                Login
                            </Link>
                            <Link to="/signup" className="dropdown-link">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to='/' ><h3>EcomShop</h3></Link>
            </div>
            <div className="navbar-pages">
                <Link to="/" className="nav-link">
                    Home
                </Link>
                <Link to="/shop" className="nav-link">
                    Shop
                </Link>
                <Link to="/about" className="nav-link">
                    About
                </Link>
                <Link to="/contact" className="nav-link">
                    Contact Us
                </Link>
            </div>
            <div className="nav-icons">
                <Link to="/cart" className="cart-icon">
                    <span role="img" aria-label="cart">
                        🛒
                    </span>
                    ({cart.length})
                </Link>
                {renderAuthLinks()}
            </div>
        </nav>
    );
};

export default Navbar;

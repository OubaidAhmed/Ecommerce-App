// Checkout.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Checkout.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import ModalComponent from '../components/Modal';


const Checkout = () => {
    const { cart } = useCart();
    const { token, isAuthenticated } = useAuth();
    const [isThankYouModalOpen, setThankYouModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        paymentMethod: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handlePayNow = async () => {
        if (isAuthenticated) {
            try {
                await axios.post('http://localhost:5000/api/orders', { cart }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Open the modal
                setThankYouModalOpen(true);
            } catch (error) {
                console.error('Error placing order:', error);
            }
        } else {
            // Redirect to login or show a login modal
            setLoginModalOpen(true);
        }
    };

    // Handle close button click in the modal
    const handleCloseModal = () => {
        // Close the modal
        setThankYouModalOpen(false);
        setLoginModalOpen(false);

        // Optionally, redirect to the home page or perform any other action
    };

    return (
        <div className="checkout-container">
            <div className="order-summary">
                <h2>Order Summary</h2>
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                                <td>${item.price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="total-price">
                    <p>Total: ${calculateTotalPrice()}</p>
                </div>
            </div>

            <div className="checkout-form">
                <h2>Customer Information</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" id="firstName" name="firstName" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" id="lastName" name="lastName" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" id="email" name="email" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="addressLine1">Address Line 1:</label>
                        <input type="text" id="addressLine1" name="addressLine1" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="addressLine2">Address Line 2:</label>
                        <input type="text" id="addressLine2" name="addressLine2" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" name="city" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <input type="text" id="state" name="state" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip">ZIP Code:</label>
                        <input type="text" id="zip" name="zip" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country:</label>
                        <input type="text" id="country" name="country" onChange={handleChange} required />
                    </div>
                </form>
            </div>

            <div className="payment-options">
                <h2>Payment Options</h2>
                <form>
                    <div className="form-group">
                        <input
                            type="radio"
                            id="paypal"
                            name="paymentMethod"
                            value="paypal"
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                    <div className="form-group">
                        <input
                            type="radio"
                            id="stripe"
                            name="paymentMethod"
                            value="stripe"
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                    <div className="form-group">
                        <input
                            type="radio"
                            id="bankTransfer"
                            name="paymentMethod"
                            value="bankTransfer"
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="bankTransfer">Bank Transfer</label>
                    </div>
                </form>
            </div>

            <div className="pay-now-button">
                <button onClick={handlePayNow}>Pay Now</button>
            </div>

            {/* Thank You Modal */}
            <ModalComponent
                isOpen={isThankYouModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Thank You Modal"
                title="Thank You for Your Purchase!"
                description="Your order has been successfully placed."
                onCloseAction={handleCloseModal}
            />
            {/* Login Modal */}
            <ModalComponent
                isOpen={isLoginModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Login Modal"
                title="Please Login"
                description="You need to be logged in to complete the purchase."
                onCloseAction={handleCloseModal}
            />

        </div>
    );
};

export default Checkout;

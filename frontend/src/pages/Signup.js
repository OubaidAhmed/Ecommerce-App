import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css'; // Import the CSS file

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log('Form data submitted:', formData);
            const response = await axios.post('http://localhost:5000/api/users/signup', formData);
            console.log('Signup successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form-container">
                <h2>Signup</h2>
                <form className="signup-form" onSubmit={handleSubmit} method="POST">
                    <label className="signup-label" htmlFor="username">Username:</label>
                    <input
                        className="signup-input"
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />

                    <label className="signup-label" htmlFor="email">Email:</label>
                    <input
                        className="signup-input"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label className="signup-label" htmlFor="password">Password:</label>
                    <input
                        className="signup-input"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button className="signup-button" type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

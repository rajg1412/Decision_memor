import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';
import './Auth.css';

const Auth = ({ isSignup }) => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            let data;
            if (isSignup) {
                if (formData.password !== formData.confirmPassword) {
                    setError("Passwords don't match");
                    return;
                }
                const { data: res } = await api.signUp(formData);
                data = res;
            } else {
                const { data: res } = await api.signIn(formData);
                data = res;
            }
            localStorage.setItem('user', JSON.stringify(data.result));
            localStorage.setItem('token', JSON.stringify(data.token));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <input name="username" placeholder="Username" onChange={handleChange} required />
                    )}
                    <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                    {isSignup && (
                        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
                    )}
                    <button type="submit" className="auth-btn">{isSignup ? 'Register' : 'Login'}</button>
                </form>
            </div>
        </div>
    );
};

export default Auth;

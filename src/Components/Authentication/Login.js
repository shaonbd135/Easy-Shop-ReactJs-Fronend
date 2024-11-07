import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Authentication.css';
import { loggedInDataContext } from '../../RoutesIndex/RoutesIndex';
import axios from 'axios';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(loggedInDataContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://easy-shop-nodejs-server.onrender.com/login', {
            email: formData.email,
            password: formData.password
        })
            .then(response => {
                if (response.data.success) {
                    setLoggedInUser(response.data.data);
                    setErrorMessage('');
                    localStorage.setItem('user', JSON.stringify(response.data.data));
                    const intendedPath = localStorage.getItem('intendedPath') || '/my-account';
                    navigate(intendedPath);
                    localStorage.removeItem('intendedPath');
                } else {
                    setErrorMessage(response.data.message);
                }
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            });
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>


                {errorMessage && <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>}
                <button type="submit" className="btn btn-custom w-100">Login</button>
                <p className="text-center mt-3">
                    Don't have an account? <Link to="/signup" className="form-link">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;


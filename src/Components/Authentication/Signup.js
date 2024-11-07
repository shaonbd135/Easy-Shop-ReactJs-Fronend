import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Authentication.css';
import axios from 'axios';


const Signup = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        axios.post('https://easy-shop-nodejs-server.onrender.com/signup', {
            name: formData.name,
            email: formData.email,
            password: formData.password
        })
            .then(res => {
                if (res.data.success === true) {
                    alert(res.data.message);
                    setErrorMessage('');
                    navigate('/login');
                }
                else if (res.data.success === false) {
                    setErrorMessage(res.data.message);
                }
                else {
                    setErrorMessage(res.data.message);
                }
            })
            .catch(err => {
                setErrorMessage(err.response.data.message);
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            });

    };

    return (
        <div className="form-container">
            <h2 className="form-title">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input style={{ width: '100%', height: '30px' }}
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input style={{ width: '100%', height: '30px' }}
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
                    <input style={{ width: '100%', height: '30px' }}
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input style={{ width: '100%', height: '30px' }}
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errorMessage && <div class="alert alert-danger" role="alert">
                    {errorMessage}
                </div>}
                <button type="submit" className="btn btn-custom w-100">Sign Up</button>
                <p className="text-center mt-3">
                    Already have an account? <Link to="/login" className="form-link">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;

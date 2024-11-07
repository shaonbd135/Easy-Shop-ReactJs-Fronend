import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditPofile.css';
import { Link, useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [profile, setProfile] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });

    useEffect(() => {
        // Fetch the user's profile data from the server and set it to the profile state
        const fetchProfile = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem('user')).userId;
                const response = await axios.get(`https://easy-shop-nodejs-server.onrender.com/user/${userId}`);
                setProfile(response.data.user);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = JSON.parse(localStorage.getItem('user')).userId;
            const response = await axios.put(`https://easy-shop-nodejs-server.onrender.com/user/${userId}`, profile);
            setProfile(response.data.user);
            setSuccessMessage('Profile updated successfully!');
           
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!profile.name) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container edit-profile-container">
            <Link to="/my-account">
                        <button className="btn btn-primary">
                            <i className="bi bi-arrow-left"></i> Back to My Account
                        </button>
                    </Link>
            <h2 className="text-center text-primary mb-4" style={{marginTop: '30px'}}>Edit Profile</h2>
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={profile.city}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={profile.state}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="zip" className="form-label">Zip</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={profile.zip}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={profile.country}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block">Save Changes</button>
                </div>
            </form>
            {
                successMessage && <div style={{ position: 'absolute', bottom: '0', right: '20px' }} className="alert alert-success text-light bg-success d-flex align-items-center" role="alert"><i className="bi bi-check-circle-fill"></i>&nbsp;{successMessage}</div>
            }
        </div>
    );
};

export default EditProfile;

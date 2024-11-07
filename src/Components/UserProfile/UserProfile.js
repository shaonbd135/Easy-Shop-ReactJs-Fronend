import React, { useContext, useEffect, useState } from 'react';
import { WishListDataContext, loggedInDataContext } from '../../RoutesIndex/RoutesIndex';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
    const [loggedInUser] = useContext(loggedInDataContext);
    const [wishListData, setWishListData] = useContext(WishListDataContext);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            axios.get(`https://easy-shop-nodejs-server.onrender.com/orders/${user.userId}`)
                .then(res => {
                    setOrders(res.data.orders);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [loggedInUser]);

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

    return (
        <div className="container  bg-light p-4">
            <div className="row">
                <div className="col-12 mb-4">
                    <div className="text-center">
                        <h4 className="text-white bg-primary p-3 rounded">My Account</h4>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card shadow-lg mb-4">
                        <div className="card-body">
                            <h2 className="card-title text-center text-primary">Personal Information</h2>
                            <div className="text-center my-3">
                                <i className="bi bi-person-circle" style={{ fontSize: '3rem', color: '#00416a' }}></i>
                            </div>
                            <p className="card-text text-center"><strong>Name:</strong> {profile.name}</p>
                            <p className="card-text text-center"><strong>Address:</strong> {profile.address ? profile.address : 'N/A'}</p>
                            
                            <div className="text-center">
                                <Link to="/edit-profile" className="btn btn-primary default-btn ">Edit Profile</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-8">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <h2 className="card-title text-center text-primary">Order History</h2>
                                    <div className="text-center my-3">
                                        <i className="bi bi-bag-check-fill" style={{ fontSize: '3rem', color: '#00416a' }}></i>
                                    </div>
                                    <p className="card-text text-center">You have total {orders.length} orders.</p>
                                    <div className="text-center">
                                        <Link to="/orders" className="btn btn-success btn-lg">View Orders</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <h2 className="card-title text-center text-primary">Wishlist</h2>
                                    <div className="text-center my-3">
                                        <i className="bi bi-heart-fill" style={{ fontSize: '3rem', color: '#dc3545' }}></i>
                                    </div>
                                    <p className="card-text text-center"> You have {wishListData.length} items in your wishlist</p>
                                    <div className="text-center">
                                        <Link to="/wishlist" className="btn btn-danger btn-lg">View Wishlist</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;


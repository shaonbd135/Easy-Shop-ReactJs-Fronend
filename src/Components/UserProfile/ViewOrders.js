import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ViewOrders.css';
import axios from 'axios';

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            axios.get(`https://easy-shop-nodejs-server.onrender.com/orders/${user.userId}`)
                .then(res => {
                    setOrders(res.data.orders);
                    setLoading(false);

                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, []);

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }



    return (
        <div className="container mt-5" style={{ marginBottom: "140px" }}>
            <div className="row">
                <div className="col-12 col-md-12">
                    <Link to="/my-account">
                        <button className="btn btn-primary">
                            <i className="bi bi-arrow-left"></i> Back to My Account
                        </button>
                    </Link>
                    <h1 className="text-center text-primary mt-3" style={{ fontSize: "25px", fontWeight: "bold" }}>My Orders</h1>
                    <div className="table-responsive mt-4">
                        <table className="table table-bordered table-hover">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th className="text-center">Order ID</th>
                                    <th className="text-center" >Date</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Total</th>
                                    <th className="text-center">Items</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td className="text-center">#{order._id}</td>
                                        <td className="text-center">{new Date(order.OrderDate).toLocaleDateString()}</td>
                                        <td className="text-center">{order.orderStatus}</td>
                                        <td className="text-center">$ {order.totalCost}</td>
                                        <td className="text-center">{order.productInfo.length}</td>
                                        <td className="text-center">
                                            <Link to={`/order/${order._id}`} className="btn btn-primary btn-sm">Order Details</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewOrders;



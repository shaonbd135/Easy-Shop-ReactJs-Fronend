import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    const today = new Date();
    const todayDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const next5Days = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000);
    const estimatedDeliveryDate = next5Days.getDate() + '-' + (next5Days.getMonth() + 1) + '-' + next5Days.getFullYear();
    return (
        <div className="container mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title" style={{ fontSize: "30px", fontWeight: "bold", color: "#117A65" }}>Thank You for Your Order!</h2>
                    <p className="card-text">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
                    <p className="card-text">Order Number: <strong>#12345</strong></p>
                    <p className="card-text">Order Date: <strong>{todayDate}</strong></p>
                    <p className="card-text">Estimated Delivery Date: <strong>{estimatedDeliveryDate}</strong></p>
                    <Link to="/" className="btn btn-secondary default-btn mt-3 " style={{width:'200px'}}>Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
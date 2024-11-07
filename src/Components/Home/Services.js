import React from 'react';
import './Services.css';

const Services = () => {
    return (
        <div className='container mt-5'>
            
            <div className="row text-center">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0 service-card" style={{ borderRadius: '20px', backgroundColor: '#f0f8ff' }}>
                        <div className="card-body">
                            <i className="bi bi-award-fill" style={{ fontSize: '40px', color: '#28a745' }}></i>
                            <h5 className="card-title mt-3" style={{ color: '#00416a' }}>Quality Products</h5>
                            <p className="card-text" style={{ color: '#2C597D' }}>We offer a wide range of high-quality products from trusted brands.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0 service-card" style={{ borderRadius: '20px', backgroundColor: '#f0f8ff' }}>
                        <div className="card-body">
                            <i className="bi bi-truck" style={{ fontSize: '40px', color: '#00416a' }}></i>
                            <h5 className="card-title mt-3" style={{ color: '#00416a' }}>Fast Delivery</h5>
                            <p className="card-text" style={{ color: '#2C597D' }}>Enjoy fast and reliable delivery to your doorstep. Our team is ready.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0 service-card" style={{ borderRadius: '20px', backgroundColor: '#f0f8ff' }}>
                        <div className="card-body">
                            <i className="bi bi-headset" style={{ fontSize: '40px', color: '#ffc107' }}></i>
                            <h5 className="card-title mt-3" style={{ color: '#00416a' }}>Customer Support</h5>
                            <p className="card-text" style={{ color: '#2C597D' }}>Our support team is here to help you with any queries.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;

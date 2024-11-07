import React from 'react';
import './AboutUs.css';
import { Link } from 'react-router-dom';


const AboutUs = () => {
    return (
        <div className="about-section">
            <div className="container">
                <h2 style={{ color: '#00416a', fontWeight: 'bold',  }} className="text-center">About Us</h2>
                <p className="text-center text-muted">Welcome to Easy Shop - Your one-stop destination for all your shopping needs!</p>
                <hr className="mb-5" />

                <div className="row mb-5">
                    <div className="col-md-6">
                        <img src="https://evergreendm.com/wp-content/uploads/2021/01/transition-to-online-business.jpg" alt="Our Team" className="img-fluid shadow rounded" />
                    </div>
                    <div className="col-md-6">
                        <h3 className="mb-4" style={{ color: '#117A65' }}>Our Story</h3>
                        <hr style={{color:'lightgray'}} />
                        <p className="text-muted">
                            Easy Shop was founded with a vision to provide an exceptional online shopping experience. Our team is dedicated to offering the best products at unbeatable prices, coupled with outstanding customer service.
                        </p>
                        <p className="text-muted">
                            We believe in the power of technology to make shopping more accessible and enjoyable. With a wide range of products and a user-friendly platform, Easy Shop is here to cater to all your needs, anytime and anywhere.
                        </p>
                        <p className="text-muted">
                            Join us on this journey as we continue to innovate and bring you the best shopping experience possible.
                        </p>
                    </div>
                </div>

                <div className="row text-center mt-3">
                    <div className="col-md-4 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <i className="bi bi-award-fill text-success" style={{ fontSize: '40px' }}></i>
                                <h5 className="card-title mt-3">Quality Products</h5>
                                <p className="card-text text-muted">We offer a wide range of high-quality products from trusted brands.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <i className="bi bi-truck text-primary" style={{ fontSize: '40px' }}></i>
                                <h5 className="card-title mt-3">Fast Delivery</h5>
                                <p className="card-text text-muted">Enjoy fast and reliable delivery to your doorstep. Our team will get your order </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <i className="bi bi-headset text-warning" style={{ fontSize: '40px' }}></i>
                                <h5 className="card-title mt-3">Customer Support</h5>
                                <p className="card-text text-muted">Our support team is here to help you with any queries.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-5">
                    <Link style={{width:'300px'}} to="/contact-us" className="btn btn-primary default-btn">Contact Us</Link>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;

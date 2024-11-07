import React from 'react';
import logo from '../../Images/logo.png';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light pt-5 pb-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4 text-center ">
                        <div className='p-2' style={{ backgroundColor: '#fff', borderRadius: '30px' }}>
                            <img src={logo} alt="Easy Shop Logo" className="footer-logo mb-3" />
                        </div>
                        <p className="text-muted mt-2">Easy Shop - Your one-stop destination for all your shopping needs!</p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h5 className="text-uppercase" style={{ color: '#df8142' }}>Quick Links</h5>
                        <ul className="list-unstyled ">
                            <Link to="/" className="text-light"><li>Home</li></Link>
                            <Link to="/shop" className="text-light"><li>Shop</li></Link>
                            <Link to="/about-us" className="text-light"><li>About Us</li></Link>
                            <Link to="/contact-us" className="text-light"><li>Contact Us</li></Link>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h5 className="text-uppercase" style={{ color: '#df8142' }}>Contact Us</h5>
                        <ul className="list-unstyled">
                            <Link><li><i className="bi bi-geo-alt-fill"></i> 123 Easy St, Shop City, SH 12345</li></Link>
                            <Link><li><i className="bi bi-phone-fill"></i> +123 456 7890</li></Link>
                            <Link><li><i className="bi bi-envelope-fill"></i> support@easyshop.com</li></Link>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center mt-3">
                        <ul className="social-icons list-inline">
                            <Link  className="list-inline-item social-icon"><i className="bi bi-facebook"></i></Link>
                            <Link className="list-inline-item social-icon"><i className="bi bi-twitter"></i></Link>
                            <Link className="list-inline-item social-icon"><i className="bi bi-instagram"></i></Link>
                            <Link className="list-inline-item social-icon"><i className="bi bi-linkedin"></i></Link>
                        </ul>
                        <p className="mt-3 text-light">Developed by © Saidur Rahaman {new Date().getFullYear()} | All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

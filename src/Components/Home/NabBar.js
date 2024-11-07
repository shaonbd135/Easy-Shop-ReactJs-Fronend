import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../../Images/logo.png';


const NabBar = () => {
    return (
        
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#fff" }}>
                <div className="container">
                    {/* <Link className="navbar-brand" to="/" ><img style={{ width: "60px" }} src={logo} alt="logo" /></Link> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item ">
                                <Link style={{fontSize:"16px",marginRight:"10px"}} className="nav-link active" aria-current="page" to="/" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={{fontSize:"16px",marginRight:"10px"}} className="nav-link" to="/about-us" >About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={{fontSize:"16px",marginRight:"30px"}} className="nav-link" to="/contact-us" >Contact Us</Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link style={{fontSize:"15px",marginRight:"10px"}} className="nav-link" to="/signup" >Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={{fontSize:"15px",marginRight:"10px"}} className="nav-link" to="/login" >Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        
    );
};

export default NabBar;
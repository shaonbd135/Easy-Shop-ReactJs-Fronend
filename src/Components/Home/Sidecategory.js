import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CartDataContext, loggedInDataContext } from '../../RoutesIndex/RoutesIndex';

const Sidecategory = () => {
    const [loggedInUser, setLoggedInUser] = useContext(loggedInDataContext);
    const [cartData] = useContext(CartDataContext);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        axios.get('https://dummyjson.com/products/category-list')
            .then(res => {
                setCategoryList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setLoggedInUser({});

    };

    return (
        <nav className="navbar bg-light" >

            <div className="container" >

                <div className='d-flex justify-content-center'>
                    <button
                        style={{ backgroundColor: "#00416a", height: "35px", width: "170px" }}
                        className="navbar-toggler me-auto d-flex align-items-center justify-content-center"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <i className="bi bi-list" style={{ color: "white", marginRight: "10px" }}></i>
                        <p style={{ color: "white", margin: 0 }}>Categories</p>
                    </button>
                    <div className='nav-cart-icons' style={{ display: 'none' }}>
                        <div className="d-flex ms-5">
                            <div className=" position-relative me-4">
                                <i type="button" className="bi bi-heart me-3 " style={{ fontSize: "30px", color: "#00416a" }}>
                                </i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill " style={{ fontSize: "12px", backgroundColor: "#00416a" }} >
                                    0
                                </span>
                            </div>
                            <div className=" position-relative me-3">
                                <Link to="/cart"><i type="button" className="bi bi-cart4 me-3 " style={{ fontSize: "30px", color: "#00416a" }}>
                                </i></Link>
                                <Link to="/cart"><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill " style={{ fontSize: "12px", backgroundColor: "#00416a" }} >
                                    {cartData.length}
                                </span></Link>
                            </div>
                        </div>

                    </div>

                </div>
                <div className=" navbar navbar-expand-lg navbar-light ms-auto"  >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item nav-items">
                                <Link style={{ fontSize: "16px", marginRight: "10px" }} className="nav-link active nav-links" aria-current="page" to="/" >Home</Link>
                            </li>
                            <li className="nav-item nav-items">
                                <Link style={{ fontSize: "16px", marginRight: "10px" }} className="nav-link nav-links" to="/about-us" >About Us</Link>
                            </li>
                            <li className="nav-item nav-items">
                                <Link style={{ fontSize: "16px", marginRight: "100px" }} className="nav-link nav-links" to="/contact-us" >Contact Us</Link>
                            </li>

                            {
                                loggedInUser.email ? <div className='d-flex'>
                                    <li>
                                        <Link style={{ fontSize: "15px", marginRight: "10px" }} className="nav-link nav-links" to="/my-account" >My Account</Link>
                                    </li>
                                    <li>
                                        <Link onClick={handleLogout} style={{ fontSize: "15px", marginRight: "10px" }} className="nav-link nav-links"  >Logout</Link>
                                    </li>


                                </div>

                                    :
                                    <div className='d-flex'>
                                        <li>
                                            <Link style={{ fontSize: "15px", marginRight: "10px" }} className="nav-link nav-links" to="/signup" >Sign Up</Link>
                                        </li>
                                        <li className="nav-item nav-items">
                                            <Link style={{ fontSize: "15px", marginRight: "10px" }} className="nav-link nav-links" to="/login" >Login</Link>
                                        </li>
                                    </div>
                            }
                        </ul>
                    </div>
                </div>




                <div
                    style={{ backgroundColor: "#2C597D", width: "270px", color: "white" }}
                    className="offcanvas offcanvas-start"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header">
                        <h5 style={{ color: "white", fontSize: "25px" }} className="offcanvas-title mt-5" id="offcanvasNavbarLabel">CATEGORIES</h5>
                        <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        <hr />
                        <ul className="navbar-nav flex-grow-1 pe-3">
                            <h5>Bestseller Categories</h5>
                            <hr style={{ color: "lightgray" }} />
                            <li className="nav-item">
                                <Link to="/category/mobile-accessories" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "20px" }} className="nav-link" aria-current="page" >
                                    <i className="bi bi-laptop me-2"></i> Electronics
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "20px" }} to="/category/beauty">
                                    <i className="bi bi-bag me-2"></i> Fashion
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "20px" }} to="/category/groceries">
                                    <i className="bi bi-egg-fried me-2"></i> Grocery
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "20px" }} to="/category/groceries">
                                    <i className="bi bi-cup me-2"></i> Drinks
                                </Link>
                            </li>
                        </ul>

                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle mt-3 w-100"
                                type="button"
                                id="categoryDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"

                            >
                                More Categories
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end " aria-labelledby="categoryDropdown" >
                                {categoryList.map((category) => (
                                    <li key={category}>
                                        <Link
                                            className="dropdown-item"
                                            to={`/category/${category}`}
                                        >
                                            {category}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidecategory;

import React, { useContext, useEffect, useState } from 'react';
import { CartDataContext, WishListDataContext, loggedInDataContext } from '../../RoutesIndex/RoutesIndex';
import { Link } from 'react-router-dom';
import logo from '../../Images/logo.png';


const SearchBar = () => {
    const [cartData, setCartData] = useContext(CartDataContext);
    const [wishListData, setWishListData] = useContext(WishListDataContext)
    const [wishlistLength, setWishlistLength] = useState(0)
    const [loggedInUser, setLoggedInUser] = useContext(loggedInDataContext)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setWishlistLength(wishListData.length)
        }
        if (!user) {
            setWishlistLength(0)
        }
    }, [loggedInUser.userId, wishListData])

    return (
        <div className='container-fluid bg-light p-3'>
            <div className='container'>
                <div className="row">
                    <div className="col-md-8 col-lg-8 col-12 d-flex  ">
                        <img style={{ width: "70px" }} src={logo} alt="" />

                        <div className='d-flex w-100'>
                            <form className="d-flex justify-content-center m-auto   " role="search" style={{ justifyContent: 'center', height: '30px' }}>
                                <input style={{ borderRadius: "10px", border: "1px solid #00416a" }} className="form-control me-2 " type="search" placeholder="Search Product" aria-label="Search" />
                                <Link to={"/search-item"}><button className="default-btn" type="submit">Search</button></Link>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4 col-4 d-flex justify-content-end cart-wishlist mt-3" >
                        <div className=" position-relative me-4">
                            <Link to="/wishlist"> <i type="button" className="bi bi-heart me-3 " style={{ fontSize: "30px", color: "#00416a" }}>
                            </i> </Link>
                            <Link to="/wishlist"> <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill " style={{ fontSize: "12px", backgroundColor: "#00416a" }} >
                                {wishlistLength}
                            </span> </Link>
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
        </div>
    );
};

export default SearchBar;
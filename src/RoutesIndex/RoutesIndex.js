import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './../Components/Home/Home';
import SearchBar from '../Components/Home/SearchBar';
import ProductDetails from '../Components/ProductDetails/ProductDetails';
import Sidecategory from '../Components/Home/Sidecategory';
import SideCartIcon from '../Components/Home/SideCartIcon';
import ProductData from '../Components/ProductData/ProductData';
import Cart from '../Components/Cart/Cart';
import Shop from '../Components/Shop/Shop';
import Checkout from '../Components/Checkout/Checkout';
import OrderSuccess from '../Components/OrderSuccess/OrderSuccess';
import ProductByCategory from '../Components/ProductByCategory/ProductByCategory';
import axios from 'axios';
import Login from '../Components/Authentication/Login';
import Signup from '../Components/Authentication/Signup';
import UserProfile from '../Components/UserProfile/UserProfile';
import PrivateRoutes from '../Components/PrivateRoutes/PrivateRoutes';
import ViewOrders from '../Components/UserProfile/ViewOrders';
import OrderDetails from '../Components/UserProfile/OrderDetails';
import Wishlist from '../Components/Wishlist/Wishlist';
import EditProfile from '../Components/UserProfile/EditProfile';
import AboutUs from '../Components/AboutUs/AboutUs';
import ContactUs from '../Components/ContactUs/ContactUs';
import Footer from '../Components/Footer/Footer';
import ScrollToTop from '../Components/Scroll/ScrollToTop';
import Search from '../Components/SearchPage/Search';

export const ProductDataContext = createContext();
export const CartDataContext = createContext();
export const PublicProductDataContext = createContext();
export const loggedInDataContext = createContext();
export const WishListDataContext = createContext();
export const addToWishlistData = createContext();

const RoutesIndex = () => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [productDatabase, setProductDatabase] = useState([...ProductData]);
    const [publicProductDatabase, setPublicProductDatabase] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [wishListData, setWishListData] = useState([]);

    //..........
    const [addToWishlistDataP, setAddToWishlistDataP] = useState([]); //it's just used to real time update the wishlist product length on the wishlist icon
    //..........


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setLoggedInUser(user);
        }
    }, []);

    useEffect(() => {
        axios.get('https://dummyjson.com/products?limit=200&skip=0')
            .then(res => {
                setPublicProductDatabase(res.data.products);
            });
    }, []);

    useEffect(() => {
        if (loggedInUser.userId) {
            axios.get(`https://easy-shop-nodejs-server.onrender.com/wishlist/${loggedInUser.userId}`)
                .then(res => {
                    setWishListData(res.data.wishlist);
                })
                .catch(err => {
                    console.error('Error fetching wishlist:', err);
                });
        }
    }, [loggedInUser.userId, addToWishlistDataP]);


    return (

        <loggedInDataContext.Provider value={[loggedInUser, setLoggedInUser]}>
            <ProductDataContext.Provider value={[productDatabase, setProductDatabase]}>
                <CartDataContext.Provider value={[cartData, setCartData]}>
                    <PublicProductDataContext.Provider value={[publicProductDatabase, setPublicProductDatabase]}>
                        <WishListDataContext.Provider value={[wishListData, setWishListData]}>
                            <addToWishlistData.Provider value={[addToWishlistDataP, setAddToWishlistDataP]}>
                                <BrowserRouter>
                                    <ScrollToTop />
                                    <SearchBar />
                                    <Sidecategory />
                                    <SideCartIcon />
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/product/:productCategory/:id" element={<ProductDetails />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/shop" element={<Shop />} />
                                        <Route path="/checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>} />
                                        <Route path="/place-order" element={<OrderSuccess />} />
                                        <Route path="/category/:category" element={<ProductByCategory />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/signup" element={<Signup />} />
                                        <Route path="/my-account" element={<PrivateRoutes><UserProfile /></PrivateRoutes>} />
                                        <Route path="/orders" element={<PrivateRoutes><ViewOrders /></PrivateRoutes>} />
                                        <Route path="/order/:orderId" element={<PrivateRoutes><OrderDetails /></PrivateRoutes>} />
                                        <Route path="/wishlist" element={<PrivateRoutes><Wishlist /></PrivateRoutes>} />
                                        <Route path="edit-profile" element={<PrivateRoutes><EditProfile /></PrivateRoutes>} />
                                        <Route path='about-us' element={<AboutUs />} />
                                        <Route path='contact-us' element={<ContactUs />} />
                                        <Route path='search-item' element={<Search />} />
                                    </Routes>
                                    <Footer />
                                </BrowserRouter>
                            </addToWishlistData.Provider>
                        </WishListDataContext.Provider>
                    </PublicProductDataContext.Provider>
                </CartDataContext.Provider>
            </ProductDataContext.Provider>
        </loggedInDataContext.Provider>
    );
};

export default RoutesIndex;

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';
import { CartDataContext, PublicProductDataContext, WishListDataContext, loggedInDataContext } from '../../RoutesIndex/RoutesIndex';
import ProductData from '../ProductData/ProductData';
import axios from 'axios';

const Wishlist = () => {
    const [products, setProducts] = useState(ProductData);
    const [publicProductDatabase] = useContext(PublicProductDataContext);
    const [wishListData, setWishListData] = useContext(WishListDataContext);
    const [cartData, setCartData] = useContext(CartDataContext);
    const [showWishlistProduct, setShowWishlistProduc] = useState([]);
    const [loggedInUser] = useContext(loggedInDataContext);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const wishlistIds = wishListData.map(item => item.productId);
        const publicWishlistProducts = publicProductDatabase.filter(item => wishlistIds.includes(item.id.toString()));
        const localWishlistProducts = products.filter(item => wishlistIds.includes(item.id.toString()));
        const combinedWishlistProducts = [...publicWishlistProducts, ...localWishlistProducts];
        setShowWishlistProduc(combinedWishlistProducts);
    }, [publicProductDatabase, products, wishListData]);

    const handleAddToCart = (product) => {
        const addedProduct = cartData.find((pd) => pd.id === product.id);

        if (addedProduct) {
            const updatedCartData = cartData.map((pd) =>
                pd.id === product.id ? { ...pd, quantity: pd.quantity + 1 } : pd
            );
            setCartData(updatedCartData);
        } else {
            setCartData([...cartData, { ...product, quantity: 1 }]);
        }
    };

    const handleRemoveFromWishlist = async (id) => {
        const userId = loggedInUser.userId;
        const findItem = wishListData.find(item => item.productId.toString() === id.toString());


        if (findItem) {
            try {
                const response = await axios.delete(`https://easy-shop-nodejs-server.onrender.com/wishlist/${userId}/${findItem._id}`);
                setWishListData(prevWishlist => prevWishlist.filter(item => item.productId.toString() !== id.toString()));
                setSuccessMessage(' Product removed from wishlist successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            } catch (error) {
                console.error('Error removing product from wishlist:', error);
            }
        } else {
            console.error('Product not found in wishlist');
        }
    };

    return (
        <div className="container mt-5" style={{ minHeight: '100vh' }}>
            <Link to="/my-account">
                <button className="btn btn-primary">
                    <i className="bi bi-arrow-left"></i> Back to My Account
                </button>
            </Link>
            <h1 className="text-center text-primary mb-4" style={{ fontSize: '30px', fontWeight: 'bold', color: '#117A65' }}>My Wishlist</h1>
            <hr style={{ color: 'lightgray' }} />
            {showWishlistProduct.length === 0 ? (
                <div className="text-center">
                    <p>Your wishlist is empty.</p>
                    <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
                </div>
            ) : (
                <div className="row">
                    {showWishlistProduct.map(item => (
                        <div key={item.id} className="col-6 col-md-4 col-lg-3 mb-4">
                            <div className="card h-100 shadow-sm p-3">
                                <img style={{ height: '250px', width: '100%' }} src={item.image ? item.image : item.images} className="card-img-top" alt={item.title} />
                                <div className="card-body">
                                    <Link to={`/product/${item.category}/${item.id}`} style={{ textDecoration: 'none' }}><h5 className="card-title" style={{ fontSize: '18px', fontWeight: 'bold', color: '#00416a' }}>{item.title}</h5> </Link>
                                    <p className="card-text" style={{ fontSize: '16px', color: '#117A65' }}>${item.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button onClick={() => handleAddToCart(item)} className="btn default-btn me-2">Add to Cart</button>
                                        <button onClick={() => handleRemoveFromWishlist(item.id)} className="btn btn-danger">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {
                successMessage && <div style={{ position: 'absolute', bottom: '0', right: '20px' }} className="alert alert-success text-light bg-success d-flex align-items-center" role="alert"><i className="bi bi-check-circle-fill"></i>&nbsp;{successMessage}</div>
            }
        </div>
    );
};

export default Wishlist;

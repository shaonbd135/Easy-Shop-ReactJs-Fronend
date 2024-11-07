import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartDataContext, PublicProductDataContext } from '../../RoutesIndex/RoutesIndex';
import { useAddToWishlist } from '../Home/addToWishlist';

const Shop = () => {
    const [cartData, setCartData] = useContext(CartDataContext);
    const [publicProductDatabase, setPublicProductDatabase] = useContext(PublicProductDataContext);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);


    const handleAddToWishlist = useAddToWishlist();


    useEffect(() => {
        axios.get(`https://dummyjson.com/products?limit=200&skip=0`)
            .then(res => {
                setPublicProductDatabase(res.data.products);
                setDisplayProducts(res.data.products.slice(0, 16));
                setPageNumber(Math.ceil(res.data.products.length / 16));
            });
    }, []);

    const handleNext = () => {
        const newSkip = skip + 16;
        const productSorting = publicProductDatabase.slice(newSkip, newSkip + 16);
        setSkip(newSkip);
        setDisplayProducts(productSorting);
    };

    const isNextDisabled = skip + 16 >= publicProductDatabase.length;
    const isPreviousDisabled = skip === 0;

    const handlePageNumber = (number) => {
        const productSorting = publicProductDatabase.slice(number * 16, number * 16 + 16);
        setSkip(number * 16);
        setDisplayProducts(productSorting);
    };

    const handlePrevious = () => {
        const newSkip = skip - 16;
        const productSorting = publicProductDatabase.slice(newSkip, newSkip + 16);
        setSkip(newSkip);
        setDisplayProducts(productSorting);
    };

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

    if (displayProducts.length === 0) {
        return (
            <div className='d-flex justify-content-center' style={{ width: "100%",minHeight:"70vh" }}>
                <div className="spinner-border text-primary m-auto" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className='container mb-5' style={{ minHeight: "100vh" }}>
            <h3 style={{ fontSize: "25px", fontWeight: "bold", color: "#117A65",marginTop:"30px" }}>All Products</h3>
            <hr style={{ color: "lightgray", marginBottom: "20px" }} />
            <div className='row'>

                {
                    displayProducts.map(product => <div className="col-lg-3 col-md-6 col-sm-12 col-6 mb-3 " key={product.id} style={{ position: "relative" }}>
                        <div className="card product-card">
                            <div className='text-center mb-3' >
                                <img src={product.images} className="card-img-top img-fluid  mt-3" alt="..." />
                            </div>
                            <div className="card-body">
                                <Link to={`/product/${product.category}/${product.id}`} style={{ cursor: "pointer", textDecoration: "none", color: "black" }} ><h5 style={{ cursor: "pointer" }} className="card-title">{product.title}</h5></Link>
                                <p className="card-text" style={{ fontSize: '20px' }} >$ {product.price}</p>
                            </div>
                            <div className="text-center">
                                <button onClick={() => handleAddToCart(product)} className="default-btn mt-3" > <i className="bi bi-cart4"> </i>  Add To Cart</button>
                                <i onClick={() => handleAddToWishlist(product)} style={{ fontSize: "30px", color: "#117A65", cursor: "pointer", position: "absolute", top: "10px", right: "10px" }} className="bi bi-heart"> </i>
                            </div>
                        </div >

                    </div>)
                }

            </div>
            <div>
                <nav aria-label="..." className='text-center'>
                    <ul className="pagination justify-content-center" style={{ marginTop: "20px" }}>
                        <li className={'page-item' + (isPreviousDisabled ? ' disabled' : '')}>
                            <Link style={{ cursor: "pointer", textDecoration: "none", backgroundColor: "#00416a", color: "white" }} className="page-link" onClick={handlePrevious}>Previous</Link>
                        </li>
                        {
                            [...Array(pageNumber).keys()].map(number => <li key={number} className="page-item"><Link onClick={() => handlePageNumber(number)} className="page-link">{number + 1}</Link></li>)
                        }

                        <li className={`page-item ${isNextDisabled ? 'disabled' : ''}`}>
                            <Link style={{ cursor: "pointer", textDecoration: "none", backgroundColor: "#00416a", color: "white" }} onClick={handleNext} className="page-link" >Next</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Shop;

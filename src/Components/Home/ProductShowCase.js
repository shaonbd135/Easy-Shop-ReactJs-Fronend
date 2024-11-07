import React, { useContext, useState } from 'react';
import ProductData from '../ProductData/ProductData';
import { Link } from 'react-router-dom';
import { CartDataContext } from '../../RoutesIndex/RoutesIndex';
import { useAddToWishlist } from './addToWishlist';

const ProductShowCase = () => {
    const [cartData, setCartData] = useContext(CartDataContext);

    const [products, setProducts] = useState(ProductData);
    const newArivals = products.filter((newProduct) => newProduct.tag === "New-Arrivals");
    const bestseller = products.filter((bestProduct) => bestProduct.tag === "Bestseller");

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

    const addToWishlist = useAddToWishlist();


    return (
        <div className='container'>
            <div className="row">
                <div className="text-center mt-5 mb-5">
                    <h3 style={{ fontSize: "30px", fontWeight: "bold", color: "#117A65" }}>New Arrival</h3>
                    <hr />
                </div>


                {
                    newArivals.map((product) => {

                        return (
                            <div className="col-md-6 col-6 col-lg-3 mb-5" key={product.id}>
                                <div className="card product-card" style={{ position: "relative" }}>
                                    <div className='text-center mb-3' >
                                        <img src={product.image} className="card-img-top img-fluid mt-3" alt="..." />
                                    </div>
                                    <div className="card-body">
                                        <Link style={{ cursor: "pointer", textDecoration: "none", color: "black" }} to={`/product/${product.category}/${product.id}`}><h5 style={{ cursor: "pointer" }} className="card-title">{product.title}</h5></Link>
                                        <p className="card-text" style={{ fontSize: '20px' }} >$ {product.price}</p>
                                    </div>
                                    <div className="text-center">
                                        <button className="default-btn mt-3" onClick={() => handleAddToCart(product)}> <i className="bi bi-cart4"> </i>  Add To Cart</button>
                                        <i onClick={() => addToWishlist(product)} style={{ fontSize: "30px", color: "#117A65", cursor: "pointer", position: "absolute", top: "10px", right: "10px" }} className="bi bi-heart"> </i>
                                    </div>
                                    <span style={{ position: "absolute", top: "10px", left: "10px", zIndex: "1" }} className="badge rounded-pill bg-success">New Arrival</span>
                                </div>

                            </div>
                        )
                    })
                }

                <div className="text-center mt-5 mb-5">
                    <h3 style={{ fontSize: "30px", fontWeight: "bold", color: "#117A65" }}>Our Bestseller</h3>
                    <hr />
                </div>

                {
                    bestseller.map((product) => {

                        return (
                            <div className="col-md-6 col-6 col-lg-3 mb-5" key={product.id}>
                                <div className="card product-card" >
                                    <div className='text-center mb-3'>
                                        <img src={product.image} className="card-img-top img-fluid mt-3" alt="..." />
                                    </div>
                                    <div className="card-body">
                                        <Link style={{ cursor: "pointer", textDecoration: "none", color: "black" }} to={`/product/${product.category}/${product.id}`}><h5 className="card-title">{product.title}</h5></Link>
                                        <p className="card-text" style={{ fontSize: '20px' }}>$ {product.price}</p>
                                    </div>
                                    <div className="text-center">
                                        <button onClick={() => handleAddToCart(product)} className="default-btn mt-3"> <i className="bi bi-cart4"> </i>  Add To Cart</button>
                                        <i onClick={() => addToWishlist(product)} style={{ fontSize: "30px", color: "#117A65", cursor: "pointer", position: "absolute", top: "10px", right: "10px" }} className="bi bi-heart"> </i>
                                    </div>
                                    <span style={{ position: "absolute", top: "10px", left: "10px", zIndex: "1" }} className="badge rounded-pill bg-success">Bestseller</span>
                                </div>
                            </div>
                        )
                    })
                }


            </div>
           

        </div>
    );
};

export default ProductShowCase;





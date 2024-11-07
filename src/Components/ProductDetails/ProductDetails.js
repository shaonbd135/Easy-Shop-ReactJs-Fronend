import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartDataContext, ProductDataContext, PublicProductDataContext } from '../../RoutesIndex/RoutesIndex';
import { useAddToWishlist } from '../Home/addToWishlist';


const ProductDetails = () => {
    const [publicProductDatabase, setPublicProductDatabase] = useContext(PublicProductDataContext);
    const [productDatabase, setProductDatabase] = useContext(ProductDataContext);
    const [cartData, setCartData] = useContext(CartDataContext);
    const { productCategory, id } = useParams();

    const handleAddToWishlist = useAddToWishlist();
    

    let newProduct = productDatabase ? productDatabase.filter((newProduct) => newProduct.id.toString() === id) : [];
    if (newProduct.length === 0 && publicProductDatabase) {
        newProduct = publicProductDatabase.filter((newProduct) => newProduct.id.toString() === id);
    }

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


    if (newProduct.length === 0) {
        return <div class="d-flex justify-content-center" style={{marginTop:"200px"}}>
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    const product = newProduct[0];

    return (
        <div className='container mt-5' style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: '10px' }}>
            <div className='row p-3'>
                <div className='col-12 col-md-6 col-lg-4 mt-5 text-center bg-light' style={{ border: "1px solid lightgray" }}>
                    <img className='img-fluid m-auto' style={{ width: "300px" }} src={product.image ? product.image : product.images} alt="" />
                </div>
                <div className=" col-12 col-md-6 col-lg-5 mt-5">
                    <div className='ms-2'>
                        <h2 style={{ fontSize: "30px", fontWeight: "bold", color: "#117A65" }}>{product.title}</h2>
                        <p style={{ fontSize: "20px", marginTop: '15px' }}>$ {product.price}</p>
                        <hr style={{ color: "lightgray" }} />
                        <p style={{ color: "green" }}>In Stock</p>
                    </div>
                    <div className='mt-5 ms-auto'>
                        <button onClick={() => handleAddToCart(product)} type="button" style={{ width: '200px', marginRight: '10px' }} className="btn default-btn mb-3">
                            <i className="bi bi-cart-plus-fill"></i> Add To Cart
                        </button>
                        <button onClick={() => handleAddToWishlist(product)} type="button" style={{ width: '200px' }} className="btn btn-success mb-3">
                            <i  className="bi bi-heart-fill"></i> Add to wishlist
                        </button>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div className='mt-5 ms-3'>
                        <hr style={{ color: "lightgray" }} />
                        <p style={{ fontSize: "18px", marginTop: '15px' }}>
                            <i className="bi bi-credit-card bg-light p-2 rounded-circle"></i>
                            <span style={{ backgroundColor: "orange", color: "white", padding: "5px", borderRadius: "5px" }}>Buy 1 Get 1 Free</span>
                        </p>
                        <p style={{ fontSize: "18px", marginTop: '5px' }}>
                            <i className="bi bi-clock bg-light p-2 rounded-circle"></i> 14 Days Returns
                        </p>
                        <p style={{ fontSize: "18px", marginTop: '5px' }}>
                            <i className="bi bi-receipt bg-light p-2 rounded-circle"></i> Easy Exchange
                        </p>
                        <p style={{ fontSize: "18px", marginTop: '5px' }}>
                            <i className="bi bi-truck bg-light p-2 rounded-circle"></i> Free Shipping
                        </p>
                    </div>
                </div>
            </div>
            <hr style={{ color: "lightgray" }} />
            <div className='row p-3'>
                <h4 style={{ fontSize: "20px", marginTop: '15px', fontWeight: "bold", color: "#117A65", marginBottom: '10px' }}>Description</h4>
                <hr style={{ color: "lightgray" }} />
                <div className='col-lg-3 col-md-4 col-12 mt-3 mb-3'>
                    <table style={{ fontSize: "18px", border: '1px solid lightgray' }} className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Title :</td>
                                <td>{product.title}</td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td>{product.price}</td>
                            </tr>
                            <tr>
                                <td>Category:</td>
                                <td>{product.category}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='col-12 col-md-8 col-lg-9 mt-3 mb-3'>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis blanditiis numquam nulla laborum fugiat possimus excepturi ipsum debitis. Voluptatum ut facere dolorum fuga repudiandae voluptates quibusdam fugiat et quidem placeat incidunt ad a, perferendis vitae velit deleniti quasi nisi quae accusamus eveniet amet sed, blanditiis molestias. Cupiditate ipsam voluptate itaque.</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

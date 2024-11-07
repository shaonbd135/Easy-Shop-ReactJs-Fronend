import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartDataContext } from '../../RoutesIndex/RoutesIndex';

const ProductByCategory = () => {
    const [displayProducts, setDisplayProducts] = useState([]);
    const [cartData, setCartData] = useContext(CartDataContext);

    const { category } = useParams();

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/category/${category}`)
            .then(res => {
                setDisplayProducts(res.data.products);
            });
    }, [category]);
    

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
    return (
        <div className='container'>
            <div className='mt-5'>
                <h3 style={{ color: "#00416a" }}>{category}</h3>
                <hr style={{ color: "lightgray" }} />
            </div>
            <div className='row'>

                {
                    displayProducts.map(product => <div className="col-lg-3 col-md-6 col-sm-12 col-6 mb-3 mt-3 " key={product.id} style={{ position: "relative" }}>
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
                                <i style={{ fontSize: "30px", color: "#117A65", cursor: "pointer", position: "absolute", top: "10px", right: "10px" }} className="bi bi-heart"> </i>
                            </div>
                        </div>

                    </div>)
                }

            </div>

        </div>
    );
};

export default ProductByCategory;
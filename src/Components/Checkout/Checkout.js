import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CartDataContext, loggedInDataContext } from '../../RoutesIndex/RoutesIndex';
import { Link, Navigate } from 'react-router-dom';


const Checkout = () => {
    const [cartData, setCartData] = useContext(CartDataContext);
    const [deliveryOption, setDeliveryOption] = useState('free');
    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(loggedInDataContext);
    
    let subTotal = cartData.reduce((total, pd) => total + pd.price * pd.quantity, 0);
    let initialTax = (subTotal * 0.1).toFixed(2);
    let initialDeliveryFee = deliveryOption === 'express' ? 20 : 0;
    let initialTotal = (subTotal + initialDeliveryFee + parseFloat(initialTax)).toFixed(2);


    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        deliveryOption: deliveryOption,
        productInfo: cartData,
        subTotal: subTotal,
        tax: initialTax,
        deliveryFee: initialDeliveryFee,
        totalCost: initialTotal,
    });

    if (!loggedInUser.email) {
        return <div class="spinner-grow text-success text-center" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    }

    const handleDeliveryOption = (e) => {
        const newDeliveryOption = e.target.value;
        const newDeliveryFee = newDeliveryOption === 'express' ? 20 : 0;
        const tax = (subTotal * 0.1).toFixed(2);
        const totalCost = (subTotal + newDeliveryFee + parseFloat(tax)).toFixed(2);

        setDeliveryOption(newDeliveryOption);
        setShippingInfo((prevInfo) => ({
            ...prevInfo,
            deliveryOption: newDeliveryOption,
            deliveryFee: newDeliveryFee,
            totalCost: totalCost,
            tax: tax,
            subTotal: subTotal
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('https://easy-shop-nodejs-server.onrender.com/order', { 
            userId: loggedInUser.userId,
            name: shippingInfo.name,
            email: shippingInfo.email,
            address: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            zip: shippingInfo.zip,
            country: shippingInfo.country,
            deliveryOption: shippingInfo.deliveryOption,
            productInfo: shippingInfo.productInfo,
            subTotal: (shippingInfo.subTotal).toFixed(2),
            tax: shippingInfo.tax,
            deliveryFee: shippingInfo.deliveryFee,
            totalCost: shippingInfo.totalCost

         })
            .then(res => {
                setLoading(false);
                if (res.data.success === true) {
                    setCartData([]);
                    setOrderPlaced(true);
                }
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    };

    if (orderPlaced) {
        return <Navigate to="/place-order" />;
    }

    return (
        <div className="container" style={{ padding: '20px' }}>
            {loading ? (
                <div className="d-flex justify-content-center" style={{ marginTop: "200px" }}>
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Processing Order......</span>
                    </div>
                    <p className="ms-3 d-flex align-items-center" style={{ fontSize: "20px", fontWeight: "bold", color: "#117A65" }}>Processing Order, please wait...</p>
                </div>
            ) : (
                cartData.length > 0 ? (
                    <div className="row bg-light p-5 rounded">
                        <div className="col-md-12 col-12 col-lg-6">
                            <h3 className="mb-4" style={{ fontSize: '22px', fontWeight: 'bold', color: '#00416a' }}>Shipping Address</h3>
                            <form onSubmit={handleCheckout} style={{ border: '1px solid lightgray', borderRadius: '10px', padding: '20px' }}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input required style={{ width: '100%', height: '30px' }} type="text" className="form-control" id="name" name="name" value={shippingInfo.name} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input required  style={{ width: '100%', height: '30px' }} type="email" className="form-control" id="email" name="email" value={shippingInfo.email} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input required  style={{ width: '100%', height: '30px' }} type="text" className="form-control" id="address" name="address" value={shippingInfo.address} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input required  style={{ width: '100%', height: '30px' }} type="text" className="form-control" id="city" name="city" value={shippingInfo.city} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input required  style={{ width: '100%', height: '30px' }} type="text" className="form-control" id="state" name="state" value={shippingInfo.state} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="zip" className="form-label">Zip Code</label>
                                    <input required  style={{ width: '100%', height: '30px' }} type="text" className="form-control" id="zip" name="zip" value={shippingInfo.zip} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input required  style={{ width: '100%', height: '30px' }} type="text" className="form-control" id="country" name="country" value={shippingInfo.country} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <p>By placing your order, you agree to our <span style={{ color: "red" }}>Terms of Service</span> and <span style={{ color: "red" }}>Privacy Policy</span>.</p>
                                </div>
                                <div className='text-center mt-4 ' style={{ marginTop: '20px' }}>
                                    <button type="submit" className="btn btn-secondary default-btn w-50">
                                        Place Order
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-12 col-lg-6 col-12">
                            <hr style={{ color: "lightgray" }} />
                            <h3 className="mb-4" style={{ fontSize: '22px', fontWeight: 'bold', color: '#00416a' }}>Order Summary</h3>
                            <ul className="list-group mb-3" style={{ backgroundColor: "#f8f9fa" }}>
                                {shippingInfo.productInfo.map((product, index) => (
                                    <li className="list-group-item d-flex justify-content-between lh-sm" key={index}>
                                        <div>
                                            <h6 className="my-0">{product.title}</h6>
                                            <small className="text-muted">Quantity: {product.quantity}</small>
                                        </div>
                                        <span className="text-muted">${(product.price * product.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                                <li className="list-group-item d-flex justify-content-between bg-light">
                                    <span>Subtotal</span>
                                    <strong>${subTotal.toFixed(2)}</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between bg-light">
                                    <span>Shipping</span>
                                    <strong>${shippingInfo.deliveryFee.toFixed(2)}</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between bg-light">
                                    <span>Tax</span>
                                    <strong>${shippingInfo.tax}</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between bg-light">
                                    <span>Total</span>
                                    <strong>${shippingInfo.totalCost}</strong>
                                </li>
                            </ul>
                            <hr style={{ color: "lightgray" }} />
                            <div style={{ marginTop: "50px" }}>
                                <h4 style={{ fontSize: '22px', fontWeight: 'bold', color: '#00416a' }}>Delivery Options</h4>
                                <div className="form-check mt-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="deliveryOption"
                                        id="free"
                                        value="free"
                                        checked={deliveryOption === 'free'}
                                        onChange={handleDeliveryOption}
                                    />
                                    <label className="form-check-label" htmlFor="free">
                                        Free Delivery (6-10 days)
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="deliveryOption"
                                        id="express"
                                        value="express"
                                        checked={deliveryOption === 'express'}
                                        onChange={handleDeliveryOption}
                                    />
                                    <label className="form-check-label" htmlFor="express">
                                        Express Delivery (2-3 days) + <span style={{ color: "red" }}>$20</span>
                                    </label>
                                </div>
                            </div>
                            <hr style={{ color: "lightgray" }} />
                            <div style={{ marginTop: "50px" }}>
                                <img style={{ borderRadius: "10px" }} className='img-fluid' src="http://sntglobal.com/wp-content/uploads/2021/11/SnT-last-mile-delivery-partners-1024x451.jpg.webp" alt="" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 style={{ color: 'red' }} className='text-center'>Your Cart is Empty.</h3>
                        <div className='text-center mt-5'>
                            <Link to='/'>
                                <button style={{ borderRadius: '10px' }} className='btn btn-warning px-4 py-2'>Explore Products</button>
                            </Link>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Checkout;

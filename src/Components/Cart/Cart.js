import React, { useContext } from 'react';
import { CartDataContext } from '../../RoutesIndex/RoutesIndex';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartData, setCartData] = useContext(CartDataContext);

    const handleRemove = (id) => {
        const remaining = cartData.filter(pd => pd.id !== id);
        setCartData(remaining);
    }

    const handleQuantity = (id, quantity, operation) => {
        const currentProduct = cartData.find(pd => pd.id === id);
        const currentQuantity = currentProduct.quantity;

        if (operation === "inc") {
            if (currentQuantity >= 0) {
                const newQuantity = currentQuantity + 1;
                const updatedCartData = cartData.map(pd => pd.id === id ? { ...pd, quantity: newQuantity } : pd);
                setCartData(updatedCartData);
            }
        }

        if (operation === "dec") {
            if (currentQuantity > 0) {
                const newQuantity = currentQuantity - 1;
                const updatedCartData = cartData.map(pd => pd.id === id ? { ...pd, quantity: newQuantity } : pd);
                setCartData(updatedCartData);
            }
            if (currentQuantity === 1) {
                const updatedCartData = cartData.map(pd => pd.id === id ? { ...pd, quantity: 1 } : pd);
                setCartData(updatedCartData);
            }
        }
    }

    let subTotal = cartData.reduce((total, pd) => total + pd.price * pd.quantity, 0);
    let tax = subTotal * 0.1;
    let total = subTotal + tax

    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-md-9">
                    <div className="text-center mb-3 bg-light p-2">
                        <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#117A65" }}>Your Cart Items : ${subTotal.toFixed(2)}</h3>
                    </div>
                    {cartData.map(pd => (
                        <div className="row  mb-2"  key={pd.id} style={{ padding: "10px", borderRadius: "10px", border: "1px solid lightgray"}}>
                            <div className="col-md-3 col-4">
                                <img style={{ width: "100px" }} className='img-fluid' src={pd.image ? pd.image : pd.images} alt="" />
                            </div>
                            <div className="col-md-4 col-3">
                                <Link to={`/product/${pd.category}/${pd.id}`} style={{ fontSize: "18px", fontWeight: "bold", color: "#00416a",textDecoration:"none" }}>{pd.title}</Link>
                                <p style={{ color: "green", fontSize: "15px" }}>In Stock</p>
                                <div>
                                    <i onClick={() => handleRemove(pd.id)} style={{ color: "red", cursor: "pointer", fontSize: "20px" }} className="bi bi-trash-fill"></i>
                                </div>
                            </div>
                            <div className="col-md-3 col-3 m-auto">
                                <div className="d-flex justify-content-center">
                                    <button onClick={() => handleQuantity(pd.id, pd.quantity, "dec")} className="btn btn-light"><i className="bi bi-dash-lg"></i></button>
                                    <input name='quantity' style={{ width: "50px", textAlign: "center", border: "1px solid #00416a", borderRadius: "5px", marginLeft: "5px", marginRight: "5px" }} className="form-control" type="text" value={pd.quantity} readOnly />
                                    <button onClick={() => handleQuantity(pd.id, pd.quantity, "inc")} className="btn btn-light"><i className="bi bi-plus-lg"></i></button>
                                </div>
                            </div>
                            <div className="col-md-2 text-center m-auto col-2">
                                <h4 style={{ color: "#00416a", fontSize: "20px" }}>${(pd.price * pd.quantity).toFixed(2)}</h4>
                            </div>
                            
                        </div>
                        
                    ))}
                    {cartData.length === 0 && <h1 className="text-center" style={{ fontSize: "30px", fontWeight: "bold", color: "#117A65" }}>Your Cart is Empty</h1>}
                </div>
                <div className="col-lg-3 col-md-12 col-12">
                    {
                        cartData.length > 0 ? <div className="bg-light p-3">
                            <h4 style={{ color: "#00416a", fontSize: "20px" }}>Checkout Summary</h4>
                            <hr style={{ color: "lightgray" }} />
                            <table className="table">
                                <tbody>
                                    <tr style={{ fontSize: "18px" }}>
                                        <td>Subtotal</td>
                                        <td>${subTotal.toFixed(2)}</td>
                                    </tr>
                                    <tr style={{ fontSize: "18px" }}>
                                        <td>VAT</td>
                                        <td>${tax.toFixed(2)}</td>
                                    </tr>
                                    <tr style={{ fontSize: "18px" }}>
                                        <td>Shipping</td>
                                        <td><span style={{ color: "green", fontWeight: "bold", marginRight: "10px" }} >Free</span><strike>$30.00</strike>  </td>
                                    </tr>
                                    <tr style={{ fontSize: "18px" }}>
                                        <td style={{ fontWeight: "bold" }} >Total</td>
                                        <td style={{ fontWeight: "bold" }} >${total.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> : ''
                    }
                    {
                        cartData.length > 0 ? <div className="mb-5" >
                           <Link to={"/checkout"} style={{ textDecoration: "none" }}><button className="btn btn-success w-100 default-btn d-flex justify-content-center align-items-center "><span style={{ marginRight: "10px", fontSize: "18px" }}> Checkout</span> <i style={{ fontSize: "20px", lineHeight: 'normal' }} class="bi bi-arrow-right"></i> </button></Link>
                        </div> : ''
                    }

                    <div className='ms-3'>
                        <hr style={{ color: "lightgray" }} />
                        <p style={{ fontSize: "18px", marginTop: '15px' }}> <i class="bi bi-credit-card bg-light p-2 rounded-circle"></i> <span style={{ backgroundColor: "orange", color: "white", padding: "5px", borderRadius: "5px" }}>Buy 1 Get 1 Free</span></p>
                        <p style={{ fontSize: "18px", marginTop: '5px' }} > <i class="bi bi-clock bg-light p-2 rounded-circle" ></i> 14 Days Returns</p>
                        <p style={{ fontSize: "18px", marginTop: '5px' }}> <i class="bi bi-receipt bg-light p-2 rounded-circle"></i> Easy Exchange</p>
                        <p style={{ fontSize: "18px", marginTop: '5px' }}> <i class="bi bi-truck bg-light p-2 rounded-circle"></i> Free Shipping</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

import React, { useContext, useState } from 'react';
import { CartDataContext } from '../../RoutesIndex/RoutesIndex';
import { Link } from 'react-router-dom';

const SideCartIcon = () => {
    const [cartData, setCartData] = useContext(CartDataContext);
    return (
        <div className='side-cart-icon'>
            {cartData.length > 0 && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        right: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Link to="/cart">
                        <i
                            type="button"
                            style={{
                                fontSize: "50px",
                                color: "#00416a",
                                position: 'relative'
                            }}
                            className="bi bi-cart4"
                        ></i>
                    </Link>
                    <span
                        className="badge rounded-pill cart-badge"
                        style={{
                            fontSize: "18px",
                            backgroundColor: "#00416a",
                            color: "white",
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            padding: '5px 10px',
                            borderRadius: '50%'
                        }}
                    >
                        {cartData.length}
                    </span>
                </div>
            )}
        </div>
    );
};

export default SideCartIcon;
import React from 'react';
import { Link } from 'react-router-dom';

const HeroImage = () => {


    return (
        <div className='container-fluid hero-image'>
            <div className="container">

                <div className="row">
                    <div className="col-md-7 col-12 m-auto text-white p-5 ">
                        <p style={{ fontSize: "18px" }} >Buy your favourite products from Easy Shop </p>
                        <h1 className='mb-4' style={{ fontSize: "70px", fontWeight: "bold" }}>Buy 1 Get 1 Free</h1>
                        <div>
                            <Link to="/shop"><button type="button" className="btn btn-light btn-lg" style={{ fontSize: "20px" , width:"200px", color:'#fff', border:'none', background:'#FF7F50',borderRadius:'30px'}}>Shop Now</button></Link>
                        </div>
                    </div>
                    <div className="col-md-5 col-12">
                        <img className='img-fluid' style={{ width: "500px", }} src="https://i.ibb.co/L9j8N1L/pngwing-com-3.png" alt="" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroImage;
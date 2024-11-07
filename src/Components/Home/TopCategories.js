import React from 'react';
import { Link } from 'react-router-dom';


const TopCategories = () => {
    const TopCatInfo = [{
        id: 1,
        img: "https://i.ibb.co/jkDHkky/pngwing-com-4.png",
        name: "Electronics",
        buttonText: "View All",
        clink:"/category/mobile-accessories"

    },
    {
        id: 2,
        img: "https://i.ibb.co/PcXhc6z/pngwing-com-6.png",
        name: "Fashion",
        buttonText: "View All",
        clink:"/category/beauty"
    },
    {
        id: 3,
        img: "https://i.ibb.co/WcYSsxR/pngwing-com-7.png",
        name: "Grocery",
        buttonText: "View All",
        clink:"/category/groceries"
    },
    {
        id: 4,
        img: "https://i.ibb.co/nLkQhJh/pngwing-com-8.png",
        name: "Drinks",
        buttonText: "View All",
        clink:"/category/groceries"
    }
    ]
    return (
        <div className='container '>
            <div className="text-center mt-5 mb-5">
                <h3 style={{ fontSize: "30px", fontWeight: "bold", color: "#117A65" }}>Top Categories</h3>
                <hr />
            </div>
            <div className="row">
                {
                    TopCatInfo.map((item)  =>  {
                        return (
                            
                                <div className="col-md-12 col-lg-5 col-12 d-flex bg-light mt-3 mx-auto" key={item.id} style={{ borderRadius: "10px", height: "350px" }} >
                                    <div className='row '>
                                        <div className=" m-auto text-center col-md-4 col-4 mx-auto">
                                            <h3 className='mb-3' style={{ fontSize: "30px", fontWeight: "bold", color: "#117A65" }}>{item.name}</h3>
                                            <Link to={item.clink}><button type="button" className="btn btn-secondary default-btn">{item.buttonText}</button></Link>
                                        </div>
                                        <div className="col-md-8 col-lg-8 m-auto col-8 text-center mx-auto">
                                            <img className='category-img img-fluid'  src={item.img} alt="" />
                                        </div>
                                    </div>
                                </div>
                            

                        )
                    })
                }

            </div>

        </div>
    );
};

export default TopCategories;

import React from 'react';

const ContactUs = () => {
    return (
        <div className="container mt-5 " style={{ marginBottom: '100px' }} >
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header bg-primary text-white">
                            <h3 className="text-center my-3">Contact Us</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Your Name</label>
                                    <input type="text" className="form-control" id="name" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Your Email</label>
                                    <input type="email" className="form-control" id="email" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="message">Message</label>
                                    <textarea className="form-control" id="message" rows="5" required></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary default-btn">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;

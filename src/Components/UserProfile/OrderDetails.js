import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './OrderDetails.css';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../Images/logo.png';

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        axios.get(`https://easy-shop-nodejs-server.onrender.com/order-details/${orderId}`)
            .then(res => {
                setOrder(res.data.order);
            })
            .catch(err => {
                console.log(err);
            });
    }, [orderId]);

    const downloadPdf = () => {
        const doc = new jsPDF();


        doc.setFillColor(255, 255, 255); 
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');


   
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(30);
        doc.setTextColor(52, 152, 219); 
        doc.text('Easy Shop', 14, 30);

        doc.text('INVOICE', 105, 30, null, null, 'center');

       
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); 
        doc.text(`Order ID: ${order._id}`, 14, 50);
        doc.text(`Order Date: ${new Date(order.OrderDate).toLocaleDateString()}`, 14, 58);
        doc.text(`Status: ${order.orderStatus}`, 14, 66);
        doc.text(`Total: $${order.totalCost}`, 14, 74);
        doc.text(`Payment Method: ${order.paymentMethod}`, 14, 82);
        doc.text(`Payment Status: ${order.paymentStatus}`, 14, 90);

        
        doc.setFontSize(14);
        doc.setTextColor(52, 73, 94); 
        doc.text('Shipping Address:', 14, 110);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); 
        doc.text(`${order.name}`, 14, 118);
        doc.text(`${order.address}, ${order.city}, ${order.zip}, ${order.state}`, 14, 126);
        doc.text(`${order.country}`, 14, 134);
        doc.text(`Email: ${order.email}`, 14, 142);

        
        const itemColumns = ["Ref", "Item Description", "Quantity", "Unit Price", "Total"];
        const itemRows = order.productInfo.map((item, index) => [
            `#${index + 1}`,
            item.title,
            item.quantity,
            `$${item.price}`,
            `$${(parseFloat(item.price) * item.quantity).toFixed(2)}`
        ]);

        doc.autoTable({
            startY: 160,
            head: [itemColumns],
            body: itemRows,
            theme: 'grid',
            headStyles: { fillColor: [52, 152, 219] }, 
            alternateRowStyles: { fillColor: [240, 240, 240] } 
        });

        const finalY = doc.autoTable.previous.finalY + 10;
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); 
        doc.text(`Subtotal: $${order.subTotal}`, 130, finalY);
        doc.text(`Tax: $${order.tax}`, 130, finalY + 10);
        doc.text(`Shipping: $${order.deliveryFee}`, 130, finalY + 20);
        doc.setFont('helvetica', 'bold');
        doc.text(`Total: $${order.totalCost}`, 130, finalY + 30);

        doc.save(`order_${order._id}.pdf`);
    };

    if (!order) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5" style={{ marginBottom: "100px" }}>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Link to="/orders">
                            <button className="btn btn-primary">
                                <i className="bi bi-arrow-left"></i> Back to Orders
                            </button>
                        </Link>
                        <button onClick={downloadPdf} className="btn btn-success">
                            <i className="bi bi-file-earmark-pdf"></i> Download Invoice
                        </button>
                    </div>
                    <h1 className="text-center text-primary" style={{ fontSize: "25px", fontWeight: "bold", color: "#117A65" }}>Order Details</h1>
                    <hr style={{ color: 'lightgray' }} />
                    <div className="card mt-4">
                        <div className="card-header bg-primary text-white d-flex justify-content-between">
                            <h4>Order ID #{order._id}</h4>
                            <h5 style={{ fontSize: "20px", fontWeight: "bold", color: "orange" }}>{order.paymentStatus}</h5>
                        </div>
                        <div className="card-body">
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h5>Order Information</h5>
                                    <hr style={{ color: 'lightgray' }} />
                                    <p><strong>Date:</strong> {new Date(order.OrderDate).toLocaleDateString()}</p>
                                    <p><strong>Status:</strong> {order.orderStatus}</p>
                                    <p><strong>Total:</strong> $ {order.totalCost}</p>
                                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                                </div>
                                <div className="col-md-6">
                                    <h5>Shipping Address</h5>
                                    <hr style={{ color: 'lightgray' }} />
                                    <p><strong>Name:</strong> {order.name}</p>
                                    <p><strong>Address:</strong> {`${order.address}, ${order.city},${order.zip}, ${order.state}`}</p>
                                    <p><strong>Country:</strong> {order.country}</p>
                                    <p><strong>Email:</strong> {order.email}</p>
                                </div>
                            </div>
                            <h5>Items</h5>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.productInfo.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.title}</td>
                                                <td>{item.price}</td>
                                                <td>{item.quantity}</td>
                                                <td>{`$ ${(parseFloat(item.price) * item.quantity).toFixed(2)}`}</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-secondary text-white">
                                            <td colSpan="3" className="text-right">Subtotal</td>
                                            <td>$ {(order.subTotal).toFixed(2)}</td>
                                        </tr>
                                        <tr className="bg-secondary text-white">
                                            <td colSpan="3" className="text-right">Tax</td>
                                            <td>$ {order.tax}</td>
                                        </tr>
                                        <tr className="bg-secondary text-white">
                                            <td colSpan="3" className="text-right">Shipping</td>
                                            <td>$ {order.deliveryFee}</td>
                                        </tr>
                                        <tr className="bg-secondary text-white">
                                            <td colSpan="3" className="text-right">Total</td>
                                            <td><strong>$ {order.totalCost}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;


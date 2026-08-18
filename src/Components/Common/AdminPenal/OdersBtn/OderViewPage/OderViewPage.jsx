"use client";

import React from "react";
import Link from "next/link";

import {
    FaArrowLeft,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaBoxOpen,
    FaCreditCard,
    FaTruck,
    FaCheckCircle,
    FaClock,
    FaCog,
    FaTimesCircle,
    FaShoppingBag,
} from "react-icons/fa";

import "./OderViewPage.css";


const OrderViewPage = ({ orderId }) => {

    /* =========================================
       DEMO ORDER DATA
    ========================================= */

    const order = {
        id: orderId || "ORD-1001",

        customer: {
            name: "Rahul Kumar",
            email: "rahul@gmail.com",
            phone: "+91 98765 43210",
        },

        date: "12 Aug 2026",

        status: "Delivered",

        paymentStatus: "Paid",

        paymentMethod: "Credit Card",

        transactionId: "TXN-982734823",

        shippingAddress: {
            name: "Rahul Kumar",
            address: "123, Green Park Society",
            city: "Surat",
            state: "Gujarat",
            pincode: "395010",
            phone: "+91 98765 43210",
        },

        items: [
            {
                id: 1,
                name: "Ben Martin Men Jeans",
                category: "Fashion",
                image: "/images/product1.jpg",
                quantity: 1,
                price: 2999,
            },

            {
                id: 2,
                name: "Men Casual T-Shirt",
                category: "Fashion",
                image: "/images/product2.jpg",
                quantity: 2,
                price: 999,
            },
        ],

        subtotal: 4997,

        discount: 500,

        shipping: 80,

        tax: 450,

        total: 5027,
    };


    return (

        <div className="order-view-page">


            {/* =========================================
                HEADER
            ========================================= */}

            <div className="order-view-header">

                <div>

                    <Link
                        href="/admin/orders"
                        className="order-back-btn"
                    >

                        <FaArrowLeft />

                        Back to Orders

                    </Link>


                    <div className="order-title-row">

                        <div>

                            <h1>
                                Order #{order.id}
                            </h1>

                            <p>
                                Order placed on {order.date}
                            </p>

                        </div>


                        <span
                            className={`order-view-status ${order.status.toLowerCase()}`}
                        >

                            {order.status === "Delivered" && (
                                <FaCheckCircle />
                            )}

                            {order.status === "Processing" && (
                                <FaCog />
                            )}

                            {order.status === "Pending" && (
                                <FaClock />
                            )}

                            {order.status === "Cancelled" && (
                                <FaTimesCircle />
                            )}

                            {order.status}

                        </span>

                    </div>

                </div>

            </div>



            {/* =========================================
                MAIN GRID
            ========================================= */}

            <div className="order-view-grid">


                {/* =========================================
                    LEFT SIDE
                ========================================= */}

                <div className="order-view-left">


                    {/* =========================================
                        ORDER ITEMS
                    ========================================= */}

                    <div className="order-view-card">

                        <div className="order-card-heading">

                            <div>

                                <h2>
                                    Order Items
                                </h2>

                                <p>
                                    Products included in this order
                                </p>

                            </div>

                            <span className="order-item-count">

                                <FaShoppingBag />

                                {order.items.length} Items

                            </span>

                        </div>



                        <div className="order-items-list">


                            {order.items.map((item) => (

                                <div
                                    className="order-item"
                                    key={item.id}
                                >


                                    {/* IMAGE */}

                                    <div className="order-item-image">

                                        <img
                                            src={
                                                item.image ||
                                                "/images/no-image.png"
                                            }
                                            alt={item.name}
                                        />

                                    </div>



                                    {/* PRODUCT INFO */}

                                    <div className="order-item-info">

                                        <h3>
                                            {item.name}
                                        </h3>

                                        <span>
                                            {item.category}
                                        </span>

                                        <p>
                                            Quantity: {item.quantity}
                                        </p>

                                    </div>



                                    {/* PRICE */}

                                    <div className="order-item-price">

                                        <strong>
                                            ₹
                                            {Number(
                                                item.price * item.quantity
                                            ).toLocaleString("en-IN")}
                                        </strong>

                                        <span>
                                            ₹
                                            {Number(
                                                item.price
                                            ).toLocaleString("en-IN")} ×{" "}
                                            {item.quantity}
                                        </span>

                                    </div>


                                </div>

                            ))}


                        </div>

                    </div>



                    {/* =========================================
                        ORDER TIMELINE
                    ========================================= */}

                    <div className="order-view-card">

                        <div className="order-card-heading">

                            <div>

                                <h2>
                                    Order Status
                                </h2>

                                <p>
                                    Track the order progress
                                </p>

                            </div>

                        </div>


                        <div className="order-timeline">


                            <div className="timeline-item completed">

                                <div className="timeline-icon">

                                    <FaCheckCircle />

                                </div>

                                <div>

                                    <strong>
                                        Order Placed
                                    </strong>

                                    <span>
                                        12 Aug 2026, 10:30 AM
                                    </span>

                                </div>

                            </div>



                            <div className="timeline-line"></div>



                            <div className="timeline-item completed">

                                <div className="timeline-icon">

                                    <FaCreditCard />

                                </div>

                                <div>

                                    <strong>
                                        Payment Confirmed
                                    </strong>

                                    <span>
                                        12 Aug 2026, 10:32 AM
                                    </span>

                                </div>

                            </div>



                            <div className="timeline-line"></div>



                            <div className="timeline-item completed">

                                <div className="timeline-icon">

                                    <FaTruck />

                                </div>

                                <div>

                                    <strong>
                                        Order Shipped
                                    </strong>

                                    <span>
                                        13 Aug 2026, 09:20 AM
                                    </span>

                                </div>

                            </div>



                            <div className="timeline-line"></div>



                            <div className="timeline-item completed">

                                <div className="timeline-icon">

                                    <FaCheckCircle />

                                </div>

                                <div>

                                    <strong>
                                        Order Delivered
                                    </strong>

                                    <span>
                                        15 Aug 2026, 04:15 PM
                                    </span>

                                </div>

                            </div>


                        </div>

                    </div>



                    {/* =========================================
                        PAYMENT DETAILS
                    ========================================= */}

                    <div className="order-view-card">

                        <div className="order-card-heading">

                            <div>

                                <h2>
                                    Payment Details
                                </h2>

                                <p>
                                    Payment information for this order
                                </p>

                            </div>

                        </div>


                        <div className="payment-details-grid">


                            <div className="payment-detail-item">

                                <span>
                                    Payment Status
                                </span>

                                <strong className="payment-paid">

                                    <FaCheckCircle />

                                    {order.paymentStatus}

                                </strong>

                            </div>



                            <div className="payment-detail-item">

                                <span>
                                    Payment Method
                                </span>

                                <strong>
                                    {order.paymentMethod}
                                </strong>

                            </div>



                            <div className="payment-detail-item">

                                <span>
                                    Transaction ID
                                </span>

                                <strong>
                                    {order.transactionId}
                                </strong>

                            </div>


                        </div>

                    </div>


                </div>



                {/* =========================================
                    RIGHT SIDE
                ========================================= */}

                <div className="order-view-right">


                    {/* =========================================
                        CUSTOMER
                    ========================================= */}

                    <div className="order-view-card">

                        <div className="order-card-heading">

                            <div>

                                <h2>
                                    Customer
                                </h2>

                                <p>
                                    Customer information
                                </p>

                            </div>

                        </div>


                        <div className="customer-view-info">


                            <div className="customer-view-avatar">

                                <FaUser />

                            </div>


                            <div>

                                <strong>
                                    {order.customer.name}
                                </strong>

                                <span>
                                    Customer
                                </span>

                            </div>


                        </div>



                        <div className="customer-contact-item">

                            <FaEnvelope />

                            <span>
                                {order.customer.email}
                            </span>

                        </div>



                        <div className="customer-contact-item">

                            <FaPhone />

                            <span>
                                {order.customer.phone}
                            </span>

                        </div>


                    </div>



                    {/* =========================================
                        SHIPPING ADDRESS
                    ========================================= */}

                    <div className="order-view-card">

                        <div className="order-card-heading">

                            <div>

                                <h2>
                                    Shipping Address
                                </h2>

                                <p>
                                    Delivery address
                                </p>

                            </div>

                        </div>


                        <div className="shipping-address">

                            <div className="shipping-icon">

                                <FaMapMarkerAlt />

                            </div>


                            <div>

                                <strong>
                                    {order.shippingAddress.name}
                                </strong>

                                <p>
                                    {order.shippingAddress.address}
                                    <br />
                                    {order.shippingAddress.city},{" "}
                                    {order.shippingAddress.state}
                                    <br />
                                    PIN - {order.shippingAddress.pincode}
                                </p>

                                <span>

                                    <FaPhone />

                                    {order.shippingAddress.phone}

                                </span>

                            </div>

                        </div>

                    </div>



                    {/* =========================================
                        ORDER SUMMARY
                    ========================================= */}

                    <div className="order-view-card order-summary-card">

                        <div className="order-card-heading">

                            <div>

                                <h2>
                                    Order Summary
                                </h2>

                                <p>
                                    Payment breakdown
                                </p>

                            </div>

                        </div>


                        <div className="summary-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>
                                ₹
                                {Number(
                                    order.subtotal
                                ).toLocaleString("en-IN")}
                            </strong>

                        </div>



                        <div className="summary-row discount">

                            <span>
                                Discount
                            </span>

                            <strong>
                                - ₹
                                {Number(
                                    order.discount
                                ).toLocaleString("en-IN")}
                            </strong>

                        </div>



                        <div className="summary-row">

                            <span>
                                Shipping
                            </span>

                            <strong>
                                ₹
                                {Number(
                                    order.shipping
                                ).toLocaleString("en-IN")}
                            </strong>

                        </div>



                        <div className="summary-row">

                            <span>
                                Tax
                            </span>

                            <strong>
                                ₹
                                {Number(
                                    order.tax
                                ).toLocaleString("en-IN")}
                            </strong>

                        </div>



                        <div className="summary-divider"></div>



                        <div className="summary-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹
                                {Number(
                                    order.total
                                ).toLocaleString("en-IN")}
                            </strong>

                        </div>


                    </div>


                </div>


            </div>

        </div>

    );

};


export default OrderViewPage;
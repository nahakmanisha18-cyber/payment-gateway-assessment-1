"use client";

import React from "react";
import Link from "next/link";

import {
    FaArrowLeft,
    FaCreditCard,
    FaUser,
    FaShoppingBag,
    FaMoneyBillWave,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaReceipt,
    FaCalendarAlt,
    FaHashtag,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
} from "react-icons/fa";

import "./PaymentViewPage.css";


const PaymentViewPage = ({ payment }) => {

    // Demo payment
    // Baad me API se payment data aa sakta hai
    const paymentData = payment || {

        paymentId: "PAY001",

        transactionId: "TXN872349823",

        orderId: "ORD001",

        customer: {
            name: "Manisha Nahak",
            email: "manisha@gmail.com",
            phone: "+91 9876543210",
            address: "Surat, Gujarat, India",
        },

        date: "14 Aug 2026",

        amount: 2499,

        method: "UPI",

        status: "Paid",

        gateway: "Razorpay",

        currency: "INR",

        description: "Payment for order ORD001",

    };


    const getStatusIcon = () => {

        if (paymentData.status === "Paid") {
            return <FaCheckCircle />;
        }

        if (paymentData.status === "Pending") {
            return <FaClock />;
        }

        if (paymentData.status === "Failed") {
            return <FaTimesCircle />;
        }

        return <FaReceipt />;

    };


    return (

        <div className="payment-view-page">


            {/* =========================================
                HEADER
            ========================================= */}

            <div className="payment-view-header">

                <div>

                    <Link
                        href="/admin/payments"
                        className="payment-back-btn"
                    >

                        <FaArrowLeft />

                        Back to Payments

                    </Link>


                    <h1>
                        Payment Details
                    </h1>

                    <p>
                        View complete payment transaction information
                    </p>

                </div>


                <div
                    className={`payment-view-status ${paymentData.status.toLowerCase()}`}
                >

                    {getStatusIcon()}

                    {paymentData.status}

                </div>

            </div>



            {/* =========================================
                PAYMENT SUMMARY
            ========================================= */}

            <div className="payment-summary-card">


                <div className="payment-summary-left">

                    <div className="payment-summary-icon">

                        <FaMoneyBillWave />

                    </div>


                    <div>

                        <span>
                            Payment Amount
                        </span>

                        <h2>
                            ₹{paymentData.amount.toLocaleString("en-IN")}
                        </h2>

                        <p>
                            {paymentData.description}
                        </p>

                    </div>

                </div>


                <div className="payment-summary-right">

                    <div>

                        <span>
                            Payment ID
                        </span>

                        <strong>
                            #{paymentData.paymentId}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Transaction ID
                        </span>

                        <strong>
                            {paymentData.transactionId}
                        </strong>

                    </div>

                </div>

            </div>



            {/* =========================================
                MAIN GRID
            ========================================= */}

            <div className="payment-view-grid">


                {/* =========================================
                    PAYMENT INFORMATION
                ========================================= */}

                <div className="payment-view-card">

                    <div className="payment-card-title">

                        <div className="payment-card-title-icon">

                            <FaCreditCard />

                        </div>

                        <div>

                            <h3>
                                Payment Information
                            </h3>

                            <p>
                                Transaction details
                            </p>

                        </div>

                    </div>


                    <div className="payment-info-list">


                        <div className="payment-info-row">

                            <div>

                                <FaHashtag />

                                <span>
                                    Payment ID
                                </span>

                            </div>

                            <strong>
                                #{paymentData.paymentId}
                            </strong>

                        </div>


                        <div className="payment-info-row">

                            <div>

                                <FaReceipt />

                                <span>
                                    Transaction ID
                                </span>

                            </div>

                            <strong>
                                {paymentData.transactionId}
                            </strong>

                        </div>


                        <div className="payment-info-row">

                            <div>

                                <FaShoppingBag />

                                <span>
                                    Order ID
                                </span>

                            </div>

                            <Link
                                href={`/admin/orders/${paymentData.orderId}`}
                                className="payment-order-link"
                            >
                                #{paymentData.orderId}
                            </Link>

                        </div>


                        <div className="payment-info-row">

                            <div>

                                <FaCalendarAlt />

                                <span>
                                    Payment Date
                                </span>

                            </div>

                            <strong>
                                {paymentData.date}
                            </strong>

                        </div>


                        <div className="payment-info-row">

                            <div>

                                <FaCreditCard />

                                <span>
                                    Payment Method
                                </span>

                            </div>

                            <strong>
                                {paymentData.method}
                            </strong>

                        </div>


                        <div className="payment-info-row">

                            <div>

                                <FaMoneyBillWave />

                                <span>
                                    Gateway
                                </span>

                            </div>

                            <strong>
                                {paymentData.gateway}
                            </strong>

                        </div>


                        <div className="payment-info-row">

                            <div>

                                <FaMoneyBillWave />

                                <span>
                                    Currency
                                </span>

                            </div>

                            <strong>
                                {paymentData.currency}
                            </strong>

                        </div>


                    </div>

                </div>



                {/* =========================================
                    CUSTOMER INFORMATION
                ========================================= */}

                <div className="payment-view-card">

                    <div className="payment-card-title">

                        <div className="payment-card-title-icon">

                            <FaUser />

                        </div>

                        <div>

                            <h3>
                                Customer Information
                            </h3>

                            <p>
                                Customer details
                            </p>

                        </div>

                    </div>


                    <div className="customer-profile">


                        <div className="customer-large-avatar">

                            {paymentData.customer.name
                                .charAt(0)
                                .toUpperCase()}

                        </div>


                        <div>

                            <h3>
                                {paymentData.customer.name}
                            </h3>

                            <span>
                                Customer
                            </span>

                        </div>

                    </div>


                    <div className="customer-info-list">


                        <div className="customer-info-item">

                            <FaEnvelope />

                            <div>

                                <span>
                                    Email
                                </span>

                                <strong>
                                    {paymentData.customer.email}
                                </strong>

                            </div>

                        </div>


                        <div className="customer-info-item">

                            <FaPhone />

                            <div>

                                <span>
                                    Phone
                                </span>

                                <strong>
                                    {paymentData.customer.phone}
                                </strong>

                            </div>

                        </div>


                        <div className="customer-info-item">

                            <FaMapMarkerAlt />

                            <div>

                                <span>
                                    Address
                                </span>

                                <strong>
                                    {paymentData.customer.address}
                                </strong>

                            </div>

                        </div>


                    </div>

                </div>

            </div>



            {/* =========================================
                PAYMENT STATUS TIMELINE
            ========================================= */}

            <div className="payment-view-card payment-timeline-card">

                <div className="payment-card-title">

                    <div className="payment-card-title-icon">

                        <FaReceipt />

                    </div>

                    <div>

                        <h3>
                            Payment Timeline
                        </h3>

                        <p>
                            Payment transaction history
                        </p>

                    </div>

                </div>


                <div className="payment-timeline">


                    <div className="timeline-item completed">

                        <div className="timeline-icon">

                            <FaCheckCircle />

                        </div>

                        <div>

                            <strong>
                                Payment Initiated
                            </strong>

                            <span>
                                Customer started the payment process
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
                                Payment Processing
                            </strong>

                            <span>
                                Payment is being processed by {paymentData.gateway}
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
                                Payment Successful
                            </strong>

                            <span>
                                Payment successfully received
                            </span>

                        </div>

                    </div>


                </div>

            </div>



            {/* =========================================
                ACTIONS
            ========================================= */}

            <div className="payment-view-actions">

                <Link
                    href="/admin/payments"
                    className="payment-view-cancel-btn"
                >

                    <FaArrowLeft />

                    Back to Payments

                </Link>


                <Link
                    href={`/admin/orders/${paymentData.orderId}`}
                    className="payment-view-order-btn"
                >

                    <FaShoppingBag />

                    View Order

                </Link>

            </div>


        </div>

    );

};


export default PaymentViewPage;
"use client";

import React, {
    useEffect,
} from "react";

import {
    FaCheckCircle,
    FaBoxOpen,
    FaMapMarkerAlt,
    FaCreditCard,
    FaTruck,
    FaHome,
    FaShoppingBag,
    FaReceipt,
} from "react-icons/fa";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import { getOrder } from "@/redux/action/orderAction";

import { useRouter } from "next/navigation";

import "./OrderSuccessPage.css";


const OrderSuccessPage = ({
    orderId,
}) => {

    const dispatch = useDispatch();

    const router = useRouter();


    // =====================================
    // ORDER STORE
    // =====================================

    const {
        selectedOrder,
        isLoading,
        isError,
        errorMessage,
    } = useSelector(
        (state) => state.orderStore
    );


    // =====================================
    // GET ONE ORDER
    // =====================================

    useEffect(() => {

        if (orderId) {

            console.log(
                "GET ORDER ID:",
                orderId
            );

            dispatch(
                getOrder(orderId)
            );

        }

    }, [
        dispatch,
        orderId,
    ]);


    // =====================================
    // LOADING
    // =====================================

    if (isLoading) {

        return (
            <main className="order-success-page">

                <div className="order-loading">

                    <div className="loading-spinner"></div>

                    <h2>
                        Loading your order...
                    </h2>

                    <p>
                        Please wait a moment.
                    </p>

                </div>

            </main>
        );
    }


    // =====================================
    // ERROR
    // =====================================

    if (isError) {

        return (
            <main className="order-success-page">

                <div className="order-error">

                    <div className="error-icon">
                        !
                    </div>

                    <h2>
                        Unable to load order
                    </h2>

                    <p>
                        {errorMessage}
                    </p>

                    <button
                        onClick={() =>
                            dispatch(
                                getOrder(orderId)
                            )
                        }
                    >
                        Try Again
                    </button>

                </div>

            </main>
        );
    }


    // =====================================
    // ORDER NOT FOUND
    // =====================================

    if (!selectedOrder) {

        return (
            <main className="order-success-page">

                <div className="order-error">

                    <div className="error-icon">
                        !
                    </div>

                    <h2>
                        Order Not Found
                    </h2>

                    <p>
                        We couldn't find this order.
                    </p>

                    <button
                        onClick={() =>
                            router.push("/")
                        }
                    >
                        Continue Shopping
                    </button>

                </div>

            </main>
        );
    }


    // =====================================
    // ORDER DATA
    // =====================================

    const order = selectedOrder;

    const firstItem =
        order.items?.[0];

    const orderDate =
        order.createdAt
            ? new Date(
                order.createdAt
            ).toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                }
            )
            : "";


    return (

        <main className="order-success-page">

            <div className="order-success-container">


                {/* =================================
                    SUCCESS HEADER
                ================================= */}

                <section className="success-header">

                    <div className="success-icon">

                        <FaCheckCircle />

                    </div>

                    <h1>
                        Order Placed Successfully!
                    </h1>

                    <p>
                        Thank you for your purchase.
                        Your order has been confirmed.
                    </p>

                </section>


                {/* =================================
                    ORDER INFO
                ================================= */}

                <section className="order-info-card">

                    <div>

                        <span>
                            Order ID
                        </span>

                        <strong>
                            #{order._id}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Order Date
                        </span>

                        <strong>
                            {orderDate}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Payment
                        </span>

                        <strong className="paid-status">

                            <FaCheckCircle />

                            {order.paymentStatus === "paid"
                                ? "Paid"
                                : order.paymentStatus}

                        </strong>

                    </div>

                </section>


                {/* =================================
                    MAIN GRID
                ================================= */}

                <div className="success-grid">


                    {/* ==============================
                        LEFT SIDE
                    ============================== */}

                    <div className="success-left">


                        {/* PRODUCT CARD */}

                        <section className="success-card">

                            <div className="card-heading">

                                <div className="heading-icon">
                                    <FaBoxOpen />
                                </div>

                                <div>

                                    <h2>
                                        Ordered Product
                                    </h2>

                                    <p>
                                        Your order details
                                    </p>

                                </div>

                            </div>


                            {order.items?.map(
                                (item, index) => (

                                    <div
                                        className="ordered-product"
                                        key={
                                            item.product?._id ||
                                            index
                                        }
                                    >

                                        <div className="ordered-image">

                                            <img
                                                src={
                                                    item.image ||
                                                    item.product?.images?.[0] ||
                                                    "/images/no-image.png"
                                                }
                                                alt={
                                                    item.productName ||
                                                    "Product"
                                                }
                                            />

                                        </div>


                                        <div className="ordered-product-info">

                                            <span>
                                                Product
                                            </span>

                                            <h3>
                                                {item.productName}
                                            </h3>

                                            <p>
                                                Quantity:
                                                {" "}
                                                {item.quantity}
                                            </p>

                                        </div>


                                        <div className="ordered-price">

                                            <span>
                                                Price
                                            </span>

                                            <strong>
                                                ₹
                                                {(
                                                    item.price *
                                                    item.quantity
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </strong>

                                        </div>

                                    </div>

                                )
                            )}

                        </section>


                        {/* DELIVERY ADDRESS */}

                        <section className="success-card">

                            <div className="card-heading">

                                <div className="heading-icon">
                                    <FaMapMarkerAlt />
                                </div>

                                <div>

                                    <h2>
                                        Delivery Address
                                    </h2>

                                    <p>
                                        Your order will be delivered here
                                    </p>

                                </div>

                            </div>


                            <div className="address-box">

                                <strong>
                                    {
                                        order.shippingAddress
                                            ?.fullName
                                    }
                                </strong>

                                <p>
                                    {
                                        order.shippingAddress
                                            ?.address
                                    }
                                </p>

                                <p>

                                    {
                                        order.shippingAddress
                                            ?.city
                                    }

                                    {", "}

                                    {
                                        order.shippingAddress
                                            ?.state
                                    }

                                    {" - "}

                                    {
                                        order.shippingAddress
                                            ?.pincode
                                    }

                                </p>

                                <p>

                                    Mobile:
                                    {" "}
                                    {
                                        order.shippingAddress
                                            ?.mobile
                                    }

                                </p>

                            </div>

                        </section>


                        {/* DELIVERY STATUS */}

                        <section className="success-card">

                            <div className="card-heading">

                                <div className="heading-icon">
                                    <FaTruck />
                                </div>

                                <div>

                                    <h2>
                                        Order Status
                                    </h2>

                                    <p>
                                        Track your order
                                    </p>

                                </div>

                            </div>


                            <div className="status-track">

                                <div className="status-step active">

                                    <div>
                                        <FaCheckCircle />
                                    </div>

                                    <span>
                                        Order Confirmed
                                    </span>

                                </div>


                                <div className="status-line"></div>


                                <div className="status-step">

                                    <div>
                                        <FaTruck />
                                    </div>

                                    <span>
                                        Shipped
                                    </span>

                                </div>


                                <div className="status-line"></div>


                                <div className="status-step">

                                    <div>
                                        <FaHome />
                                    </div>

                                    <span>
                                        Delivered
                                    </span>

                                </div>

                            </div>

                        </section>

                    </div>


                    {/* ==============================
                        RIGHT SIDE
                    ============================== */}

                    <aside className="success-right">


                        {/* PRICE SUMMARY */}

                        <section className="summary-card">

                            <div className="summary-heading">

                                <FaReceipt />

                                <h2>
                                    Order Summary
                                </h2>

                            </div>


                            <div className="summary-row">

                                <span>
                                    Subtotal
                                </span>

                                <strong>
                                    ₹
                                    {order.subtotal?.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>


                            <div className="summary-row">

                                <span>
                                    Delivery
                                </span>

                                <strong className="free-text">
                                    {order.deliveryCharge === 0
                                        ? "FREE"
                                        : `₹${order.deliveryCharge}`}
                                </strong>

                            </div>


                            <div className="summary-divider"></div>


                            <div className="summary-total">

                                <span>
                                    Total Amount
                                </span>

                                <strong>
                                    ₹
                                    {order.totalAmount?.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>


                            <div className="payment-success">

                                <FaCreditCard />

                                <div>

                                    <strong>
                                        Payment Successful
                                    </strong>

                                    <span>
                                        Razorpay
                                    </span>

                                </div>

                            </div>

                        </section>


                        {/* PAYMENT DETAILS */}

                        <section className="summary-card">

                            <h3>
                                Payment Details
                            </h3>

                            <div className="detail-row">

                                <span>
                                    Method
                                </span>

                                <strong>
                                    Razorpay
                                </strong>

                            </div>

                            <div className="detail-row">

                                <span>
                                    Payment ID
                                </span>

                                <strong className="payment-id">

                                    {
                                        order.razorpayPaymentId
                                    }

                                </strong>

                            </div>

                        </section>


                        {/* BUTTONS */}

                        <button
                            className="primary-action"
                            onClick={() =>
                                router.push("/")
                            }
                        >

                            <FaShoppingBag />

                            Continue Shopping

                        </button>


                        <button
                            className="secondary-action"
                            onClick={() =>
                                router.push(
                                    "/orders"
                                )
                            }
                        >

                            View My Orders

                        </button>


                    </aside>

                </div>

            </div>

        </main>
    );
};

export default OrderSuccessPage;
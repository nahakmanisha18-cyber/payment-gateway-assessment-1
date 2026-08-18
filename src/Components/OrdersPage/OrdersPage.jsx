"use client";

import React, { useEffect } from "react";

import {
    FaBoxOpen,
    FaTruck,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaArrowRight,
    FaShoppingBag,
} from "react-icons/fa";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import { getOrders } from "@/redux/action/orderAction";

import { useRouter } from "next/navigation";

import "./OrdersPage.css";


const OrdersPage = () => {

    const dispatch = useDispatch();

    const router = useRouter();

    // =====================================
    // ORDER STORE
    // =====================================

    const {
        orders,
        isLoading,
        isError,
        errorMessage,
    } = useSelector(
        (state) => state.orderStore
    );


    // =====================================
    // GET ORDERS
    // =====================================

    useEffect(() => {

        dispatch(getOrders());

    }, [dispatch]);


    // =====================================
    // LOADING
    // =====================================

    if (isLoading) {

        return (
            <main className="orders-page">

                <div className="orders-container">

                    <div className="orders-loading">

                        <div className="loading-spinner"></div>

                        <h2>
                            Loading your orders...
                        </h2>

                        <p>
                            Please wait while we fetch your orders.
                        </p>

                    </div>

                </div>

            </main>
        );
    }


    // =====================================
    // ERROR
    // =====================================

    if (isError) {

        return (
            <main className="orders-page">

                <div className="orders-container">

                    <div className="orders-error">

                        <FaTimesCircle />

                        <h2>
                            Unable to load orders
                        </h2>

                        <p>
                            {errorMessage ||
                                "Something went wrong"}
                        </p>

                        <button
                            onClick={() =>
                                dispatch(getOrders())
                            }
                        >
                            Try Again
                        </button>

                    </div>

                </div>

            </main>
        );
    }


    return (

        <main className="orders-page">

            <div className="orders-container">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="orders-header">

                    <div>

                        <span className="orders-header-icon">
                            <FaShoppingBag />
                        </span>

                        <div>

                            <h1>
                                My Orders
                            </h1>

                            <p>
                                Track and manage all your orders
                            </p>

                        </div>

                    </div>

                    <span className="orders-count">

                        {orders.length}

                        {orders.length === 1
                            ? " Order"
                            : " Orders"}

                    </span>

                </div>


                {/* =================================
                    EMPTY ORDERS
                ================================= */}

                {orders.length === 0 ? (

                    <div className="empty-orders">

                        <div className="empty-orders-icon">
                            <FaBoxOpen />
                        </div>

                        <h2>
                            No Orders Yet
                        </h2>

                        <p>
                            You haven't placed any orders yet.
                            Start shopping and your orders will
                            appear here.
                        </p>

                        <button
                            onClick={() =>
                                router.push("/")
                            }
                        >
                            Start Shopping
                        </button>

                    </div>

                ) : (

                    <div className="orders-list">

                        {orders.map((order) => (

                            <div
                                className="order-card"
                                key={order._id}
                            >


                                {/* =========================
                                    ORDER HEADER
                                ========================= */}

                                <div className="order-card-header">

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
                                            Ordered On
                                        </span>

                                        <strong>
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </strong>

                                    </div>

                                </div>


                                {/* =========================
                                    PRODUCTS
                                ========================= */}

                                <div className="order-products">

                                    {order.items?.map(
                                        (item, index) => (

                                            <div
                                                className="order-product"
                                                key={
                                                    item.product?._id ||
                                                    index
                                                }
                                            >

                                                <div className="order-product-image">

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


                                                <div className="order-product-info">

                                                    <h3>
                                                        {item.productName}
                                                    </h3>

                                                    <p>
                                                        Quantity:
                                                        {" "}
                                                        {item.quantity}
                                                    </p>

                                                    <strong>
                                                        ₹
                                                        {Number(
                                                            item.price
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </strong>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>


                                {/* =========================
                                    ORDER BOTTOM
                                ========================= */}

                                <div className="order-card-bottom">


                                    {/* STATUS */}

                                    <div className="order-status">

                                        {order.orderStatus ===
                                            "confirmed" && (
                                                <>
                                                    <FaCheckCircle />
                                                    <span>
                                                        Order Confirmed
                                                    </span>
                                                </>
                                            )}

                                        {order.orderStatus ===
                                            "processing" && (
                                                <>
                                                    <FaClock />
                                                    <span>
                                                        Processing
                                                    </span>
                                                </>
                                            )}

                                        {order.orderStatus ===
                                            "shipped" && (
                                                <>
                                                    <FaTruck />
                                                    <span>
                                                        Shipped
                                                    </span>
                                                </>
                                            )}

                                        {order.orderStatus ===
                                            "delivered" && (
                                                <>
                                                    <FaCheckCircle />
                                                    <span>
                                                        Delivered
                                                    </span>
                                                </>
                                            )}

                                        {order.orderStatus ===
                                            "cancelled" && (
                                                <>
                                                    <FaTimesCircle />
                                                    <span>
                                                        Cancelled
                                                    </span>
                                                </>
                                            )}

                                        {order.orderStatus ===
                                            "pending" && (
                                                <>
                                                    <FaClock />
                                                    <span>
                                                        Pending
                                                    </span>
                                                </>
                                            )}

                                    </div>


                                    {/* PAYMENT */}

                                    <div className="order-payment">

                                        <span>
                                            Payment
                                        </span>

                                        <strong
                                            className={
                                                order.paymentStatus ===
                                                    "paid"
                                                    ? "paid"
                                                    : "payment-pending"
                                            }
                                        >
                                            {order.paymentStatus ===
                                                "paid"
                                                ? "Paid"
                                                : order.paymentStatus}
                                        </strong>

                                    </div>


                                    {/* TOTAL */}

                                    <div className="order-total">

                                        <span>
                                            Total
                                        </span>

                                        <strong>
                                            ₹
                                            {Number(
                                                order.totalAmount
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>

                                    </div>


                                    {/* VIEW */}

                                    <button
                                        className="view-order-btn"
                                        onClick={() =>
                                            router.push(
                                                `/order-success/${order._id}`
                                            )
                                        }
                                    >

                                        View Details

                                        <FaArrowRight />

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </main>
    );
};


export default OrdersPage;
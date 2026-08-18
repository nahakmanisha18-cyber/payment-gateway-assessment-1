"use client";

import Script from "next/script";
import React, { useEffect, useState } from "react";
import {
    FaUser,
    FaPhone,
    FaMapMarkerAlt,
    FaCity,
    FaMapPin,
    FaCreditCard,
    FaShieldAlt,
    FaTruck,
    FaMinus,
    FaPlus,
    FaArrowLeft,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "@/redux/action/orderAction";
import { createPaymentOrder, verifyPayment } from "@/redux/action/paymentAction";
import { getProduct } from "@/redux/action/productAction";
import { useRouter } from "next/navigation";
import Link from "next/link";

import "./BuynowFormPage.css";

const BuynowFormPage = ({ productId }) => {

    const dispatch = useDispatch();
    const router = useRouter();
    
    const [paymentMethod, setPaymentMethod] = useState("razorpay");
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);

    const {
        product,
        isLoading,
        isError,
    } = useSelector(
        (state) => state.productStore
    );

    useEffect(() => {

        if (productId) {

            console.log(
                "BUY NOW PRODUCT ID:",
                productId
            );

            dispatch(getProduct(productId));
        }

    }, [dispatch, productId]);

    const { user } = useSelector(
        (state) => state.authStore
    );



    const [quantity, setQuantity] = useState(1);

    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });
    useEffect(() => {

        if (user) {

            setFormData({

                fullName:
                    user.profileName || "",

                mobile:
                    user.phoneNumber || "",

                address:
                    user.address || "",

                city:
                    user.city || "",

                state:
                    user.state || "",

                pincode:
                    user.pincode || "",

            });

        }

    }, [user]);


    const price = Number(
        product?.discountPrice ||
        product?.price ||
        0
    );

    const totalPrice = price * quantity;

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const increaseQuantity = () => {

        setQuantity((prev) => prev + 1);

    };

    const decreaseQuantity = () => {

        setQuantity((prev) =>
            Math.max(1, prev - 1)
        );

    };

    const handleContinuePayment = async (e) => {

        e.preventDefault();

        // =====================================
        // VALIDATION
        // =====================================

        if (
            !formData.fullName ||
            !formData.mobile ||
            !formData.address ||
            !formData.city ||
            !formData.state ||
            !formData.pincode
        ) {

            alert("Please fill all delivery details");

            return;
        }


        try {

            // =====================================
            // 1. CREATE RAZORPAY ORDER
            // =====================================

            const result = await dispatch(
                createPaymentOrder(totalPrice)
            ).unwrap();


            console.log(
                "RAZORPAY ORDER:",
                result
            );


            const order = result.order;


            // =====================================
            // 2. RAZORPAY OPTIONS
            // =====================================

            const options = {

                key:
                    process.env
                        .NEXT_PUBLIC_RAZORPAY_KEY_ID,

                amount:
                    order.amount,

                currency:
                    order.currency,

                name:
                    "My E-Commerce Store",

                description:
                    product.productName,

                order_id:
                    order.id,


                // =================================
                // PAYMENT SUCCESS
                // =================================

                handler: async function (
                    paymentResponse
                ) {

                    try {

                        console.log(
                            "RAZORPAY PAYMENT:",
                            paymentResponse
                        );


                        // =========================
                        // 3. VERIFY PAYMENT
                        // =========================

                        const verifyResult =
                            await dispatch(
                                verifyPayment({

                                    razorpay_order_id:
                                        paymentResponse
                                            .razorpay_order_id,

                                    razorpay_payment_id:
                                        paymentResponse
                                            .razorpay_payment_id,

                                    razorpay_signature:
                                        paymentResponse
                                            .razorpay_signature,

                                })
                            ).unwrap();


                        console.log(
                            "PAYMENT VERIFIED:",
                            verifyResult
                        );


                        if (!verifyResult.success) {

                            alert(
                                "Payment verification failed"
                            );

                            return;
                        }


                        // =========================
                        // 4. CREATE ORDER DATABASE
                        // =========================

                        const orderData = {

                            productId:
                                productId,

                            quantity:
                                quantity,

                            shippingAddress: {

                                fullName:
                                    formData.fullName,

                                mobile:
                                    formData.mobile,

                                address:
                                    formData.address,

                                city:
                                    formData.city,

                                state:
                                    formData.state,

                                pincode:
                                    formData.pincode,

                            },

                            paymentMethod:
                                "razorpay",

                            razorpayOrderId:
                                paymentResponse
                                    .razorpay_order_id,

                            razorpayPaymentId:
                                paymentResponse
                                    .razorpay_payment_id,

                        };


                        console.log(
                            "ORDER DATA:",
                            orderData
                        );


                        const orderResult =
                            await dispatch(
                                createOrder(orderData)
                            ).unwrap();


                        console.log(
                            "ORDER CREATED:",
                            orderResult
                        );


                        if (
                            !orderResult.success
                        ) {

                            alert(
                                orderResult.message ||
                                "Order creation failed"
                            );

                            return;
                        }


                        // =========================
                        // 5. SUCCESS
                        // =========================

                        alert(
                            "Payment Successful 🎉\nOrder Placed Successfully ✅"
                        );


                        // =========================
                        // 6. ORDER SUCCESS PAGE
                        // =========================

                        router.push(
                            `/order-success/${orderResult.order._id}`
                        );

                    } catch (error) {

                        console.error(
                            "PAYMENT VERIFY / ORDER ERROR:",
                            error
                        );

                        alert(
                            error?.message ||
                            "Payment verification failed"
                        );

                    }

                },


                prefill: {

                    name:
                        formData.fullName,

                    contact:
                        formData.mobile,

                },


                theme: {

                    color:
                        "#3399cc",

                },

            };


            // =====================================
            // 7. OPEN RAZORPAY
            // =====================================

            const razorpay =
                new window.Razorpay(options);

            razorpay.open();


        } catch (error) {

            console.error(
                "PAYMENT ERROR:",
                error
            );

            alert(
                error?.message ||
                "Payment start nahi ho paya"
            );

        }

    };

    if (!product) {
        return (
            <div className="buypage-loading-overlay">
                <div className="buypage-loader"></div>
                <p>Loading...</p>
            </div>
        );
    }


    return (

        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />

            <main className="buy-now-page">

                

                <div className="buy-now-container">


                    {/* =========================
                    HEADER
                ========================= */}

                    <div className="buy-now-header">

                        <Link
                            href="/"
                            className="buy-now-back"
                        >
                            <FaArrowLeft />
                            Back to Shopping
                        </Link>

                        <div>
                            <h1>Buy Now</h1>

                            <p>
                                Complete your details and place your order
                            </p>
                        </div>

                    </div>


                    {/* =========================
                    MAIN CONTENT
                ========================= */}

                    <div className="buy-now-layout">


                        {/* =================================
                        LEFT SIDE - DELIVERY FORM
                    ================================= */}

                        <section className="delivery-card">

                            <div className="section-title">

                                <div className="section-icon">
                                    <FaMapMarkerAlt />
                                </div>

                                <div>
                                    <h2>Delivery Details</h2>

                                    <p>
                                        Enter your delivery information
                                    </p>
                                </div>

                            </div>


                            <form onSubmit={handleContinuePayment}>


                                {/* FULL NAME */}

                                <div className="form-group">

                                    <label>
                                        <FaUser />
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* MOBILE */}

                                <div className="form-group">

                                    <label>
                                        <FaPhone />
                                        Mobile Number
                                    </label>

                                    <input
                                        type="tel"
                                        name="mobile"
                                        placeholder="Enter mobile number"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        maxLength="10"
                                        required
                                    />

                                </div>


                                {/* ADDRESS */}

                                <div className="form-group">

                                    <label>
                                        <FaMapMarkerAlt />
                                        Address
                                    </label>

                                    <textarea
                                        name="address"
                                        placeholder="House No, Street, Area..."
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                    />

                                </div>


                                {/* CITY + STATE */}

                                <div className="form-row">

                                    <div className="form-group">

                                        <label>
                                            <FaCity />
                                            City
                                        </label>

                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label>
                                            State
                                        </label>

                                        <input
                                            type="text"
                                            name="state"
                                            placeholder="State"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>


                                {/* PINCODE */}

                                <div className="form-group">

                                    <label>
                                        <FaMapPin />
                                        Pincode
                                    </label>

                                    <input
                                        type="text"
                                        name="pincode"
                                        placeholder="6-digit pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        maxLength="6"
                                        required
                                    />

                                </div>


                                {/* PAYMENT METHOD */}

                                <div className="payment-section">

                                    <div className="payment-heading">

                                        <FaCreditCard />

                                        <div>
                                            <h3>Payment Method</h3>

                                            <p>
                                                Select your preferred payment method
                                            </p>
                                        </div>

                                    </div>


                                    <label className="payment-option">

                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="razorpay"
                                            checked={paymentMethod === "razorpay"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />

                                        <div className="payment-option-content">

                                            <div className="razorpay-icon">
                                                ₹
                                            </div>

                                            <div>

                                                <strong>
                                                    Razorpay
                                                </strong>

                                                <span>
                                                    UPI, Cards, Net Banking & more
                                                </span>

                                            </div>

                                        </div>

                                        <span className="payment-check">
                                            ✓
                                        </span>

                                    </label>

                                </div>


                                {/* CONTINUE BUTTON */}

                                <button
                                    type="submit"
                                    className="continue-payment-btn"
                                    disabled={isPaymentLoading}
                                >
                                    <FaCreditCard />

                                    {isPaymentLoading
                                        ? "Processing Payment..."
                                        : `Continue & Pay ₹${totalPrice.toLocaleString("en-IN")}`
                                    }
                                </button>


                                <div className="secure-payment">

                                    <FaShieldAlt />

                                    <span>
                                        Secure payment powered by Razorpay
                                    </span>

                                </div>

                            </form>

                        </section>



                        {/* =================================
                        RIGHT SIDE - PRODUCT SUMMARY
                    ================================= */}

                        <aside className="order-summary-card">

                            <div className="summary-title">

                                <h2>
                                    Order Summary
                                </h2>

                                <span>
                                    1 Item
                                </span>

                            </div>


                            {/* PRODUCT */}

                            <div className="summary-product">

                                <div className="summary-image">

                                    <img
                                        src={
                                            product.images?.[0] ||
                                            "/images/no-image.png"
                                        }
                                        alt={product.productName}
                                    />

                                </div>


                                <div className="summary-product-info">

                                    <span className="summary-brand">
                                        {product.brand}
                                    </span>

                                    <h3>
                                        {product.productName}
                                    </h3>

                                    <strong>
                                        ₹{price.toLocaleString("en-IN")}
                                    </strong>

                                </div>

                            </div>


                            {/* QUANTITY */}

                            <div className="summary-quantity">

                                <span>
                                    Quantity
                                </span>

                                <div className="quantity-box">

                                    <button
                                        type="button"
                                        onClick={decreaseQuantity}
                                        disabled={quantity === 1}
                                    >
                                        <FaMinus />
                                    </button>

                                    <span>
                                        {quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={increaseQuantity}
                                    >
                                        <FaPlus />
                                    </button>

                                </div>

                            </div>


                            {/* PRICE DETAILS */}

                            <div className="price-details">

                                <h3>
                                    Price Details
                                </h3>


                                <div className="price-row">

                                    <span>
                                        Product Price
                                    </span>

                                    <span>
                                        ₹
                                        {price.toLocaleString("en-IN")}
                                    </span>

                                </div>


                                <div className="price-row">

                                    <span>
                                        Quantity
                                    </span>

                                    <span>
                                        × {quantity}
                                    </span>

                                </div>


                                <div className="price-row">

                                    <span>
                                        Delivery
                                    </span>

                                    <span className="free">
                                        FREE
                                    </span>

                                </div>


                                <div className="price-divider"></div>


                                <div className="total-row">

                                    <strong>
                                        Total Amount
                                    </strong>

                                    <strong>
                                        ₹
                                        {totalPrice.toLocaleString("en-IN")}
                                    </strong>

                                </div>

                            </div>


                            {/* BENEFITS */}

                            <div className="order-benefits">

                                <div>

                                    <FaTruck />

                                    <span>
                                        Free Delivery
                                    </span>

                                </div>


                                <div>

                                    <FaShieldAlt />

                                    <span>
                                        Secure Payment
                                    </span>

                                </div>

                            </div>

                        </aside>

                    </div>

                </div>

            </main>
        </>
    );
};

export default BuynowFormPage;
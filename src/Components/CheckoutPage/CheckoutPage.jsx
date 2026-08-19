"use client";
import Script from "next/script";
import { createPaymentOrder } from "@/redux/action/paymentAction";
import { verifyPayment } from "@/redux/action/paymentAction";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    FaArrowLeft,
    FaMapMarkerAlt,
    FaCreditCard,
    FaTruck,
    FaShieldAlt,
    FaCheckCircle,
} from "react-icons/fa";

import "./Checkoutpage.css";
import { useDispatch, useSelector } from "react-redux";
import { getCart, clearCart } from "@/redux/action/cartAction";
import { useRouter } from "next/navigation";
import {
    createOrder,
} from "@/redux/action/orderAction";

const CheckoutPage = () => {
    const dispatch = useDispatch();

    const router = useRouter();

    const {
        cart,
        isLoading,
        isError,
    } = useSelector(
        (state) => state.cartStore
    );
    const { user } = useSelector(
        (state) => state.authStore
    );

    const [addressForm, setAddressForm] = useState({
        fullName: "",
        mobileNumber: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [popup, setPopup] = useState({
        show: false,
        type: "",
        title: "",
        message: "",
        orderId: null,
    });

    useEffect(() => {

        if (user) {

            setAddressForm({

                fullName:
                    user.profileName || "",

                mobileNumber:
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

    const handleAddressChange = (e) => {

        const { name, value } = e.target;

        setAddressForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSaveAddress = async () => {

        if (
            !addressForm.fullName ||
            !addressForm.mobileNumber ||
            !addressForm.address ||
            !addressForm.city ||
            !addressForm.state ||
            !addressForm.pincode
        ) {

            setPopup({
                show: true,
                type: "error",
                title: "Incomplete Details",
                message: "Please fill all address details.",
                orderId: null,
            });

            return;
        }

        try {

            sessionStorage.setItem(
                "CHECKOUT_ADDRESS",
                JSON.stringify(addressForm)
            );

            // ================================
            // 1. CREATE RAZORPAY ORDER
            // ================================

            const result = await dispatch(
                createPaymentOrder(grandTotal)
            ).unwrap();

            const razorpayOrder = result.order;

            // ================================
            // 2. RAZORPAY OPTIONS
            // ================================

            const options = {

                key:
                    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

                amount:
                    razorpayOrder.amount,

                currency:
                    razorpayOrder.currency,

                name:
                    "My E-Commerce Store",

                description:
                    "Order Payment",

                order_id:
                    razorpayOrder.id,

                handler: async function (paymentResponse) {

                    try {

                        const verifyResult =
                            await dispatch(
                                verifyPayment(paymentResponse)
                            ).unwrap();


                        if (!verifyResult.success) {

                            setPopup({
                                show: true,
                                type: "error",
                                title: "Payment Failed",
                                message:
                                    "Payment verification failed. Please try again.",
                                orderId: null,
                            });

                            return;
                        }


                        const orderData = {

                            items: cartItems.map((item) => ({
                                productId: item.product?._id,
                                quantity: item.quantity,
                            })),

                            shippingAddress: {

                                fullName:
                                    addressForm.fullName,

                                mobile:
                                    addressForm.mobileNumber,

                                address:
                                    addressForm.address,

                                city:
                                    addressForm.city,

                                state:
                                    addressForm.state,

                                pincode:
                                    addressForm.pincode,
                            },

                            paymentMethod: "razorpay",

                            razorpayOrderId:
                                paymentResponse.razorpay_order_id,

                            razorpayPaymentId:
                                paymentResponse.razorpay_payment_id,
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


                        // ================================
                        // 5. ORDER CREATE FAILED
                        // ================================

                        if (!orderResult.success) {

                            setPopup({
                                show: true,
                                type: "error",
                                title: "Order Creation Failed",
                                message:
                                    orderResult.message ||
                                    "Payment was successful, but order creation failed.",
                                orderId: null,
                            });

                            return;
                        }


                        // ================================
                        // 6. CLEAR CART
                        // ================================

                        try {

                            await dispatch(
                                clearCart()
                            ).unwrap();

                            console.log(
                                "CART CLEARED"
                            );

                        } catch (cartError) {

                            console.error(
                                "CLEAR CART ERROR:",
                                cartError
                            );

                        }


                        // ================================
                        // 7. SUCCESS POPUP
                        // ================================

                        setPopup({
                            show: true,
                            type: "success",
                            title: "Payment Successful 🎉",
                            message:
                                "Your payment was successful and your order has been placed successfully.",
                            orderId:
                                orderResult.order?._id,
                        });

                    } catch (error) {

                        console.error(
                            "PAYMENT VERIFICATION / ORDER ERROR:",
                            error
                        );

                        setPopup({
                            show: true,
                            type: "error",
                            title: "Payment Failed",
                            message:
                                error?.message ||
                                "Payment verification failed.",
                            orderId: null,
                        });

                    }

                },

                prefill: {

                    name:
                        addressForm.fullName,

                    contact:
                        addressForm.mobileNumber,

                },

                theme: {

                    color:
                        "#3399cc",

                },

            };


            // ================================
            // 8. OPEN RAZORPAY
            // ================================

            const razorpay =
                new window.Razorpay(options);

            razorpay.open();


        } catch (error) {

            console.error(
                "PAYMENT ERROR:",
                error
            );

            setPopup({
                show: true,
                type: "error",
                title: "Payment Error",
                message:
                    error?.message ||
                    "Payment could not be started.",
                orderId: null,
            });

        }
    };
    useEffect(() => {

        dispatch(getCart());

    }, [dispatch]);

    const cartItems = cart?.items || [];

    const subtotal = cartItems.reduce(
        (total, item) => {

            const product = item.product;

            const price = Number(
                product?.discountPrice ||
                product?.price ||
                0
            );

            return total + price * item.quantity;

        },
        0
    );

    const originalTotal = cartItems.reduce(
        (total, item) => {

            const product = item.product;

            const price = Number(
                product?.price || 0
            );

            return total + price * item.quantity;

        },
        0
    );

    const discount = originalTotal - subtotal;

    const delivery = subtotal >= 500 ? 0 : 40;
    const grandTotal = subtotal + delivery;

    return (
        <>


            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />

            {popup.show && (
                <div className="checkout-popup-overlay">

                    <div
                        className={`checkout-popup ${popup.type}`}
                    >

                        <div className="checkout-popup-icon">

                            {popup.type === "success"
                                ? "✓"
                                : "!"}

                        </div>

                        <h2>
                            {popup.title}
                        </h2>

                        <p>
                            {popup.message}
                        </p>

                        <button
                            className="checkout-popup-btn"
                            onClick={() => {

                                if (popup.type === "success") {

                                    router.push("/orders");

                                } else {

                                    setPopup({
                                        show: false,
                                        type: "",
                                        title: "",
                                        message: "",
                                        orderId: null,
                                    });

                                }

                            }}
                        >
                            {popup.type === "success"
                                ? "View Orders"
                                : "Okay"}
                        </button>

                    </div>

                </div>
            )}

            <main className="checkout-page">

                <div className="checkout-container">

                    {/* ================= HEADER ================= */}

                    <div className="checkout-header">

                        <Link
                            href="/cart"
                            className="checkout-back"
                        >
                            <FaArrowLeft />
                            Back to Cart
                        </Link>

                        <h1>
                            Checkout
                        </h1>

                        <p>
                            Complete your order securely
                        </p>

                    </div>


                    {/* ================= CHECKOUT GRID ================= */}

                    <div className="checkout-grid">


                        {/* ================= LEFT ================= */}

                        <div className="checkout-left">


                            {/* DELIVERY ADDRESS */}

                            <section className="checkout-card">

                                <div className="checkout-card-title">

                                    <div className="checkout-title-icon">
                                        <FaMapMarkerAlt />
                                    </div>

                                    <div>
                                        <h2>
                                            Delivery Address
                                        </h2>

                                        <p>
                                            Where should we deliver your order?
                                        </p>
                                    </div>

                                </div>


                                <div className="address-form">


                                    <div className="form-row">

                                        <div className="form-group">

                                            <label>
                                                Full Name
                                            </label>

                                            <input
                                                type="text"
                                                name="fullName"
                                                value={addressForm.fullName}
                                                onChange={handleAddressChange}
                                                placeholder="Enter your full name"
                                            />

                                        </div>


                                        <div className="form-group">

                                            <label>
                                                Mobile Number
                                            </label>

                                            <input
                                                type="tel"
                                                name="mobileNumber"
                                                value={addressForm.mobileNumber}
                                                onChange={handleAddressChange}
                                                placeholder="Enter mobile number"
                                            />

                                        </div>

                                    </div>


                                    <div className="form-group">

                                        <label>
                                            Address
                                        </label>

                                        <textarea
                                            rows="3"
                                            name="address"
                                            value={addressForm.address}
                                            onChange={handleAddressChange}
                                            placeholder="House No, Street, Area"
                                        />

                                    </div>


                                    <div className="form-row">

                                        <div className="form-group">

                                            <label>
                                                City
                                            </label>

                                            <input
                                                type="text"
                                                name="city"
                                                value={addressForm.city}
                                                onChange={handleAddressChange}
                                                placeholder="Enter city"
                                            />

                                        </div>


                                        <div className="form-group">

                                            <label>
                                                State
                                            </label>

                                            <input
                                                type="text"
                                                name="state"
                                                value={addressForm.state}
                                                onChange={handleAddressChange}
                                                placeholder="Enter state"
                                            />

                                        </div>


                                        <div className="form-group">

                                            <label>
                                                Pincode
                                            </label>

                                            <input
                                                type="text"
                                                name="pincode"
                                                value={addressForm.pincode}
                                                onChange={handleAddressChange}
                                                placeholder="Pincode"
                                            />

                                        </div>

                                    </div>


                                    <button
                                        type="button"
                                        className="save-address-btn"
                                        onClick={handleSaveAddress}
                                    >

                                        <FaCheckCircle />

                                        Save & Continue

                                    </button>

                                </div>

                            </section>



                            {/* PAYMENT INFORMATION */}

                            <section className="checkout-card">

                                <div className="checkout-card-title">

                                    <div className="checkout-title-icon">
                                        <FaCreditCard />
                                    </div>

                                    <div>

                                        <h2>
                                            Payment Method
                                        </h2>

                                        <p>
                                            Secure payment powered by Razorpay
                                        </p>

                                    </div>

                                </div>


                                <div className="payment-option">

                                    <div className="payment-option-left">

                                        <div className="payment-icon">
                                            <FaCreditCard />
                                        </div>

                                        <div>

                                            <strong>
                                                Razorpay
                                            </strong>

                                            <span>
                                                UPI, Cards, Net Banking & Wallets
                                            </span>

                                        </div>

                                    </div>


                                    <div className="payment-selected">

                                        <FaCheckCircle />

                                        Selected

                                    </div>

                                </div>


                            </section>



                            {/* SECURITY */}

                            <div className="checkout-security">

                                <FaShieldAlt />

                                <div>

                                    <strong>
                                        Safe & Secure Payment
                                    </strong>

                                    <span>
                                        Your payment information is encrypted
                                        and securely processed by Razorpay.
                                    </span>

                                </div>

                            </div>

                        </div>



                        {/* ================= RIGHT ================= */}

                        <aside className="checkout-right">


                            <div className="order-summary-card">

                                <h2>
                                    Order Summary
                                </h2>


                                {/* PRODUCT */}

                                {/* ================= PRODUCT ================= */}

                                <div className="checkout-products">

                                    {cartItems.map((item) => {

                                        const product = item.product;

                                        const price = Number(
                                            product?.discountPrice ||
                                            product?.price ||
                                            0
                                        );

                                        const itemTotal =
                                            price * item.quantity;

                                        return (

                                            <div
                                                className="checkout-product"
                                                key={product?._id}
                                            >

                                                {/* IMAGE */}

                                                <div className="checkout-product-image">

                                                    <img
                                                        src={
                                                            product?.images?.[0] ||
                                                            "/images/no-image.png"
                                                        }
                                                        alt={
                                                            product?.productName ||
                                                            "Product"
                                                        }
                                                    />

                                                </div>


                                                {/* PRODUCT INFO */}

                                                <div className="checkout-product-info">

                                                    <strong>
                                                        {product?.productName}
                                                    </strong>

                                                    <span>
                                                        Quantity: {item.quantity}
                                                    </span>

                                                    <span>
                                                        ₹{price.toLocaleString("en-IN")}
                                                    </span>

                                                </div>


                                                {/* ITEM TOTAL */}

                                                <strong className="checkout-item-total">

                                                    ₹{itemTotal.toLocaleString("en-IN")}

                                                </strong>

                                            </div>

                                        );

                                    })}

                                </div>

                                {/* PRICE */}


                                <div className="price-summary">

                                    <div>
                                        <span>
                                            Subtotal
                                        </span>

                                        <strong>
                                            ₹{subtotal.toLocaleString("en-IN")}
                                        </strong>
                                    </div>


                                    {discount > 0 && (
                                        <div className="discount-row">

                                            <span>
                                                Discount
                                            </span>

                                            <strong>
                                                - ₹{discount.toLocaleString("en-IN")}
                                            </strong>

                                        </div>
                                    )}


                                    <div>

                                        <span>
                                            Delivery
                                        </span>

                                        <strong>
                                            {delivery === 0
                                                ? "FREE"
                                                : `₹${delivery}`
                                            }
                                        </strong>

                                    </div>

                                </div>


                                {/* TOTAL */}

                                <div className="checkout-total">

                                    <span>
                                        Total
                                    </span>

                                    <strong>
                                        ₹{grandTotal.toLocaleString("en-IN")}
                                    </strong>

                                </div>


                                {/* PAY BUTTON */}

                                <button
                                    className="proceed-payment-btn"
                                >

                                    <FaCreditCard />

                                    Proceed to Payment

                                </button>


                                <div className="secure-checkout">

                                    <FaShieldAlt />

                                    Safe & Secure Checkout

                                </div>

                            </div>


                            {/* DELIVERY */}

                            <div className="delivery-box">

                                <FaTruck />

                                <div>

                                    <strong>
                                        Free Delivery
                                    </strong>

                                    <span>
                                        On orders above ₹500
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

export default CheckoutPage;
"use client";

import React, { useEffect } from "react";
import Link from "next/link";

import {
    FaArrowLeft,
    FaMinus,
    FaPlus,
    FaTrash,
    FaHeart,
    FaShieldAlt,
    FaTruck,
    FaTag,
} from "react-icons/fa";
import { deleteCart, updateCart } from "@/redux/action/cartAction";
import { useDispatch, useSelector } from "react-redux";

import { getCart } from "@/redux/action/cartAction";

import "./AddToCartPage.css";


const AddToCartPage = () => {

    const dispatch = useDispatch();


    const {
        cart,
        isLoading,
        isError,
    } = useSelector(
        (state) => state.cartStore
    );


    // ==============================
    // GET CART
    // ==============================

    useEffect(() => {

        dispatch(getCart());

    }, [dispatch]);

    const handleDecrease = (item) => {

        if (item.quantity <= 1) {
            return;
        }

        dispatch(
            updateCart({
                productId: item.product._id,
                quantity: item.quantity - 1,
            })
        );

    };

    const handleIncrease = (item) => {

        dispatch(
            updateCart({
                productId: item.product._id,
                quantity: item.quantity + 1,
            })
        );

    };

    const handleRemove = (productId) => {

        dispatch(
            deleteCart(productId)
        );

    };
    // ==============================
    // CART ITEMS
    // ==============================

    const cartItems =
        cart?.items || [];


    // ==============================
    // CALCULATE TOTAL
    // ==============================

    const subtotal = cartItems.reduce(
        (total, item) => {

            const product =
                item.product;

            const price =
                Number(
                    product?.discountPrice ||
                    product?.price ||
                    0
                );

            return (
                total +
                price * item.quantity
            );

        },
        0
    );


    // ==============================
    // DISCOUNT
    // ==============================

    const originalTotal =
        cartItems.reduce(
            (total, item) => {

                const product =
                    item.product;

                const price =
                    Number(
                        product?.price || 0
                    );

                return (
                    total +
                    price * item.quantity
                );

            },
            0
        );


    const discount =
        originalTotal - subtotal;


    // ==============================
    // DELIVERY
    // ==============================

    const delivery =
        subtotal >= 500 ? 0 : 40;


    const grandTotal =
        subtotal + delivery;


    // ==============================
    // EMPTY CART
    // ==============================

    if (!isLoading && cartItems.length === 0) {

        return (

            <main className="cart-page">

                <div className="cart-empty">

                    <div className="cart-empty-icon">
                        🛒
                    </div>

                    <h1>
                        Your Cart is Empty
                    </h1>

                    <p>
                        Looks like you haven't
                        added anything to your cart yet.
                    </p>

                    <Link
                        href="/"
                        className="continue-shopping-btn"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </main>

        );

    }


    return (

        <main className="cart-page">

           {isLoading && (
                <div className="product-loading-overlay">
                    <div className="product-loader"></div>
                    <p>Loading...</p>
                </div>
            )}
            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="cart-container">

                <div className="cart-header">

                    <div>

                        <Link
                            href="/"
                            className="back-shopping"
                        >
                            <FaArrowLeft />
                            Continue Shopping
                        </Link>

                        <h1>
                            Shopping Cart
                        </h1>

                        <p>
                            {cartItems.length}{" "}
                            {cartItems.length === 1
                                ? "item"
                                : "items"
                            } in your cart
                        </p>

                    </div>

                </div>


                {/* =========================
                    MAIN CART LAYOUT
                ========================= */}

                <div className="cart-layout">


                    {/* =====================
                        LEFT SIDE
                    ===================== */}

                    <section className="cart-items-section">

                        <div className="cart-items-card">

                            <div className="cart-items-title">

                                <h2>
                                    Cart Items
                                </h2>

                                <span>
                                    {cartItems.length} Items
                                </span>

                            </div>


                            {cartItems.map(
                                (item) => {

                                    const product =
                                        item.product;

                                    const price =
                                        Number(
                                            product?.discountPrice ||
                                            product?.price ||
                                            0
                                        );

                                    const total =
                                        price *
                                        item.quantity;


                                    return (

                                        <div
                                            className="cart-item"
                                            key={
                                                product?._id
                                            }
                                        >

                                            {/* IMAGE */}

                                            <Link
                                                href={`/products/${product?._id}`}
                                                className="cart-product-image"
                                            >

                                                <img
                                                    src={
                                                        product?.images?.[0] ||
                                                        "/images/no-image.png"
                                                    }
                                                    alt={
                                                        product?.productName
                                                    }
                                                />

                                            </Link>


                                            {/* PRODUCT INFO */}

                                            <div className="cart-product-info">

                                                <span className="cart-product-brand">
                                                    {
                                                        product?.brand
                                                    }
                                                </span>

                                                <Link
                                                    href={`/products/${product?._id}`}
                                                    className="cart-product-name"
                                                >
                                                    {
                                                        product?.productName
                                                    }
                                                </Link>

                                                <div className="cart-product-stock">
                                                    ✓ In Stock
                                                </div>


                                                <div className="cart-item-actions">

                                                    <button>
                                                        <FaHeart />
                                                        Move to Wishlist
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleRemove(product._id)
                                                        }
                                                    >
                                                        <FaTrash />
                                                        Remove
                                                    </button>

                                                </div>

                                            </div>


                                            {/* PRICE + QUANTITY */}

                                            <div className="cart-product-right">

                                                <div className="cart-product-price">

                                                    ₹
                                                    {price.toLocaleString(
                                                        "en-IN"
                                                    )}

                                                </div>


                                                <div className="quantity-box">

                                                    <button
                                                        onClick={() =>
                                                            handleDecrease(item)
                                                        }
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <FaMinus />
                                                    </button>


                                                    <span>
                                                        {item.quantity}
                                                    </span>


                                                    <button
                                                        onClick={() =>
                                                            handleIncrease(item)
                                                        }
                                                    >
                                                        <FaPlus />
                                                    </button>

                                                </div>


                                                <strong className="cart-item-total">

                                                    ₹
                                                    {total.toLocaleString(
                                                        "en-IN"
                                                    )}

                                                </strong>

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>


                        {/* =====================
                            BENEFITS
                        ===================== */}

                        <div className="cart-benefits">

                            <div>

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


                            <div>

                                <FaShieldAlt />

                                <div>

                                    <strong>
                                        Secure Payment
                                    </strong>

                                    <span>
                                        100% secure checkout
                                    </span>

                                </div>

                            </div>


                            <div>

                                <FaTag />

                                <div>

                                    <strong>
                                        Best Prices
                                    </strong>

                                    <span>
                                        Great deals every day
                                    </span>

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =====================
                        RIGHT SUMMARY
                    ===================== */}

                    <aside className="cart-summary">

                        <h2>
                            Order Summary
                        </h2>


                        <div className="summary-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>
                                ₹
                                {subtotal.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>


                        {discount > 0 && (

                            <div className="summary-row discount">

                                <span>
                                    Discount
                                </span>

                                <strong>
                                    - ₹
                                    {discount.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>

                        )}


                        <div className="summary-row">

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


                        <div className="summary-divider" />


                        <div className="summary-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹
                                {grandTotal.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>


                        {/* COUPON */}

                        <div className="coupon-box">

                            <input
                                type="text"
                                placeholder="Enter coupon code"
                            />

                            <button>
                                Apply
                            </button>

                        </div>


                        {/* CHECKOUT */}

                        <Link
                            href="/checkout"
                            className="checkout-btn"
                        >
                            Proceed to Checkout
                        </Link>


                        <div className="secure-checkout">

                            <FaShieldAlt />

                            <span>
                                Safe & Secure Checkout
                            </span>

                        </div>

                    </aside>

                </div>

            </div>

        </main>

    );

};


export default AddToCartPage;
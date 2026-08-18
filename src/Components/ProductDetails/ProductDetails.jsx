"use client";
// import Script from "next/script";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { addToCart } from "@/redux/action/cartAction";
import {
    FaArrowLeft,
    FaHeart,
    FaShoppingCart,
    FaStar,
    FaMinus,
    FaPlus,
} from "react-icons/fa";

// import {
//     createPaymentOrder,
//     verifyPayment,
// } from "@/redux/action/paymentAction";
import { getProduct } from "@/redux/action/productAction";

import "./ProductDetails.css";
import { useRouter } from "next/navigation";

const ProductDetailPage = ({ productId }) => {

    const dispatch = useDispatch();
    const router = useRouter()

    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };
    const { product, isLoading, isError } = useSelector(
        (state) => state.productStore
    );

    
    const [selectedImage, setSelectedImage] = useState(null);
    
    const handleAddToCart = () => {
        if (!productId) return;

        dispatch(
            addToCart({
                productId: productId,
                quantity: quantity,
            })
        );
    };

    useEffect(() => {

        if (productId) {
            dispatch(getProduct(productId));
        }

    }, [dispatch, productId]);

    const handleBuyNow = () => {
        if (!productId) return;
        console.log("id:", productId)
        router.push(`/buynowForm/${productId}`);
    };

    /* =========================
       LOADING
    ========================= */

    if (isLoading) {

        return (
            <div className="product-detail-loading">

                <div className="product-loader"></div>

                <p>Loading product...</p>

            </div>
        );
    }


    /* =========================
       ERROR
    ========================= */

    if (isError) {

        return (
            <div className="product-detail-error">

                <h2>
                    Product Not Found
                </h2>

                <p>
                    {isError}
                </p>

                <Link href="/">
                    Back to Shopping
                </Link>

            </div>
        );
    }


    /* =========================
       PRODUCT NOT AVAILABLE
    ========================= */

    if (!product) {
        return null;
    }


    const price = Number(
        product.discountPrice ||
        product.price ||
        0
    );

    const originalPrice = Number(
        product.price || 0
    );

    const discount =
        originalPrice > price
            ? Math.round(
                ((originalPrice - price) /
                    originalPrice) *
                100
            )
            : 0;


    return (
        <>
            {/* <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            /> */}

            <main className="product-detail-page">

                <div className="product-detail-container">


                    {/* =========================
                    BACK BUTTON
                ========================= */}

                    <Link
                        href="/"
                        className="product-detail-back"
                    >
                        <FaArrowLeft />

                        Back to Shopping
                    </Link>


                    {/* =========================
                    PRODUCT
                ========================= */}

                    <div className="product-detail-card">


                        {/* =====================
                        IMAGE SECTION
                    ===================== */}

                        <div className="product-detail-images">

                            <div className="product-main-image">

                                <img
                                    src={
                                        selectedImage ||
                                        product.images?.[0] ||
                                        "/images/no-image.png"
                                    }
                                    alt={product.productName}
                                />

                            </div>

                            {product.images?.length > 1 && (

                                <div className="product-thumbnails">

                                    {product.images.map((image, index) => (

                                        <div
                                            key={index}
                                            className="product-thumbnail"
                                            onClick={() => setSelectedImage(image)}
                                        >

                                            <img
                                                src={image}
                                                alt={`Product ${index + 1}`}
                                            />

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>


                        {/* =====================
                        PRODUCT INFO
                    ===================== */}

                        <div className="product-detail-info">


                            {/* BRAND */}

                            <span className="product-detail-brand">

                                {product.brand}

                            </span>


                            {/* NAME */}

                            <h1>

                                {product.productName}

                            </h1>


                            {/* RATING */}

                            <div className="product-detail-rating">

                                <span className="rating-box">

                                    <FaStar />

                                    4.3

                                </span>

                                <span>
                                    120 Ratings & Reviews
                                </span>

                            </div>


                            {/* PRICE */}

                            <div className="product-detail-price">

                                <strong>

                                    ₹
                                    {price.toLocaleString(
                                        "en-IN"
                                    )}

                                </strong>


                                {originalPrice > price && (

                                    <>
                                        <del>

                                            ₹
                                            {originalPrice.toLocaleString(
                                                "en-IN"
                                            )}

                                        </del>

                                        <span className="discount">

                                            {discount}% OFF

                                        </span>
                                    </>

                                )}

                            </div>


                            {/* STOCK */}

                            <div className="product-stock">

                                <span>
                                    ✓
                                </span>

                                In Stock

                            </div>


                            {/* DESCRIPTION */}

                            <div className="product-description">

                                <h3>
                                    Product Description
                                </h3>

                                <p>
                                    {product.description ||
                                        "No product description available."}
                                </p>

                            </div>


                            {/* QUANTITY */}

                            <div className="quantity-control">

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


                            {/* ACTION BUTTONS */}

                            <div className="product-detail-actions">

                                <button
                                    className="add-cart-detail-btn"
                                    onClick={handleAddToCart}
                                >
                                    <FaShoppingCart />

                                    Add to Cart
                                </button>


                                <button
                                    className="buy-now-detail-btn"
                                    onClick={handleBuyNow}
                                >
                                    Buy Now
                                </button>


                                <button className="wishlist-detail-btn">

                                    <FaHeart />

                                </button>

                            </div>


                            {/* DELIVERY INFO */}

                            <div className="product-delivery-info">

                                <div>

                                    <strong>
                                        🚚 Free Delivery
                                    </strong>

                                    <span>
                                        On orders above ₹500
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        🔒 Secure Payment
                                    </strong>

                                    <span>
                                        100% secure payment
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =========================
                    PRODUCT DETAILS
                ========================= */}

                    <div className="product-extra-details">

                        <h2>
                            Product Details
                        </h2>

                        <div className="product-details-grid">

                            <div>

                                <span>
                                    Brand
                                </span>

                                <strong>
                                    {product.brand || "N/A"}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Category
                                </span>

                                <strong>
                                    {product.category || "N/A"}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Price
                                </span>

                                <strong>
                                    ₹
                                    {price.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Stock
                                </span>

                                <strong>
                                    {product.stock ?? "Available"}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </main>
        </>
        
    );
};

export default ProductDetailPage;
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";

import {
    FaArrowLeft,
    FaHeart,
    FaShoppingCart,
    FaStar,
    FaTrash,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import {
    getWishlist,
    removeWishlist,
} from "@/redux/action/wishlistAction";

import { addToCart } from "@/redux/action/cartAction";

import "./WishlistPage.css";

const WishlistPage = () => {
    const dispatch = useDispatch();

    const { wishlist, isLoading } = useSelector(
        (state) => state.wishlistStore
    );

    const products = wishlist?.products || [];

    /* ===============================
       GET WISHLIST
    =============================== */

    useEffect(() => {
        dispatch(getWishlist());
    }, [dispatch]);

    /* ===============================
       REMOVE PRODUCT
    =============================== */

    const handleRemoveWishlist = (productId) => {
        dispatch(removeWishlist(productId));
    };

    /* ===============================
       ADD TO CART
    =============================== */

    const handleAddToCart = (productId) => {
        dispatch(
            addToCart({
                productId: productId,
                quantity: 1,
            })
        );
    };

    return (
        <main className="wishlist-page">

            <Container>

                {/* ===============================
                    HEADER
                =============================== */}

                <div className="wishlist-header">

                    <div className="wishlist-header-left">

                        <Link
                            href="/"
                            className="wishlist-back-btn"
                        >
                            <FaArrowLeft />
                            <span>Back</span>
                        </Link>

                        <div className="wishlist-title-box">

                            <div className="wishlist-title-icon">
                                <FaHeart />
                            </div>

                            <div>
                                <h1>My Wishlist</h1>

                                <p>
                                    Save your favorite products for later
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="wishlist-count">

                        <FaHeart />

                        <span>
                            {products.length}{" "}
                            {products.length === 1
                                ? "Item"
                                : "Items"}
                        </span>

                    </div>

                </div>


                {/* ===============================
                    LOADING
                =============================== */}

                {isLoading && (
                    <div className="wishlist-loading">
                        <div className="wishlist-loader"></div>
                        <p>Loading wishlist...</p>
                    </div>
                )}


                {/* ===============================
                    EMPTY WISHLIST
                =============================== */}

                {!isLoading && products.length === 0 && (
                    <div className="wishlist-empty">

                        <div className="wishlist-empty-icon">
                            <FaHeart />
                        </div>

                        <h2>Your Wishlist is Empty</h2>

                        <p>
                            You haven't added any products to your
                            wishlist yet.
                        </p>

                        <Link
                            href="/"
                            className="wishlist-shop-btn"
                        >
                            Continue Shopping
                        </Link>

                    </div>
                )}


                {/* ===============================
                    WISHLIST PRODUCTS
                =============================== */}

                {!isLoading && products.length > 0 && (

                    <section className="wishlist-products-section">

                        <div className="wishlist-products-grid">

                            {products.map((product) => (

                                <div
                                    className="wishlist-product-card"
                                    key={product._id}
                                >

                                    {/* REMOVE BUTTON */}

                                    <button
                                        type="button"
                                        className="wishlist-remove-btn"
                                        onClick={() =>
                                            handleRemoveWishlist(
                                                product._id
                                            )
                                        }
                                        title="Remove from wishlist"
                                    >
                                        <FaTrash />
                                    </button>


                                    {/* PRODUCT IMAGE */}

                                    <Link
                                        href={`/details/${product._id}`}
                                        className="wishlist-product-image"
                                    >

                                        <img
                                            src={
                                                product.images?.[0] ||
                                                "/images/no-image.png"
                                            }
                                            alt={
                                                product.productName ||
                                                "Product"
                                            }
                                        />

                                    </Link>


                                    {/* PRODUCT CONTENT */}

                                    <div className="wishlist-product-content">

                                        <span className="wishlist-product-brand">
                                            {product.brand}
                                        </span>


                                        <Link
                                            href={`/details/${product._id}`}
                                            className="wishlist-product-name"
                                        >
                                            {product.productName}
                                        </Link>


                                        {/* RATING */}

                                        <div className="wishlist-rating">

                                            <span>
                                                <FaStar />
                                                4.3
                                            </span>

                                            <small>
                                                (120)
                                            </small>

                                        </div>


                                        {/* PRICE */}

                                        <div className="wishlist-price">

                                            <strong>
                                                ₹
                                                {Number(
                                                    product.discountPrice ||
                                                    product.price ||
                                                    0
                                                ).toLocaleString("en-IN")}
                                            </strong>

                                            {product.discountPrice > 0 && (
                                                <del>
                                                    ₹
                                                    {Number(
                                                        product.price || 0
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </del>
                                            )}

                                        </div>


                                        {/* ADD TO CART */}

                                        <button
                                            type="button"
                                            className="wishlist-cart-btn"
                                            onClick={() =>
                                                handleAddToCart(
                                                    product._id
                                                )
                                            }
                                        >
                                            <FaShoppingCart />
                                            Add to Cart
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>

                )}

            </Container>

        </main>
    );
};

export default WishlistPage;
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
    FaHeart,
    FaShoppingCart,
    FaTrash,
    FaArrowLeft,
    FaStar,
    FaArrowRight,
} from "react-icons/fa";

import {
    getWishlist,
    removeWishlist,
} from "@/redux/action/wishlistAction";
import { addToCart } from "@/redux/action/cartAction";

import "./WishlistPage.css";

const WishlistPage = () => {
    const dispatch = useDispatch();

    const {
        wishlist,
        isLoading,
        isError,
    } = useSelector((state) => state.wishlistStore);

    const products = wishlist?.products || [];

    useEffect(() => {
        dispatch(getWishlist());
    }, [dispatch]);

    const handleRemove = (productId) => {
        dispatch(removeWishlist(productId));
    };

    const handleAddToCart = (productId) => {
        dispatch(
            addToCart({
                productId,
                quantity: 1,
            })
        );
    };

    return (
        <main className="wishlist-page">

            {/* ================= HEADER ================= */}

            <section className="wishlist-header">
                <div className="wishlist-container">

                    <div className="wishlist-header-content">

                        <div>
                            <div className="wishlist-title-row">
                                <div className="wishlist-title-icon">
                                    <FaHeart />
                                </div>

                                <div>
                                    <h1>My Wishlist</h1>

                                    <p>
                                        Save your favorite products
                                        and shop them anytime.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="wishlist-count">
                            <strong>{products.length}</strong>
                            <span>
                                {products.length === 1
                                    ? "Product"
                                    : "Products"}
                            </span>
                        </div>

                    </div>

                </div>
            </section>


            {/* ================= MAIN ================= */}

            <section className="wishlist-content">

                <div className="wishlist-container">

                    {/* ERROR */}

                    {isError && (
                        <div className="wishlist-error">
                            {typeof isError === "string"
                                ? isError
                                : isError?.message ||
                                "Something went wrong"}
                        </div>
                    )}


                    {/* LOADING */}

                    {isLoading && (
                        <div className="wishlist-loading">
                            <div className="wishlist-spinner"></div>
                            <p>Updating wishlist...</p>
                        </div>
                    )}


                    {/* EMPTY WISHLIST */}

                    {!isLoading && products.length === 0 && (
                        <div className="wishlist-empty">

                            <div className="wishlist-empty-icon">
                                <FaHeart />
                            </div>

                            <h2>Your Wishlist is Empty</h2>

                            <p>
                                You haven't added any products
                                to your wishlist yet.
                            </p>

                            <Link
                                href="/products"
                                className="wishlist-shop-btn"
                            >
                                <FaShoppingCart />
                                Start Shopping
                            </Link>

                        </div>
                    )}


                    {/* ================= PRODUCTS ================= */}

                    {!isLoading && products.length > 0 && (

                        <div className="wishlist-layout">

                            {/* PRODUCTS */}

                            <div className="wishlist-products">

                                <div className="wishlist-products-top">

                                    <div>

                                        <Link
                                            href="/products"
                                            className="continue-shopping"
                                        >
                                            <FaArrowRight/>
                                            Continue Shopping
                                            
                                        </Link> 
                                        
                                        <h2>
                                            Saved Products
                                        </h2>

                                        <span>
                                            {products.length} items
                                        </span>
                                    </div>


                                </div>


                                <div className="wishlist-grid">

                                    {products.map((product) => (

                                        <article
                                            className="wishlist-card"
                                            key={product._id}
                                        >

                                            {/* IMAGE */}

                                            <div className="wishlist-card-image">

                                                <Link
                                                    href={`/details/${product._id}`}
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


                                                {/* REMOVE */}

                                                <button
                                                    type="button"
                                                    className="wishlist-remove-btn"
                                                    onClick={() =>
                                                        handleRemove(
                                                            product._id
                                                        )
                                                    }
                                                >
                                                    <FaTrash />
                                                </button>


                                                {product.discountPrice > 0 && (
                                                    <span className="wishlist-discount">
                                                        SALE
                                                    </span>
                                                )}

                                            </div>


                                            {/* CONTENT */}

                                            <div className="wishlist-card-content">

                                                <span className="wishlist-brand">
                                                    {product.brand ||
                                                        "Brand"}
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
                                                        (120 Reviews)
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
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </strong>

                                                    {product.discountPrice > 0 && (
                                                        <del>
                                                            ₹
                                                            {Number(
                                                                product.price ||
                                                                0
                                                            ).toLocaleString(
                                                                "en-IN"
                                                            )}
                                                        </del>
                                                    )}

                                                </div>


                                                {/* CART */}

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

                                        </article>

                                    ))}

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </section>

        </main>
    );
};

export default WishlistPage;
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";

import {
    FaArrowLeft,
    FaArrowRight,
    FaHeart,
    FaShoppingCart,
    FaStar,
    FaGamepad, FaUtensils,
    FaBook, FaChair
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/redux/action/productAction";
import { addToCart } from "@/redux/action/cartAction";
import {
    getWishlist,
    addWishlist,
    removeWishlist
} from "@/redux/action/wishlistAction";


import { GiLipstick } from "react-icons/gi";
import "./HomePage.css";
const banners = [
    {
        id: 1,
        image: "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/3a5f15a399e6efcf.jpg?q=60",
        title: "Latest Fashion",
        subtitle: "Discover the latest styles",
        button: "Shop Fashion",
        link: "/categories/Fashion",
    },
    {
        id: 2,
        image: "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/2c402ea7c43bba42.png?q=60",
        title: "Latest Mobiles",
        subtitle: "Powerful smartphones at best prices",
        button: "Shop Mobiles",
        link: "/categories/Mobiles",
    },
    {
        id: 3,
        image: "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/920e91c120a24e5a.png?q=60",
        title: "Beauty Essentials",
        subtitle: "Everything you need for your beauty",
        button: "Shop Beauty",
        link: "/categories/Beauty",
    },
];

const categories = [
    {
        name: "For You",
        value: "all",
        icon: <i className="fa-solid fa-bag-shopping"></i>,
    },
    {
        name: "Fashion",
        value: "fashion",
        icon: <i className="fa-solid fa-shirt"></i>,
    },
    {
        name: "Mobiles",
        value: "mobiles",
        icon: <i className="fa-solid fa-mobile-screen-button"></i>,
    },
    {
        name: "Beauty",
        value: "beauty",
        icon: <GiLipstick />,
    },
    {
        name: "Electronics",
        value: "electronics",
        icon: <i className="fa-solid fa-laptop"></i>,
    },
    {
        name: "Home",
        value: "home",
        icon: <i className="bi bi-lamp-fill"></i>,
    },
    {
        name: "Appliances",
        value: "appliances",
        icon: <i className="fa-solid fa-tv"></i>,
    },
    {
        name: "Toys",
        value: "toys",
        icon: <FaGamepad />,
    },
    {
        name: "Food",
        value: "food",
        icon: <FaUtensils />,
    },
    {
        name: "Auto",
        value: "auto",
        icon: <i className="fa-solid fa-helmet-un"></i>,
    },
    {
        name: "2 Wheelers",
        value: "2-wheelers",
        icon: <i className="fa-solid fa-motorcycle"></i>,
    },
    {
        name: "Sports",
        value: "sports",
        icon: <i className="fa-solid fa-baseball-bat-ball"></i>,
    },
    {
        name: "Books",
        value: "books",
        icon: <FaBook />,
    },
    {
        name: "Furniture",
        value: "furniture",
        icon: <FaChair />,
    },
];


const HomePage = () => {
    const [currentBanner, setCurrentBanner] = useState(0);

    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("all");

    const {
        products,
        isLoading,
        isError,
    } = useSelector((state) => state.productStore);


    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getWishlist());
    }, [dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner((prev) =>
                prev === banners.length - 1
                    ? 0
                    : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const previousBanner = () => {
        setCurrentBanner((prev) =>
            prev === 0
                ? banners.length - 1
                : prev - 1
        );
    };

    const nextBanner = () => {
        setCurrentBanner((prev) =>
            prev === banners.length - 1
                ? 0
                : prev + 1
        );
    };

    
    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter(
                (product) =>
                    product.category?.toLowerCase() ===
                    selectedCategory.toLowerCase()
            );

    

    const ProductCard = ({ product }) => {

        const dispatch = useDispatch();

        const {
            isLoading,
        } = useSelector(
            (state) => state.cartStore
        );

        const {
            wishlist,
            isLoading: wishlistLoading,
        } = useSelector(
            (state) => state.wishlistStore
        );

        const isWishlisted =
            wishlist?.products?.some(
                (item) =>
                    String(item?._id || item) ===
                    String(product._id)
            ) || false;

        const handleWishlist = () => {

            console.log(
                "WISHLIST PRODUCT ID:",
                product._id
            );

            if (isWishlisted) {

                // ==============================
                // REMOVE WISHLIST
                // ==============================

                dispatch(
                    removeWishlist(product._id)
                );

            } else {

                // ==============================
                // ADD WISHLIST
                // ==============================

                dispatch(
                    addWishlist(product._id)
                );
            }
            };


        const handleAddToCart = () => {
            console.log("ADD TO CART CLICKED");
            console.log("PRODUCT ID:", product._id);

            dispatch(
                addToCart({
                    productId: product._id,
                    quantity: 1,
                })
            );
        };

        return (
            <div className="foryou-product-card">

                <button
                    type="button"
                    className={`foryou-wishlist-btn ${isWishlisted ? "active" : ""
                        }`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        handleWishlist();
                    }}
                    disabled={wishlistLoading}
                >
                    <FaHeart />
                </button>

                <Link
                    href={`/details/${product._id}`}
                    className="foryou-product-image"
                >
                    <img
                        src={
                            product.images?.[0] ||
                            "/images/no-image.png"
                        }
                        alt={product.productName}
                    />
                </Link>


                <div className="foryou-product-content">

                    <span className="foryou-product-brand">
                        {product.brand}
                    </span>


                    <h3>
                        {product.productName}
                    </h3>

                    <div className="foryou-rating">
                        <span>
                            <FaStar />
                            4.3
                        </span>

                        <small>
                            (120)
                        </small>
                    </div>

                    <div className="foryou-price">

                        <strong>
                            ₹
                            {Number(
                                product.discountPrice ||
                                product.price
                            ).toLocaleString("en-IN")}
                        </strong>

                        {product.discountPrice > 0 && (
                            <del>
                                ₹
                                {Number(
                                    product.price
                                ).toLocaleString(
                                    "en-IN"
                                )}
                            </del>
                        )}

                    </div>

                    <button
                        className="foryou-cart-btn"
                        onClick={handleAddToCart}
                    >
                        <FaShoppingCart />
                        Add to Cart
                    </button>

                    {product.discountPrice > 0 && (
                        <span className="wishlist-discount">
                            SALE
                        </span>
                    )}

                </div>

            </div>
        );
    };

    /* ===============================
       PRODUCT SECTION
    =============================== */

    const ProductSection = ({
        title,
        productsList,
        link,
    }) => {
        if (!productsList.length) {
            return null;
        }

        return (
            <section className="foryou-product-section">

                <div className="foryou-section-header">

                    <div>
                        <h2>{title}</h2>
                        <p>
                            Explore our latest
                            collection
                        </p>
                    </div>

                    <Link
                        href={link}
                        className="foryou-view-all"
                    >
                        View All
                        <FaArrowRight />
                    </Link>

                </div>

                <div className="foryou-products-grid">

                    {productsList.map(
                        (product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        )
                    )}

                </div>

            </section>
        );
    };

    return (
        <>

            <section className="foryou-category-section">
                <Container>
                    <div className="foryou-category-items">

                        {categories.map((category) => {

                            const isActive =
                                selectedCategory === category.value;

                            return (
                                <button
                                    key={category.value}
                                    type="button"
                                    className={`foryou-category-link ${isActive ? "active" : ""
                                        }`}
                                    onClick={() =>
                                        setSelectedCategory(category.value)
                                    }
                                >

                                    <div className="foryou-category-icon">
                                        {category.icon}
                                    </div>

                                    <span>
                                        {category.name}
                                    </span>

                                </button>
                            );

                        })}

                    </div>
                </Container>
            </section>

            <main className="foryou-page">

                {isLoading && (
                    <div className="foryou-page-loading-overlay">
                        <div className="foryou-page-loader"></div>
                        <p>Loading...</p>
                    </div>
                )}




                <section className="foryou-banner-slider">

                    <button
                        className="foryou-banner-arrow foryou-banner-prev"
                        onClick={previousBanner}
                    >
                        <FaArrowLeft />
                    </button>

                    <div className="foryou-banner-track">

                        {/* LEFT CARD */}
                        <div className="foryou-banner-card side-card">
                            <img
                                src={
                                    banners[
                                        (currentBanner - 1 + banners.length) %
                                        banners.length
                                    ].image
                                }
                                alt="Banner"
                            />
                        </div>


                        {/* CENTER CARD */}
                        <div className="foryou-banner-card main-card">
                            <img
                                src={banners[currentBanner].image}
                                alt={banners[currentBanner].title}
                            />
                        </div>


                        {/* RIGHT CARD */}
                        <div className="foryou-banner-card side-card">
                            <img
                                src={
                                    banners[
                                        (currentBanner + 1) %
                                        banners.length
                                    ].image
                                }
                                alt="Banner"
                            />
                        </div>

                    </div>


                    <button
                        className="foryou-banner-arrow foryou-banner-next"
                        onClick={nextBanner}
                    >
                        <FaArrowRight />
                    </button>


                    {/* DOTS */}
                    <div className="foryou-banner-dots">

                        {banners.map((_, index) => (
                            <button
                                key={index}
                                className={
                                    currentBanner === index
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setCurrentBanner(index)
                                }
                            />
                        ))}

                    </div>

                </section>

                <ProductSection
                    title={
                        selectedCategory === "all"
                            ? "All Products"
                            : categories.find(
                                (category) =>
                                    category.value === selectedCategory
                            )?.name
                    }
                    productsList={filteredProducts}
                    link="/products"
                />
            </main>

        </>

    );
};

export default HomePage;
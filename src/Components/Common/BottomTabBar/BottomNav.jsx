"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    FaHome,
    FaBoxOpen,
    FaShoppingCart,
    FaHeart,
    FaBell
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { getCart } from "@/redux/action/cartAction";
import { getWishlist } from "@/redux/action/wishlistAction";

import "./BottomNav.css";
import { useEffect } from "react";

const BottomNav = () => {

    const pathname = usePathname();
    const dispatch = useDispatch();

    // ==============================
    // GET CART
    // ==============================

    const { cart } = useSelector(
        (state) => state.cartStore
    );

    // ==============================
    // GET WISHLIST
    // ==============================

    const { wishlist } = useSelector(
        (state) => state.wishlistStore
    );

    // ==============================
    // GET USER
    // ==============================

    const { user } = useSelector(
        (state) => state.authStore
    );


    // ==============================
    // LOAD CART
    // ==============================

    useEffect(() => {

        if (user?.role === "user") {
            dispatch(getCart());
        }

    }, [user, dispatch]);


    // ==============================
    // LOAD WISHLIST
    // ==============================

    useEffect(() => {

        if (user?.role === "user") {
            dispatch(getWishlist());
        }

    }, [user, dispatch]);


    // ==============================
    // CART COUNT
    // ==============================

    const cartCount =
        cart?.items?.reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        ) || 0;


    // ==============================
    // WISHLIST COUNT
    // ==============================

    const wishlistCount =
        wishlist?.products?.length || 0;


    return (
        <nav className="bottom-nav">

            {/* Home */}
            <Link
                href="/"
                className={`bottom-nav-item ${pathname === "/" ? "active" : ""
                    }`}
            >
                <FaHome />
                <span>Home</span>
            </Link>


            {/* Orders */}
            <Link
                href="/orders"
                className={`bottom-nav-item ${pathname === "/orders" ? "active" : ""
                    }`}
            >
                <FaBoxOpen />
                <span>Orders</span>
            </Link>


            {/* Cart */}
            <Link
                href="/cart"
                className={`bottom-nav-item ${pathname === "/cart" ? "active" : ""
                    }`}
            >

                <div className="bottom-nav-icon">

                    <FaShoppingCart />

                    {cartCount > 0 && (
                        <span className="bottom-nav-badge">
                            {cartCount}
                        </span>
                    )}

                </div>

                <span>Cart</span>

            </Link>


            {/* Wishlist */}
            <Link
                href="/wishlist"
                className={`bottom-nav-item ${pathname === "/wishlist" ? "active" : ""
                    }`}
            >

                <div className="bottom-nav-icon">

                    <FaHeart />

                    {wishlistCount > 0 && (
                        <span className="bottom-nav-badge">
                            {wishlistCount}
                        </span>
                    )}

                </div>

                <span>Wishlist</span>

            </Link>


            {/* Notification */}
            <Link
                href="/notifications"
                className={`bottom-nav-item ${pathname === "/notifications"
                        ? "active"
                        : ""
                    }`}
            >
                <FaBell />
                <span>Alerts</span>
            </Link>

        </nav>
    );
};

export default BottomNav;
"use client";

import React from "react";
import {
    FaDollarSign,
    FaShoppingCart,
    FaBoxOpen,
    FaUsers,
    FaArrowUp,
    FaArrowDown,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle,
    FaEye,
} from "react-icons/fa";

import "./DashboardPage.css";


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCount } from "@/redux/action/adminAction";


const DashboardPage = () => {

    const dispatch = useDispatch();

    const {
        userCount,
        isLoading,
        isError,
    } = useSelector((state) => state.adminStore);

    useEffect(() => {
        dispatch(getUserCount());
    }, [dispatch]);



    const stats = [
        {
            title: "Total Revenue",
            value: "₹1,25,000",
            change: "+12.5%",
            icon: <FaDollarSign />,
            positive: true,
        },
        {
            title: "Total Orders",
            value: "245",
            change: "+8.2%",
            icon: <FaShoppingCart />,
            positive: true,
        },
        {
            title: "Total Products",
            value: "86",
            change: "+4.5%",
            icon: <FaBoxOpen />,
            positive: true,
        },
        {
            title: "Total Users",
            value: isLoading ? "..." : userCount,
            change: "+10.8%",
            icon: <FaUsers />,
            positive: true,
        },
    ];

    const recentOrders = [
        {
            id: "#ORD-1001",
            customer: "Rahul Sharma",
            product: "Nike Shoes",
            amount: "₹2,499",
            payment: "Paid",
            status: "Delivered",
        },
        {
            id: "#ORD-1002",
            customer: "Priya Patel",
            product: "Smart Watch",
            amount: "₹3,999",
            payment: "Paid",
            status: "Processing",
        },
        {
            id: "#ORD-1003",
            customer: "Amit Shah",
            product: "T-Shirt",
            amount: "₹799",
            payment: "Pending",
            status: "Pending",
        },
        {
            id: "#ORD-1004",
            customer: "Neha Joshi",
            product: "Headphones",
            amount: "₹1,599",
            payment: "Paid",
            status: "Delivered",
        },
        {
            id: "#ORD-1005",
            customer: "Riya Mehta",
            product: "Handbag",
            amount: "₹1,299",
            payment: "Failed",
            status: "Cancelled",
        },
    ];

    const topProducts = [
        {
            name: "Nike Shoes",
            sold: 45,
            revenue: "₹1,12,455",
        },
        {
            name: "Smart Watch",
            sold: 38,
            revenue: "₹98,200",
        },
        {
            name: "T-Shirt",
            sold: 31,
            revenue: "₹24,800",
        },
        {
            name: "Headphones",
            sold: 26,
            revenue: "₹41,574",
        },
    ];

    const lowStock = [
        {
            name: "Nike Shoes",
            stock: 3,
        },
        {
            name: "Smart Watch",
            stock: 2,
        },
        {
            name: "T-Shirt",
            stock: 5,
        },
        {
            name: "Handbag",
            stock: 4,
        },
    ];

    return (
        <div className="dashboard-page">

            {/* ================= HEADER ================= */}

            <div className="dashboard-heading">
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome back, Admin 👋</p>
                </div>

                <div className="dashboard-date">
                    <span>Today</span>
                    <strong>August 11, 2026</strong>
                </div>
            </div>


            {/* ================= STATS ================= */}

            <div className="stats-grid">

                {stats.map((item, index) => (
                    <div className="stat-card" key={index}>

                        <div className="stat-card-top">

                            <div className="stat-icon">
                                {item.icon}
                            </div>

                            <span
                                className={
                                    item.positive
                                        ? "growth positive"
                                        : "growth negative"
                                }
                            >
                                {item.positive ? (
                                    <FaArrowUp />
                                ) : (
                                    <FaArrowDown />
                                )}

                                {item.change}
                            </span>

                        </div>

                        <div className="stat-content">

                            <p>{item.title}</p>

                            <h2>{item.value}</h2>

                        </div>

                        <span className="stat-period">
                            Compared to last month
                        </span>

                    </div>
                ))}

            </div>


            {/* ================= CHART + ORDER STATUS ================= */}

            <div className="dashboard-two-column">

                {/* SALES CHART */}

                <div className="dashboard-card sales-card">

                    <div className="card-header">

                        <div>
                            <h3>Sales Overview</h3>
                            <p>Monthly revenue performance</p>
                        </div>

                        <select>
                            <option>2026</option>
                            <option>2025</option>
                        </select>

                    </div>

                    <div className="sales-chart">

                        <div className="chart-y-axis">
                            <span>₹50K</span>
                            <span>₹40K</span>
                            <span>₹30K</span>
                            <span>₹20K</span>
                            <span>₹10K</span>
                            <span>₹0</span>
                        </div>

                        <div className="chart-area">

                            <div className="chart-grid-line line-1"></div>
                            <div className="chart-grid-line line-2"></div>
                            <div className="chart-grid-line line-3"></div>
                            <div className="chart-grid-line line-4"></div>
                            <div className="chart-grid-line line-5"></div>

                            <div className="chart-bars">

                                <div className="bar-wrapper">
                                    <div className="bar bar-1"></div>
                                    <span>Jan</span>
                                </div>

                                <div className="bar-wrapper">
                                    <div className="bar bar-2"></div>
                                    <span>Feb</span>
                                </div>

                                <div className="bar-wrapper">
                                    <div className="bar bar-3"></div>
                                    <span>Mar</span>
                                </div>

                                <div className="bar-wrapper">
                                    <div className="bar bar-4"></div>
                                    <span>Apr</span>
                                </div>

                                <div className="bar-wrapper">
                                    <div className="bar bar-5"></div>
                                    <span>May</span>
                                </div>

                                <div className="bar-wrapper">
                                    <div className="bar bar-6"></div>
                                    <span>Jun</span>
                                </div>

                                <div className="bar-wrapper">
                                    <div className="bar bar-7"></div>
                                    <span>Jul</span>
                                </div>

                                <div className="bar-wrapper">
                                    <div className="bar bar-8"></div>
                                    <span>Aug</span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ORDER STATUS */}

                <div className="dashboard-card order-status-card">

                    <div className="card-header">

                        <div>
                            <h3>Order Status</h3>
                            <p>Current order summary</p>
                        </div>

                        <FaShoppingCart className="header-card-icon" />

                    </div>

                    <div className="order-status-list">

                        <div className="status-row">

                            <div className="status-name">
                                <span className="status-icon pending">
                                    <FaClock />
                                </span>

                                <span>Pending</span>
                            </div>

                            <strong>12</strong>

                        </div>


                        <div className="status-row">

                            <div className="status-name">
                                <span className="status-icon processing">
                                    <FaBoxOpen />
                                </span>

                                <span>Processing</span>
                            </div>

                            <strong>8</strong>

                        </div>


                        <div className="status-row">

                            <div className="status-name">
                                <span className="status-icon delivered">
                                    <FaCheckCircle />
                                </span>

                                <span>Delivered</span>
                            </div>

                            <strong>180</strong>

                        </div>


                        <div className="status-row">

                            <div className="status-name">
                                <span className="status-icon cancelled">
                                    <FaTimesCircle />
                                </span>

                                <span>Cancelled</span>
                            </div>

                            <strong>10</strong>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================= RECENT ORDERS ================= */}

            <div className="dashboard-card recent-orders-card">

                <div className="card-header">

                    <div>
                        <h3>Recent Orders</h3>
                        <p>Latest customer orders</p>
                    </div>

                    <button className="view-all-btn">
                        View All
                    </button>

                </div>


                <div className="table-responsive">

                    <table className="orders-table">

                        <thead>

                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {recentOrders.map((order, index) => (

                                <tr key={index}>

                                    <td>
                                        <strong>{order.id}</strong>
                                    </td>

                                    <td>{order.customer}</td>

                                    <td>{order.product}</td>

                                    <td>
                                        <strong>{order.amount}</strong>
                                    </td>

                                    <td>
                                        <span
                                            className={`payment-badge ${order.payment.toLowerCase()}`}
                                        >
                                            {order.payment}
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={`order-badge ${order.status.toLowerCase()}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    <td>

                                        <button className="view-btn">
                                            <FaEye />
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* ================= BOTTOM SECTION ================= */}

            <div className="dashboard-bottom-grid">

                {/* TOP PRODUCTS */}

                <div className="dashboard-card">

                    <div className="card-header">

                        <div>
                            <h3>Top Selling Products</h3>
                            <p>Best performing products</p>
                        </div>

                    </div>


                    <div className="top-products-list">

                        {topProducts.map((product, index) => (

                            <div className="product-row" key={index}>

                                <div className="product-number">
                                    {index + 1}
                                </div>

                                <div className="product-details">

                                    <strong>{product.name}</strong>

                                    <span>
                                        {product.sold} sold
                                    </span>

                                </div>

                                <strong className="product-revenue">
                                    {product.revenue}
                                </strong>

                            </div>

                        ))}

                    </div>

                </div>


                {/* LOW STOCK */}

                <div className="dashboard-card">

                    <div className="card-header">

                        <div>
                            <h3>Low Stock Products</h3>
                            <p>Products that need attention</p>
                        </div>

                        <FaExclamationTriangle className="warning-icon" />

                    </div>


                    <div className="low-stock-list">

                        {lowStock.map((product, index) => (

                            <div className="stock-row" key={index}>

                                <div className="stock-product">

                                    <div className="stock-product-icon">
                                        <FaBoxOpen />
                                    </div>

                                    <div>
                                        <strong>{product.name}</strong>
                                        <span>Only {product.stock} left</span>
                                    </div>

                                </div>

                                <span className="stock-warning">
                                    Low Stock
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default DashboardPage;
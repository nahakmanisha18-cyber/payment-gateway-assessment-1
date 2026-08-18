"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
    FaSearch,
    FaDownload,
    FaEye,
    FaCreditCard,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaMoneyBillWave,
    FaFilter,
} from "react-icons/fa";

import "./PaymentPage.css";

const PaymentPage = () => {

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [method, setMethod] = useState("All");

    // Demo Payments
    const payments = [
        {
            id: "PAY001",
            orderId: "ORD001",
            customer: "Manisha Nahak",
            email: "manisha@gmail.com",
            date: "14 Aug 2026",
            amount: 2499,
            method: "UPI",
            status: "Paid",
        },
        {
            id: "PAY002",
            orderId: "ORD002",
            customer: "Rahul Sharma",
            email: "rahul@gmail.com",
            date: "13 Aug 2026",
            amount: 1299,
            method: "Card",
            status: "Paid",
        },
        {
            id: "PAY003",
            orderId: "ORD003",
            customer: "Priya Patel",
            email: "priya@gmail.com",
            date: "13 Aug 2026",
            amount: 899,
            method: "COD",
            status: "Pending",
        },
        {
            id: "PAY004",
            orderId: "ORD004",
            customer: "Amit Kumar",
            email: "amit@gmail.com",
            date: "12 Aug 2026",
            amount: 3499,
            method: "UPI",
            status: "Failed",
        },
        {
            id: "PAY005",
            orderId: "ORD005",
            customer: "Neha Singh",
            email: "neha@gmail.com",
            date: "12 Aug 2026",
            amount: 1899,
            method: "Net Banking",
            status: "Paid",
        },
        {
            id: "PAY006",
            orderId: "ORD006",
            customer: "Rohit Verma",
            email: "rohit@gmail.com",
            date: "11 Aug 2026",
            amount: 4599,
            method: "Card",
            status: "Refunded",
        },
        {
            id: "PAY007",
            orderId: "ORD007",
            customer: "Anjali Gupta",
            email: "anjali@gmail.com",
            date: "10 Aug 2026",
            amount: 799,
            method: "UPI",
            status: "Paid",
        },
        {
            id: "PAY008",
            orderId: "ORD008",
            customer: "Vikas Yadav",
            email: "vikas@gmail.com",
            date: "10 Aug 2026",
            amount: 2199,
            method: "Wallet",
            status: "Pending",
        },
    ];


    // Filter Payments
    const filteredPayments = payments.filter((payment) => {

        const searchMatch =
            payment.id.toLowerCase().includes(search.toLowerCase()) ||
            payment.orderId.toLowerCase().includes(search.toLowerCase()) ||
            payment.customer.toLowerCase().includes(search.toLowerCase()) ||
            payment.email.toLowerCase().includes(search.toLowerCase());

        const statusMatch =
            status === "All" ||
            payment.status === status;

        const methodMatch =
            method === "All" ||
            payment.method === method;

        return searchMatch && statusMatch && methodMatch;
    });


    // Statistics
    const totalRevenue = payments
        .filter((payment) => payment.status === "Paid")
        .reduce((total, payment) => total + payment.amount, 0);

    const successfulPayments = payments.filter(
        (payment) => payment.status === "Paid"
    ).length;

    const pendingPayments = payments.filter(
        (payment) => payment.status === "Pending"
    ).reduce((total, payment) => total + payment.amount, 0);

    const failedPayments = payments.filter(
        (payment) => payment.status === "Failed"
    ).reduce((total, payment) => total + payment.amount, 0);


    return (

        <div className="payments-page">

            {/* ================= HEADER ================= */}

            <div className="payments-heading">

                <div>

                    <h1>
                        Payments
                    </h1>

                    <p>
                        Manage and track all payment transactions
                    </p>

                </div>


                <button className="payment-export-btn">

                    <FaDownload />

                    Export Report

                </button>

            </div>


            {/* ================= STATS ================= */}

            <div className="payment-stats">


                {/* Total Revenue */}

                <div className="payment-stat-card">

                    <div className="payment-stat-icon blue">

                        <FaMoneyBillWave />

                    </div>

                    <div>

                        <span>
                            Total Revenue
                        </span>

                        <h2>
                            ₹{totalRevenue.toLocaleString("en-IN")}
                        </h2>

                    </div>

                </div>


                {/* Successful */}

                <div className="payment-stat-card">

                    <div className="payment-stat-icon green">

                        <FaCheckCircle />

                    </div>

                    <div>

                        <span>
                            Successful Payments
                        </span>

                        <h2>
                            {successfulPayments}
                        </h2>

                    </div>

                </div>


                {/* Pending */}

                <div className="payment-stat-card">

                    <div className="payment-stat-icon orange">

                        <FaClock />

                    </div>

                    <div>

                        <span>
                            Pending Payments
                        </span>

                        <h2>
                            ₹{pendingPayments.toLocaleString("en-IN")}
                        </h2>

                    </div>

                </div>


                {/* Failed */}

                <div className="payment-stat-card">

                    <div className="payment-stat-icon red">

                        <FaTimesCircle />

                    </div>

                    <div>

                        <span>
                            Failed Payments
                        </span>

                        <h2>
                            ₹{failedPayments.toLocaleString("en-IN")}
                        </h2>

                    </div>

                </div>

            </div>


            {/* ================= PAYMENT CARD ================= */}

            <div className="payments-card">


                {/* FILTER HEADER */}

                <div className="payment-filters">


                    {/* Search */}

                    <div className="payment-search">

                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Search payment, order or customer..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>


                    {/* Status */}

                    <select
                        className="payment-filter-select"
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >

                        <option value="All">
                            All Status
                        </option>

                        <option value="Paid">
                            Paid
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Failed">
                            Failed
                        </option>

                        <option value="Refunded">
                            Refunded
                        </option>

                    </select>


                    {/* Method */}

                    <select
                        className="payment-filter-select"
                        value={method}
                        onChange={(e) =>
                            setMethod(e.target.value)
                        }
                    >

                        <option value="All">
                            All Methods
                        </option>

                        <option value="UPI">
                            UPI
                        </option>

                        <option value="Card">
                            Card
                        </option>

                        <option value="COD">
                            COD
                        </option>

                        <option value="Net Banking">
                            Net Banking
                        </option>

                        <option value="Wallet">
                            Wallet
                        </option>

                    </select>

                </div>


                {/* ================= TABLE ================= */}

                <div className="payment-table-container">

                    <table className="payments-table">

                        <thead>

                            <tr>

                                <th>
                                    Payment ID
                                </th>

                                <th>
                                    Order ID
                                </th>

                                <th>
                                    Customer
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Amount
                                </th>

                                <th>
                                    Method
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredPayments.length > 0 ? (

                                filteredPayments.map((payment) => (

                                    <tr key={payment.id}>


                                        {/* Payment ID */}

                                        <td>

                                            <strong className="payment-id">

                                                #{payment.id}

                                            </strong>

                                        </td>


                                        {/* Order ID */}

                                        <td>

                                            <span className="order-id">

                                                #{payment.orderId}

                                            </span>

                                        </td>


                                        {/* Customer */}

                                        <td>

                                            <div className="payment-customer">

                                                <div className="customer-avatar">

                                                    {payment.customer
                                                        .charAt(0)
                                                        .toUpperCase()}

                                                </div>

                                                <div>

                                                    <strong>
                                                        {payment.customer}
                                                    </strong>

                                                    <span>
                                                        {payment.email}
                                                    </span>

                                                </div>

                                            </div>

                                        </td>


                                        {/* Date */}

                                        <td>

                                            <span className="payment-date">

                                                {payment.date}

                                            </span>

                                        </td>


                                        {/* Amount */}

                                        <td>

                                            <strong className="payment-amount">

                                                ₹{payment.amount.toLocaleString("en-IN")}

                                            </strong>

                                        </td>


                                        {/* Method */}

                                        <td>

                                            <span className="payment-method">

                                                <FaCreditCard />

                                                {payment.method}

                                            </span>

                                        </td>


                                        {/* Status */}

                                        <td>

                                            <span
                                                className={`payment-status ${payment.status.toLowerCase()}`}
                                            >

                                                {payment.status === "Paid" && (
                                                    <FaCheckCircle />
                                                )}

                                                {payment.status === "Pending" && (
                                                    <FaClock />
                                                )}

                                                {payment.status === "Failed" && (
                                                    <FaTimesCircle />
                                                )}

                                                {payment.status === "Refunded" && (
                                                    <FaMoneyBillWave />
                                                )}

                                                {payment.status}

                                            </span>

                                        </td>


                                        {/* Action */}

                                        <td>

                                            <div className="payment-actions">

                                                <Link
                                                    href={`/admin/payments/${payment.id}`}
                                                    className="payment-action-btn view"
                                                    title="View Payment"
                                                >

                                                    <FaEye />

                                                </Link>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="no-payments"
                                    >

                                        <FaFilter />

                                        <p>
                                            No payments found
                                        </p>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default PaymentPage;
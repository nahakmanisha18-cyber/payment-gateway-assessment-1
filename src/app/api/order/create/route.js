import { NextResponse } from "next/server";

import Order from "@/lib/model/order";
import Product from "@/lib/model/product";

import { dbConnect } from "@/lib/dbConnect";
import { verifyToken } from "@/lib/verifyToken";

export async function POST(request) {
    try {
        await dbConnect();

        const user = await verifyToken(request);

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please login first",
                },
                {
                    status: 401,
                }
            );
        }

        const body = await request.json();

        const {
            items,
            shippingAddress,
            paymentMethod = "razorpay",
            razorpayOrderId,
            razorpayPaymentId,
        } = body;

        // ==============================
        // VALIDATION
        // ==============================

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Order items are required",
                },
                {
                    status: 400,
                }
            );
        }

        if (!shippingAddress) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Shipping address is required",
                },
                {
                    status: 400,
                }
            );
        }

        // ==============================
        // CREATE ORDER ITEMS
        // ==============================

        const orderItems = [];

        let subtotal = 0;

        for (const item of items) {
            if (!item.productId) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Product ID is missing",
                    },
                    {
                        status: 400,
                    }
                );
            }

            const product = await Product.findById(item.productId);

            if (!product) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Product not found",
                    },
                    {
                        status: 404,
                    }
                );
            }

            const price = Number(
                product.discountPrice ||
                product.price ||
                0
            );

            const quantity = Number(item.quantity || 1);

            const itemTotal = price * quantity;

            subtotal += itemTotal;

            orderItems.push({
                product: product._id,

                productName:
                    product.productName,

                image:
                    product.images?.[0] || "",

                price,

                quantity,
            });
        }

        // ==============================
        // DELIVERY
        // ==============================

        const deliveryCharge =
            subtotal >= 500 ? 0 : 40;

        const totalAmount =
            subtotal + deliveryCharge;

        // ==============================
        // CREATE ORDER
        // ==============================

        const order = await Order.create({
            user: user.id || user._id,

            items: orderItems,

            shippingAddress: {
                fullName:
                    shippingAddress.fullName,

                mobile:
                    shippingAddress.mobile,

                address:
                    shippingAddress.address,

                city:
                    shippingAddress.city,

                state:
                    shippingAddress.state,

                pincode:
                    shippingAddress.pincode,
            },

            subtotal,

            deliveryCharge,

            totalAmount,

            paymentMethod,

            paymentStatus:
                razorpayPaymentId
                    ? "paid"
                    : "pending",

            razorpayOrderId:
                razorpayOrderId || "",

            razorpayPaymentId:
                razorpayPaymentId || "",

            orderStatus:
                razorpayPaymentId
                    ? "confirmed"
                    : "pending",
        });

        await order.populate("items.product");

        return NextResponse.json(
            {
                success: true,
                message: "Order created successfully",
                order,
            },
            {
                status: 201,
            }
        );

    } catch (error) {

        console.error(
            "CREATE ORDER ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    error?.message ||
                    "Failed to create order",
            },
            {
                status: 500,
            }
        );
    }
}
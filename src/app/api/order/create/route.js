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
                {success: false,message: "Please login first"},
                {status: 401}
            );
        }

        const body = await request.json();
        const {
            productId,
            quantity = 1,
            shippingAddress,
            paymentMethod = "razorpay",
            razorpayOrderId,
            razorpayPaymentId,
        } = body;

        if (!productId) {

            return NextResponse.json(
                { success: false, message: "Product ID is required" },
                {  status: 400}
            );
        }

        if (!shippingAddress) {

            return NextResponse.json(
                {success: false, message: "Shipping address is required" },
                {status: 400}
            );
        }
        const product = await Product.findById(productId);

        if (!product) {
            return NextResponse.json(
                {success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        const price = Number(
            product.discountPrice ||
            product.price ||
            0
        );

        const subtotal =
            price * Number(quantity);

        const deliveryCharge =
            subtotal >= 500 ? 0 : 50;

        const totalAmount =
            subtotal + deliveryCharge;

        const order = await Order.create({

            user: user.id || user._id,

            items: [
                {
                    product: product._id,

                    productName:
                        product.productName,

                    image:
                        product.images?.[0] || "",

                    price,

                    quantity:
                        Number(quantity),
                },
            ],

            shippingAddress: {
                fullName: shippingAddress.fullName,
                mobile: shippingAddress.mobile,
                address: shippingAddress.address,
                city: shippingAddress.city,
                state: shippingAddress.state,
                pincode: shippingAddress.pincode,
            },

            subtotal,
            deliveryCharge,
            totalAmount,
            paymentMethod,
            paymentStatus: razorpayPaymentId ? "paid" : "pending",
            razorpayOrderId: razorpayOrderId || "",
            razorpayPaymentId: razorpayPaymentId || "",
            orderStatus: razorpayPaymentId ? "confirmed" : "pending",
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
            { success: false, message: "Failed to create order" },
            {status: 500}
        );
    }
}
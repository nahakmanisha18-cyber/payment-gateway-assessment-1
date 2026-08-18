import { NextResponse } from "next/server";

import Order from "@/lib/model/order";

import { dbConnect } from "@/lib/dbConnect";
import { verifyToken } from "@/lib/verifyToken";

export async function PATCH(request, { params }) {

    try {

        await dbConnect();
        const user = await verifyToken(request);
        if (!user) {

            return NextResponse.json(
                {success: false,message: "Please login first"},
                {status: 401}
            );
        }

        const { id } = await params;
        const userId = user.id || user._id;
        const order =
            await Order.findOne({_id: id, user: userId});

        if (!order) {
            return NextResponse.json(
                { success: false, message: "Order not found"
                },
                { status: 404}
            );
        }

        if ( order.orderStatus === "delivered" ) {

            return NextResponse.json(
                { success: false, message: "Delivered order cannot be cancelled"},
                { status: 400}
            );
        }

        if ( order.orderStatus === "shipped" ) {

            return NextResponse.json(
                { success: false,  message:"Shipped order cannot be cancelled"},
                {status: 400}
            );
        }
        order.orderStatus =
            "cancelled";

        await order.save();

        return NextResponse.json(
            {success: true, message:"Order cancelled successfully",order },
            {status: 200}
        );

    } catch (error) {

        console.error( "CANCEL ORDER ERROR:",error);

        return NextResponse.json(
            { success: false, message: "Failed to cancel order"},
            { status: 500 }
        );
    }
}
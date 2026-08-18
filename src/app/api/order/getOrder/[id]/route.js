import { NextResponse } from "next/server";

import Order from "@/lib/model/order";

import { dbConnect } from "@/lib/dbConnect";
import { verifyToken } from "@/lib/verifyToken";

export async function GET( request,{ params }) {

    try {
        await dbConnect();
        const user = await verifyToken(request);

        if (!user) {

            return NextResponse.json(
                { success: false,message: "Please login first"},
                { status: 401 }
            );
        }

        const { id } = await params;
        const userId =  user.id || user._id;

        const order =
            await Order.findOne({_id: id, user: userId })
                .populate(
                    "items.product"
                );

        if (!order) {

            return NextResponse.json(
                {success: false, message: "Order not found"},
                { status: 404}
            );
        }

        return NextResponse.json(
            {  success: true, order},
            { status: 200}
        );

    } catch (error) {
        console.error( "GET ORDER ERROR:", error );

        return NextResponse.json(
            { success: false,  message: "Failed to get order"},
            { status: 500}
        );
    }
}
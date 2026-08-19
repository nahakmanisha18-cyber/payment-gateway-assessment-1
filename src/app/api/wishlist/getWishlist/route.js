import { NextResponse } from "next/server";
import Wishlist from "@/lib/model/wishlist";
import { verifyToken } from "@/lib/verifyToken";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(request) {
    try {
        await dbConnect();

        const decoded = verifyToken(request);

        if (!decoded) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please login first",
                },
                { status: 401 }
            );
        }

        const wishlist = await Wishlist.findOne({
            user: decoded.id,
        }).populate("products");

        if (!wishlist) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Wishlist is empty",
                    wishlist: {
                        products: [],
                    },
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                wishlist,
            },
            { status: 200 }
        );

    } catch (error) {

        console.error(
            "GET WISHLIST ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Failed to get wishlist",
            },
            { status: 500 }
        );
    }
}
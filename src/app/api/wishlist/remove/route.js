import { NextResponse } from "next/server";
import Wishlist from "@/lib/model/wishlist";
import { verifyToken } from "@/lib/verifyToken";
import { dbConnect } from "@/lib/dbConnect";

export async function DELETE(request) {
    try {
        await dbConnect();

        const decoded = verifyToken(request);

        if (!decoded) {
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

        const userId = decoded.id;

        const body = await request.json();

        const { productId } = body;

        if (!productId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product ID is required",
                },
                {
                    status: 400,
                }
            );
        }

        const wishlist = await Wishlist.findOne({
            user: userId,
        });

        if (!wishlist) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Wishlist not found",
                },
                {
                    status: 404,
                }
            );
        }

        wishlist.products = wishlist.products.filter(
            (id) =>
                id.toString() !== productId.toString()
        );

        await wishlist.save();

        return NextResponse.json(
            {
                success: true,
                message: "Product removed from wishlist",
                wishlist,
            },
            {
                status: 200,
            }
        );

    } catch (error) {

        console.error(
            "REMOVE WISHLIST ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Failed to remove wishlist",
            },
            {
                status: 500,
            }
        );
    }
}
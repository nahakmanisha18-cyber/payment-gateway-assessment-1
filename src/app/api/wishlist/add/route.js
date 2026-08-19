import { NextResponse } from "next/server";
import Wishlist from "@/lib/model/wishlist";
import { verifyToken } from "@/lib/verifyToken";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(request) {
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

        const { productId } = await request.json();

        if (!productId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product ID is required",
                },
                { status: 400 }
            );
        }

        const userId = decoded.id;

        let wishlist = await Wishlist.findOne({
            user: userId,
        });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: userId,
                products: [productId],
            });

            return NextResponse.json(
                {
                    success: true,
                    message: "Product added to wishlist",
                    wishlist,
                },
                { status: 201 }
            );
        }

        if (wishlist.products.includes(productId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product already in wishlist",
                    wishlist,
                },
                { status: 400 }
            );
        }

        wishlist.products.push(productId);

        await wishlist.save();

        return NextResponse.json(
            {
                success: true,
                message: "Product added to wishlist",
                wishlist,
            },
            { status: 200 }
        );

    } catch (error) {

        console.error(
            "ADD WISHLIST ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Failed to add product to wishlist",
            },
            { status: 500 }
        );
    }
}
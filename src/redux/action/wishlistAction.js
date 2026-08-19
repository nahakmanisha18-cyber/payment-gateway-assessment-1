import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


// ADD WISHLIST
export const addWishlist = createAsyncThunk(
    "wishlist/addWishlist",

    async (productId, { rejectWithValue }) => {
        try {

            const token =
                sessionStorage.getItem("TOKEN");

            if (!token) {
                return rejectWithValue({
                    message: "Please login first",
                });
            }

            const { data } = await axios.post(
                "/api/wishlist/add",
                {
                    productId,
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            return data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data || {
                    message:
                        "Failed to add wishlist",
                }
            );
        }
    }
);


// REMOVE WISHLIST
export const removeWishlist = createAsyncThunk(
    "wishlist/removeWishlist",

    async (productId, { rejectWithValue }) => {
        try {

            const token =
                sessionStorage.getItem("TOKEN");

            if (!token) {
                return rejectWithValue({
                    message: "Please login first",
                });
            }

            const { data } = await axios.delete(
                "/api/wishlist/remove",
                {
                    data: {
                        productId,
                    },

                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            return data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data || {
                    message:
                        "Failed to remove wishlist",
                }
            );
        }
    }
);


// GET WISHLIST
export const getWishlist = createAsyncThunk(
    "wishlist/getWishlist",

    async (_, { rejectWithValue }) => {
        try {

            const token =
                sessionStorage.getItem("TOKEN");

            if (!token) {
                return rejectWithValue({
                    message: "Please login first",
                });
            }

            const { data } = await axios.get(
                "/api/wishlist/getWishlist",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            return data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data || {
                    message:
                        "Failed to get wishlist",
                }
            );
        }
    }
);
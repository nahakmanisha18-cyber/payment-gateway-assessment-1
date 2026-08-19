import { createSlice } from "@reduxjs/toolkit";

import {
    addWishlist,
    removeWishlist,
    getWishlist,
} from "../action/wishlistAction";


const initialState = {
    wishlist: null,
    isLoading: false,
    isError: null,
    isSuccess: false,
};


const wishlistSlice = createSlice({

    name: "wishlist",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        // ADD

        builder.addCase(
            addWishlist.pending,
            (state) => {
                state.isLoading = true;
                state.isError = null;
            }
        );

        builder.addCase(
            addWishlist.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;

                state.wishlist =
                    action.payload.wishlist;
            }
        );

        builder.addCase(
            addWishlist.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;

                state.isError =
                    action.payload?.message ||
                    "Failed to add wishlist";
            }
        );


        // REMOVE

        builder.addCase(
            removeWishlist.pending,
            (state) => {
                state.isLoading = true;
                state.isError = null;
            }
        );

        builder.addCase(
            removeWishlist.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;

                state.wishlist =
                    action.payload.wishlist;
            }
        );

        builder.addCase(
            removeWishlist.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;

                state.isError =
                    action.payload?.message ||
                    "Failed to remove wishlist";
            }
        );


        // GET

        builder.addCase(
            getWishlist.pending,
            (state) => {
                state.isLoading = true;
                state.isError = null;
            }
        );

        builder.addCase(
            getWishlist.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;

                state.wishlist =
                    action.payload.wishlist;
            }
        );

        builder.addCase(
            getWishlist.rejected,
            (state, action) => {
                state.isLoading = false;

                state.isError =
                    action.payload?.message ||
                    "Failed to get wishlist";
            }
        );

    },

});


export default wishlistSlice.reducer;
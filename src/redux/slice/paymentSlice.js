import { createSlice } from "@reduxjs/toolkit";

import { createPaymentOrder, verifyPayment } from "../action/paymentAction";


const initialState = {
    order: null,
    payment: null,
    isLoading: false,
    isError: null,
    isSuccess: false,
};


const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {

        clearPaymentState: (state) => {

            state.order = null;
            state.payment = null;
            state.isLoading = false;
            state.isError = null;
            state.isSuccess = false;

        },

    },


    extraReducers: (builder) => {

        // CREATE PAYMENT ORDER
        builder.addCase( createPaymentOrder.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isSuccess = false;
            }
        );


        builder.addCase(
            createPaymentOrder.fulfilled,(state, action) => {
                state.isLoading = false;
                state.order = action.payload.order;
                state.isSuccess = action.payload.success;
            }
        );


        builder.addCase(
            createPaymentOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload?.message || "Order creation failed";
                state.isSuccess = false;
            }
        );

        // VERIFY PAYMENT

        builder.addCase( verifyPayment.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            }
        );

        builder.addCase( verifyPayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.payment = action.payload;
                state.isSuccess = action.payload.success;
            }
        );

        builder.addCase(verifyPayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload?.message ||  "Payment verification failed";
                state.isSuccess = false;
            }
        );

    },

});


export const {clearPaymentState} = paymentSlice.actions;
export default paymentSlice.reducer;
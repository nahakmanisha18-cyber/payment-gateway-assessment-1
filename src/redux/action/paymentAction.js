import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPaymentOrder = createAsyncThunk("payment/createPaymentOrder",
    async (amount, { rejectWithValue }) => {
        try {
            const res = await axios.post("/api/payment/create-order",{amount});
            return res.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data || {
                    message: "Order creation failed",
                }
            );
        }
    }
);


export const verifyPayment = createAsyncThunk("payment/verifyPayment",
    async (paymentData, { rejectWithValue }) => {
        try {
            const res = await axios.post("/api/payment/verify",paymentData );
            return res.data;
        } catch (error) {

            return rejectWithValue(
                error.response?.data || {
                    message: "Payment verification failed",
                }
            );
        }
    }
);
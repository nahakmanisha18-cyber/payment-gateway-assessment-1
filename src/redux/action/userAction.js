import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(
                "/api/user/updateProfile",
                userData
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data || "Something went wrong"
            );
        }
    }
);

export const getUserProfile = createAsyncThunk(
    "user/getProfile",
    async (email, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `/api/user/getProfile?email=${email}`
            );

            return data.user;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data || "Something went wrong"
            );
        }
    }
);
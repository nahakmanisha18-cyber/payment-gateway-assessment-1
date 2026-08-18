import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserCount = createAsyncThunk(
    "admin/getUserCount",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("/api/admin/users/count");

            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: "Something went wrong",
                }
            );
        }
    }
);
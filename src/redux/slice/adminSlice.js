import { createSlice } from "@reduxjs/toolkit";
import { getUserCount } from "../action/adminAction";

const initialState = {
    userCount: 0,
    isLoading: false,
    isError: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getUserCount.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })

        builder.addCase(getUserCount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userCount = action.payload.count;
            })

        builder.addCase(getUserCount.rejected, (state, action) => {
                state.isLoading = false;
                state.isError =
                    action.payload?.message || "Failed to get user count";
            });
    },
});

export default adminSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile, updateProfile } from "../action/userAction";

const initialState = {
    profile: null,
    isLoading: false,
    isError: null,
    isUpdated: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        clearUserError: (state) => {
            state.isError = null;
        },

        resetUpdateStatus: (state) => {
            state.isUpdated = false;
        },
    },

    extraReducers: (builder) => {

        // =========================
        // GET USER PROFILE
        // =========================

        builder.addCase(getUserProfile.pending, (state) => {
            state.isLoading = true;
            state.isError = null;
        });

        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.profile = action.payload;
        });

        builder.addCase(getUserProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.isError =
                action.payload || "Failed to fetch user profile";
        });

        // =========================
        // UPDATE PROFILE
        // =========================

        builder.addCase(updateProfile.pending, (state) => {
            state.isLoading = true;
            state.isError = null;
            state.isUpdated = false;
        });

        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.profile = action.payload.user;
            state.isUpdated = true;

            if (typeof window !== "undefined") {
                sessionStorage.setItem(
                    "USER",
                    JSON.stringify(action.payload.user)
                );
            }
        });

        builder.addCase(updateProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.isError =
                action.payload || "Profile update failed";
        });
    },
});

export const { clearUserError, resetUpdateStatus } = userSlice.actions;

export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { logIn, signUp, logout } from "../action/authAction";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoding: false,
        isError: null,
        isCreate: false,
        isAuthenticated: false,
    },
    reducers: {
        getProfile: (state) => {
            const user = sessionStorage.getItem("USER");

            if (user) {
                state.user = JSON.parse(user);
            }
        },

        clearError: (state) => {
            state.isError = null;
        }
    },

    extraReducers: (builder) => {

        builder.addCase(signUp.pending, (state) => {
            state.isLoding = true,
                state.isError = null
        })
        builder.addCase(signUp.fulfilled, (state) => {
            state.isLoding = false
        })

        builder.addCase(signUp.rejected, (state, action) => {
            state.isLoding = false,
                state.isError = action.payload?.message || null;
        })

        builder.addCase(logIn.pending, (state) => {
            state.isLoding = true;
            state.isError = null;
        });

        builder.addCase(logIn.fulfilled, (state, action) => {

            state.isLoding = false;

            state.user = action.payload.user;

            state.isAuthenticated = true;

            sessionStorage.setItem(
                "USER",
                JSON.stringify(action.payload.user)
            );

            sessionStorage.setItem(
                "TOKEN",
                action.payload.token
            );

        });
        builder.addCase(logIn.rejected, (state, action) => {
            state.isLoding = false;
            state.isError = action.payload?.message || null;

        });

        builder.addCase(logout.pending, (state) => {
            state.isLoding = true;
        })

        builder.addCase(logout.fulfilled, (state) => {

            state.isLoding = false;

            state.user = null;

            state.isAuthenticated = false;

            sessionStorage.removeItem("USER");
            sessionStorage.removeItem("TOKEN");

        });

        builder.addCase(logout.rejected, (state, action) => {

            state.isLoding = false;

            state.isError = action.payload?.message || "Logout failed";

        });

    }
})
export const { getProfile, clearError } = authSlice.actions;
export default authSlice.reducer

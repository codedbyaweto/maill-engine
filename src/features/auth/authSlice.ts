"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse, User } from "@/models/response/userResponses";
import type { RootState } from "@/store/store";

type AuthState = {
    user: User | null;
    token: string | null;
};

const initialState: AuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<LoginResponse>) => {
            state.user = action.payload.user;
            state.token = action.payload.token ?? null;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectRole = (state: RootState) => state.auth.user?.role;

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
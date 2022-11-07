import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, loginGoogleAPI } from "../services/api";

const initialState = {
    data: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const login = createAsyncThunk(
    'auth/login',
    async (user, { rejectWithValue }) => {
        try {
            const response = await loginAPI(user);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    });

export const loginGoogle = createAsyncThunk(
    'auth/loginGoogle',
    async (credential, { rejectWithValue }) => {
        try {
            const response = await loginGoogleAPI(credential);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.data = {};
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
        },
        setAccessToken: (state, action) => {
            state.data.accessToken = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
        });
        builder.addCase(login.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        });
        builder.addCase(loginGoogle.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        });
        builder.addCase(loginGoogle.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
        });
        builder.addCase(loginGoogle.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        });
    }
});

export const { reset, setAccessToken } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.data.user;
export const selectCurrentAccessToken = (state) => state.auth.data.accessToken;
export const selectCurrentRefreshToken = (state) => state.auth.data.refreshToken;

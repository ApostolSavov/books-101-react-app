// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";

export const login = createAsyncThunk(
    'user/login',
    (values, secondArg) => {
        console.log({ values, secondArg });
        return userService.login(values)
            .then(({ data }) => data)
            .catch(({ error }) => error);
    }
);

export const register = createAsyncThunk(
    'user/register',
    (values) => {
        return userService.register(values)
            .then(({ data }) => data)
            .catch(({ error }) => error);
    }
);

const persistedUser = localStorage.getItem('user');
const initialUser = persistedUser ? JSON.parse(persistedUser) : null;

const initialState = { user: initialUser, isLoaded: initialUser ? true : false, error: null };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.setItem('user', '');
            state.isLoaded = true;
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        [login.rejected]: (state, action) => {
            state.isLoaded = true;
            state.error = action.payload;
        },
        [register.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        [register.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.user = action.payload;
        },
    }
});

export const { logout } = userSlice.actions;
export const { reducer } = userSlice;
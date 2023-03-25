import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewService from "services/reviewService";

export const getAllReviews = createAsyncThunk(
    'reviews/getAllReviews',
    (params) => {
        return reviewService.getAll(params)
            .then(({ data }) => data)
            .catch(({ response }) => response);
    });

export const getAllReviewsByBook = createAsyncThunk(
    'reviews/getAllReviewsByBook',
    (id) => {
        return reviewService.getAllByBook(id)
            .then(({ data }) => data)
            .catch(({ response }) => response);
    });

export const getAllReviewsByUser = createAsyncThunk(
    'reviews/getAllReviewsByUser',
    (id) => {
        return reviewService.getAllByUser(id)
            .then(({ data }) => data)
            .catch(({ response }) => response);
    });

const initialState = { list: [], isLoaded: false, error: null };

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        //tbd
    },
    extraReducers: {
        // @ts-ignore
        [getAllReviews.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.list = action.payload;
        },
        // @ts-ignore
        [getAllReviews.rejected]: (state, action) => {
            state.isLoaded = true;
            state.error = action.payload;
        },
        // @ts-ignore
        [getAllReviewsByBook.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.list = action.payload;
        },
        // @ts-ignore
        [getAllReviewsByBook.rejected]: (state, action) => {
            state.isLoaded = true;
            state.error = action.payload;
        },
        // @ts-ignore
        [getAllReviewsByUser.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.list = action.payload;
        },
        // @ts-ignore
        [getAllReviewsByUser.rejected]: (state, action) => {
            state.isLoaded = true;
            state.error = action.payload;
        }
    }
});

export const { reducer } = reviewsSlice;
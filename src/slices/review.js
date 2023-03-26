import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewService from "services/reviewService";

export const getAllReviews = createAsyncThunk(
    'reviews/getAllReviews',
    (params) => {
        return reviewService.getAll(params)
            .then(({ data }) => data)
            .catch(({ response }) => response);
    });

export const postReview = createAsyncThunk(
    'reviews/postReview',
    (data) => {
        return reviewService.postReview(data)
            .then(({ data }) => data)
            .catch(({ response }) => response);
    });

export const editReview = createAsyncThunk(
    'reviews/editReview',
    (data) => {
        return reviewService.editReview(data)
            .then(({ data }) => data)
            .catch(({ response }) => response);
    });


export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    (id) => {
        return reviewService.deleteReview(id)
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

    }
});

export const { reducer } = reviewsSlice;
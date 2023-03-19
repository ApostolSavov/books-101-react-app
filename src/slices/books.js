import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BookService from "../services/bookService";

export const getAllBooks = createAsyncThunk(
    'books/getAllBooks',
    () => {
        return BookService.getAll()
            .then(({ data }) => data)
            .catch(({ response }) => response);
    });

const initialState = { collection: [], mutableCollection: [], isLoaded: false, error: null };

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        modifyCollection: (state, action) => {
            state.mutableCollection = [...action.payload];
        },
    },
    extraReducers: {
        [getAllBooks.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.collection = action.payload;
            state.mutableCollection = action.payload;
        },
        [getAllBooks.rejected]: (state, action) => {
            state.isLoaded = true;
            state.error = action.payload;
        }
    }
});

export const { modifyCollection } = booksSlice.actions;
export const { reducer } = booksSlice;
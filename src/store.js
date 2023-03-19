import { configureStore } from '@reduxjs/toolkit';
import { reducer as booksReducer } from './slices/books';

const reducer = {
    books: booksReducer,
};

const store = configureStore({
    reducer: reducer,
    // devTools: true,
});

export default store;
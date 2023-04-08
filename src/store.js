import { configureStore } from '@reduxjs/toolkit';
import { reducer as booksReducer } from 'slices/books';
import { reducer as userReducer } from 'slices/user';
import { reducer as reviewsReducer } from 'slices/review';

const reducer = {
    books: booksReducer,
    user: userReducer,
    reviews: reviewsReducer
};

const store = configureStore({
    reducer: reducer,
});

export default store;
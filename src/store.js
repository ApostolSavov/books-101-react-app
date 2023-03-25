import { configureStore } from '@reduxjs/toolkit';
import { reducer as booksReducer } from './slices/books';
import { reducer as userReducer } from './slices/user';

const reducer = {
    books: booksReducer,
    user: userReducer
};

const store = configureStore({
    reducer: reducer,
    // devTools: true,
});

export default store;
import http from '../utils/requestUtils/common';

const getAll = (abortController) => {
    return http.get('/books', { signal: abortController.signal });
};

const BookService = {
    getAll
};

export default BookService;
import http from '../utils/requestUtils/common';

const getAll = () => {
    return http.get('/books');
};

const BookService = {
    getAll
};

export default BookService;
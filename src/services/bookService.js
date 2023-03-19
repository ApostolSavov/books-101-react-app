import http from '../utils/requestUtils/common';

const getAll = () => {
    return http.get('/books');
};

const bookService = {
    getAll
};

export default bookService;